import { Button, Card, CardContent, Typography } from '@mui/material';
import type { Order } from '@/store/types';
import { calculateOrderTotal, formatOrderDate } from '@/lib/order-utils';

type OrderCardProps = {
  order: Order;
  onOrderAgain: (order: Order) => void;
};

export function OrderCard({ order, onOrderAgain }: OrderCardProps) {
  const total = calculateOrderTotal(order);
  const discountAmount = order.discount ? (total * order.discount) / 100 : 0;
  const finalTotal = total - discountAmount;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography color="text.secondary">{formatOrderDate(order.createdAt)}</Typography>

        {order.couponCode && (
          <Typography sx={{ mt: 1 }}>
            Coupon: <strong>{order.couponCode}</strong>
          </Typography>
        )}

        {order.discount ? (
          <Typography color="success.main">Discount: -{order.discount}%</Typography>
        ) : null}

        {order.items.map((item) => (
          <Typography key={item.id}>
            {item.product.name} x {item.quantity}
          </Typography>
        ))}

        <Typography sx={{ mt: 1 }} fontWeight={600}>
          Total: ${total.toFixed(2)}
        </Typography>

        {order.discount ? (
          <Typography color="success.main">
            Final total: ${finalTotal.toFixed(2)}
          </Typography>
        ) : null}

        <Button variant="contained" sx={{ mt: 2 }} onClick={() => onOrderAgain(order)}>
          Order again
        </Button>
      </CardContent>
    </Card>
  );
}
