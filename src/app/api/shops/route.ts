import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const shops = await prisma.shop.findMany({
      include: {
        products: true, // think about changing for lighter response
      },
    });

    return NextResponse.json(shops);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
  }
}
