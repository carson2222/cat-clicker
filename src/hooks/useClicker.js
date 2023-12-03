import { useDispatch, useSelector } from "react-redux";
import { setBonuses, updateItemPosition, updateMoney, updateXp } from "../features/gameSlice";
import { itemsData } from "../shopData";
import { useRef, useState } from "react";
function useClicker() {
  const dispatch = useDispatch();
  const moneyMultiplier = useSelector((state) => state.game.moneyMultiplier);
  const xpMultiplier = useSelector((state) => state.game.xpMultiplier);
  const level = useSelector((state) => state.game.level);
  const itemsStatus = useSelector((state) => state.game.items);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const itemsCounter = useRef();
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

  function updateDisplayItemsPosition(id, left, top, itemId) {
    console.log(id, left, top, itemId);
    const dummyWidth = clickerDummy?.current?.offsetWidth;
    const dummyHeight = clickerDummy?.current?.offsetHeight;
    const newTop = (top * 100) / dummyHeight;
    const newLeft = (left * 100) / dummyWidth;
    dispatch(updateItemPosition({ newLeft, newTop, itemId, positionId: id }));
    // const newDisplayItemsData = [];
    // displayItemsData.forEach((el) => {
    //   if (el.id === id) {
    //     newDisplayItemsData.push({ ...el, left, top });
    //   } else {
    //     newDisplayItemsData.push({ ...el });
    //   }
    // });
    // setDisplayItemsData([...newDisplayItemsData]);
  }
  function generateItemsToDisplay() {
    itemsCounter.current = 0;
    const newItemsToDisplay = [];
    for (const [itemId, thisItemStatus] of Object.entries(itemsStatus)) {
      if (itemId !== "mainCat" && thisItemStatus.amount > 0) {
        const thisItemData = itemsData.filter((el) => el.itemId === itemId)[0];
        for (let i = 0; i < thisItemStatus.amount; i++) {
          itemsCounter.current += 1;

          const dummyWidth = clickerDummy?.current?.offsetWidth;
          const dummyHeight = clickerDummy?.current?.offsetHeight;
          console.log(thisItemStatus);
          const newItem = {
            key: itemsCounter.current,
            id: i,
            itemId: itemId,
            img: thisItemData.img,
            alt: `Item ${thisItemData.itemId}`,
            top: (dummyHeight * thisItemStatus.positions[i].top) / 100,
            left: (dummyWidth * thisItemStatus.positions[i].left) / 100,
            width: thisItemData.width,
            height: thisItemData.height,
          };
          newItemsToDisplay.push(newItem);
        }
      }
    }
    setItemsToDisplay([...newItemsToDisplay]);
  }

  return {
    catClick,
    calcBonuses,
    updateDisplayItemsPosition,
    itemsStatus,
    clickerDummy,
    generateItemsToDisplay,
    itemsToDisplay,
  };
}

export default useClicker;
