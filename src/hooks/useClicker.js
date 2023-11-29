import { useDispatch, useSelector } from "react-redux";
import {
  addLevel,
  resetXp,
  setBonuses,
  setToNextLevel,
  updateMoney,
  updateXp,
} from "../features/gameSlice";
import { itemsData } from "../shopData";
import { notify } from "../toastify";
function useClicker() {
  const dispatch = useDispatch();
  const moneyMultiplier = useSelector((state) => state.game.moneyMultiplier);
  const xpMultiplier = useSelector((state) => state.game.xpMultiplier);
  const level = useSelector((state) => state.game.level);
  const items = useSelector((state) => state.game.items);
  const xp = useSelector((state) => state.game.xp);
  const toNextLevel = useSelector((state) => state.game.toNextLevel);

  function catClick() {
    dispatch(updateMoney(1 * moneyMultiplier));
    dispatch(updateXp(1 * xpMultiplier));
  }

  function calcBonuses() {
    let newMoneyMultiplier = 1;
    let newXpMultiplier = 1;
    let newCps = 0;

    newMoneyMultiplier += (level - 1) * 0.05;
    newXpMultiplier += (level - 1) * 0.05;

    itemsData.forEach((element) => {
      const itemStatus = items[element.itemId];
      newMoneyMultiplier += element.cm[itemStatus.level] * itemStatus.amount;
      newXpMultiplier += element.xpm[itemStatus.level] * itemStatus.amount;
      newCps += element.cps[itemStatus.level] * itemStatus.amount;
    });
    dispatch(setBonuses({ newMoneyMultiplier, newXpMultiplier, newCps }));
  }
  function levelUp() {
    if (+xp >= +toNextLevel) {
      dispatch(addLevel());
      dispatch(resetXp());
      notify("default", "Level UP! 😺");
    }
  }
  function calcToNextLevel() {
    const newToNextLevel = level * (level * 0.4) * 20;
    dispatch(setToNextLevel(newToNextLevel));
  }
  return {
    catClick,
    calcBonuses,
    levelUp,
    calcToNextLevel,
  };
}

export default useClicker;
