import { useDispatch } from "react-redux";
import classes from "./_shop-item.module.scss";
import { GiFishbone } from "react-icons/gi";

function ShopItem({ id, type, title, content, price, finished = false, btnContent = "Buy", buyFun }) {
  const dispatch = useDispatch();
  return (
    <div className={`${classes.shopItem} ${classes[`shopItem_${type}`]} ${finished && classes.shopItem_finished}`}>
      <div className={classes.shopItem_textBox}>
        <h3 className={classes.shopItem_h3}>{title}</h3>
        <p className={classes.shopItem_p}>{content}</p>
      </div>
      <div className={classes.shopItem_infoBox}>
        <p className={classes.shopItem_price}>
          {price}
          <GiFishbone size={25} />
        </p>
        <button className={classes.shopItem_buyBtn} onClick={() => dispatch(buyFun(id))}>
          {btnContent}
        </button>
      </div>
    </div>
  );
}
export default ShopItem;
