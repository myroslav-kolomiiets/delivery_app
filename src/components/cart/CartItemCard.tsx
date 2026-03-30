import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import type { CartItem } from '@/store/types';

type CartItemCardProps = {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{item.product.name}</Typography>
        <Typography>Price: ${item.product.price}</Typography>

        <TextField
          type="number"
          label="Quantity"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.product.id, Number(e.target.value))}
          sx={{ mt: 1, width: 100 }}
        />

        <Button color="error" onClick={() => onRemove(item.product.id)} sx={{ ml: 2 }}>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}
