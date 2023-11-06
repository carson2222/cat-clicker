import classes from "./_clicker.module.scss";
import catTransparent from "../images/cat_transparent.png";
import { GiFishbone } from "react-icons/gi";
import { GrLineChart } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  catClick,
  updateMultipliers,
  checkLevelUp,
  calcNextLevel,
} from "../features/profileSlice";
import { useEffect } from "react";
function Clicker() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLevelUp());
  }, [profile.xp]);
  useEffect(() => {
    dispatch(updateMultipliers());
    dispatch(calcNextLevel());
  }, [profile.level]);

  // console.log(Math.floor((profile.xp * 100) / profile.toNextLevel));

  return (
    <div className={classes.clicker}>
      <div className={classes.statistics}>
        <h1>
          {profile.money.toFixed(2)}
          <GiFishbone size={50} />
        </h1>
        <h1>
          {profile.moneyMultiplier.toFixed(2)}
          <GrLineChart size={50} />
        </h1>
        <h1>
          {profile.xpMultiplier.toFixed(2)}
          <GrLineChart size={50} />
        </h1>
        <h1>{profile.xp.toFixed(2)}</h1>
      </div>
      <img
        src={catTransparent}
        alt="Cat image"
        className={classes.clicker_catImg}
        onClick={() => dispatch(catClick())}
      />
      <div className={classes.lvl}>
        <h2 className={classes.lvl_current}>{profile.level}</h2>
        <div className={classes.lvl_bar}>
          <div
            className={classes.fill}
            style={{
              width: `${Math.floor((profile.xp * 100) / profile.toNextLevel)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default Clicker;
