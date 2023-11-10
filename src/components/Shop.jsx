import { Pagination } from "./Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "./ShopItem";
import ShopNav from "./ShopNav";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  bonusCounters,
  buyUpgrade,
  setActiveShop,
  upgradesCalc,
} from "../features/gameSlice";
import { useEffect } from "react";

function Shop() {
  const upgrades = useSelector((state) => state.game.upgrades, shallowEqual);
  const items = useSelector((state) => state.game.items, shallowEqual);
  const quests = useSelector((state) => state.game.quests, shallowEqual);
  const page = useSelector((state) => state.game.page, shallowEqual);
  const activeShop = useSelector(
    (state) => state.game.activeShop,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveShop("upgrades"));
    dispatch(upgradesCalc());
  }, []);
  useEffect(() => {
    dispatch(bonusCounters());
    dispatch(upgradesCalc());
  }, [upgrades, items, quests]);

  return (
    <div className={classes.shop}>
      <ShopNav />

      <div className={classes.shop_main}>
        {upgrades
          .concat(items)
          .concat(quests)
          .map((el) => {
            if (
              el.type === activeShop &&
              el.type === "upgrades" &&
              el.id <= page * 4 &&
              el.id > (page - 1) * 4
            ) {
              return (
                <ShopItem
                  key={el.id}
                  id={el.id}
                  type={el.type}
                  title={el.title}
                  content={el.description}
                  price={el.price}
                  btnContent={`Lvl ${el.level}`}
                  buyFun={buyUpgrade}
                />
              );
            }
            if (
              el.type === activeShop &&
              el.type === "items" &&
              el.id <= page * 4 &&
              el.id > (page - 1) * 4
            ) {
              return (
                <ShopItem
                  key={el.id}
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
