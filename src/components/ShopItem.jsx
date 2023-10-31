import classes from "./_shop-item.module.scss";

function ShopItem() {
  return (
    <div class={`${classes.shopItem} ${classes.shopItem_upgrade}`}>
      <div class={classes.shopItem_textBox}>
        <h3 class={classes.shopItem_h3}>Tytuł</h3>
        <p class="shopItem_p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolorem vero</p>
      </div>
      <div class="shopItem_infoBox">
        <p class="shopItem_price">50 🐟</p>
        <btn class="shopItem_buyBtn">Buy</btn>
      </div>
    </div>
  );
}
export default ShopItem;
