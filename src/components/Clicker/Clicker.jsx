import classes from "./_clicker.module.scss";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import XpBar from "../XpBar/XpBar";
import Statistics from "../Statistics/Statistics";
import ItemsBox from "../ItemBox/ItemsBox";
import { useSpring, animated } from "react-spring";
import useGame from "../../hooks/useGame";
import { itemsData } from "../../shopData";
import BonusBox from "../BonusBox/BonusBox";
function Clicker() {
  const autoClickPerSec = useSelector((state) => state.game.autoClickPerSec);
  const activeSkin = useSelector((state) => state.game.activeSkin);
  const { catClick } = useGame();
  const catImage = useRef(null);
  const timerId = useRef();
  useEffect(() => {
    catImage.current.src = activeSkin;
    opacityFadeIn();
  }, [activeSkin]);

  const [animation, api] = useSpring(() => ({
    from: { opacity: 0, scale: "1" },
    to: { opacity: 1 },
  }));

  function opacityFadeIn() {
    api.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 600 },
    });
  }
  function clickAnimation() {
    api.start({
      from: { scale: "1" },
      to: { scale: "1.05" },
      config: { duration: 100 },
    });
  }
  function autoClickAnimation() {
    api.start({
      from: { scale: "1" },
      to: { scale: "1.02" },
      config: { duration: 30 },
    });
  }
  useEffect(() => {
    // Global timer
    if (autoClickPerSec) {
      timerId.current = window.setInterval(async () => {
        catClick();
        autoClickAnimation();
      }, 1000 / autoClickPerSec);

      return () => {
        clearInterval(timerId.current);
      };
    }
  }, [autoClickPerSec]);
  return (
    <div className={classes.clicker}>
      <Statistics />

      <ItemsBox
        itemObject={itemsData[1]}
        top="25"
        left="5"
        width="5rem"
        height="auto"
      />
      <ItemsBox
        itemObject={itemsData[2]}
        top="45"
        left="5"
        width="auto"
        height="4rem"
      />
      <ItemsBox
        itemObject={itemsData[3]}
        top="65"
        left="5"
        width="auto"
        height="4rem"
      />
      <ItemsBox
        itemObject={itemsData[4]}
        top="25"
        left="75"
        width="auto"
        height="4rem"
      />
      <ItemsBox
        itemObject={itemsData[5]}
        top="45"
        left="75"
        width="auto"
        height="4rem"
      />
      <ItemsBox
        itemObject={itemsData[6]}
        top="65"
        left="75"
        width="auto"
        height="4rem"
      />
      <animated.div style={animation}>
        <img
          alt="Cat image"
          ref={catImage}
          className={`${classes.clicker_catImg}`}
          onClick={() => {
            clickAnimation();
            catClick();
          }}
          id="catClick"
        />
      </animated.div>
      <BonusBox />
      <XpBar />
    </div>
  );
}
export default Clicker;
