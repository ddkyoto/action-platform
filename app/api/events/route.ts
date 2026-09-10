import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createEventSchema } from '@/lib/schemas';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validated = createEventSchema.parse(data);

    const event = await prisma.event.create({
      data: {
        ...validated,
        createdBy: session.user.id,
      },
      include: { organizer: true, attendees: true },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get('country');
    const type = searchParams.get('type');
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '10');

    const where: any = {
      startDate: { gte: new Date() },
    };
    if (country) where.country = country;
    if (type) where.type = type;

    const events = await prisma.event.findMany({
      where,
      skip,
      take,
      include: {
        organizer: { select: { id: true, name: true, avatarColor: true } },
        attendees: true,
      },
      orderBy: { startDate: 'asc' },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
