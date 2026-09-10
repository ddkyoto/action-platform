import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePetitionReport } from '@/lib/openai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const petition = await prisma.petition.findUnique({
      where: { id: params.id },
      include: { comments: true },
    });

    if (!petition) {
      return NextResponse.json({ message: 'Petition not found' }, { status: 404 });
    }

    if (petition.createdBy !== session.user.id) {
      return NextResponse.json(
        { message: 'Not authorized to generate report for this petition' },
        { status: 403 }
      );
    }

    const comments = petition.comments.map((c) => c.content);
    const { summary, draftEmail } = await generatePetitionReport(
      petition.title,
      petition.description,
      comments
    );

    const report = await prisma.report.create({
      data: {
        petitionId: params.id,
        content: summary,
        draftEmail: draftEmail,
      },
    });

    await prisma.petition.update({
      where: { id: params.id },
      data: { status: 'report_generated' },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
