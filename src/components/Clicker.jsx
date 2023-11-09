import classes from "./_clicker.module.scss";
import catTransparent from "../images/cat_transparent.png";

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
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const catImage = useRef(null);
  const timerId = useRef();
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    dispatch(setActiveShop("upgrades"));
    dispatch(upgradesCalc());

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

  useEffect(() => {
    dispatch(calcNextLevel());
    dispatch(bonusCounters());
  }, [game.level]);
  useEffect(() => {
    dispatch(bonusCounters());
    dispatch(upgradesCalc());
  }, [game.upgrades, game.items, game.quests]);

  return (
    <div className={classes.clicker}>
      <Statistics />
      <ItemsBox />
      <div className={classes.item_box} style={{ top: "45%", left: "5%" }}>
        {/*testArr.map((x) => {
          return (
            <img
              src={catBuilder}
              alt="cat fishing rod"
              style={{
                top: `${
                  Math.round((Math.floor(Math.random() * 100) - 20) / 30) * 30
                }%`,
                left: `${
                  Math.round((Math.floor(Math.random() * 100) - 20) / 30) * 30
                }%`,
                width: "auto",
                height: "5rem",
              }}
            />
          );
        }) */}
      </div>
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
