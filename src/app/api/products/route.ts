import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const shopId = searchParams.get('shopId');
    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '10');
    const categoryParams = searchParams.getAll('category');
    const sortOption = searchParams.get('sortOption') ?? '';

    if (!shopId) {
      return NextResponse.json({ error: 'shopId is required' }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const where = {
      shopId,
      ...(categoryParams.length > 0
        ? {
            category: {
              in: categoryParams,
            },
          }
        : {}),
    };

    const orderBy =
      sortOption === 'price-asc'
        ? { price: 'asc' as const }
        : sortOption === 'price-desc'
          ? { price: 'desc' as const }
          : sortOption === 'name'
            ? { name: 'asc' as const }
            : { name: 'asc' as const };

    const [totalCount, items] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
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
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
