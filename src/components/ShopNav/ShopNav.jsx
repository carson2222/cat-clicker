import ColoredBox from "../ColoredBox";
import classes from "./_shop-nav.module.scss";
function ShopNav({ activeShop, setActiveShop }) {
  return (
    <div className={classes.shop_header}>
      <ColoredBox
        color="orange"
        type="btn"
        textContent="Upgrades"
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />
      <ColoredBox
        color="yellow"
        type="btn"
        textContent="Items"
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />
      <ColoredBox
        color="green"
        type="btn"
        textContent="Quests"
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />
    </div>
  );
}
export default ShopNav;
