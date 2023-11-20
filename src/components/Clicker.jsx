import classes from "./_clicker.module.scss";
import catFishingRod from "../images/cat_fishing-rod.png";
import catBuilder from "../images/cat_builder.png";
import catHouse from "../images/cat_house.png";
import catFarmer from "../images/cat_farmer.png";
import catWarrior from "../images/cat_warrior.png";
import catDriver from "../images/cat_driver.png";

import { useDispatch, useSelector } from "react-redux";
import { catClick } from "../features/gameSlice";
import { useEffect, useRef } from "react";
import XpBar from "./XpBar";
import Statistics from "./Statistics";
import ItemsBox from "./ItemsBox";
import { useSpring, animated } from "react-spring";

function Clicker() {
  const autoClickPerSec = useSelector((state) => state.game.autoClickPerSec);
  const activeSkin = useSelector((state) => state.game.activeSkin);
  const dispatch = useDispatch();

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
        dispatch(catClick());
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
        id="0"
        top="25"
        left="5"
        img={catFishingRod}
        width="5rem"
        height="auto"
      />
      <ItemsBox
        id="1"
        top="45"
        left="5"
        img={catBuilder}
        width="auto"
        height="4rem"
      />
      <ItemsBox
        id="2"
        top="65"
        left="5"
        img={catHouse}
        width="auto"
        height="4rem"
      />
      <ItemsBox
        id="3"
        top="25"
        left="75"
        img={catFarmer}
        width="auto"
        height="4rem"
      />
      <ItemsBox
        id="4"
        top="45"
        left="75"
        img={catDriver}
        width="auto"
        height="4rem"
      />
      <ItemsBox
        id="5"
        top="65"
        left="75"
        img={catWarrior}
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
            dispatch(catClick());
          }}
          id="catClick"
        />
      </animated.div>
      <XpBar />
    </div>
  );
}
export default Clicker;
