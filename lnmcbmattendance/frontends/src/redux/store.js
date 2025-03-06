import { configureStore } from "@reduxjs/toolkit";
import { apliSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [apliSlice.reducerPath]: apliSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apliSlice.middleware),
});
