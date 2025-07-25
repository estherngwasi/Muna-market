const API_URL = import.meta.env.VITE_API_URL || '';
import { createSlice } from '@reduxjs/toolkit';

const cartFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const initialState = {
  items: cartFromStorage,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.items.find((x) => x.product === item.product);
      if (exist) {
        state.items = state.items.map((x) =>
          x.product === item.product ? { ...x, quantity: x.quantity + item.quantity } : x
        );
      } else {
        state.items.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.product !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 
