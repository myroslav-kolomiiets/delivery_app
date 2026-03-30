import { Card, CardContent, Rating, Typography, Box } from '@mui/material';
import type { Shop } from '@/store/types';

type ShopCartProps = {
  shop: Shop;
  selectedShopId: string | null;
  onSelectShop: (shopId: string) => void;
};

export function ShopCart({ shop, selectedShopId, onSelectShop }: ShopCartProps) {
  const active = selectedShopId === shop.id;

  return (
    <Card
      onClick={() => onSelectShop(shop.id)}
      sx={{
        cursor: 'pointer',
        border: '1px solid',
        borderColor: active ? 'primary.main' : 'divider',
        backgroundColor: active ? 'action.selected' : 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-1px)',
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {shop.name}
            </Typography>
          </Box>

          <Rating
            name="shop-rating"
            value={shop.rating}
            readOnly
            precision={0.5}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
