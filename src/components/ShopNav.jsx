import ColoredBox from "./ColoredBox";
import classes from "./_shop.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setActiveShop } from "../features/shopSlice";
function ShopNav() {
  const activeShop = useSelector((state) => state.shop.activeShop);
  const dispatch = useDispatch();

  return (
    <div className={classes.shop_header}>
      <ColoredBox
        color="orange"
        type="btn"
        textContent="Upgrades"
        dispatch={dispatch}
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />
      <ColoredBox
        color="yellow"
        type="btn"
        textContent="Items"
        dispatch={dispatch}
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />
      <ColoredBox
        color="green"
        type="btn"
        textContent="Quests"
        dispatch={dispatch}
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />
    </div>
  );
}
export default ShopNav;
