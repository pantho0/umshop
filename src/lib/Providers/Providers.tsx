"use client";
import { store } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";

export const Providers = ({ children }: { children: ReactNode }) => {
  // Use useRef to maintain a stable reference to the persistor
  const persistorRef = useRef(persistor);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {() => children}
      </PersistGate>
    </Provider>
  );
};
