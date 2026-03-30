import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Coupon, Product } from '@/store/types';

type CartState = {
  items: CartItem[];
  couponCode: string;
  appliedCoupon: Coupon | null;
};

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};

const loadCoupon = (): { couponCode: string; appliedCoupon: Coupon | null } => {
  if (typeof window === 'undefined') {
    return { couponCode: '', appliedCoupon: null };
  }

  const data = localStorage.getItem('coupon');
  return data
    ? (JSON.parse(data) as { couponCode: string; appliedCoupon: Coupon | null })
    : { couponCode: '', appliedCoupon: null };
};

const saveCart = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

const saveCoupon = (couponCode: string, appliedCoupon: Coupon | null) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('coupon', JSON.stringify({ couponCode, appliedCoupon }));
  }
};

const couponState = loadCoupon();

const initialState: CartState = {
  items: loadCart(),
  couponCode: couponState.couponCode,
  appliedCoupon: couponState.appliedCoupon,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((item) => item.product.id === action.payload.id);

      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }

      saveCart(state.items);
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      saveCart(state.items);
    },

    changeQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.product.id === productId);

      if (item) {
        item.quantity = quantity;
      }

      saveCart(state.items);
    },

    clearCart(state) {
      state.items = [];
      saveCart(state.items);

      state.couponCode = '';
      state.appliedCoupon = null;
      saveCoupon(state.couponCode, state.appliedCoupon);
    },

    addManyToCart(state, action: PayloadAction<CartItem[]>) {
      action.payload.forEach((item) => {
        const existing = state.items.find((i) => i.product.id === item.product.id);

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          state.items.push({
            product: item.product,
            quantity: item.quantity,
          });
        }
      });

      saveCart(state.items);
    },

    setCouponCode(state, action: PayloadAction<string>) {
      state.couponCode = action.payload;
      saveCoupon(state.couponCode, state.appliedCoupon);
    },

    setAppliedCoupon(state, action: PayloadAction<Coupon | null>) {
      state.appliedCoupon = action.payload;
      saveCoupon(state.couponCode, state.appliedCoupon);
    },

    clearCouponAction(state) {
      state.couponCode = '';
      state.appliedCoupon = null;
      saveCoupon(state.couponCode, state.appliedCoupon);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  clearCart,
  addManyToCart,
  setCouponCode,
  setAppliedCoupon,
  clearCouponAction,
} = cartSlice.actions;

export default cartSlice.reducer;
