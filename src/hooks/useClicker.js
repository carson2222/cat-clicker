import { useDispatch, useSelector } from "react-redux";
import { setBonuses, updateItemPosition, updateMoneyAndXp } from "../features/gameSlice";
import { itemsData } from "../shopData";
import { useMemo, useRef, useState } from "react";
import random from "random";
function useClicker() {
  const dispatch = useDispatch();
  const moneyMultiplier = useSelector((state) => state.game.moneyMultiplier);
  const xpMultiplier = useSelector((state) => state.game.xpMultiplier);
  const level = useSelector((state) => state.game.level);
  const itemsStatus = useSelector((state) => state.game.items);
  const autoClickPerSec = useSelector((state) => state.game.autoClickPerSec);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [clickStreak, setClickStreak] = useState(0.9);
  const noclickSecondsCounter = useRef(0);
  const itemsCounter = useRef();
  const clickerDummy = useRef();

  const maxStreak = useSelector((state) => state.game.maxStreak);
  const streakBoostChance = useSelector((state) => state.game.streakBoostChance);

  const itemsDataMap = useMemo(() => {
    const map = {};
    itemsData.forEach((item) => {
      map[item.itemId] = item;
    });
    return map;
  }, []);

  function catClick() {
    const money = clickStreak > 1 ? moneyMultiplier * clickStreak : moneyMultiplier;
    const xp = clickStreak > 1 ? xpMultiplier * clickStreak : xpMultiplier;
    dispatch(updateMoneyAndXp({ money, xp }));
  }

  function calcBonuses() {
    let newMoneyMultiplier = 1;
    let newXpMultiplier = 1;
    let newCps = 0;
    let newMaxStreak = 1;

    newMoneyMultiplier += (level - 1) * 0.05;
    newXpMultiplier += (level - 1) * 0.05;

    itemsData.forEach((element) => {
      const thisItemStatus = itemsStatus[element.itemId];
      newMoneyMultiplier += element.cm[thisItemStatus.level] * thisItemStatus.amount;
      newXpMultiplier += element.xpm[thisItemStatus.level] * thisItemStatus.amount;
      newCps += element.cps[thisItemStatus.level] * thisItemStatus.amount;
      newMaxStreak += element.ms[thisItemStatus.level];
    });
    dispatch(setBonuses({ newMoneyMultiplier, newXpMultiplier, newCps, newMaxStreak }));
  }

  function updateDisplayItemsPosition(id, left, top, itemId) {
    const dummyWidth = clickerDummy?.current?.offsetWidth;
    const dummyHeight = clickerDummy?.current?.offsetHeight;
    if (dummyWidth && dummyHeight) {
      const newTop = (top * 100) / dummyHeight;
      const newLeft = (left * 100) / dummyWidth;
      dispatch(updateItemPosition({ newLeft, newTop, itemId, positionId: id }));
    }
  }

  function generateItemsToDisplay() {
    itemsCounter.current = 0;
    setItemsToDisplay((prevItemsToDisplay) => {
      const newItemsToDisplay = [...prevItemsToDisplay];
      for (const [itemId, thisItemStatus] of Object.entries(itemsStatus)) {
        if (itemId !== "mainCat" && itemId !== "maxStreak" && thisItemStatus.amount > 0) {
          const thisItemData = itemsDataMap[itemId];
          for (let i = 0; i < thisItemStatus.amount; i++) {
            itemsCounter.current += 1;
            const dummyWidth = clickerDummy?.current?.offsetWidth;
            const dummyHeight = clickerDummy?.current?.offsetHeight;
            const newTop = (dummyHeight * thisItemStatus.positions[i].top) / 100;
            const newLeft = (dummyWidth * thisItemStatus.positions[i].left) / 100;
            const thisDisplayedItemIndex = newItemsToDisplay.findIndex(
              (el) => el.itemId === itemId && el.id === i
            );
            // Generate if the item doesn't exist yet
            if (thisDisplayedItemIndex === -1) {
              const newItem = {
                key: itemsCounter.current,
                id: i,
                itemId: itemId,
                img: thisItemData.img,
                alt: `Item ${thisItemData.itemId}`,
                top: newTop,
                left: newLeft,
                width: thisItemData.width,
                height: thisItemData.height,
              };
              newItemsToDisplay.push(newItem);
            }
            // Change top/left if the item exist and have changed values
            else if (
              newItemsToDisplay[thisDisplayedItemIndex].top !== newTop ||
              newItemsToDisplay[thisDisplayedItemIndex].left !== newLeft
            ) {
              newItemsToDisplay[thisDisplayedItemIndex].top = newTop;
              newItemsToDisplay[thisDisplayedItemIndex].left = newLeft;
            }
          }
        }
      }
      return newItemsToDisplay;
    });
  }
  ////// Streak
  function addNoclickSecond() {
    noclickSecondsCounter.current += 1;
  }

  function checkIfBoostDisapear() {
    if (noclickSecondsCounter.current >= 5) {
      setClickStreak(0.9);
      noclickSecondsCounter.current = 0;
    }
  }

  function boostStreak(boostVal = 0.01) {
    setClickStreak((current) => {
      if (current < 1) {
        return current + boostVal;
      }
      if (current + boostVal < maxStreak) {
        const randomizer = random.int(1, 100);
        if (randomizer <= streakBoostChance) return current + boostVal;
        else return current;
      }
      return maxStreak;
    });
    noclickSecondsCounter.current = 0;
  }

  return {
    clickStreak,
    catClick,
    calcBonuses,
    updateDisplayItemsPosition,
    generateItemsToDisplay,
    itemsStatus,
    clickerDummy,
    itemsToDisplay,
    autoClickPerSec,
    boostStreak,
    checkIfBoostDisapear,
    addNoclickSecond,
    maxStreak,
  };
}

export default useClicker;
