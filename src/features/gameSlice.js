import { createSlice } from "@reduxjs/toolkit";

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
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
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
      state.items = newData.items;
    },
    setBonuses: (state, action) => {
      state.moneyMultiplier = action.payload.newMoneyMultiplier;
      state.xpMultiplier = action.payload.newXpMultiplier;
      state.autoClickPerSec = action.payload.newCps;
    },
    updateMoney: (state, action) => {
      state.money += action.payload;
    },
    updateXp: (state, action) => {
      state.xp += action.payload;
    },
    resetXp: (state) => {
      state.xp = 0;
    },
    setToNextLevel: (state, action) => {
      state.toNextLevel = action.payload;
    },
    addLevel: (state) => {
      state.level += 1;
    },

    setMaxPages: (state, action) => {
      state.maxPages = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setUpgradePrice: (state, action) => {
      const { upgradeId, newPrice } = action.payload;
      state.upgrades[upgradeId].price = newPrice;
    },
    addUpgradeAmount: (state, action) => {
      const upgradeId = action.payload;
      state.upgrades[upgradeId].amount++;
    },
    setUpgradeLevel: (state, action) => {
      const { upgradeId, newLevel } = action.payload;
      console.log(upgradeId, newLevel);
      state.upgrades[upgradeId].level = newLevel;
    },
    setActiveSkin: (state, action) => {
      state.activeSkin = action.payload;
    },

    // TO DELETE, just for tests
    addMoney: (state) => {
      state.money += 999999;
    },
  },
});
export const {
  updateEmail,
  addMoney,
  loadNewData,
  setActiveSkin,
  addLevel,
  resetXp,
  setToNextLevel,
  setBonuses,
  setMaxPages,
  setPage,
  updateMoney,
  updateXp,
  setUpgradePrice,
  addUpgradeAmount,
  setUpgradeLevel,
} = gameSlice.actions;
export default gameSlice.reducer;
