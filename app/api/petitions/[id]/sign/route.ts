import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    const { name, location, comment } = await request.json();

    const signature = await prisma.signature.create({
      data: {
        petitionId: params.id,
        userId: session.user.id,
        name,
        location,
        country: location,
        comment: comment || undefined,
      },
    });

    // Update petition signature count
    await prisma.petition.update({
      where: { id: params.id },
      data: { currentSignatures: { increment: 1 } },
    });

    return NextResponse.json(signature, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to sign petition' },
      { status: 500 }
    );
  }
}
