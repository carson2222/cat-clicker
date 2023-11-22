import { createSlice } from "@reduxjs/toolkit";
import { notify } from "../toastify";

const initialState = {
  email: "null",
  money: 0,
  level: 0,
  xp: 0,
  activeSkin: null,
  autoClickPerSec: 0,
  moneyMultiplier: 1,
  xpMultiplier: 1,
  toNextLevel: 9999,
  page: 1,
  maxPages: 1,
  upgrades: {
    1: {
      level: 0,
      amount: 0,
      price: null,
    },
    2: {
      level: 0,
      amount: 0,
      price: null,
    },
    3: {
      level: 0,
      amount: 0,
      price: null,
    },
    4: {
      level: 0,
      amount: 0,
      price: null,
    },
    5: {
      level: 0,
      amount: 0,
      price: null,
    },
    6: {
      level: 0,
      amount: 0,
      price: null,
    },
  },
  skins: {
    1: true,
    2: false,
    3: false,
    4: false,
  },
  items: [
    {
      id: "1",
      type: "items",
      title: "Item 1",
      description: "item 1 bla bla bla",
      price: 1,
      bonus: "click multiplier",
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

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    loadNewData: (state, action) => {
      const newData = action.payload;

      state.email = newData.email;
      state.money = newData.money;
      state.level = newData.level;
      state.xp = newData.xp;
      state.autoClickPerSec = newData.autoClickPerSec;
      state.moneyMultiplier = newData.moneyMultiplier;
      state.xpMultiplier = newData.xpMultiplier;
      state.activeSkin = newData.activeSkin;
      state.upgrades = newData.upgrades;
      state.skins = newData.skins;
      // state.items = newData.items;
      // state.upgrades = upgradesData.map((el) => {
      //   return { ...el, level: newData.upgrades[`l${el.id}`] };
      // });
      // state.skins = skinsData.map((el) => {
      //   const test = { ...el, available: newData.skins[el.name] };
      //   console.log(test);
      //   return { ...el, available: newData.skins[el.name] };
      // });
      // state.items = itemsData;
    },
    setBonuses: (state, action) => {
      state.moneyMultiplier = action.payload.newMoneyMultiplier;
      state.xpMultiplier = action.payload.newXpMultiplier;
      state.autoClickPerSec = action.payload.newCps;
    },
    catClick: (state) => {
      state.money += 1 * state.moneyMultiplier;
      state.xp += 1 * state.xpMultiplier;
    },
    setToNextLevel: (state, action) => {
      state.toNextLevel = action.payload;
    },
    addLevel: (state) => {
      state.level += 1;
    },
    resetXp: (state) => {
      state.xp = 0;
    },
    updatePages: (state, action) => {
      state.maxPages = Math.ceil(state[action.payload].length / 4);
      state.page = 1;
    },
    setItemPrice: (state, action) => {
      const { upgradeId, newPrice } = action.payload;
      state.upgrades[upgradeId].price = newPrice;
    },

    updatePage: (state, action) => {
      if (
        state.page + action.payload !== 0 &&
        state.page + action.payload <= state.maxPages
      ) {
        state.page += action.payload;
      }
    },

    buyUpgrade: (state, action) => {
      const activeUpgrade = state.upgrades.find((x) => x.id === action.payload);
      if (state.money < activeUpgrade.price) {
        notify("error", "You can't afford it 😢", 100);
        return;
      }
      state.money -= activeUpgrade.price;
      activeUpgrade.level++;
      notify("success", "Item successfully purchased 😎", 100);
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    setActiveSkin: (state, action) => {
      const { type, skinsData } = action.payload;
      const skinObj = skinsData.find((el) => el.name === type);
      state.activeSkin = skinObj.path;
    },
    // TO DELETE, just for tests
    addMoney: (state) => {
      state.money += 999999;
    },
  },
});
export const {
  catClick,
  checkLevelUp,
  calcNextLevel,
  updatePages,
  updatePage,
  buyUpgrade,
  updateEmail,
  addMoney,
  loadNewData,
  setActiveSkin,
  addLevel,
  resetXp,
  setToNextLevel,
  setBonuses,
  setItemPrice,
} = gameSlice.actions;
export default gameSlice.reducer;
