import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWishlist {
  id: string;
  customId?: string;
  name: string;
  image: string;
  color: string;
  model: string;
  price: number;
  oldPrice?: number;
  slug: string;
}

const initialState: IWishlist[] = [];

// Helper function to ensure we always return an array
export const getWishlistItems = (state: any): IWishlist[] => {
  if (Array.isArray(state)) return state;
  if (state?.persisted.wishlist && Array.isArray(state.persisted.wishlist))
    return state.persisted.wishlist;
  return [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IWishlist>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        const customId = action.payload.customId || Math.random().toString(36).toLowerCase().substring(2);
        const newItem = { ...action.payload, customId };
        state.push(newItem);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },

    clearWishlist: () => {
      return [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
