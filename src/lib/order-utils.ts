import type { Order } from '@/store/types';

export function formatOrderDate(createdAt: string) {
  return new Date(createdAt).toLocaleString();
}

export function calculateOrderTotal(order: Order) {
  return order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}
