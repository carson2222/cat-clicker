import { Pagination } from "./Pagination/Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "./ShopItem/ShopItem";
import ShopNav from "./ShopNav/ShopNav";
import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { itemsData, upgradesData } from "../shopData";
import useGame from "../hooks/useGame";

function Shop() {
  const upgradesStatus = useSelector(
    (state) => state.game.upgrades,
    shallowEqual
  );
  // const items = useSelector((state) => state.game.items, shallowEqual);
  const itemsStatus = useSelector((state) => state.game.items, shallowEqual);
  const quests = useSelector((state) => state.game.quests, shallowEqual);
  const page = useSelector((state) => state.game.page, shallowEqual);

  const [activeShop, setActiveShop] = useState("upgrades");
  const inactiveItemsCounter = useRef(0);

  const {
    calcBonuses,
    calcUpgradesPrice,
    resetPages,
    buyUpgrade,
    calcUpgradesLevel,
    buyItem,
    newSkin,
  } = useGame();

  // function updateActiveItems() {
  //   let newActiveItems = { ...activeItems };
  //   for (const [key, value] of Object.entries(itemsStatus)) {
  //     console.log(value);
  //     let itemsToBuy = Object.values(value).filter((el) => el === false);
  //     newActiveItems[key] = itemsToBuy[0];
  //   }
  //   setActiveItems({ ...newActiveItems });
  // }

  useEffect(() => {
    setActiveShop("upgrades");
    calcUpgradesPrice();
    // updateActiveItems();
    calcUpgradesLevel();
  }, []);
  useEffect(() => {
    resetPages(activeShop);
  }, [activeShop]);
  useEffect(() => {
    calcBonuses();
    calcUpgradesPrice();
    newSkin();
  }, [upgradesStatus, itemsStatus, quests]);
  useEffect(() => {
    // updateActiveItems();
    calcUpgradesLevel();
  }, [itemsStatus]);

  return (
    <div className={classes.shop}>
      <ShopNav activeShop={activeShop} setActiveShop={setActiveShop} />

      <div className={classes.shop_main}>
        {activeShop === "upgrades" &&
          upgradesData.map((el) => {
            if (
              el.id <= page * 4 &&
              el.id > (page - 1) * 4 &&
              el.upgradeId !== "mainCat"
            ) {
              const thisUpgradeStatus = upgradesStatus[el.upgradeId];
              return (
                <ShopItem
                  key={el.id}
                  upgradeId={el.upgradeId}
                  type={el.type}
                  title={el.title}
                  content={el.description}
                  price={thisUpgradeStatus.price}
                  btnContent={thisUpgradeStatus.amount}
                  buyFun={() => buyUpgrade(el.upgradeId)}
                />
              );
            }
          })}
        {activeShop === "items" &&
          Object.entries(itemsData).map(([key, el], i) => {
            let thisIndex = i - inactiveItemsCounter.current;
            if (thisIndex < page * 4 && thisIndex >= (page - 1) * 4) {
              const itemsToBuy = el.filter((el) => !itemsStatus[key][el.id])[0];
              if (!itemsToBuy) {
                inactiveItemsCounter.current += 1;
                return;
              }
              return (
                <ShopItem
                  key={key}
                  upgradeId={itemsToBuy.id}
                  itemId={itemsToBuy.id}
                  type={itemsToBuy.type}
                  title={itemsToBuy.title}
                  content={itemsToBuy.description}
                  price={itemsToBuy.price}
                  btnContent="Buy"
                  buyFun={() => buyItem(key, itemsToBuy.id)}
                />
              );
            }
          })}
      </div>
      <Pagination />
    </div>
  );
}
export default Shop;
