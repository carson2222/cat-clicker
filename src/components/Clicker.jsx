import classes from "./_clicker.module.scss";
import catTransparent from "../images/cat_transparent.png";

import catFishingRod from "../images/cat_fishing-rod.png";
import catBuilder from "../images/cat_builder.png";

import { useDispatch, useSelector } from "react-redux";
import {
  catClick,
  bonusCounters,
  checkLevelUp,
  calcNextLevel,
  setActiveShop,
  upgradesCalc,
} from "../features/gameSlice";
import { useEffect, useRef, useState } from "react";
import { delay } from "../dealy";
import XpBar from "./XpBar";
import Statistics from "./Statistics";
import ItemsBox from "./ItemsBox";

function Clicker() {
  const dispatch = useDispatch();

  const catImage = useRef(null);
  const timerId = useRef();
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    // // Global timer
    // timerId.current = window.setInterval(() => {
    //   setTimer((prev) => prev - 1);
    // }, 1000);
    // const autoClick = setInterval(async () => {
    //   dispatch(catClick());
    //   // Click animation
    //   catImage.current.classList.toggle(classes.click);
    //   await delay(50);
    //   catImage.current.classList.toggle(classes.click);
    // }, 1000 / game.autoClickPerSec);
    // return () => {
    //   clearInterval(timerId.current);
    //   clearInterval(autoClick);
    // };
  }, []);

  console.log("render");
  return (
    <div className={classes.clicker}>
      <Statistics />
      <ItemsBox id="0" top="25" left="5" img={catFishingRod} width="5rem" height="auto" />
      <ItemsBox id="1" top="45" left="5" img={catBuilder} width="auto" height="4rem" />

      <img
        src={catTransparent}
        alt="Cat image"
        ref={catImage}
        className={`${classes.clicker_catImg}`}
        onClick={() => dispatch(catClick())}
        id="catClick"
      />
      <XpBar />
    </div>
  );
}
export default Clicker;
