import React from "react";
import classes from "./_skin-selector.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSkin } from "../../features/gameSlice";
import skinsData from "../../skinsData";
import useGame from "../../hooks/useGame";

const SkinSelector = () => {
  const skinsStatus = useSelector((state) => state.game.skins);
  const { changeSkin } = useGame();

  return (
    <div className={classes.skinSelector}>
      <h1>Skins</h1>
      <div className={classes.skinsBox}>
        {skinsData.map((el) => {
          return (
            <div
              key={el.name}
              className={`${classes.skinItem} ${
                !skinsStatus[+el.id] && classes.locked
              }`}
              style={{ backgroundColor: el.bgColor }}
              onClick={(e) => changeSkin(e, el.name)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SkinSelector;
