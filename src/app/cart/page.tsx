'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useCartPage } from '@/hooks/useCartPage';
import { useCheckoutForm, type CheckoutFormValues } from '@/hooks/useCheckoutForm';
import { CartItemCard } from '@/components/cart/CartItemCard';
import { CartSummary } from '@/components/cart/CartSummary';
import { CheckoutForm } from '@/components/cart/CheckoutForm';

export default function CartPage() {
  const {
    items,
    total,
    success,
    isLoading,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleSubmitOrder,
    resetSuccess,
  } = useCartPage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useCheckoutForm();

  useEffect(() => {
    if (!items.length) {
      resetSuccess();
    }
  }, [items.length, resetSuccess]);

  const onSubmit = async (data: CheckoutFormValues) => {
    await handleSubmitOrder(data);
    reset();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Cart
      </Typography>

      {items.length === 0 && !success && (
        <Typography color="text.secondary">Your cart is empty 🛒</Typography>
      )}

      {success && (
        <Typography color="success.main">Order created successfully 🎉</Typography>
      )}

      {items.map((item) => (
        <CartItemCard
          key={item.product.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveItem}
        />
      ))}

      {items.length > 0 && <CartSummary total={total} onClearCart={handleClearCart} />}

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
