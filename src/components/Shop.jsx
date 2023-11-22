import { Pagination } from "./Pagination/Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "./ShopItem/ShopItem";
import ShopNav from "./ShopNav/ShopNav";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { buyUpgrade, updatePages } from "../features/gameSlice";
import { useEffect, useState } from "react";
import { itemsData, upgradesData } from "../shopData";
import useGame from "../hooks/useGame";

function Shop() {
  const dispatch = useDispatch();
  const upgradesStatus = useSelector(
    (state) => state.game.upgrades,
    shallowEqual
  );
  // const items = useSelector((state) => state.game.items, shallowEqual);
  const items = itemsData;
  const quests = useSelector((state) => state.game.quests, shallowEqual);
  const page = useSelector((state) => state.game.page, shallowEqual);

  const [activeShop, setActiveShop] = useState("upgrades");
  const [activeItems, setActiveItems] = useState({});
  const { calcBonuses, calcUpgradesPrice } = useGame();

  function updateActiveItems() {
    let newActiveItems = { ...activeItems };
    for (const [key, value] of Object.entries(items)) {
      let itemsToBuy = value.filter((el) => el.purchased === false);
      newActiveItems[key] = itemsToBuy[0];
    }
    setActiveItems({ ...newActiveItems });
  }

  useEffect(() => {
    setActiveShop("upgrades");
    calcUpgradesPrice();
    updateActiveItems();
  }, []);
  useEffect(() => {
    dispatch(updatePages(activeShop));
  }, [activeShop]);
  useEffect(() => {
    calcBonuses();
    calcUpgradesPrice();
  }, [upgradesStatus, items, quests]);

  return (
    <div className={classes.shop}>
      <ShopNav activeShop={activeShop} setActiveShop={setActiveShop} />

      <div className={classes.shop_main}>
        {activeShop === "upgrades" &&
          upgradesData.map((el) => {
            if (el.id <= page * 4 && el.id > (page - 1) * 4) {
              const thisUpgradeStatus = upgradesStatus[el.id];
              return (
                <ShopItem
                  key={el.id}
                  id={el.id}
                  type={el.type}
                  title={el.title}
                  content={el.description}
                  price={thisUpgradeStatus.price}
                  btnContent={`Lvl ${thisUpgradeStatus.level}`}
                  buyFun={buyUpgrade}
                />
              );
            }
          })}
        {activeShop === "items" &&
          Object.entries(activeItems).map(([key, el]) => {
            if (!el) return;
            if (el.id <= page * 4 && el.id > (page - 1) * 4) {
              return (
                <ShopItem
                  key={key}
                  type={el.type}
                  title={el.title}
                  content={el.description}
                  price={el.price}
                  btnContent="Buy"
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
