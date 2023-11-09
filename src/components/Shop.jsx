import { Pagination } from "./Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "./ShopItem";
import ShopNav from "./ShopNav";
import { useDispatch, useSelector } from "react-redux";
import { bonusCounters, buyUpgrade, upgradesCalc } from "../features/gameSlice";
import { useEffect } from "react";

function Shop() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bonusCounters());
    dispatch(upgradesCalc());
  }, [game.upgrades, game.items, game.quests]);

  return (
    <div className={classes.shop}>
      <ShopNav />

      <div className={classes.shop_main}>
        {game[game.activeShop].map((el) => {
          if (
            el.type === "upgrade" &&
            el.id <= game.page * 4 &&
            el.id > (game.page - 1) * 4
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
            el.type === "item" &&
            el.id <= game.page * 4 &&
            el.id > (game.page - 1) * 4
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
