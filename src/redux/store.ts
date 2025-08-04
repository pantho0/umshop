import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/auth/authSlice";
import wishlistReducer from "./features/wishListSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth", "wishlist"],
};

const allPersistedReducer = persistReducer(
  persistConfig,
  rootReducer
) as unknown as typeof rootReducer;

export const store = configureStore({
  reducer: {
    persisted: allPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
