import ColoredBox from "./ColoredBox";
import classes from "./_shop.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/shopSlice";
function ShopNav() {
  const activePage = useSelector((state) => state.shop.activePage);
  const dispatch = useDispatch();

  return (
    <div className={classes.shop_header}>
      <ColoredBox
        color="orange"
        type="btn"
        textContent="Upgrades"
        dispatch={dispatch}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <ColoredBox
        color="yellow"
        type="btn"
        textContent="Items"
        dispatch={dispatch}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <ColoredBox
        color="green"
        type="btn"
        textContent="Quests"
        dispatch={dispatch}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
}
export default ShopNav;
