import classes from "./_clicker.module.scss";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import XpBar from "../XpBar/XpBar";
import Statistics from "../Statistics/Statistics";
import { useSpring, animated } from "react-spring";
import BonusBox from "../BonusBox/BonusBox";
import useSkinSelector from "../../hooks/useSkinSelector";
import useClicker from "../../hooks/useClicker";

import { useDrop } from "react-dnd";
import Item from "./Item";
const ItemTypes = {
  ITEM1: "item1",
};
function Clicker() {
  const autoClickPerSec = useSelector((state) => state.game.autoClickPerSec);
  const activeSkin = useSelector((state) => state.game.activeSkin);
  const { changeSkin } = useSkinSelector();
  const {
    catClick,
    displayItemsData,
    updateDisplayItemsPosition,
    generateDisplayItems,
    itemsStatus,
    clickerDummy,
  } = useClicker();
  const catImage = useRef(null);
  const timerId = useRef();
  ///////////////// //////////////////
  useEffect(() => {
    generateDisplayItems();
  }, [itemsStatus]);

  const moveItem = useCallback(
    (id, left, top) => {
      updateDisplayItemsPosition(id, left, top);
    },
    [displayItemsData]
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
    <div className={classes.clickerDummy} ref={clickerDummy}>
      <div className={classes.clicker} ref={drop}>
        <Statistics />
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
        {itemsStatus.map((el) => {
          Object.entries(itemsStatus).map(([key, thisItemStatus]) => {
            if (key !== "mainCat" && thisItemStatus.amount > 0) {
              const thisItemData = itemsData.filter((el) => el.itemId === key)[0];
              console.log(thisItemData);
              Array(thisItemStatus.amount)
                .fill(undefined)
                .map((_, i) => {
                  itemsCounter.current += 1;
                  if (displayItemsData.length < itemsCounter.current) {
                    const dummyWidth = clickerDummy?.current?.offsetWidth;
                    const dummyHeight = clickerDummy?.current?.offsetHeight;
                    const newItemDisplay = {
                      id: itemsCounter.current,
                      img: thisItemData.img,
                      alt: `Item ${thisItemData.itemId}`,
                      top: (dummyHeight * thisItemStatus.positions[i].top) / 100,
                      left: (dummyWidth * thisItemStatus.positions[i].left) / 100,
                      width: thisItemData.width,
                      height: thisItemData.height,
                    };
                    setDisplayItemsData([...displayItemsData, newItemDisplay]);
                  }
                });
            }
          });
        })}
        {/* return <Item key={el.id} data={el}></Item>; */}
        // const [displayItemsData, setDisplayItemsData] = useState([]); // const itemsCounter = useRef(0); //
        function generateDisplayItems(){" "}
        {
          //
          //   itemsCounter.current = 0;
          // }
        }
      </div>
    </div>
  );
}
export default Clicker;
