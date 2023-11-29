import random from "random";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../toastify";
import { updateMoney, updateXp } from "../features/gameSlice";
const BONNUS_DROP_CHANCES = 100;
const FISH_CHANCES = 10;
const XP_CHANCES = 10;
const POUCH_CHANCES = 1;

function useBonuses() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activeBonuses, setActiveBonuses] = useState([]);
  const level = useSelector((state) => state.game.level);
  const timerId = useRef();
  const dispatch = useDispatch();

  // Random loot generator
  useEffect(() => {
    timerId.current = window.setInterval(() => {
      const bonusRandom = random.int(0, BONNUS_DROP_CHANCES);

      if (bonusRandom === 0) {
        const bonusRandom = random.int(
          0,
          FISH_CHANCES + XP_CHANCES + POUCH_CHANCES - 1
        );
        let newBonus;
        if (bonusRandom >= 0 && bonusRandom < FISH_CHANCES) {
          // Fish
          newBonus = {
            type: "fish",
            id: Date.now(),
            top: random.int(0, 100),
            left: random.int(0, 100),
            size: random.int(40, 75),
            amount:
              Math.floor(Math.pow(Math.random(), 2) * 20 * level) + 1 + level,
          };
        }
        if (
          bonusRandom >= FISH_CHANCES &&
          bonusRandom < FISH_CHANCES + XP_CHANCES
        ) {
          // XP
          newBonus = {
            type: "xp",
            id: Date.now(),
            top: random.int(0, 100),
            left: random.int(0, 100),
            size: random.int(40, 75),
            amount:
              Math.floor(Math.pow(Math.random(), 2) * 30 * level) + 1 + level,
          };
        }
        if (
          bonusRandom >= FISH_CHANCES + XP_CHANCES &&
          bonusRandom < FISH_CHANCES + XP_CHANCES + POUCH_CHANCES
        ) {
          // Item
          newBonus = {
            type: "pouch",
            id: Date.now(),
            top: random.int(0, 100),
            left: random.int(0, 100),
            bonus: "",
          };
        }
        setActiveBonuses((curr) => [...curr, newBonus]);
      }
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);
  function hidePopup() {
    setIsPopupVisible(false);
  }
  function displayPopup() {
    setIsPopupVisible(true);
  }

  function deleteBonus(id) {
    setActiveBonuses((curr) => curr.filter((el) => el.id !== id));
  }
  function bonusClick(id) {
    const [thisBonus] = activeBonuses.filter((el) => el.id === id);
    if (thisBonus.type === "xp") {
      deleteBonus(id);
      notify("info", `Successfully received ${thisBonus.amount} xp`, 100);
      dispatch(updateXp(+thisBonus.amount));
    } else if (thisBonus.type === "fish") {
      deleteBonus(id);
      notify("info", `Successfully received ${thisBonus.amount} Fish`, 100);
      dispatch(updateMoney(+thisBonus.amount));
    } else if (thisBonus.type === "pouch") {
      deleteBonus(id);
      notify("info", `Successfully received POUCH`, 100);
    } else {
      notify("error", `Unable to get the bonus`, 100);
    }
  }

  return { isPopupVisible, hidePopup, displayPopup, activeBonuses, bonusClick };
}
export default useBonuses;
