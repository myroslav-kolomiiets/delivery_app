'use client';

import { useGetOrdersQuery } from '@/store/api';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addManyToCart } from '@/store/cartSlice';
import { OrderItem, Order } from '@/store/types';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Order History
      </Typography>

      {orders?.map((order: Order) => (
        <Card key={order.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{new Date(order.createdAt).toLocaleString()}</Typography>

            {order.items.map((item: OrderItem) => (
              <Typography key={item.id}>
                {item.product.name} x {item.quantity}
              </Typography>
            ))}

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                dispatch(addManyToCart(order.items));
                router.push('/cart');
              }}
            >
              Order again
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
