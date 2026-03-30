'use client';

import { Box, Typography } from '@mui/material';
import { OrdersLoadingState } from '@/components/orders/OrdersLoadingState';
import { OrdersEmptyState } from '@/components/orders/OrdersEmptyState';
import { OrderCard } from '@/components/orders/OrderCard';
import { useOrdersPage } from '@/hooks/useOrdersPage';

export default function OrdersPage() {
  const { orders, isLoading, handleOrderAgain } = useOrdersPage();

  if (isLoading) {
    return <OrdersLoadingState />;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id} order={order} onOrderAgain={handleOrderAgain} />
        ))
      )}
    </Box>
  );
}
