import random from "random";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../toastify";
import { updateMoney, updateXp } from "../features/gameSlice";
const DROP_CHANCES = 60;
function useBonuses() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activeBonuses, setActiveBonuses] = useState([]);
  const level = useSelector((state) => state.game.level);
  const timerId = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(activeBonuses);
  }, [activeBonuses]);
  // Random loot generator
  useEffect(() => {
    timerId.current = window.setInterval(() => {
      const bonusRandom = random.int(0, DROP_CHANCES);

      if (bonusRandom === 0) {
        console.log("bonus");
        const bonusRandom = random.int(0, 8);
        let newBonus;
        if (bonusRandom >= 0 && bonusRandom <= 3) {
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
        if (bonusRandom >= 4 && bonusRandom <= 7) {
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
        if (bonusRandom === 8) {
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
    console.log(thisBonus);
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
