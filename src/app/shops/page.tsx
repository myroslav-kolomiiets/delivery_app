'use client';

import { Box, Grid, Skeleton, Rating, Typography } from '@mui/material';
import { ProductCart } from '@/components/shops/ProductCart';
import { ShopCart } from '@/components/shops/ShopCart';
import { Filters } from '@/components/shops/Filters';
import { Pagination } from '@/components/ui/Pagination';
import { useShopsPage } from '@/hooks/useShopsPage';
import { useCartItems } from '@/hooks/useCartItems';

export default function ShopsPage() {
  const { isInCart } = useCartItems();

  const {
    shopCategories,
    selectedShopId,
    activeShopId,
    selectedCategories,
    sortOption,
    minRating,
    page,
    setPage,
    shopsLoading,
    productsLoading,
    filteredShops,
    paginatedProducts,
    totalPages,
    loadingProductId,
    onAddToCart,
    onShopSelect,
    setSelectedCategories,
    onSortChange,
    setMinRating,
  } = useShopsPage();

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Shops
      </Typography>

      {!activeShopId && <Typography>Select a shop to view products</Typography>}

      <Grid container spacing={3}>
        <Grid size={{ sm: 12, md: 3 }} spacing={2} mb={4}>
          <Box mt={2}>
            <Typography>Filter by rating</Typography>
            <Rating
              precision={0.5}
              name="simple-controlled"
              value={minRating}
              onChange={(e, newValue) => setMinRating(Number(newValue))}
            />
          </Box>

          <Grid container spacing={2} size={12}>
            {shopsLoading ? (
              <Grid spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Grid key={i}>
                    <Skeleton variant="rectangular" height={100} />
                  </Grid>
                ))}
              </Grid>
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
          </Grid>
        </Grid>

        <Grid size={{ sm: 12, md: 9 }}>
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
              <Typography variant="h6">Products:</Typography>

              {productsLoading ? (
                <Grid container spacing={2}>
                  {[1, 2, 3, 4].map((i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                      <Skeleton variant="rectangular" height={150} />
                    </Grid>
                  ))}
                </Grid>
              ) : paginatedProducts.length === 0 ? (
                <Typography>No products found</Typography>
              ) : (
                <Grid container spacing={2}>
                  {paginatedProducts.map((product) => {
                    const inCart = isInCart(product.id);

                    return (
                      <ProductCart
                        key={product.id}
                        product={product}
                        inCart={inCart}
                        onAddToCart={onAddToCart}
                        loadingProductId={loadingProductId}
                      />
                    );
                  })}
                </Grid>
              )}
            </>
          )}

          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </Grid>
      </Grid>
    </Box>
  );
}
