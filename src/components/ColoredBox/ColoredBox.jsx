import React from "react";
import classes from "./_colored-box.module.scss";

function ColoredBox({
  color,
  type = "home",
  textContent,
  dispatch,
  activeShop,
  setActiveShop,
}) {
  if (type === "btn") {
    const inactive = activeShop !== textContent.toLowerCase();
    return (
      <p
        className={`${classes.colorBox} ${classes[`colorBox_${type}`]} ${
          inactive ? classes.colorBox_inactive : classes.colorBox_active
        }  ${classes[`colorBox_${color}`]}`}
        onClick={() => setActiveShop(textContent.toLowerCase())}
      >
        {textContent}
      </p>
    );
  }

  // home
  return (
    <p
      className={`${classes.colorBox} ${classes[`colorBox_${type}`]} ${
        classes[`colorBox_${color}`]
      }`}
    >
      {textContent}
    </p>
  );
}

export default ColoredBox;
