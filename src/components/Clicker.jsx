import classes from "./_clicker.module.scss";
import catTransparent from "../images/cat_transparent.png";
import { GiFishbone } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import {
  catClick,
  bonusCounters,
  checkLevelUp,
  calcNextLevel,
  setActiveShop,
  upgradesCalc,
} from "../features/gameSlice";
import { useEffect } from "react";
function Clicker() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveShop("upgrades"));
    dispatch(upgradesCalc());
  }, []);
  useEffect(() => {
    dispatch(checkLevelUp());
  }, [game.xp]);
  useEffect(() => {
    dispatch(bonusCounters());
    dispatch(calcNextLevel());
  }, [game.level]);
  useEffect(() => {
    dispatch(bonusCounters());
    dispatch(upgradesCalc());
  }, [game.upgrades, game.items, game.quests]);

  return (
    <div className={classes.clicker}>
      <div className={classes.statistics}>
        <h1>
          {game.money.toFixed(2)}
          <GiFishbone size={35} />
        </h1>
        <h1>
          {game.moneyMultiplier.toFixed(2)}x
          <FaMoneyBillTrendUp size={35} />
        </h1>
        <h1>
          {game.xpMultiplier.toFixed(2)}x
          <BsStars size={35} />
        </h1>
      </div>
      <img
        src={catTransparent}
        alt="Cat image"
        className={classes.clicker_catImg}
        onClick={() => dispatch(catClick())}
      />
      <div className={classes.lvl}>
        <h2 className={classes.lvl_current}>{game.level}</h2>
        <div className={classes.lvl_bar}>
          <i className={classes.percentage}>{Math.floor((game.xp * 100) / game.toNextLevel)}%</i>
          <div
            className={classes.fill}
            style={{
              width: `${Math.floor((game.xp * 100) / game.toNextLevel)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default Clicker;
