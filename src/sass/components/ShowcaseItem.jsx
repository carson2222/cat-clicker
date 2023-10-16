import React from "react";
export function ShowcaseItem({ image, id, color, textContent }) {
  return (
    <div className={`showcase__item showcase__item--${id}`}>
      <p className={`color-smallbox color-smallbox--${color}`}>{textContent}</p>
      <img className="showcase__image" src={image} alt={`Cat lvl ${id}`} />
    </div>
  );
}
