import { createSlice } from "@reduxjs/toolkit";
import { notify } from "../toastify";

const initialState = {
  money: 999999,
  level: 1,
  xp: 0,
  autoClickPerSec: 0,
  moneyMultiplier: 1,
  xpMultiplier: 1,
  toNextLevel: 9999,
  value: 0,
  activeShop: "upgrades",
  page: 1,
  maxPages: 1,
  upgrades: [
    // {
    //   id: "1",
    //   type: "upgrades",
    //   title: "Money boost",
    //   description: "Each upgrade gives you + 0.05x FPC",
    //   initPrice: 1,
    //   price: null,
    //   level: 40,
    //   bonusType: "clickMultiplier",
    //   bonusPerLvl: 0.05,
    // },
    // {
    //   id: "2",
    //   type: "upgrades",
    //   title: "XP boost",
    //   description: "Each upgrade gives you + 0.05x XP ",
    //   initPrice: 100,
    //   price: null,
    //   level: 40,
    //   bonusType: "xpMultiplier",
    //   bonusPerLvl: 0.05,
    // },
    {
      id: "1",
      type: "upgrades",
      title: "Fishercat",
      description: "Each upgrade gives you + 0.05x CPS",
      initPrice: 20,
      price: null,
      level: 10,
      bonusType: "cps",
      bonusPerLvl: 0.05,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Builders",
      description: "Each upgrade gives you + 0.1x CPS ",
      initPrice: 100,
      price: null,
      level: 10,
      bonusType: "cps",
      bonusPerLvl: 0.1,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Cat house",
      description: "Each upgrade gives you + 0.25x CPS ",
      initPrice: 500,
      price: null,
      level: 10,
      bonusType: "cps",
      bonusPerLvl: 0.25,
    },
  ],
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

// delete:
for (let i = 2; i < 10; i++) {
  initialState.items.push({
    id: i,
    type: "item",
    title: `Item ${i}`,
    description: `item ${i} bla bla bla`,
    price: 1,
    bonus: "click multiplier",
    purchased: false,
  });
}
// localStorage.localState = { test: "test" };
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
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
    setActiveShop: (state, action) => {
      state.activeShop = action.payload;
      state.maxPages = Math.ceil(state[state.activeShop].length / 4);
      state.page = 1;
    },
    upgradesCalc: (state) => {
      state.upgrades.map((el) => {
        el.price = el.initPrice * Math.pow(el.level, 2);
      });
    },
    updatePage: (state, action) => {
      if (state.page + action.payload !== 0 && state.page + action.payload <= state.maxPages) {
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
  },
});
export const {
  catClick,
  bonusCounters,
  checkLevelUp,
  calcNextLevel,
  setActiveShop,
  upgradesCalc,
  updatePage,
  buyUpgrade,
} = gameSlice.actions;
export default gameSlice.reducer;
