import React, { useEffect } from "react";
import { itemsData } from "../../shopData";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend/dist";
const ItemTypes = {
  ITEM1: "item1",
};
function Item({ id, top, left, height, width }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.ITEM1,
      item: { id, left, top, height, width },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <img
      draggable="false"
      ref={drag}
      key={id}
      src={itemsData[1].img}
      alt={`Item`}
      style={{
        top,
        left,
        width,
        height,
        position: "absolute",
        cursor: "move",
        opacity: isDragging ? 0 : 1,
      }}
    />
  );
}

export default Item;
