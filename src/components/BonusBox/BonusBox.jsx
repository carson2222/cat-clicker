import classes from "./_bonus-box.module.scss";
import pouch from "../../images/pouch.png";
import random from "random";

function BonusBox() {
  const top = random.int(0, 100);
  const left = random.int(0, 100);
  console.log(top, left);
  return (
    <div className={classes.main}>
      <img
        src={pouch}
        alt="Bonus pouch"
        className={`${classes.item} ${classes.pouch}`}
        style={{ top: `${top}%`, left: `${left}%` }}
        onClick={() => console.log("test")}
      />
    </div>
  );
}
export default BonusBox;
