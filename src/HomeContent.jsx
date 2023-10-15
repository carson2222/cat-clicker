import React from "react";
import catWhiteBg from "./images/cat_white-bg.png";
export function HomeContent({}) {
  return (
    <main className="content">
      <div className="starter">
        <h1 className="starter__header">
          Welcome to <br />
          Cat Clicker.
        </h1>
        <p className="starter__paragraf">
          Click, Collect, Upgrade, and Embark on a Whisker-twitching Adventure to Become the Ultimate Cat Clicking
          Maestro! <br />
          <br />
          <br />
          Are you up for the adventure?
        </p>
        <button className="btn-2d">
          <span className="btn-2d__visible">Let's start!</span>
          <span className="btn-2d__invisible">MEOOOW!</span>
        </button>
      </div>
      <div className="showcase">
        <div className="showcase__item showcase__item--1">
          <p className="color-smallbox color-smallbox--green">Level 1</p>
          <img className="showcase__image" src={catWhiteBg} alt="Cat lvl 1" />
        </div>
        <div className="showcase__item showcase__item--2">
          <p className="color-smallbox color-smallbox--yellow">Level 2</p>
          <img className="showcase__image" src={catWhiteBg} alt="Cat lvl 2" />
        </div>
        <div className="showcase__item showcase__item--3">
          <p className="color-smallbox color-smallbox--orange">Level 3</p>
          <img className="showcase__image" src={catWhiteBg} alt="Cat lvl 3" />
        </div>
      </div>
    </main>
  );
}
