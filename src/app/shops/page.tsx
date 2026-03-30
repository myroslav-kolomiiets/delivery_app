'use client';

import { Box, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { ProductCart } from '@/components/shops/ProductCart';
import { Filters } from '@/components/shops/Filters';
import { Pagination } from '@/components/ui/Pagination';
import { useShopsPage } from '@/hooks/useShopsPage';
import { useCartItems } from '@/hooks/useCartItems';
import { ShopSidebar } from '@/components/shops/ShopSidebar';

export default function ShopsPage() {
  const { isInCart } = useCartItems();

  const {
    shopCategories,
    activeShopId,
    selectedCategories,
    sortOption,
    minRating,
    shopsPage,
    setShopsPage,
    productsPage,
    setProductsPage,
    shopsLoading,
    productsLoading,
    shops,
    products,
    totalPages,
    productsTotalPages,
    loadingProductId,
    onAddToCart,
    onShopSelect,
    setSelectedCategories,
    onSortChange,
    setMinRating,
  } = useShopsPage();

  return (
    <Box p={3}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(250, 250, 250, 0.96)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
            }}
          >
            <Stack spacing={2}>
              <ShopSidebar
                shopsLoading={shopsLoading}
                filteredShops={shops}
                selectedShopId={activeShopId}
                onShopSelect={onShopSelect}
                minRating={minRating}
                onMinRatingChange={setMinRating}
              />

              <Pagination
                page={shopsPage}
                setPage={setShopsPage}
                totalPages={totalPages}
                compact
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Filters
            categories={shopCategories}
            selectedShopId={activeShopId}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            sortOption={sortOption}
            onSortChange={onSortChange}
          />

          {activeShopId && (
            <>
              <Typography variant="h6" mb={2}>
                Products:
              </Typography>

              <Grid container spacing={2} alignItems="stretch">
                {productsLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Skeleton variant="rectangular" height={240} />
                    </Grid>
                  ))
                ) : products.length === 0 ? (
                  <Typography>No products found</Typography>
                ) : (
                  products.map((product) => {
                    const inCart = isInCart(product.id);

                    return (
                      <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProductCart
                          product={product}
                          inCart={inCart}
                          onAddToCart={onAddToCart}
                          loadingProductId={loadingProductId}
                        />
                      </Grid>
                    );
                  })
                )}
              </Grid>

              <Pagination
                page={productsPage}
                setPage={setProductsPage}
                totalPages={productsTotalPages}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
