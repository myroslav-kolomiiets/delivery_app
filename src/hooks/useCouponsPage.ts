import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useGetCouponsQuery } from '@/store/api';
import { findCouponByCode } from '@/lib/coupon-utils';
import { setAppliedCoupon, setCouponCode, clearCouponAction } from '@/store/cartSlice';

export function useCouponsPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { data: coupons = [], isLoading } = useGetCouponsQuery();
  const [couponCode, setCouponCodeLocal] = useState('');

  const foundCoupon = useMemo(() => {
    return findCouponByCode(coupons, couponCode);
  }, [coupons, couponCode]);

  const applyCoupon = () => {
    if (!foundCoupon) {
      dispatch(setAppliedCoupon(null));
      dispatch(setCouponCode(couponCode));
      enqueueSnackbar('Coupon not found ❌', { variant: 'error' });
      return;
    }

    dispatch(setCouponCode(foundCoupon.code));
    dispatch(setAppliedCoupon(foundCoupon));

    enqueueSnackbar(`Coupon ${foundCoupon.code} applied 🎉`, {
      variant: 'success',
    });
  };

  const clearAppliedCoupon = () => {
    dispatch(clearCouponAction());
    enqueueSnackbar('Coupon cleared', { variant: 'info' });
  };

  return {
    coupons,
    isLoading,
    couponCode,
    setCouponCode: setCouponCodeLocal,
    foundCoupon,
    applyCoupon,
    clearAppliedCoupon,
  };
}
