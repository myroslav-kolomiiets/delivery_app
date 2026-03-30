'use client';

import { Box, Paper, Stack, Typography } from '@mui/material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { useOrdersPage } from '@/hooks/useOrdersPage';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrdersEmptyState } from '@/components/orders/OrdersEmptyState';
import { OrdersLoadingState } from '@/components/orders/OrdersLoadingState';

export default function OrdersPage() {
  const { orders, isLoading, handleOrderAgain } = useOrdersPage();

  if (isLoading) {
    return <OrdersLoadingState />;
  }

  return (
    <Box p={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
        }}
      >
        <Stack spacing={1}>
          <Box display="flex" alignItems="center" gap={1.25}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                boxShadow: 2,
                flexShrink: 0,
              }}
            >
              <HistoryOutlinedIcon fontSize="small" />
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={800} lineHeight={1.1}>
                Order History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Review past orders and reorder in one click
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {orders.length} order(s)
          </Typography>
        </Stack>
      </Paper>

      {orders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <Stack spacing={2.5}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onOrderAgain={handleOrderAgain} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
