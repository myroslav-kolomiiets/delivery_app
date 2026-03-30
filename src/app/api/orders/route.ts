import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type CreateOrderRequestBody = {
  email: string;
  phone: string;
  address: string;
  couponCode?: string;
  discount?: number;
  items: {
    productId: string;
    quantity: number;
  }[];
};

export async function POST(req: Request) {
  const body: CreateOrderRequestBody = await req.json();

  const order = await prisma.order.create({
    data: {
      email: body.email,
      phone: body.phone,
      address: body.address,
      couponCode: body.couponCode,
      discount: body.discount,
      items: {
        create: body.items.map((item) => ({
          quantity: item.quantity,
          product: {
            connect: { id: item.productId },
          },
        })),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return Response.json(order);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;

    const [totalCount, items] = await Promise.all([
      prisma.order.count(),
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          items: {
            include: {
              product: true,
            },
          },
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
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
