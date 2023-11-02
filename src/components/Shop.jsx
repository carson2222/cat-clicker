import { Pagination } from "./Pagination";
import classes from "./_shop.module.scss";
import ShopItem from "./ShopItem";
import ShopNav from "./ShopNav";
function Shop() {
  return (
    <div className={classes.shop}>
      <ShopNav />
      <div className={classes.shop_main}>
        <ShopItem
          type="upgrade"
          title="Movement"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam maiores culpa assumenda, distinctio "
          price="15"
          finished={false}
        />
      </div>
      <Pagination />
    </div>
  );
}
export default Shop;
