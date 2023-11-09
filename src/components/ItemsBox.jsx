import React, { useEffect } from "react";
import classes from "./_clicker.module.scss";

import catFishingRod from "../images/cat_fishing-rod.png";
import { useSelector } from "react-redux";
const ItemsBox = () => {
  const game = useSelector((state) => state.game);

  return (
    <div className={classes.item_box} style={{ top: "25%", left: "5%" }}>
      {Array(game.upgrades[0].level)
        .fill(undefined)
        .forEach((x) => {
          console.log("test");
        })}
      {Array(game.upgrades[0].level).map((id) => {
        return (
          <img
            key={+id}
            src={catFishingRod}
            alt="cat fishing rod"
            style={{
              top: `${Math.round(Math.floor(Math.random() * 100) / 15) * 15}%`,
              left: `${Math.round(Math.floor(Math.random() * 100) / 15) * 15}%`,
              width: "6rem",
              height: "auto",
            }}
          />
        );
      })}
    </div>
  );
};

export default ItemsBox;
