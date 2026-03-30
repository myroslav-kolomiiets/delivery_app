import { Card, CardContent, Grid, Rating, Typography } from '@mui/material';
import type { Shop } from '@/store/types';

type ShopCartProps = {
  shop: Shop;
  selectedShopId: string | null;
  onSelectShop: (shopId: string) => void;
};

export function ShopCart({ shop, selectedShopId, onSelectShop }: ShopCartProps) {
  return (
    <Grid size={12}>
      <Card
        onClick={() => onSelectShop(shop.id)}
        sx={{
          cursor: 'pointer',
          border: selectedShopId === shop.id ? '1px solid #1976d2' : '1px solid #ccc',
        }}
      >
        <CardContent>
          <Typography variant="h6">{shop.name}</Typography>
          <Rating name="shop-rating" value={shop.rating} readOnly precision={0.5} />
        </CardContent>
      </Card>
    </Grid>
  );
}
