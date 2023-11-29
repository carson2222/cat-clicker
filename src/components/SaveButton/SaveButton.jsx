import React from "react";
import classes from "../_colored-box.module.scss";
import useSave from "../../hooks/useSave";

const SaveButton = () => {
  const { saveGame } = useSave();
  return (
    <button
      onClick={saveGame}
      className={`${classes.colorBox} ${classes.colorBox_btn} ${classes.colorBox_green}`}
      style={{ maxWidth: "6rem" }}
    >
      Save
    </button>
  );
};

export default SaveButton;
