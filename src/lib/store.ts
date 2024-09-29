// store.ts
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import metamaskReducer from "./features/metamask/metamaskSlice";
import searchReducer from "./features/search/searchSlice";

// Redux persist configuration for metamask state
const persistConfig = {
  key: "metamask",
  storage,
};

const persistedMetamaskReducer = persistReducer(persistConfig, metamaskReducer);

export const makeStore = () =>
  configureStore({
    reducer: {
      metamask: persistedMetamaskReducer, // Persisted metamask state
      search: searchReducer, // Non-persistent search state
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

// Types for state and dispatch
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
