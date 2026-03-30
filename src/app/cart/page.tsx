'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useCartPage } from '@/hooks/useCartPage';
import { useCheckoutForm, type CheckoutFormValues } from '@/hooks/useCheckoutForm';
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
      <Typography variant="h4" mb={3}>
        Cart
      </Typography>

      {items.length === 0 && (
        <Typography color="text.secondary">Your cart is empty 🛒</Typography>
      )}

      {items.map((item) => (
        <CartItemCard
          key={item.product.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveItem}
        />
      ))}

      {items.length > 0 && (
        <Box mt={2} display="flex" gap={2} alignItems="center">
          <TextField
            label="Coupon code"
            value={couponCode}
            onChange={(e) => handleCouponCodeChange(e.target.value)}
          />
          <Button variant="outlined" onClick={applyCoupon}>
            Apply
          </Button>
          <Button variant="text" color="inherit" onClick={clearCoupon}>
            Clear coupon
          </Button>
        </Box>
      )}

      {items.length > 0 && (
        <CartSummary
          total={total.toFixed(2)}
          discountAmount={discountAmount.toFixed(2)}
          discountedTotal={discountedTotal.toFixed(2)}
          onClearCart={handleClearCart}
        />
      )}

      {items.length > 0 && (
        <CheckoutForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      )}
    </Box>
  );
}
