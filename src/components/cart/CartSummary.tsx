import { Button, Divider, Stack, Typography, Box } from '@mui/material';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

type CartSummaryProps = {
  total: string;
  discountAmount: string;
  discountedTotal: string;
  onClearCart: () => void;
};

export function CartSummary({
  total,
  discountAmount,
  discountedTotal,
  onClearCart,
}: CartSummaryProps) {
  const hasDiscount = Number(discountAmount) > 0;

  return (
    <Stack spacing={1.75}>
      <Box display="flex" alignItems="center" gap={1}>
        <ReceiptLongOutlinedIcon color="primary" fontSize="small" />
        <Typography variant="h6" fontWeight={800}>
          Summary
        </Typography>
      </Box>

      <Divider />

      <Stack spacing={1.1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="text.secondary">Total</Typography>
          <Typography fontWeight={700}>${total}</Typography>
        </Box>

        {hasDiscount && (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <LocalOfferOutlinedIcon color="success" fontSize="small" />
              <Typography color="success.main">Discount</Typography>
            </Box>
            <Typography color="success.main" fontWeight={700}>
              -${discountAmount}
            </Typography>
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <PaymentsOutlinedIcon color="primary" fontSize="small" />
            <Typography fontWeight={700}>Final total</Typography>
          </Box>
          <Typography variant="h5" fontWeight={900}>
            ${discountedTotal}
          </Typography>
        </Box>
      </Stack>

      <Button
        variant="outlined"
        onClick={onClearCart}
        sx={{ alignSelf: 'flex-start', borderRadius: 2, textTransform: 'none' }}
      >
        Clear cart
      </Button>
    </Stack>
  );
}
