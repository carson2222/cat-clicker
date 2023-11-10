import React, { useEffect, useRef } from "react";
import classes from "./_clicker.module.scss";

import { useSelector } from "react-redux";
const ItemsBox = ({ id, top, left, img }) => {
  const game = useSelector((state) => state.game.upgrades[id].level);
  const items = useRef([]);

  return (
    <div
      className={classes.item_box}
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      {Array(game)
        .fill(undefined)
        .forEach((x) => {
          console.log("test");
        })}

      {Array(game)
        .fill(undefined)
        .map((_, i) => {
          if (i < 50) {
            if (items.current.length < i + 1) {
              const top = Math.round(Math.floor(Math.random() * 100) / 15) * 15;
              const left =
                Math.round(Math.floor(Math.random() * 100) / 15) * 15;
              items.current[i] = {
                top,
                left,
              };
            }
            return (
              <img
                key={i}
                src={img}
                alt={`Item ${id}`}
                style={{
                  top: `${items.current[i].top}%`,
                  left: `${items.current[i].left}%`,
                  width: "6rem",
                  height: "auto",
                }}
              />
            );
          }
        })}
    </div>
  );
};

export default ItemsBox;
