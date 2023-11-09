import React, { useEffect } from "react";
import classes from "./_clicker.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkLevelUp } from "../features/gameSlice";

const XpBar = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLevelUp());
  }, [game.xp]);
  return (
    <div className={classes.lvl}>
      <h2 className={classes.lvl_current}>{game.level}</h2>
      <div className={classes.lvl_bar}>
        <i className={classes.percentage}>
          {Math.floor((game.xp * 100) / game.toNextLevel)}%
        </i>
        <div
          className={classes.fill}
          style={{
            width: `${Math.floor((game.xp * 100) / game.toNextLevel)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default XpBar;
