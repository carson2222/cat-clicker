import React from "react";
export function ShowcaseItem({ image, id, color, textContent, classes }) {
  const type = `item--${id}`;
  return (
    <div className={`${classes.item} ${classes[type]}`}>
      <p className={`color-smallbox color-smallbox--${color}`}>{textContent}</p>
      <img className="showcase__image" src={image} alt={`Cat lvl ${id}`} />
    </div>
  );
}
