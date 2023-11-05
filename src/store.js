import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./features/shopSlice";
import profileReducer from "./features/profileSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    profile: profileReducer,
  },
});
