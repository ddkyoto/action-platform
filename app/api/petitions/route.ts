import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPetitionSchema } from '@/lib/schemas';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validated = createPetitionSchema.parse(data);

    const petition = await prisma.petition.create({
      data: {
        ...validated,
        createdBy: session.user.id,
      },
    });

    return NextResponse.json(petition, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to create petition' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get('country');
    const category = searchParams.get('category');
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '10');

    const where: any = {};
    if (country) where.country = country;
    if (category) where.category = category;

    const petitions = await prisma.petition.findMany({
      where,
      skip,
      take,
      include: {
        organizer: { select: { id: true, name: true, avatarColor: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(petitions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch petitions' },
      { status: 500 }
    );
  }
}
