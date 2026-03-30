import type { Order } from '@/store/types';

export function formatOrderDate(createdAt: string) {
  return new Date(createdAt).toLocaleString();
}

export function calculateOrderTotal(order: Order) {
  return order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateOrderDiscountAmount(order: Order) {
  const total = calculateOrderTotal(order);
  return order.discount ? (total * order.discount) / 100 : 0;
}

export function calculateOrderFinalTotal(order: Order) {
  return calculateOrderTotal(order) - calculateOrderDiscountAmount(order);
}
