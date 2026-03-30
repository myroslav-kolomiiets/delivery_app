import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '@/store/api';
import { addManyToCart } from '@/store/cartSlice';
import type { Order } from '@/store/types';

export function useOrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: ordersResponse, isLoading } = useGetOrdersQuery({
    page,
    limit: pageSize,
  });

  const orders = ordersResponse?.items ?? [];
  const totalPages = ordersResponse?.totalPages ?? 0;

  const handleOrderAgain = useCallback(
    (order: Order) => {
      dispatch(addManyToCart(order.items));
      router.push('/cart');
    },
    [dispatch, router],
  );

  return {
    orders,
    totalPages,
    page,
    setPage,
    isLoading,
    handleOrderAgain,
  };
}
