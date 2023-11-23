import { useDispatch, useSelector } from "react-redux";
import { diff } from "just-diff";
import {
  addLevel,
  loadNewData,
  resetXp,
  setActiveSkin,
  setBonuses,
  setItemPrice,
  setMaxPages,
  setPage,
  setToNextLevel,
  updateEmail,
  updateMoney,
  addItemAmount,
  updateXp,
} from "../features/gameSlice";
import { notify } from "../toastify";
import { upgradesData, itemsData } from "../shopData";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import skinsData from "../skinsData";

function useGame() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function levelUp() {
    if (+game.xp >= +game.toNextLevel) {
      dispatch(addLevel());
      dispatch(resetXp());
      notify("default", "Level UP! 😺");
    }
  }
  function calcToNextLevel() {
    const newToNextLevel = game.level * (game.level * 0.7) * 20;
    dispatch(setToNextLevel(newToNextLevel));
  }

  function calcItemLevels() {
    // Diff checker

    for (const [upgradeId, itemsStatus] of Object.entries(game.items)) {
      let newLevel = 0;
      console.log(upgradeId, itemsStatus);
      for (const [_, purchaseStatus] of Object.entries(game.items)) {
        if (purchaseStatus) newLevel++;
      }

      if (newLevel !== game.upgrades) {
      }
    }
  }
  function calcBonuses() {
    let newMoneyMultiplier = 1;
    let newXpMultiplier = 1;
    let newCps = 0;

    // Levels
    newMoneyMultiplier += (game.level - 1) * 0.05;
    newXpMultiplier += (game.level - 1) * 0.05;

    // Upgrades - money & xp & cps
    upgradesData.forEach((element) => {
      const upgradeStatus = game.upgrades[element.upgradeId];
      console.log(game.upgrades);
      newMoneyMultiplier +=
        element.cm[upgradeStatus.level] * upgradeStatus.amount;
      newXpMultiplier +=
        element.xpm[upgradeStatus.level] * upgradeStatus.amount;
      newCps += element.cps[upgradeStatus.level] * upgradeStatus.amount;
    });

    // Set new data
    dispatch(setBonuses({ newMoneyMultiplier, newXpMultiplier, newCps }));
  }

  async function singUp(e, email, password) {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error("Data is missing");

      const { error } = await supabase.auth.signUp({ email, password });

      if (error) throw new Error(error);
      else {
        notify("success", "Account created");
        dispatch(updateEmail(email));

        const { data, error } = await supabase
          .from("profiles")
          .insert([{ email }])
          .select();
        if (error) throw new Error(error);
        dispatch(loadNewData(data[0]));
        navigate("/game");
      }
    } catch (error) {
      notify("error", error.message + "💥");
      console.error(error.message + "💥");
    }
  }
  async function logIn(e, email, password) {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error("Data is missing");

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error);
      else {
        notify("success", "Logged in");
        dispatch(updateEmail(email));
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("email", email);

        if (error) throw new Error(error);
        dispatch(loadNewData(data[0]));
        navigate("/game");
      }
    } catch (error) {
      notify("error", error.message + "💥");
      console.error(error.message + "💥");
    }
  }
  async function saveGame() {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          money: game.money.toFixed(2),
          level: game.level,
          xp: game.xp.toFixed(2),
          autoClickPerSec: game.autoClickPerSec,
          moneyMultiplier: game.moneyMultiplier,
          xpMultiplier: game.xpMultiplier,
          activeSkin: game.activeSkin,
          upgrades: game.upgrades,
          skins: game.skins,
          items: game.items,
        })
        .eq("email", game.email);

      if (error) throw new Error(error);
      notify("success", "Game successfully saved");
    } catch (error) {
      console.error(error.message + "💥");
      notify("error", error.message + "💥");
    }
  }

  function calcUpgradesPrice() {
    upgradesData.forEach((el) => {
      let newPrice = el.initPrice;
      if (el.amount > 0) {
        newPrice = (el.initPrice * Math.pow(1.25, el.amount)).toFixed(0);
      }
      if (game.upgrades[el.upgradeId].price === newPrice) return;
      dispatch(setItemPrice({ upgradeId: el.id, newPrice }));
    });
  }

  function resetPages(type) {
    let newMaxPages;
    if (type === "upgrades") newMaxPages = Math.ceil(upgradesData.length / 4);
    if (type === "items") newMaxPages = Math.ceil(itemsData.length / 4);

    dispatch(setMaxPages(newMaxPages));
    dispatch(setPage(1));
  }
  function changePage(amount) {
    let newPage = +game.page + amount;
    if (newPage !== 0 && newPage <= game.maxPages) {
      dispatch(setPage(newPage));
    }
  }

  function buyUpgrade(upgradeId) {
    const thisUpgradeStatus = game.upgrades[upgradeId];
    if (game.money < thisUpgradeStatus.price) {
      notify("error", "You can't afford it 😢", 100);
    } else {
      dispatch(updateMoney(-thisUpgradeStatus.price));
      dispatch(addItemAmount());
      notify("success", "Item successfully purchased 😎", 100);
    }
  }

  function changeSkin(type) {
    const newActiveSkin = skinsData.find((el) => el.name === type);
    if (game.skins[newActiveSkin.id] && newActiveSkin.path !== game.activeSkin)
      dispatch(setActiveSkin(newActiveSkin.path));
  }

  function catClick() {
    dispatch(updateMoney(1 * game.moneyMultiplier));
    dispatch(updateXp(1 * game.xpMultiplier));
  }
  return {
    levelUp,
    calcToNextLevel,
    calcBonuses,
    saveGame,
    singUp,
    logIn,
    changeSkin,
    calcUpgradesPrice,
    resetPages,
    changePage,
    buyUpgrade,
    catClick,
    calcItemLevels,
  };
}
export default useGame;
