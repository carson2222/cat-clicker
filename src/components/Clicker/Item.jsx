import React, { useEffect } from "react";
import { itemsData } from "../../shopData";
import { useDrag } from "react-dnd";
const ItemTypes = {
  ITEM1: "item1",
};
function Item({ data }) {
  const { id, left, top, height, width, img, alt } = data;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.ITEM1,
      item: { id, left, top, height, width },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, height, width]
  );
  useEffect(() => {
    preview(img, { captureDraggingState: true });
  }, []);

  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <img
      draggable="false"
      ref={drag}
      id={id}
      key={id}
      src={img}
      alt={alt}
      style={{
        top: top,
        left: left,
        width: width,
        height: height,
        position: "absolute",
      }}
    />
  );
}

export default Item;
