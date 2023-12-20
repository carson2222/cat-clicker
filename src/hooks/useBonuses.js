import { v4 as uuidv4 } from "uuid";
import random from "random";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../toastify";
import { updateMoneyAndXp } from "../features/gameSlice";
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

  useEffect(() => {
    timerId.current = setInterval(() => {
      const bonusRandom = random.int(0, BONNUS_DROP_CHANCES);

      if (bonusRandom === 0) {
        const bonusRandom = random.int(0, FISH_CHANCES + XP_CHANCES + POUCH_CHANCES - 1);
        let newBonus;
        if (bonusRandom >= 0 && bonusRandom < FISH_CHANCES) {
          // Fish
          newBonus = {
            type: "fish",
            id: uuidv4(),
            top: random.int(0, 100),
            left: random.int(0, 100),
            size: random.int(40, 75),
            amount: Math.floor(Math.pow(Math.random(), 2) * 20 * level) + 1 + level,
          };
        }
        if (bonusRandom >= FISH_CHANCES && bonusRandom < FISH_CHANCES + XP_CHANCES) {
          // XP
          newBonus = {
            type: "xp",
            id: uuidv4(),
            top: random.int(0, 100),
            left: random.int(0, 100),
            size: random.int(40, 75),
            amount: Math.floor(Math.pow(Math.random(), 2) * 30 * level) + 1 + level,
          };
        }
        if (bonusRandom >= FISH_CHANCES + XP_CHANCES && bonusRandom < FISH_CHANCES + XP_CHANCES + POUCH_CHANCES) {
          // Item
          newBonus = {
            type: "pouch",
            id: uuidv4(),
            top: random.int(0, 100),
            left: random.int(0, 100),
            bonus: "",
          };
        }
        setActiveBonuses((curr) => [...curr, newBonus]);
      }
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [level]);

  function hidePopup() {
    setIsPopupVisible(false);
  }

  function displayPopup() {
    setIsPopupVisible(true);
  }

  function deleteBonus(id) {
    const newActiveBonuses = (curr) => curr.filter((el) => el.id !== id);
    setActiveBonuses(newActiveBonuses);
  }

  function bonusClick(id) {
    const [thisBonus] = activeBonuses.filter((el) => el.id === id);
    switch (thisBonus.type) {
      case "xp":
        deleteBonus(id);
        notify("info", `Successfully received ${thisBonus.amount} xp`, 100);
        dispatch(updateMoneyAndXp({ xp: +thisBonus.amount }));
        break;
      case "fish":
        deleteBonus(id);
        notify("info", `Successfully received ${thisBonus.amount} Fish`, 100);
        dispatch(updateMoneyAndXp({ money: +thisBonus.amount }));
        break;
      case "pouch":
        deleteBonus(id);
        notify("info", `Successfully received POUCH`, 100);
        break;
      default:
        notify("error", `Unable to get the bonus`, 100);
        break;
    }
  }

  return { isPopupVisible, hidePopup, displayPopup, activeBonuses, bonusClick };
}

export default useBonuses;
