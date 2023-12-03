import { useDispatch, useSelector } from "react-redux";
import { setBonuses, updateMoney, updateXp } from "../features/gameSlice";
import { itemsData } from "../shopData";
import { useRef, useState } from "react";
function useClicker() {
  const dispatch = useDispatch();
  const moneyMultiplier = useSelector((state) => state.game.moneyMultiplier);
  const xpMultiplier = useSelector((state) => state.game.xpMultiplier);
  const level = useSelector((state) => state.game.level);
  const itemsStatus = useSelector((state) => state.game.items);

  const clickerDummy = useRef();
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
      const thisItemStatus = itemsStatus[element.itemId];
      newMoneyMultiplier += element.cm[thisItemStatus.level] * thisItemStatus.amount;
      newXpMultiplier += element.xpm[thisItemStatus.level] * thisItemStatus.amount;
      newCps += element.cps[thisItemStatus.level] * thisItemStatus.amount;
    });
    dispatch(setBonuses({ newMoneyMultiplier, newXpMultiplier, newCps }));
  }

  function updateDisplayItemsPosition(id, left, top) {
    const newDisplayItemsData = [];
    displayItemsData.forEach((el) => {
      if (el.id === id) {
        newDisplayItemsData.push({ ...el, left, top });
      } else {
        newDisplayItemsData.push({ ...el });
      }
    });
    setDisplayItemsData([...newDisplayItemsData]);
  }

  return {
    catClick,
    calcBonuses,
    updateDisplayItemsPosition,
    itemsStatus,
    displayItemsData,
    generateDisplayItems,
    itemsStatus,
    clickerDummy,
  };
}

export default useClicker;
