import React, { useEffect } from "react";
import { itemsData } from "../../shopData";
import { useDrag } from "react-dnd";
import classes from "./_item.module.scss";
const ItemTypes = {
  ITEM1: "item1",
};
function Item({ data }) {
  const { id, left, top, height, width, img, alt, itemId } = data;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.ITEM1,
      item: { id, left, top, height, width, itemId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, height, width, itemId]
  );

  return (
    <img
      draggable="false"
      ref={isDragging ? preview : drag}
      src={img}
      alt={alt}
      className={classes.item}
      style={{
        top: top,
        left: left,
        width: width,
        height: height,
        opacity: isDragging ? 0.2 : 1,
      }}
    />
  );
}

export default Item;
