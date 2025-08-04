import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlist {
  id: string;
  name: string;
  slug: string;
  image: string;
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
      const customId = Math.random().toString(36).toLowerCase().substring(2);
      const newItem = { ...action.payload, customId };
      state.push(newItem);
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
