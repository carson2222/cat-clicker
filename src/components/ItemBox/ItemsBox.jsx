import React, { useEffect, useRef } from "react";
import classes from "./_item-box.module.scss";

import { useSelector } from "react-redux";
import random from "random";
const ItemsBox = ({ id, top, left, img, width, height }) => {
  const game = useSelector((state) => state.game.upgrades[id].level);
  const items = useRef([]);

  return (
    <div className={classes.item_box} style={{ top: `${top}%`, left: `${left}%` }}>
      {Array(game)
        .fill(undefined)
        .map((_, i) => {
          if (i < 40) {
            if (items.current.length < i + 1) {
              const top = Math.floor(random.int(-30, 60) / 15) * 15;
              const left = Math.floor(random.int(-15, 90) / 15) * 15;
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
                  width: `${width}`,
                  height: `${height}`,
                }}
              />
            );
          }
        })}
    </div>
  );
};

export default ItemsBox;
