import { prisma } from '@/lib/prisma';

export async function GET() {
  const coupons = await prisma.coupon.findMany();
  return Response.json(coupons);
}
