import { useDispatch, useSelector } from "react-redux";
import {
  addItemAmount,
  addItemPosition,
  changeUpgradeAvailableStatus,
  setItemLevel,
  setItemPrice,
  setMaxPages,
  setPage,
  setUpgradePurchased,
  updateMoneyAndXp,
} from "../features/gameSlice";
import { itemsData, upgradesData } from "../shopData";
import notify from "../toastify";
import random from "random";

function useShop() {
  const upgrades = useSelector((state) => state.game.upgrades);
  const items = useSelector((state) => state.game.items);
  const page = useSelector((state) => state.game.page);
  // const quests = useSelector((state) => state.game.quests);
  const maxPages = useSelector((state) => state.game.maxPages);
  const money = useSelector((state) => state.game.money);
  const dispatch = useDispatch();
  function calcItemsLevel() {
    for (const [itemId, upgradesStatus] of Object.entries(upgrades)) {
      let newLevel = 0;

      for (const [_, purchaseStatus] of Object.entries(upgradesStatus)) {
        if (purchaseStatus) newLevel++;
      }

      if (newLevel !== items[itemId].level) {
        dispatch(setItemLevel({ itemId, newLevel }));
      }
    }
  }
  function calcItemsPrice() {
    itemsData.forEach((el) => {
      let newPrice = +el.initPrice;
      const itemStatus = items[el.itemId];
      if (itemStatus.amount > 0) {
        newPrice = +(el.initPrice * Math.pow(1.25, itemStatus.amount)).toFixed(0);
      }
      if (+itemStatus.price === +newPrice) return;
      dispatch(setItemPrice({ itemId: el.itemId, newPrice }));
    });
  }

  function resetPages() {
    dispatch(setPage(1));
  }
  function calcMaxPages(type) {
    let newMaxPages;
    if (type === "items") newMaxPages = Math.ceil(itemsData.length / 4);

    if (type === "upgrades") {
      let availableUpgrades = 0;
      for (const [key, value] of Object.entries(upgrades)) {
        console.log(value);
        if (Object.values(value).available) {
          availableUpgrades += 1;
        }
      }
      newMaxPages = Math.ceil(availableUpgrades / 4);
      console.log(newMaxPages);
    }
    dispatch(setMaxPages(newMaxPages));
  }
  function changePage(amount) {
    let newPage = +page + amount;
    if (newPage !== 0 && newPage <= maxPages) {
      dispatch(setPage(newPage));
    }
  }

  function buyItem(itemId) {
    const thisItemStatus = items[itemId];
    const thisItemData = itemsData.find((el) => el.itemId === itemId);

    if (money < thisItemStatus.price) {
      notify("error", "You can't afford it 😢", 100);
    } else {
      dispatch(updateMoneyAndXp({ money: -thisItemStatus.price }));
      dispatch(addItemAmount(itemId));
      const thisTop = thisItemData.baseTop + random.int(0, 6);
      const thisLeft = thisItemData.baseLeft + random.int(0, 6);
      dispatch(addItemPosition({ newTop: thisTop, newLeft: thisLeft, itemId }));
      notify("success", "Item successfully purchased 😎", 100);
    }
  }

  function buyUpgrade(itemId, upgradeId) {
    const thisUpgradeData = upgradesData[itemId][+upgradeId - 1];
    if (money < thisUpgradeData.price) {
      notify("error", "You can't afford it 😢", 100);
    } else {
      dispatch(updateMoneyAndXp({ money: -thisUpgradeData.price }));
      dispatch(setUpgradePurchased({ upgradeId, itemId }));
      dispatch(changeUpgradeAvailableStatus({ upgradeId: itemId, status: false }));

      notify("success", "Upgrade successfully purchased 😎", 100);
    }
  }

  function upgradeUnlocker() {
    const randomizer = random.int(1, 100);

    if (randomizer !== 1) return;
    const upgradeUnlock = random.int(0, itemsData.length - 1);
    const thisItemData = itemsData.find((el) => +el.id === upgradeUnlock);
    const thisItemStatus = items[thisItemData.itemId];
    if (thisItemStatus.amount > 0) {
      notify("default", "📈 You've just unlocked a new upgrade!", 5000);
      dispatch(changeUpgradeAvailableStatus({ upgradeId: thisItemData.itemId, status: true }));
    }
    console.log(upgradeUnlock);
  }
  return {
    buyItem,
    buyUpgrade,
    changePage,
    resetPages,
    calcItemsPrice,
    calcItemsLevel,
    items,
    upgrades,
    page,
    calcMaxPages,
    upgradeUnlocker,
    maxPages,
  };
}

export default useShop;
