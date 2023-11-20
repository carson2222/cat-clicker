import React from "react";
import classes from "./_skin-selector.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSkin } from "../../features/gameSlice";
import skinsData from "../../skinsData";
const SkinSelector = () => {
  const skins = useSelector((state) => state.game.skins);
  const dispatch = useDispatch();
  function chandleClick(e, type) {
    if (e.target.classList.contains(classes.locked)) return;
    dispatch(setActiveSkin({ type, skinsData }));
  }
  return (
    <div className={classes.skinSelector}>
      <h1>Skins</h1>
      <div className={classes.skinsBox}>
        {skins.map((el) => {
          return (
            <div
              key={el.name}
              className={`${classes.skinItem} ${
                !el.available && classes.locked
              }`}
              style={{ backgroundColor: el.bgColor }}
              onClick={(e) => chandleClick(e, el.name)}
            ></div>
          );
        })}
        {/*<div
          className={classes.skinItem}
          style={{ backgroundColor: "white" }}
          onClick={(e) => chandleClick(e, "white")}
        ></div>
        <div
          className={`${classes.skinItem} ${classes.locked}`}
          style={{ backgroundColor: "orange" }}
  ></div>*/}
      </div>
    </div>
  );
};

export default SkinSelector;
