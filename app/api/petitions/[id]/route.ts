import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const petition = await prisma.petition.findUnique({
      where: { id: params.id },
      include: {
        organizer: true,
        signatures: { take: 10 },
        comments: { take: 10, include: { author: true } },
        report: true,
        internationalBreakdown: true,
      },
    });

    if (!petition) {
      return NextResponse.json({ message: 'Petition not found' }, { status: 404 });
    }

    return NextResponse.json(petition);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch petition' },
      { status: 500 }
    );
  }
}
