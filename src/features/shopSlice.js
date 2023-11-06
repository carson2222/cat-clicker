import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  activeShop: "upgrades",
  page: 1,
  maxPages: 1,
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
    {
      id: "2",
      type: "upgrade",
      title: "Upgrade 1",
      description: "upgrade 1 bla bla bla",
      initPrice: 1,
      level: 0,
      bonus: "click multiplayer",
      price: null,
      bonus: null,
    },
    {
      id: "3",
      type: "upgrade",
      title: "Upgrade 1",
      description: "upgrade 1 bla bla bla",
      initPrice: 1,
      level: 0,
      bonus: "click multiplayer",
      price: null,
      bonus: null,
    },
    {
      id: "4",
      type: "upgrade",
      title: "Upgrade 1",
      description: "upgrade 1 bla bla bla",
      initPrice: 1,
      level: 0,
      bonus: "click multiplayer",
      price: null,
      bonus: null,
    },
    {
      id: "5",
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
    setActiveShop: (state, action) => {
      state.activeShop = action.payload;
      state.maxPages = Math.ceil(state[state.activeShop].length / 4);
      state.page = 1;
    },
    upgradesCalc: (state) => {
      state.upgrades.map((el) => {
        el.price = el.initPrice + el.initPrice * el.level;
        el.bonus = 1 + el.level * 0.1;
      });
    },
    updatePage: (state, action) => {
      if (
        state.page + action.payload !== 0 &&
        state.page + action.payload <= state.maxPages
      ) {
        state.page += action.payload;
      }
    },
  },
});
export const { setActiveShop, upgradesCalc, updatePage } = shopSlice.actions;
export default shopSlice.reducer;
