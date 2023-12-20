import Streak from "../Streak/Streak";
import classes from "./_clicker.module.scss";
import { useCallback, useEffect, useRef } from "react";
import XpBar from "../XpBar/XpBar";
import Statistics from "../Statistics/Statistics";
import { animated } from "react-spring";
import BonusBox from "../BonusBox/BonusBox";
import useSkinSelector from "../../hooks/useSkinSelector";
import useClicker from "../../hooks/useClicker";
import { useDrop } from "react-dnd";
import Item from "./Item";
import useAnimations from "../../animations";
import ItemTypes from "../../ItemType";
import useShop from "../../hooks/useShop";

function Clicker() {
  const { changeSkin, activeSkin } = useSkinSelector();
  const {
    catClick,
    itemsStatus,
    clickerDummy,
    updateDisplayItemsPosition,
    itemsToDisplay,
    generateItemsToDisplay,
    autoClickPerSec,
    boostStreak,
    clickStreak,
    maxStreak,
    addNoclickSecond,
    checkIfBoostDisapear,
  } = useClicker();
  const { upgradeUnlocker } = useShop();
  const { opacityFadeIn, clickAnimation, mainCatAnimation } = useAnimations();
  const catImage = useRef(null);
  const autoClickTimerId = useRef();

  ///////////////// D&D //////////////////
  const moveItem = useCallback(
    (id, left, top, itemId) => {
      updateDisplayItemsPosition(id, left, top, itemId);
    },
    [itemsStatus]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ITEM1,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveItem(item.id, left, top, item.itemId);
        return undefined;
      },
    }),
    [moveItem]
  );
  ///////////////////////////////////
  useEffect(() => {
    changeSkin("white");
  }, []);

  useEffect(() => {
    generateItemsToDisplay();
  }, [itemsStatus]);

  useEffect(() => {
    catImage.current.src = activeSkin;
    opacityFadeIn();
  }, [activeSkin]);

  useEffect(() => {
    // autoClickTimer
    if (autoClickPerSec) {
      autoClickTimerId.current = window.setInterval(async () => {
        catClick();
        // autoClickAnimation();
      }, 1000 / autoClickPerSec);
      return () => {
        clearInterval(autoClickTimerId.current);
      };
    }
  }, [autoClickPerSec]);

  return (
    <div className={classes.clickerDummy} ref={clickerDummy} draggable={false}>
      <div className={classes.clicker} ref={drop}>
        <Streak
          clickStreak={clickStreak}
          maxStreak={maxStreak}
          addNoclickSecond={addNoclickSecond}
          checkIfBoostDisapear={checkIfBoostDisapear}
        />
        <Statistics />
        <animated.div style={mainCatAnimation}>
          <img
            alt="Cat image"
            ref={catImage}
            className={`${classes.clicker_catImg}`}
            onClick={() => {
              clickAnimation();
              catClick();
              boostStreak();
              upgradeUnlocker();
            }}
            id="catClick"
            draggable="false"
          />
        </animated.div>
        <BonusBox />
        <XpBar />

        {itemsToDisplay.map((el) => {
          return <Item key={el.key} data={el}></Item>;
        })}
      </div>
    </div>
  );
}
export default Clicker;
