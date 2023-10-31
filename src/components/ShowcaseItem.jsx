import React from "react";
export function ShowcaseItem({ image, id, color, textContent, classes }) {
  return (
    <div className={`${classes.item} ${classes[`item--${id}`]}`}>
      <p className={`color-smallbox color-smallbox--${color}`}>{textContent}</p>
      <img className="showcase__image" src={image} alt={`Cat lvl ${id}`} />
    </div>
  );
}
