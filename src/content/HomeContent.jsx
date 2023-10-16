import React from "react";
import catWhiteBg from "../images/cat_white-bg.png";

import { ShowcaseItem } from "../components/ShowcaseItem";
import { Btn2d } from "../components/Btn2d";
import classes from "./_home-content.module.scss";
console.log(classes);
export function HomeContent({}) {
  return (
    <main className={classes.content}>
      <div className={classes.starter}>
        <h1 className={classes.starter__header}>
          Welcome to <br />
          Cat Clicker.
        </h1>
        <p className={classes.starter__paragraf}>
          Click, Collect, Upgrade, and Embark on a Whisker-twitching Adventure to Become the Ultimate Cat Clicking
          Maestro! <br />
          <br />
          <br />
          Are you up for the adventure?
        </p>
        <Btn2d content1="Let's start!" content2="MEOOOW!" />
      </div>
      <div className={classes.showcase}>
        <ShowcaseItem image={catWhiteBg} id="1" color="green" textContent="Level 1" classes={classes} />
        <ShowcaseItem image={catWhiteBg} id="2" color="yellow" textContent="Level 2" classes={classes} />
        <ShowcaseItem image={catWhiteBg} id="3" color="orange" textContent="Level 3" classes={classes} />
      </div>
    </main>
  );
}
