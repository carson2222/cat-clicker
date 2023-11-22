import React from "react";
import supabase from "../supabaseClient";
import { notify } from "../toastify";
import { useSelector } from "react-redux";
import classes from "./_colored-box.module.scss";
import useGame from "../hooks/useGame";

const SaveButton = () => {
  const game = useSelector((state) => state.game);
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
