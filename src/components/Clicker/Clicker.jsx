import classes from "./_clicker.module.scss";

import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import XpBar from "../XpBar/XpBar";
import Statistics from "../Statistics/Statistics";
import ItemsBox from "../ItemBox/ItemsBox";
import { useSpring, animated } from "react-spring";
import { itemsData } from "../../shopData";
import BonusBox from "../BonusBox/BonusBox";
import useSkinSelector from "../../hooks/useSkinSelector";
import useClicker from "../../hooks/useClicker";

import { useDrop } from "react-dnd";
import Item from "./Item";
const ItemTypes = {
  ITEM1: "item1",
};
import update from "immutability-helper";
function Clicker() {
  const autoClickPerSec = useSelector((state) => state.game.autoClickPerSec);
  const activeSkin = useSelector((state) => state.game.activeSkin);
  const { changeSkin } = useSkinSelector();
  const { catClick } = useClicker();
  const catImage = useRef(null);
  const timerId = useRef();

  ///////////////// //////////////////
  const [items, setItems] = useState({
    0: { itemId: 'fisherCat', level: 0, top: 20, left: 80, width: "auto", height: "50px" },
  });
  const itemsStatus = useSelector((state) => state.game.items);
  useEffect(() => {
    //TODO: FIX IT!
    {
      for (const [key, thisItemStatus] of Object.entries(itemsStatus)) {
        if (key === "mainCat") return;
        Array(thisItemStatus.amount)
        .fill(undefined)
        .map((_, i) => {

            }
      }
      Array(item.amount)
        .fill(undefined)
        .map((_, i) => {
          if (i < 40) {
            if (items.current.length < i + 1) {
              const top = Math.floor(random.int(-30, 60) / 15) * 15;
              const left = Math.floor(random.int(-15, 90) / 15) * 15;
              items.current[i] = {
                top,
                left,
              };
            }
            return (
              <img
                draggable="true"
                ref={thisItem}
                key={i}
                src={itemObject.img}
                alt={`Item ${itemObject.itemId}`}
                style={{
                  top: `${items.current[i].top}%`,
                  left: `${items.current[i].left}%`,
                  width: `${width}`,
                  height: `${height}`,
                }}
              />
            );
          }
        });
    }
  });
  const moveItem = useCallback(
    (id, left, top) => {
      setItems(
        update(items, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [items, setItems]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ITEM1,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveItem(item.id, left, top);
        return undefined;
      },
    }),
    [moveItem]
  );
  ///////////////////////////////////

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
  useEffect(() => {
    changeSkin("white");
  }, []);
  return (
    <div className={classes.clicker} ref={drop}>
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
          draggable="false"
        />
      </animated.div>
      <BonusBox />
      <XpBar />
      {Object.keys(items).map((key) => {
        const { left, top, width, height } = items[key];
        return (
          <Item
            key={key}
            id={key}
            left={left}
            top={top}
            width={width}
            height={height}
          ></Item>
        );
      })}
    </div>
  );
}
export default Clicker;
