import classes from "./_clicker.module.scss";
import catTransparent from "../images/cat_transparent.png";

import catFishingRod from "../images/cat_fishing-rod.png";
import catBuilder from "../images/cat_builder.png";
import catHouse from "../images/cat_house.png";
import catFarmer from "../images/cat_farmer.png";
import catWarrior from "../images/cat_warrior.png";
import catDriver from "../images/cat_driver.png";

import { useDispatch, useSelector } from "react-redux";
import { catClick } from "../features/gameSlice";
import { useEffect, useRef } from "react";
import { delay } from "../dealy";
import XpBar from "./XpBar";
import Statistics from "./Statistics";
import ItemsBox from "./ItemsBox";

function Clicker() {
  const autoClickPerSec = useSelector((state) => state.game.autoClickPerSec);
  const dispatch = useDispatch();

  const catImage = useRef(null);
  const timerId = useRef();
  // const [timer, setTimer] = useState(0);
  useEffect(() => {
    // Global timer
    if (autoClickPerSec) {
      timerId.current = window.setInterval(async () => {
        dispatch(catClick());
        // Click animation
        catImage.current.classList.toggle(classes.click);
        await delay(50);
        catImage.current.classList.toggle(classes.click);
      }, 1000 / autoClickPerSec);

      return () => {
        clearInterval(timerId.current);
      };
    }
  }, [autoClickPerSec]);

  console.log("render");
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
