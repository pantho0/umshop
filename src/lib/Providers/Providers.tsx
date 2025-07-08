"use client";
import { store } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  // Use useRef to maintain a stable reference to the persistor
  const persistorRef = useRef(persistor);

  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors duration={2000} />
      <PersistGate loading={null} persistor={persistorRef.current}>
        {() => children}
      </PersistGate>
    </Provider>
  );
};
