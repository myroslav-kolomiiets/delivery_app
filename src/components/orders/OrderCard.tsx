import { Button, Card, CardContent, Typography } from '@mui/material';
import type { Order } from '@/store/types';
import { calculateOrderTotal, formatOrderDate } from '@/lib/order-utils';

type OrderCardProps = {
  order: Order;
  onOrderAgain: (order: Order) => void;
};

export function OrderCard({ order, onOrderAgain }: OrderCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography color="text.secondary">{formatOrderDate(order.createdAt)}</Typography>

        {order.items.map((item) => (
          <Typography key={item.id}>
            {item.product.name} x {item.quantity}
          </Typography>
        ))}

        <Typography sx={{ mt: 1 }} fontWeight={600}>
          Total: ${calculateOrderTotal(order).toFixed(2)}
        </Typography>

        <Button variant="contained" sx={{ mt: 2 }} onClick={() => onOrderAgain(order)}>
          Order again
        </Button>
      </CardContent>
    </Card>
  );
}
