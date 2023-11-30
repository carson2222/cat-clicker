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
  const itemsCounter = useRef(0);
  const [displayItemsData, setDisplayItemsData] = useState([]);
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
    const newDisplayItemsData = displayItemsData.map((el) => {
      if (el.id === id) {
        el.left = left;
        el.top = top;
      }
    });
    setDisplayItemsData([...newDisplayItemsData]);
  }
  function generateDisplayItems() {
    for (const [key, thisItemStatus] of Object.entries(itemsStatus)) {
      if (key === "mainCat") return;
      const thisItemData = itemsData.filter((el) => el.itemId === thisItemData.itemId);

      Array(thisItemStatus.amount)
        .fill(undefined)
        .map((_, i) => {
          itemsCounter.counter += 1;
          if (displayItemsData.current.length < itemsCounter) {
            const newItemDisplay = {
              id: itemsCounter.counter,
              img: thisItemData.img,
              alt: `Item ${thisItemData.itemId}`,
              top: thisItemStatus[i].top,
              left: thisItemStatus[i].left,
              width: thisItemData.width,
              height: thisItemData.height,
            };
            setDisplayItemsData([...displayItemsData, newItemDisplay]);
          }
        });
      itemsCounter.counter = 0;
    }
  }
  return {
    catClick,
    calcBonuses,
    displayItemsData,
    updateDisplayItemsPosition,
    generateDisplayItems,
    itemsStatus,
  };
}

export default useClicker;
