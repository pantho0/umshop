/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  model: string;
  quantity: number;
}

const initialState: CartItem[] = [];

// Helper function to ensure we always return an array
export const getCartItems = (state: any): CartItem[] => {
  if (Array.isArray(state)) return state;
  if (state?.persisted.cart && Array.isArray(state.persisted.cart))
    return state.persisted.cart;
  return [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.find((item) => action.payload.id === item.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      return (state = []);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
