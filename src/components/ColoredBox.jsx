import React from "react";
import classes from "./_colored-box.module.scss";
console.log(classes);
function ColoredBox({ color, type = "home", textContent, inactive }) {
  return (
    <p
      className={`${classes.colorBox} ${classes[`colorBox_${type}`]} ${
        inactive ? classes.colorBox_inactive : classes.colorBox_active
      }  ${classes[`colorBox_${color}`]}`}
    >
      {textContent}
    </p>
  );
}

export default ColoredBox;
