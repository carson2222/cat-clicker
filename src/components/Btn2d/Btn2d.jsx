import React from "react";
import classes from "./_btn2d.module.scss";
export function Btn2d({ content1, content2 }) {
  return (
    <button className={classes.btn2d}>
      <span className={classes.btn2d_visible}>{content1}</span>
      <span className={classes.btn2d_invisible}>{content2}</span>
    </button>
  );
}
