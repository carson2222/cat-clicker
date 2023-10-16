import { ShowcaseItem } from "../components/ShowcaseItem";
import { Btn2d } from "../components/Btn2d";
import React from "react";
import catWhiteBg from "../../images/cat_white-bg.png";
import "./_home-content.scss";
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
        <Btn2d content1="Let's start!" content2="MEOOOW!" />
      </div>
      <div className="showcase">
        <ShowcaseItem image={catWhiteBg} id="1" color="green" textContent="Level 1" />
        <ShowcaseItem image={catWhiteBg} id="2" color="yellow" textContent="Level 2" />
        <ShowcaseItem image={catWhiteBg} id="3" color="orange" textContent="Level 3" />
      </div>
    </main>
  );
}
