import React, { useEffect } from "react";
import classes from "./_xp-bar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { bonusCounters, calcNextLevel, checkLevelUp } from "../../features/gameSlice";

const XpBar = () => {
  const { xp, level, toNextLevel } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLevelUp());
  }, [xp]);
  useEffect(() => {
    dispatch(calcNextLevel());
    dispatch(bonusCounters());
  }, [level]);
  return (
    <div className={classes.lvl}>
      <h2 className={classes.lvl_current}>{level}</h2>
      <div className={classes.lvl_bar}>
        <i className={classes.percentage}>{Math.floor((xp * 100) / toNextLevel)}%</i>
        <div
          className={classes.fill}
          style={{
            width: `${Math.floor((xp * 100) / toNextLevel)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default XpBar;
