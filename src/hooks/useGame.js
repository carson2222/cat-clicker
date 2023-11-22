import { useDispatch, useSelector } from "react-redux";
import {
  addLevel,
  loadNewData,
  resetXp,
  setActiveSkin,
  setBonuses,
  setItemPrice,
  setToNextLevel,
  updateEmail,
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

  function calcBonuses() {
    let newMoneyMultiplier = 1;
    let newXpMultiplier = 1;
    let newCps = 0;

    // Levels
    newMoneyMultiplier += (game.level - 1) * 0.05;
    newXpMultiplier += (game.level - 1) * 0.05;

    // Upgrades - money & xp & cps
    upgradesData.forEach((element) => {
      const upgradeStatus = game.upgrades[+element.id];
      newMoneyMultiplier +=
        element.cm * upgradeStatus.level * upgradeStatus.amount;
      newXpMultiplier +=
        element.xpm * upgradeStatus.level * upgradeStatus.amount;
      newCps += element.cps * upgradeStatus.level * upgradeStatus.amount;
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
        })
        .eq("email", game.email);

      if (error) throw new Error(error);
      notify("success", "Game successfully saved");
    } catch (error) {
      console.error(error.message + "💥");
      notify("error", error.message + "💥");
    }
  }

  function changeSkin(e, type) {
    // TODO: change from class security to normal
    if (e.target.classList.contains(classes.locked)) return;
    dispatch(setActiveSkin({ type, skinsData }));
  }

  function calcUpgradesPrice() {
    upgradesData.forEach((el) => {
      let newPrice = el.initPrice;
      if (el.amount > 0) {
        newPrice = (el.initPrice * Math.pow(1.25, el.amount)).toFixed(0);
      }
      dispatch(setItemPrice({ upgradeId: el.id, newPrice }));
    });
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
  };
}
export default useGame;
