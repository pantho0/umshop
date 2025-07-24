/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  customId?: string;
  sku: string;
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
      const customId = Math.random().toString(36).toLowerCase().substring(2);
      const newItem = { ...action.payload, customId };
      state.push(newItem);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.customId !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.customId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.customId === action.payload);
      if (item) {
        item.quantity -= 1;
      }
    },
    clearCart: () => {
      return [];
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
