import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import type { Product } from '@/store/types';

type ProductCartProps = {
  product: Product;
  inCart: boolean;
  onAddToCart: (product: Product) => void;
  loadingProductId: string | null;
};

export function ProductCart({
  product,
  inCart,
  onAddToCart,
  loadingProductId,
}: ProductCartProps) {
  return (
    <Grid size={{ xs: 12, md: 3 }} key={product.id}>
      <Card>
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography>${product.price}</Typography>
          <Typography variant="body2">{product.category}</Typography>

          <Button
            variant={inCart ? 'outlined' : 'contained'}
            color={inCart ? 'success' : 'primary'}
            sx={{ mt: 2, textTransform: 'none' }}
            disabled={inCart || loadingProductId === product.id}
            onClick={() => onAddToCart(product)}
          >
            {loadingProductId === product.id
              ? 'Adding...'
              : inCart
                ? 'In cart ✓'
                : `Add 1 for ${product.price}$`}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
