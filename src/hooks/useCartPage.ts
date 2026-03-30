import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useCreateOrderMutation, useGetCouponsQuery } from '@/store/api';
import {
  changeQuantity,
  clearCart,
  clearCouponAction,
  removeFromCart,
  setAppliedCoupon,
  setCouponCode,
} from '@/store/cartSlice';
import type { RootState } from '@/store';
import type { CheckoutFormValues } from '@/hooks/useCheckoutForm';
import { calculateCartTotal, toCreateOrderItems } from '@/lib/cart-utils';
import { calculateDiscountedTotal, findCouponByCode } from '@/lib/coupon-utils';

export function useCartPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const items = useSelector((state: RootState) => state.cart.items);
  const couponCode = useSelector((state: RootState) => state.cart.couponCode);
  const appliedCoupon = useSelector((state: RootState) => state.cart.appliedCoupon);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: coupons = [] } = useGetCouponsQuery();

  const total = useMemo(() => calculateCartTotal(items), [items]);
  const discountAmount = useMemo(() => {
    return appliedCoupon ? (total * appliedCoupon.discount) / 100 : 0;
  }, [appliedCoupon, total]);

  const discountedTotal = useMemo(() => {
    return appliedCoupon
      ? calculateDiscountedTotal(total, appliedCoupon.discount)
      : total;
  }, [appliedCoupon, total]);

  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch(changeQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCouponCodeChange = (value: string) => {
    dispatch(setCouponCode(value));
  };

  const applyCoupon = () => {
    const found = findCouponByCode(coupons, couponCode);

    if (!found) {
      dispatch(setAppliedCoupon(null));
      enqueueSnackbar('Coupon not found ❌', { variant: 'error' });
      return;
    }

    dispatch(setAppliedCoupon(found));
    enqueueSnackbar(`Coupon ${found.code} applied 🎉`, { variant: 'success' });
  };

  const clearCoupon = () => {
    dispatch(clearCouponAction());
    enqueueSnackbar('Coupon cleared', { variant: 'info' });
  };

  const handleSubmitOrder = async (data: CheckoutFormValues) => {
    try {
      await createOrder({
        ...data,
        couponCode: appliedCoupon?.code,
        discount: appliedCoupon?.discount,
        items: toCreateOrderItems(items),
      }).unwrap();

      dispatch(clearCart());
      dispatch(clearCouponAction());

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

  return {
    items,
    total,
    discountAmount,
    discountedTotal,
    isLoading,
    couponCode,
    appliedCoupon,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleSubmitOrder,
    handleCouponCodeChange,
    applyCoupon,
    clearCoupon,
  };
}
