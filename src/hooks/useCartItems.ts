import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export function useCartItems() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.product.id));
  }, [cartItems]);

  const isInCart = (id: string) => cartIds.has(id);

  return { cartItems, cartIds, isInCart };
}
