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

    const like = await prisma.like.create({
      data: {
        postId: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to like post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await prisma.like.deleteMany({
      where: {
        postId: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: 'Like removed' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to unlike post' },
      { status: 500 }
    );
  }
}
