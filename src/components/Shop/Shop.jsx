import { Pagination } from "../Pagination/Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "../ShopItem/ShopItem";
import ShopNav from "../ShopNav/ShopNav";
import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { itemsData, upgradesData } from "../../shopData";
import useGame from "../../hooks/useGame";

function Shop() {
  const itemsStatus = useSelector((state) => state.game.items, shallowEqual);
  const upgradesStatus = useSelector(
    (state) => state.game.upgrades,
    shallowEqual
  );
  const quests = useSelector((state) => state.game.quests, shallowEqual);
  const page = useSelector((state) => state.game.page, shallowEqual);

  const [activeShop, setActiveShop] = useState("items");
  const inactiveUpgradesCounter = useRef(0);

  const {
    calcBonuses,
    calcItemsPrice,
    resetPages,
    buyItem,
    calcItemsLevel,
    buyUpgrade,
    newSkin,
  } = useGame();
  useEffect(() => {
    setActiveShop("items");
    calcUpgradesPrice();
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
    calcUpgradesLevel();
  }, [upgradesStatus]);

  return (
    <div className={classes.shop}>
      <ShopNav activeShop={activeShop} setActiveShop={setActiveShop} />

      <div className={classes.shop_main}>
        {activeShop === "items" &&
          itemsData.map((el) => {
            if (
              el.id <= page * 4 &&
              el.id > (page - 1) * 4 &&
              el.itemId !== "mainCat"
            ) {
              const thisItemStatus = itemsStatus[el.itemId];
              return (
                <ShopItem
                  key={el.id}
                  itemId={el.itemId}
                  type={el.type}
                  title={el.title}
                  content={el.description}
                  price={thisitemStatus.price}
                  btnContent={thisitemStatus.amount}
                  buyFun={() => buyItem(el.itemId)}
                />
              );
            }
          })}
        {activeShop === "upgrades" &&
          Object.entries(upgradesData).map(([key, el], i) => {
            let thisIndex = i - inactiveItemsCounter.current;
            if (thisIndex < page * 4 && thisIndex >= (page - 1) * 4) {
              const upgradesToBuy = el.filter(
                (el) => !upgradesStatus[key][el.id]
              )[0];
              if (!upgradesToBuy) {
                inactiveItemsCounter.current += 1;
                return;
              }
              return (
                <ShopItem
                  key={key}
                  upgradeId={upgradesToBuy.id}
                  itemId={upgradesToBuy.id}
                  type={upgradesToBuy.type}
                  title={upgradesToBuy.title}
                  content={upgradesToBuy.description}
                  price={upgradesToBuy.price}
                  btnContent="Buy"
                  buyFun={() => buyItem(key, upgradesToBuy.id)}
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
