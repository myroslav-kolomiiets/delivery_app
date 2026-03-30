import { Button, Typography } from '@mui/material';

type CartSummaryProps = {
  total: string;
  onClearCart: () => void;
};

export function CartSummary({ total, onClearCart }: CartSummaryProps) {
  return (
    <>
      <Typography variant="h5" mt={2}>
        Total: ${total}
      </Typography>
      <Button onClick={onClearCart}>Clear cart</Button>
    </>
  );
}
