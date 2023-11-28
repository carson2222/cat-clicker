import classes from "./_bonus-box.module.scss";
import buttonClasses from "../_colored-box.module.scss";
import pouch from "../../images/pouch.png";
import { GiFishbone } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { createPortal } from "react-dom";
import useBonuses from "../../hooks/useBonuses";
function BonusBox() {
  const { isPopupVisible, hidePopup, activeBonuses, bonusClick } = useBonuses();
  return (
    <div className={classes.main}>
      {activeBonuses.map((el) => {
        if (el.type === "pouch") {
          return (
            <img
              key={el.id}
              src={pouch}
              alt="Bonus pouch"
              className={`${classes.item} ${classes.pouch}`}
              style={{ top: `${el.top}%`, left: `${el.left}%` }}
              onClick={() => bonusClick(el.id)}
            />
          );
        }
        if (el.type === "fish") {
          return (
            <div
              key={el.id}
              style={{ top: `${el.top}%`, left: `${el.left}%` }}
              className={`${classes.item} ${classes.fish}`}
              onClick={() => bonusClick(el.id)}
            >
              <GiFishbone size={el.size}></GiFishbone>
            </div>
          );
        }
        if (el.type === "xp") {
          return (
            <div
              key={el.id}
              style={{ top: `${el.top}%`, left: `${el.left}%` }}
              className={`${classes.item} ${classes.xp}`}
              onClick={() => bonusClick(el.id)}
            >
              <BsStars size={el.size}></BsStars>
            </div>
          );
        }
      })}
      {/*
      
      
      */}
      {isPopupVisible &&
        createPortal(
          <div className={classes.popup}>
            <div className={classes.popup_container}>
              <h1>
                You've won 100 XP! <BsStars />
              </h1>
              <button
                onClick={hidePopup}
                className={`${buttonClasses.colorBox} ${buttonClasses.colorBox_btn} ${buttonClasses.colorBox_green}`}
              >
                Take it!
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
export default BonusBox;
