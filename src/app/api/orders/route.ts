import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const order = await prisma.order.create({
    data: {
      email: body.email,
      phone: body.phone,
      address: body.address,

      items: {
        create: body.items.map((item: any) => ({
          quantity: item.quantity,
          product: {
            connect: { id: item.productId },
          },
        })),
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
