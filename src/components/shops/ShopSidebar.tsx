import { Box, Divider, Paper, Stack, Typography, Skeleton } from '@mui/material';
import { ShopCart } from '@/components/shops/ShopCart';
import { ShopRatingFilter } from '@/components/shops/ShopRatingFilter';
import type { Shop } from '@/store/types';

type ShopSidebarProps = {
  shopsLoading: boolean;
  filteredShops: Shop[];
  selectedShopId: string | null;
  onShopSelect: (shopId: string) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
};

export function ShopSidebar({
  shopsLoading,
  filteredShops,
  selectedShopId,
  onShopSelect,
  minRating,
  onMinRatingChange,
}: ShopSidebarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" mb={0.5}>
            Shops
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a shop to view its products
          </Typography>
        </Box>

        <ShopRatingFilter minRating={minRating} onMinRatingChange={onMinRatingChange} />

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
            Available shops
          </Typography>

          <Stack spacing={1.5}>
            {shopsLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} variant="rounded" height={92} />
                ))}
              </>
            ) : (
              filteredShops.map((shop) => (
                <ShopCart
                  key={shop.id}
                  shop={shop}
                  selectedShopId={selectedShopId}
                  onSelectShop={onShopSelect}
                />
              ))
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
