import { createSlice } from '@reduxjs/toolkit';
import { Product, CartItem } from '@/store/types';

const loadCart = () => {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};

const saveCart = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

const initialState = {
  items: loadCart() as {
    product: Product;
    quantity: number;
  }[],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
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

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      saveCart(state.items);
    },

    changeQuantity(state, action) {
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
    },

    addManyToCart: (state, action) => {
      action.payload.forEach((item: CartItem) => {
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
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart, addManyToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
