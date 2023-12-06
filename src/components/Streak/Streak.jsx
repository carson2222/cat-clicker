import React, { useEffect, useRef } from "react";
import classes from "./_streak.module.scss";
import useClicker from "../../hooks/useClicker";
function Streak() {
  const streakTimerId = useRef();
  const { clickStreak, addNoclickSecond, checkIfBoostDisapear } = useClicker();
  useEffect(() => {
    streakTimerId.current = window.setInterval(async () => {
      // reduceStreak();
      checkIfBoostDisapear();
      addNoclickSecond();
    }, 1000);
    return () => {
      clearInterval(streakTimerId.current);
    };
  }, []);
  console.log(clickStreak);
  return <p className={classes.streak}>{clickStreak.toFixed(2)}x</p>;
}
export default Streak;
