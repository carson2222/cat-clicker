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
    setItemPrice: (state, action) => {
      const { itemId, newPrice } = action.payload;
      state.items[itemId].price = newPrice;
    },
    addItemPosition: (state, action) => {
      const { newTop, newLeft, itemId } = action.payload;
      state.items[itemId].positions.push({ top: newTop, left: newLeft });
    },
    updateItemPosition: (state, action) => {
      const { newTop, newLeft, itemId, positionId } = action.payload;
      console.log(state.items[itemId]);
      state.items[itemId].positions[positionId] = { top: newTop, left: newLeft };
    },
    addItemAmount: (state, action) => {
      const itemId = action.payload;
      state.items[itemId].amount++;
    },
    setItemLevel: (state, action) => {
      const { itemId, newLevel } = action.payload;
      state.items[itemId].level = newLevel;
    },
    setActiveSkin: (state, action) => {
      state.activeSkin = action.payload;
    },
    setUpgradePurchased: (state, action) => {
      const { upgradeId, itemId } = action.payload;
      state.upgrades[itemId][upgradeId] = true;
    },
    activateSkin: (state, action) => {
      state.skins[action.payload] = true;
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
  setItemPrice,
  addItemAmount,
  setItemLevel,
  setUpgradePurchased,
  activateSkin,
  addItemPosition,
  updateItemPosition,
} = gameSlice.actions;
export default gameSlice.reducer;
