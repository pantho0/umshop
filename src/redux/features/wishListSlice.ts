import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWishlist {
  id: string;
  name: string;
  image: string;

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
        state.push(action.payload);
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
