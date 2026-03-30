import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '10');
    const minRating = Number(searchParams.get('minRating') ?? '0');

    const skip = (page - 1) * limit;

    const where = {
      rating: {
        gte: minRating,
      },
    };

    const [totalCount, items] = await Promise.all([
      prisma.shop.count({ where }),
      prisma.shop.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    return NextResponse.json({
      items,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
  }
}
