import { Pagination } from "./Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "./ShopItem";
import ShopNav from "./ShopNav";
import { useSelector } from "react-redux";
function Shop() {
  const shop = useSelector((state) => state.shop);
  return (
    <div className={classes.shop}>
      <ShopNav />

      <div className={classes.shop_main}>
        {shop[shop.activeShop].map((el) => {
          if (
            el.type === "upgrade" &&
            el.id <= shop.page * 4 &&
            el.id > (shop.page - 1) * 4
          ) {
            return (
              <ShopItem
                key={el.id}
                type={el.type}
                title={el.title}
                content={el.description}
                price={el.price}
                btnContent={`Lvl ${el.level}`}
              />
            );
          }
          if (el.type === "item") {
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
