import type { Coupon } from '@/store/types';

export function findCouponByCode(coupons: Coupon[], code: string) {
  const normalizedCode = code.trim().toLowerCase();

  return coupons.find((coupon) => coupon.code.toLowerCase() === normalizedCode);
}

export function calculateDiscountAmount(total: number, discount: number) {
  return (total * discount) / 100;
}

export function calculateDiscountedTotal(total: number, discount: number) {
  return total - calculateDiscountAmount(total, discount);
}
