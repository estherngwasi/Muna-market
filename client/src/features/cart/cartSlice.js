import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || '';

// Example async thunk for fetching cart from backend (if you have such an endpoint)
// export const fetchCart = createAsyncThunk(
//   'cart/fetchCart',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/api/cart`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to fetch cart');
//     }
//   }
// );

const initialState = {
  items: [],
  loading: false,
  error: null,
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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCart.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchCart.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.items = action.payload;
  //     })
  //     .addCase(fetchCart.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 
