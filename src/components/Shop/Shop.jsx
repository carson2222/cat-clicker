import { Pagination } from "../Pagination/Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "../ShopItem/ShopItem";
import ShopNav from "../ShopNav/ShopNav";
import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { itemsData, upgradesData } from "../../shopData";
import useSkinSelector from "../../hooks/useSkinSelector";
import useShop from "../../hooks/useShop";
import useClicker from "../../hooks/useClicker";

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

  const { calcItemsPrice, resetPages, buyItem, buyUpgrade, calcItemsLevel } =
    useShop();
  const { calcBonuses } = useClicker();
  const { newSkin } = useSkinSelector();
  useEffect(() => {
    setActiveShop("items");
    calcItemsPrice();
    calcItemsLevel();
  }, []);
  useEffect(() => {
    resetPages(activeShop);
  }, [activeShop]);
  useEffect(() => {
    calcBonuses();
    calcItemsPrice();
    newSkin();
  }, [upgradesStatus, itemsStatus, quests]);
  useEffect(() => {
    calcItemsLevel();
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
                  title={`${el.title} - ${thisItemStatus.level + 1}`}
                  content={`${el.description}  +${
                    el.cps[thisItemStatus.level]
                  } CPS`}
                  price={thisItemStatus.price}
                  btnContent={thisItemStatus.amount}
                  buyFun={() => buyItem(el.itemId)}
                />
              );
            }
          })}
        {activeShop === "upgrades" &&
          Object.entries(upgradesData).map(([key, el], i) => {
            let thisIndex = i - inactiveUpgradesCounter.current;
            if (thisIndex < page * 4 && thisIndex >= (page - 1) * 4) {
              const upgradesToBuy = el.filter(
                (el) => !upgradesStatus[key][el.id]
              )[0];
              if (!upgradesToBuy) {
                inactiveUpgradesCounter.current += 1;
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
                  buyFun={() => buyUpgrade(key, upgradesToBuy.id)}
                />
              );
            }
          })}
        {activeShop === "quests" && <h1>Soon...</h1>}
      </div>
      <Pagination />
    </div>
  );
}
export default Shop;
