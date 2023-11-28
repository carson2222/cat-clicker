import React from "react";
import classes from "../_colored-box.module.scss";
import useGame from "../../hooks/useGame";

const SaveButton = () => {
  const { saveGame } = useGame();
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
