"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  // Use useRef to maintain a stable reference to the persistor

  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors duration={2000} />
      <PersistGate loading={null} persistor={persistor}>
        {() => children}
      </PersistGate>
    </Provider>
  );
};
