import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  money: 0,
  level: 1,
  xp: 0,
  moneyMultiplier: 1,
  xpMultiplier: 1,
  toNextLevel: 9999,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    catClick: (state) => {
      state.money += 1 * state.moneyMultiplier;
      state.xp += 1 * state.xpMultiplier;
    },
    updateMultipliers: (state) => {
      state.moneyMultiplier = 1 + (state.level - 1) * 0.1;
      state.xpMultiplier = 1 + (state.level - 1) * 0.1;
    },
    calcNextLevel: (state) => {
      state.toNextLevel = state.level * (state.level * 0.7) * 20;
    },
    checkLevelUp: (state) => {
      if (+state.xp < +state.toNextLevel) {
        return;
      }
      state.level++;
      state.xp = 0;
    },
  },
});
export const { catClick, updateMultipliers, checkLevelUp, calcNextLevel } = profileSlice.actions;
export default profileSlice.reducer;
