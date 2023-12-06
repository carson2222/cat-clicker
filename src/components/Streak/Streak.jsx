import React, { useEffect, useRef } from "react";
import classes from "./_streak.module.scss";
import useClicker from "../../hooks/useClicker";
function Streak({ clickStreak, maxStreak, addNoclickSecond, checkIfBoostDisapear }) {
  const streakTimerId = useRef();
  const ref = useRef();
  useEffect(() => {
    streakTimerId.current = setInterval(() => {
      checkIfBoostDisapear();
      addNoclickSecond();
    }, 1000);

    return () => {
      clearInterval(streakTimerId.current);
    };
  }, []);
  useEffect(() => {
    // Generate a color to burn effect
    if (clickStreak > 1) {
      // filter: drop-shadow(3px 3px 4px black);
      const currentValue = +(((clickStreak - 1) * 100) / (maxStreak - 1) / 100).toFixed(2);
      const newColor = `rgb(255, ${255 - Math.round(currentValue * 255)}, 0)`;
      const newFontSize = `clamp(1rem, ${0.9 + currentValue}vh + ${0.9 + currentValue}vw, 4rem)`;
      const newDropShadow = `drop-shadow(3px 3px 4px ${rgba(0, 0, 0, currentValue)})`;
      ref.current.style.color = newColor;
      ref.current.style.fontSize = newFontSize;
      ref.current.style.filter = newDropShadow;
      console.log(newDropShadow);
    }
  }, [maxStreak, clickStreak]);
  return (
    <p
      ref={ref}
      className={classes.streak}
      style={{
        opacity: clickStreak > 1 ? 1 : 0,
      }}
    >
      {clickStreak.toFixed(2)}x
    </p>
  );
}
export default Streak;
