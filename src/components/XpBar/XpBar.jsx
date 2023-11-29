import React, { useEffect } from "react";
import classes from "./_xp-bar.module.scss";
import { useSelector } from "react-redux";
import useClicker from "../../hooks/useClicker";

const XpBar = () => {
  const xp = useSelector((state) => state.game.xp);
  const level = useSelector((state) => state.game.level);
  const toNextLevel = useSelector((state) => state.game.toNextLevel);

  const { levelUp, calcToNextLevel, calcBonuses } = useClicker();

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
