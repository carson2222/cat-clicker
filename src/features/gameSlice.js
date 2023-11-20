import { createSlice } from "@reduxjs/toolkit";
import { notify } from "../toastify";
import { actionTypes } from "redux-localstorage";
import skinsData from "../skinsData";

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
      const { newData, upgradesData, skinsData } = action.payload;

      state.email = newData.email;
      state.money = newData.money;
      state.level = newData.level;
      state.xp = newData.xp;
      state.autoClickPerSec = newData.autoClickPerSec;
      state.moneyMultiplier = newData.moneyMultiplier;
      state.xpMultiplier = newData.xpMultiplier;
      state.activeSkin = newData.activeSkin;
      state.upgrades = upgradesData.map((el) => {
        return { ...el, level: newData.upgrades[`l${el.id}`] };
      });
      state.skins = skinsData.map((el) => {
        const test = { ...el, available: newData.skins[el.name] };
        console.log(test);
        return { ...el, available: newData.skins[el.name] };
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
        if (el.level === 0) {
          el.price = el.initPrice;
        }
        if (el.level > 0) {
          el.price = (el.initPrice * Math.pow(1.25, el.level)).toFixed(0);
        }
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
  setActiveSkin,
} = gameSlice.actions;
export default gameSlice.reducer;
