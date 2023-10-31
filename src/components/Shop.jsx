import { Pagination } from "./Pagination";
import ColoredBox from "./ColoredBox";
import classes from "./_shop.module.scss";

function Shop() {
  return (
    <div class={classes.shop}>
      <div class={classes.shop_header}>
        <ColoredBox color="orange" type="btn" textContent="Upgrades" />
        <ColoredBox color="yellow" type="btn" textContent="Items" inactive={true} />
        <ColoredBox color="green" type="btn" textContent="Quests" inactive={true} />
      </div>
      <div class={classes.shop_main}></div>

      <Pagination />
    </div>
  );
}
export default Shop;
