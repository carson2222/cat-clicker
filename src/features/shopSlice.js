import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  activePage: "upgrades",
  upgrades: [
    {
      id: "1",
      type: "upgrade",
      title: "Upgrade 1",
      description: "upgrade 1 bla bla bla",
      initPrice: 1,
      level: 0,
      bonus: "click multiplayer",
      price: null,
      bonus: null,
    },
  ],
  items: [
    {
      id: "1",
      type: "item",
      title: "Item 1",
      description: "item 1 bla bla bla",
      price: 1,
      bonus: "click multiplayer",
      purchased: false,
    },
  ],
  quests: [
    {
      id: "1",
      title: "Quest 1",
      description: "quest 1 bla bla bla",
      award: "100 Fish",
      finished: false,
      trackingFun: null,
    },
  ],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    upgradesCalc: (state) => {
      state.upgrades.map((el) => {
        el.price = el.initPrice + el.initPrice * el.level;
        el.bonus = 1 + el.level * 0.1;
      });
    },
  },
});
export const { setActivePage, upgradesCalc } = shopSlice.actions;
export default shopSlice.reducer;
