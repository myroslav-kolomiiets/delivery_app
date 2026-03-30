'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCartPage } from '@/hooks/useCartPage';
import { type CheckoutFormValues, useCheckoutForm } from '@/hooks/useCheckoutForm';
import { CartItemCard } from '@/components/cart/CartItemCard';
import { CartSummary } from '@/components/cart/CartSummary';
import { CheckoutForm } from '@/components/cart/CheckoutForm';

export default function CartPage() {
  const {
    items,
    total,
    discountAmount,
    discountedTotal,
    isLoading,
    couponCode,
    handleCouponCodeChange,
    applyCoupon,
    clearCoupon,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleSubmitOrder,
    appliedCoupon,
  } = useCartPage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useCheckoutForm();

  const onSubmit = async (data: CheckoutFormValues) => {
    await handleSubmitOrder(data);
    reset();
  };

  return (
    <Box p={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,250,250,1) 100%)',
        }}
      >
        <Stack spacing={1}>
          <Box display="flex" alignItems="center" gap={1.25}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                boxShadow: 2,
                flexShrink: 0,
              }}
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={800} lineHeight={1.1}>
                Cart
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Review your items, apply coupon, and checkout
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={`${items.length} item(s)`} variant="outlined" />
            {appliedCoupon && (
              <Chip
                icon={<LocalOfferOutlinedIcon />}
                label={`Promo ${appliedCoupon.code} · ${appliedCoupon.discount}%`}
                color="success"
                sx={{ fontWeight: 700 }}
              />
            )}
          </Stack>
        </Stack>
      </Paper>

      {items.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px dashed',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" mb={1}>
            Your cart is empty 🛒
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Go back to shops and add something tasty.
          </Typography>
          <Button component={Link} href="/shops" variant="contained">
            Browse shops
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.7fr 1fr' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                mb: 3,
              }}
            >
              <Typography variant="h6" mb={1}>
                Items
              </Typography>

              <Stack spacing={2}>
                {items.map((item) => (
                  <CartItemCard
                    key={item.product.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </Stack>

              <Box mt={2} display="flex" gap={1.5} flexWrap="wrap">
                <Button variant="outlined" onClick={handleClearCart}>
                  Clear cart
                </Button>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" mb={2}>
                Coupon
              </Typography>

              <Box display="flex" gap={2} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
                <TextField
                  fullWidth
                  label="Coupon code"
                  value={couponCode}
                  onChange={(e) => handleCouponCodeChange(e.target.value)}
                />

                <Button variant="contained" onClick={applyCoupon} sx={{ minWidth: 140 }}>
                  Apply
                </Button>

                <Button variant="text" color="inherit" onClick={clearCoupon}>
                  Clear
                </Button>
              </Box>

              {appliedCoupon && (
                <Box mt={1.5}>
                  <Chip
                    icon={<LocalOfferOutlinedIcon />}
                    label={`Promo ${appliedCoupon.code} is active`}
                    color="success"
                    variant="outlined"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>
              )}
            </Paper>
          </Box>

          <Box sx={{ position: { md: 'sticky' }, top: { md: 88 } }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CartSummary
                total={total.toFixed(2)}
                discountAmount={discountAmount.toFixed(2)}
                discountedTotal={discountedTotal.toFixed(2)}
                onClearCart={handleClearCart}
              />
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                mt: 3,
              }}
            >
              <CheckoutForm
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                isLoading={isLoading}
              />
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
}
