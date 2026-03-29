'use client';

import { useEffect, useState } from 'react';
import { useGetProductsQuery, useGetShopsQuery } from '@/store/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  NativeSelect,
  Skeleton,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { RootState } from '@/store';

export default function ShopsPage() {
  const dispatch = useDispatch();
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const categories = ['Burgers', 'Drinks', 'Desserts', 'Snacks'];

  const { data: shops, isLoading: shopsLoading } = useGetShopsQuery();

  const [page, setPage] = useState(1);
  const pageSize = 4;

  const { data: products, isLoading: productsLoading } = useGetProductsQuery(
    selectedShopId!,
    {
      skip: !selectedShopId,
    },
  );

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, sortOption, selectedShopId]);

  const filteredProducts = products
    ? [...products]
        .filter((product) =>
          selectedCategories.length === 0
            ? true
            : selectedCategories.includes(product.category),
        )
        .sort((a, b) => {
          if (sortOption === 'price-asc') return a.price - b.price;
          if (sortOption === 'price-desc') return b.price - a.price;
          if (sortOption === 'name') return a.name.localeCompare(b.name);
          return 0;
        })
    : [];

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const filteredShops = shops?.filter((shop) => shop.rating >= minRating);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Shops
      </Typography>
      {!selectedShopId && <Typography>Select a shop to view products</Typography>}
      {/* 🏪 Shops */}
      <Grid container spacing={2} mb={4}>
        {shopsLoading ? (
          <Grid container spacing={2}>
            {[1, 2, 3].map((i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Skeleton variant="rectangular" height={100} />
              </Grid>
            ))}
          </Grid>
        ) : (
          filteredShops?.map((shop) => (
            <Grid size={{ xs: 12, md: 4 }} key={shop.id}>
              <Card
                onClick={() => setSelectedShopId(shop.id)}
                sx={{
                  cursor: 'pointer',
                  border:
                    selectedShopId === shop.id ? '2px solid #1976d2' : '1px solid #ccc',
                }}
              >
                <CardContent>
                  <Typography variant="h6">{shop.name}</Typography>
                  <Typography>Rating: {shop.rating}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* 🍔 Products */}
      <Box mb={3}>
        <Typography variant="h6">Filters</Typography>

        {/* Categories */}
        <Box display="flex" gap={2} mt={1}>
          {categories.map((cat) => (
            <Button
              disabled={!selectedShopId}
              key={cat}
              variant={selectedCategories.includes(cat) ? 'contained' : 'outlined'}
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
                );
              }}
            >
              {cat}
            </Button>
          ))}
          <Button
            disabled={!selectedShopId}
            onClick={() => {
              setSelectedCategories([]);
              setSortOption('');
            }}
          >
            Reset
          </Button>
        </Box>

        <Box mt={2}>
          <Typography>Minimum rating: {minRating}</Typography>

          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          />
        </Box>

        {/* Sorting */}
        <Box mt={2}>
          <FormControl>
            {/*<InputLabel variant="standard" htmlFor="uncontrolled-native">*/}
            {/*    Sort by*/}
            {/*</InputLabel>*/}
            <NativeSelect
              defaultValue={30}
              disabled={!selectedShopId}
              inputProps={{
                name: 'Sort by',
                id: 'uncontrolled-native',
              }}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">No sorting</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name">Name A-Z</option>
            </NativeSelect>
          </FormControl>
          <Button
            disabled={!selectedShopId}
            onClick={() => {
              setSelectedCategories([]);
              setSortOption('');
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      {selectedShopId && (
        <>
          <Typography variant="h6">
            {shops?.find((s) => s.id === selectedShopId)?.name} products:
          </Typography>

          {productsLoading ? (
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                  <Skeleton variant="rectangular" height={150} />
                </Grid>
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <Typography>No products found</Typography>
          ) : (
            <Grid container spacing={2}>
              {paginatedProducts.map((product) => {
                const isInCart = cartItems.some((item) => item.product.id === product.id);
                return (
                  <Grid size={{ xs: 12, md: 3 }} key={product.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>

                        <Typography>${product.price}</Typography>

                        <Typography variant="body2">{product.category}</Typography>

                        <Button
                          variant={isInCart ? 'outlined' : 'contained'}
                          color={isInCart ? 'success' : 'primary'}
                          sx={{ mt: 2 }}
                          onClick={() => dispatch(addToCart(product))}
                          disabled={isInCart}
                        >
                          {isInCart ? 'In cart ✓' : 'Add to cart'}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}
      <Box mt={3} display="flex" gap={2} alignItems="center">
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <Typography>
          Page {page} of {totalPages || 1}
        </Typography>

        <Button
          variant="outlined"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
