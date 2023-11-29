import { useDispatch, useSelector } from "react-redux";
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
  setItemLevel,
  setUpgradePurchased,
  activeSkin,
} from "../features/gameSlice";
import { notify } from "../toastify";
import { upgradesData, itemsData } from "../shopData";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import skinsData from "../skinsData";
import { useEffect } from "react";

function useGame() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    changeSkin("white");
  });
  // Auth
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
          items: game.items,
          upgrades: game.upgrades,
          skins: game.skins,
        })
        .eq("email", game.email);

      if (error) throw new Error(error);
      notify("success", "Game successfully saved");
    } catch (error) {
      console.error(error.message + "💥");
      notify("error", error.message + "💥");
    }
  }
  // Main Clicker
  function catClick() {
    dispatch(updateMoney(1 * game.moneyMultiplier));
    dispatch(updateXp(1 * game.xpMultiplier));
  }

  function changeSkin(type) {
    const newActiveSkin = skinsData.find((el) => el.name === type);
    if (game.skins[newActiveSkin.id] && newActiveSkin.path !== game.activeSkin)
      dispatch(setActiveSkin(newActiveSkin.path));
  }
  function newSkin() {
    const newSkinId = +game.items.mainCat.level + 1;
    dispatch(activeSkin(newSkinId));
  }
  function calcBonuses() {
    let newMoneyMultiplier = 1;
    let newXpMultiplier = 1;
    let newCps = 0;

    newMoneyMultiplier += (game.level - 1) * 0.05;
    newXpMultiplier += (game.level - 1) * 0.05;

    itemsData.forEach((element) => {
      const itemStatus = game.items[element.itemId];
      newMoneyMultiplier += element.cm[itemStatus.level] * itemStatus.amount;
      newXpMultiplier += element.xpm[itemStatus.level] * itemStatus.amount;
      newCps += element.cps[itemStatus.level] * itemStatus.amount;
    });
    dispatch(setBonuses({ newMoneyMultiplier, newXpMultiplier, newCps }));
  }
  function levelUp() {
    if (+game.xp >= +game.toNextLevel) {
      dispatch(addLevel());
      dispatch(resetXp());
      notify("default", "Level UP! 😺");
    }
  }
  function calcToNextLevel() {
    const newToNextLevel = game.level * (game.level * 0.4) * 20;
    dispatch(setToNextLevel(newToNextLevel));
  }

  // Shop
  function calcItemsLevel() {
    for (const [itemId, upgradesStatus] of Object.entries(game.upgrades)) {
      let newLevel = 0;
      // TODO: Add a mainCat upgrade counter
      for (const [_, purchaseStatus] of Object.entries(upgradesStatus)) {
        if (purchaseStatus) newLevel++;
      }

      if (newLevel !== game.items[itemId].level) {
        dispatch(setItemLevel({ itemId, newLevel }));
      }
    }
  }
  function calcItemsPrice() {
    itemsData.forEach((el) => {
      let newPrice = el.initPrice;
      const itemStatus = game.items[el.itemId];
      if (itemStatus.amount > 0) {
        newPrice = (el.initPrice * Math.pow(1.25, itemStatus.amount)).toFixed(
          0
        );
      }
      if (itemStatus.price === newPrice) return;
      dispatch(setItemPrice({ itemId: el.itemId, newPrice }));
    });
  }

  function resetPages(type) {
    let newMaxPages;
    if (type === "items") newMaxPages = Math.ceil(itemsData.length / 4);
    if (type === "upgrades")
      newMaxPages = Math.ceil(Object.keys(upgradesData).length / 4);

    dispatch(setMaxPages(newMaxPages));
    dispatch(setPage(1));
  }
  function changePage(amount) {
    let newPage = +game.page + amount;
    if (newPage !== 0 && newPage <= game.maxPages) {
      dispatch(setPage(newPage));
    }
  }

  function buyItem(itemId) {
    const thisItemStatus = game.items[itemId];
    if (game.money < thisItemStatus.price) {
      notify("error", "You can't afford it 😢", 100);
    } else {
      dispatch(updateMoney(-thisItemStatus.price));
      dispatch(addItemAmount(itemId));
      notify("success", "Item successfully purchased 😎", 100);
    }
  }
  function buyUpgrade(itemId, upgradeId) {
    const thisUpgradeData = upgradesData[itemId][+upgradeId - 1];
    if (game.money < thisUpgradeData.price) {
      notify("error", "You can't afford it 😢", 100);
    } else {
      dispatch(updateMoney(-thisUpgradeData.price));
      dispatch(setUpgradePurchased({ upgradeId, itemId }));
      notify("success", "Upgrade successfully purchased 😎", 100);
    }
  }

  return {
    levelUp,
    calcToNextLevel,
    calcBonuses,
    saveGame,
    singUp,
    logIn,
    changeSkin,
    calcItemsPrice,
    resetPages,
    changePage,
    catClick,
    calcItemsLevel,
    newSkin,
    buyItem,
    buyUpgrade,
  };
}
export default useGame;
