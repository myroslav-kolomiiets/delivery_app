import { Button, Typography } from '@mui/material';

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
    <>
      <Typography variant="h5" mt={2}>
        Total: ${total}
      </Typography>

      {hasDiscount && (
        <Typography color="success.main">Discount: -${discountAmount}</Typography>
      )}

      <Typography variant="h6">Final total: ${discountedTotal}</Typography>

      <Button onClick={onClearCart}>Clear cart</Button>
    </>
  );
}
