"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { makeStore } from "../lib/store";
import { HashLoader } from "react-spinners";

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storeRef = useRef(makeStore());

  setupListeners(storeRef.current.dispatch);

  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={
          <div className="flex justify-center items-center h-screen">
            <HashLoader size={16} color="#dd1818" />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
