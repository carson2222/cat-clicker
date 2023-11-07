import { Pagination } from "./Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "./ShopItem";
import ShopNav from "./ShopNav";
import { useSelector } from "react-redux";
import { buyUpgrade } from "../features/gameSlice";
function Shop() {
  const shop = useSelector((state) => state.game);
  return (
    <div className={classes.shop}>
      <ShopNav />

      <div className={classes.shop_main}>
        {shop[shop.activeShop].map((el) => {
          if (el.type === "upgrade" && el.id <= shop.page * 4 && el.id > (shop.page - 1) * 4) {
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
          if (el.type === "item" && el.id <= shop.page * 4 && el.id > (shop.page - 1) * 4) {
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
