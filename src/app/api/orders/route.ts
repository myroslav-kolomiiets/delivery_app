import { prisma } from '@/lib/prisma';

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

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return Response.json(orders);
}
