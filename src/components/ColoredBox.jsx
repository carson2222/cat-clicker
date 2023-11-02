import React from "react";
import classes from "./_colored-box.module.scss";

function ColoredBox({ color, type = "home", textContent, dispatch, activePage, setActivePage }) {
  if (type === "btn") {
    const inactive = activePage !== textContent.toLowerCase();
    return (
      <p
        className={`${classes.colorBox} ${classes[`colorBox_${type}`]} ${
          inactive ? classes.colorBox_inactive : classes.colorBox_active
        }  ${classes[`colorBox_${color}`]}`}
        onClick={() => dispatch(setActivePage(textContent.toLowerCase()))}
      >
        {textContent}
      </p>
    );
  }

  // home
  return (
    <p className={`${classes.colorBox} ${classes[`colorBox_${type}`]} ${classes[`colorBox_${color}`]}`}>
      {textContent}
    </p>
  );
}

export default ColoredBox;
