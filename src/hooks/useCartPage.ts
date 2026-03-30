import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useCreateOrderMutation } from '@/store/api';
import { clearCart, changeQuantity, removeFromCart } from '@/store/cartSlice';
import type { RootState } from '@/store';
import type { CheckoutFormValues } from '@/hooks/useCheckoutForm';
import { calculateCartTotal, toCreateOrderItems } from '@/lib/cart-utils';

export function useCartPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const items = useSelector((state: RootState) => state.cart.items);
  const [success, setSuccess] = useState(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const total = useMemo(() => calculateCartTotal(items).toFixed(2), [items]);

  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch(changeQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleSubmitOrder = async (data: CheckoutFormValues) => {
    try {
      await createOrder({
        ...data,
        items: toCreateOrderItems(items),
      }).unwrap();

      dispatch(clearCart());
      setSuccess(true);

      enqueueSnackbar('Order placed successfully 🎉', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error creating order ❌', {
        variant: 'error',
      });
    }
  };

  const resetSuccess = useCallback(() => {
    setSuccess(false);
  }, []);

  return {
    items,
    total,
    success,
    isLoading,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleSubmitOrder,
    resetSuccess,
  };
}
