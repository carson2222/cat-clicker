import supabase from "../supabaseClient";
import notify from "../toastify";
import { useSelector } from "react-redux";
function useSave() {
  const game = useSelector((state) => state.game);
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
          maxStreak: game.maxStreak,
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

  return { saveGame };
}
export default useSave;
