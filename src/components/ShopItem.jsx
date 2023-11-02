import classes from "./_shop-item.module.scss";

function ShopItem({ type = "quest", title = "test", content = "coś tam coś tam", price, finished = false }) {
  return (
    <div className={`${classes.shopItem} ${classes[`shopItem_${type}`]} ${finished && classes.shopItem_finished}`}>
      <div className={classes.shopItem_textBox}>
        <h3 className={classes.shopItem_h3}>{title}</h3>
        <p className={classes.shopItem_p}>{content}</p>
      </div>
      <div className={classes.shopItem_infoBox}>
        <p className={classes.shopItem_price}>{`${price} 🐟`}</p>
        <button className={classes.shopItem_buyBtn}>{type === "quest" ? "0/5" : "Buy"}</button>
      </div>
    </div>
  );
}
export default ShopItem;
