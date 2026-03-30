import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import type { Order } from '@/store/types';
import {
  calculateOrderDiscountAmount,
  calculateOrderFinalTotal,
  calculateOrderTotal,
  formatOrderDate,
} from '@/lib/order-utils';

type OrderCardProps = {
  order: Order;
  onOrderAgain: (order: Order) => void;
};

export function OrderCard({ order, onOrderAgain }: OrderCardProps) {
  const subtotal = calculateOrderTotal(order);
  const discountAmount = calculateOrderDiscountAmount(order);
  const finalTotal = calculateOrderFinalTotal(order);

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
        boxShadow: 0,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: 2,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          '&:last-child': { pb: 2.5 },
        }}
      >
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={0.75}>
                <AccessTimeOutlinedIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {formatOrderDate(order.createdAt)}
                </Typography>
              </Stack>

              <Typography variant="h6" fontWeight={800}>
                Order #{order.id.slice(0, 8)}
              </Typography>
            </Box>

            <Chip
              icon={<ShoppingBagOutlinedIcon />}
              label={`${order.items.length} item(s)`}
              variant="outlined"
              sx={{ borderRadius: 2, fontWeight: 700 }}
            />
          </Box>

          {(order.couponCode || order.discount) && (
            <Chip
              icon={<LocalOfferOutlinedIcon />}
              label={
                order.couponCode
                  ? `Promo ${order.couponCode}${order.discount ? ` · ${order.discount}%` : ''}`
                  : `Discount ${order.discount}%`
              }
              color="success"
              variant="outlined"
              sx={{ alignSelf: 'flex-start', borderRadius: 2, fontWeight: 700 }}
            />
          )}

          <Divider />

          <Stack spacing={1}>
            {order.items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography fontWeight={700}>{item.product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </Typography>
                </Box>

                <Typography fontWeight={700}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Divider />

          <Stack spacing={0.85}>
            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography fontWeight={700}>${subtotal.toFixed(2)}</Typography>
            </Box>

            {discountAmount > 0 && (
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalOfferOutlinedIcon color="success" fontSize="small" />
                  <Typography color="success.main">Discount</Typography>
                </Box>
                <Typography color="success.main" fontWeight={700}>
                  -${discountAmount.toFixed(2)}
                </Typography>
              </Box>
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={1}>
                <PaymentsOutlinedIcon color="primary" fontSize="small" />
                <Typography fontWeight={700}>Final total</Typography>
              </Box>
              <Typography variant="h5" fontWeight={900}>
                ${finalTotal.toFixed(2)}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            onClick={() => onOrderAgain(order)}
            sx={{ alignSelf: 'flex-start', borderRadius: 2, textTransform: 'none' }}
          >
            Order again
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
