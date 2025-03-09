import { configureStore } from "@reduxjs/toolkit";
import { apliSlice } from "./apiSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    [apliSlice.reducerPath]: apliSlice.reducer,
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apliSlice.middleware),
});
