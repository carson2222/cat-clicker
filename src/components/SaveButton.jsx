import React from "react";
import supabase from "../supabaseClient";
import { notify } from "../toastify";
import { useSelector } from "react-redux";
import classes from "./_colored-box.module.scss";

const SaveButton = () => {
  const game = useSelector((state) => state.game);
  async function handleSave() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          money: game.money.toFixed(2),
          level: game.level,
          xp: game.xp.toFixed(2),
          autoClickPerSec: game.autoClickPerSec,
          moneyMultiplier: game.moneyMultiplier,
          xpMultiplier: game.xpMultiplier,
          upgrades: Object.fromEntries(
            game.upgrades.map((el) => [`l${+el.id}`, el.level])
          ),
        })
        .eq("email", game.email);

      if (error) throw new Error(error);
      notify("success", "Game successfully saved");
    } catch (error) {
      console.error(error.message + "💥");
      notify("error", error.message + "💥");
    }
  }
  return (
    <button
      onClick={handleSave}
      className={`${classes.colorBox} ${classes.colorBox_btn} ${classes.colorBox_green}`}
      style={{ maxWidth: "6rem" }}
    >
      Save
    </button>
  );
};

export default SaveButton;
