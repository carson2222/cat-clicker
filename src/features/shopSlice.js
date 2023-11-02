import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  activePage: "upgrades",
  active: {
    upgrades: {},
    items: {},
    quests: {},
  },
  done: {
    upgrades: {},
    items: {},
    quests: {},
  },
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = shopSlice.actions;
export default shopSlice.reducer;
