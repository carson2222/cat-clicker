import classes from "./_clicker.module.scss";
import catTransparent from "../images/cat_transparent.png";
function Clicker() {
  return (
    <div className={classes.clicker}>
      <img src={catTransparent} alt="Cat image" className={classes.clicker_catImg} />
      <div className={classes.lvl}>
        <div className={classes.lvl_current}>35</div>
        <div className={classes.lvl_bar}></div>
      </div>
    </div>
  );
}
export default Clicker;
