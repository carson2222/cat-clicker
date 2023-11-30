// import React from "react";
// import { itemsData } from "../../shopData";
// import { useDragLayer } from "react-dnd/dist";

// function DragItem() {
//   const { itemType, isDragging, item, initialOffset, currentOffset } =
//     useDragLayer((monitor) => ({
//       item: monitor.getItem(),
//       itemType: monitor.getItemType(),
//       initialOffset: monitor.getInitialSourceClientOffset(),
//       currentOffset: monitor.getSourceClientOffset(),
//       isDragging: monitor.isDragging(),
//     }));

//   if (isDragging && item && currentOffset)
//     return (
//       <img
//         draggable="false"
//         key={item.id}
//         src={itemsData[1].img}
//         alt={`Item`}
//         style={{
//           left: Math.round(item.left + currentOffset.x - initialOffset.x),
//           top: Math.round(item.top + currentOffset.y - initialOffset.y),
//           width: item.width,
//           height: item.height,
//           position: "absolute",
//           cursor: "move",
//         }}
//       />
//     );
//   return null;
// }

// export default DragItem;
