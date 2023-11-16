import { createSlice } from "@reduxjs/toolkit";
import { notify } from "../toastify";

const initialState = {
  email: "null",
  money: 0,
  level: 0,
  xp: 0,
  autoClickPerSec: 0,
  moneyMultiplier: 1,
  xpMultiplier: 1,
  toNextLevel: 9999,
  page: 1,
  maxPages: 1,

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
    loadData: (state, action) => {
      const { newData, upgradesData } = action.payload;

      state.email = newData.email;
      state.money = newData.money;
      state.level = newData.level;
      state.xp = newData.xp;
      state.autoClickPerSec = newData.autoClickPerSec;
      state.moneyMultiplier = newData.moneyMultiplier;
      state.xpMultiplier = newData.xpMultiplier;
      state.upgrades = upgradesData.map((el) => {
        return { ...el, level: newData.upgrades[`l${el.id}`] };
      });
      // add quests, items
    },
    catClick: (state) => {
      state.money += 1 * state.moneyMultiplier;
      state.xp += 1 * state.xpMultiplier;
    },
    calcNextLevel: (state) => {
      state.toNextLevel = state.level * (state.level * 0.7) * 20;
    },
    checkLevelUp: (state) => {
      if (+state.xp >= +state.toNextLevel) {
        state.level++;
        state.xp = 0;
        notify("default", "Level UP! 😺");
      }
    },
    updateActiveShop: (state, action) => {
      state.maxPages = Math.ceil(state[action.payload].length / 4);
      state.page = 1;
    },
    upgradesCalc: (state) => {
      state.upgrades.map((el) => {
        el.price = el.initPrice * Math.pow(el.level, 2) + el.initPrice;
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

    bonusCounters: (state) => {
      let newMoneyMultiplier = 1;
      let newXpMultiplier = 1;
      let newCps = 0;

      // Levels
      newMoneyMultiplier += (state.level - 1) * 0.05;
      newXpMultiplier += (state.level - 1) * 0.05;

      // Upgrades - money & xp & cps
      state.upgrades.map((element) => {
        if (element.bonusType === "clickMultiplier") {
          newMoneyMultiplier += element.bonusPerLvl * element.level;
        }
        if (element.bonusType === "xpMultiplier") {
          newXpMultiplier += element.bonusPerLvl * element.level;
        }
        if (element.bonusType === "cps") {
          newCps += element.bonusPerLvl * element.level;
        }
      }, 0);

      // Assign new values
      state.moneyMultiplier = newMoneyMultiplier;
      state.xpMultiplier = newXpMultiplier;
      state.autoClickPerSec = newCps;
    },
    buyUpgrade: (state, action) => {
      const activeUpgrade = state.upgrades.find((x) => x.id === action.payload);
      if (state.money < activeUpgrade.price) {
        notify("error", "You can't afford it 😢", 1000);
        return;
      }
      state.money -= activeUpgrade.price;
      activeUpgrade.level++;
      notify("success", "Item successfully purchased 😎", 1000);
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },

    // TO DELETE, just for tests
    addMoney: (state) => {
      state.money += 999999;
    },
  },
});
export const {
  catClick,
  bonusCounters,
  checkLevelUp,
  calcNextLevel,
  updateActiveShop,
  upgradesCalc,
  updatePage,
  buyUpgrade,
  updateEmail,
  addMoney,
  loadData,
} = gameSlice.actions;
export default gameSlice.reducer;
