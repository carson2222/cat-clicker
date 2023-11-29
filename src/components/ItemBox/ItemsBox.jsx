import React, { useRef } from "react";
import classes from "./_item-box.module.scss";

import { useSelector } from "react-redux";
import random from "random";
const ItemsBox = ({ itemObject, top, left, width, height }) => {
  const item = useSelector((state) => state.game.items[itemObject.itemId]);

  const items = useRef([]);

  return (
    <div
      className={classes.item_box}
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      {Array(item.amount)
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
                src={itemObject.img}
                alt={`Item ${itemObject.itemId}`}
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
