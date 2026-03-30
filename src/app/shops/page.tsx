'use client';

import { Box, Grid, Skeleton, Typography } from '@mui/material';
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
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ sm: 12, md: 3 }}>
          <ShopSidebar
            shopsLoading={shopsLoading}
            filteredShops={filteredShops}
            selectedShopId={selectedShopId}
            onShopSelect={onShopSelect}
            minRating={minRating}
            onMinRatingChange={setMinRating}
          />
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
              <Typography variant="h6" mb={2}>
                Products:
              </Typography>

              <Grid container spacing={2} alignItems="stretch">
                {productsLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                      <ProductCart
                        product={{
                          id: `loading-${i}`,
                          name: '',
                          price: 0,
                          category: '',
                        }}
                        inCart={false}
                        onAddToCart={() => {}}
                        loadingProductId={null}
                        isLoading
                      />
                    </Grid>
                  ))
                ) : paginatedProducts.length === 0 ? (
                  <Typography>No products found</Typography>
                ) : (
                  paginatedProducts.map((product) => {
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
            </>
          )}

          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </Grid>
      </Grid>
    </Box>
  );
}
