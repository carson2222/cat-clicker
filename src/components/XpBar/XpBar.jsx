import React, { useEffect } from "react";
import classes from "./_xp-bar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useGame from "../../hooks/useGame";

const XpBar = () => {
  const { xp, level, toNextLevel } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { levelUp, calcToNextLevel, calcBonuses } = useGame();

  useEffect(() => {
    levelUp();
  }, [xp]);

  useEffect(() => {
    calcToNextLevel();
    calcBonuses();
  }, [level]);
  return (
    <div className={classes.lvl}>
      <h2 className={classes.lvl_current}>{level}</h2>
      <div className={classes.lvl_bar}>
        <i className={classes.percentage}>
          {Math.floor((xp * 100) / toNextLevel)}%
        </i>
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
