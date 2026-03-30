import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '@/store/api';
import { addManyToCart } from '@/store/cartSlice';
import type { Order } from '@/store/types';

export function useOrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: orders = [], isLoading } = useGetOrdersQuery();

  const handleOrderAgain = useCallback(
    (order: Order) => {
      dispatch(addManyToCart(order.items));
      router.push('/cart');
    },
    [dispatch, router],
  );

  return {
    orders,
    isLoading,
    handleOrderAgain,
  };
}
