import type { CartItem, CreateOrderBody } from '@/store/types';

export function calculateCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function toCreateOrderItems(items: CartItem[]): CreateOrderBody['items'] {
  return items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));
}
