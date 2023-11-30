import React, { useEffect } from "react";
import { itemsData } from "../../shopData";
import { useDrag } from "react-dnd";
const ItemTypes = {
  ITEM1: "item1",
};
function Item(data) {
  const [{ isDragging }, drag, preview] = useDrag(
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
    preview(data.img, { captureDraggingState: true });
  }, []);

  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <img
            draggable="false"
            ref={drag}
            id={data.id}
            key={data.id}
            src={data.img}
            alt={data.alt}
            style={{
              top: data.top,
              left: data.left,
              width: data.width,
              height: data.height,
            }}
          />
    {/* <img
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
    /> */}
  );
}

export default Item;
