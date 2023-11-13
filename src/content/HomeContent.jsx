import React from "react";
import catWhiteBg from "../images/cat_white-bg.png";
import ColoredBox from "../components/ColoredBox";
import { Btn2d } from "../components/Btn2d";
import homeClass from "./_home-content.module.scss";
import showcaseClass from "../components/_showcase.module.scss";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

export function HomeContent() {
  async function SingUp(e) {
    try {
      e.preventDefault();
      let { data, error } = await supabase.auth.signUp({
        email: "someone@email.com",
        password: "beeyapiLJTvilHFfXoEe",
      });
      console.log("singed up");
    } catch (error) {}
  }

  async function LogIn() {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: "someone@email.com",
        password: "beeyapiLJTvilHFfXoEe",
      });
    } catch (error) {}
  }
  return (
    <main className={homeClass.content}>
      <div className={homeClass.starter}>
        <h1 className={homeClass.starter__header}>
          Welcome to <br />
          Cat Clicker.
        </h1>
        <p className={homeClass.starter__paragraf}>
          Click, Collect, Upgrade, and Embark on a Whisker-twitching Adventure
          to Become the Ultimate Cat Clicking Maestro! <br />
          <br />
          <br />
          Are you up for the adventure?
        </p>
        <Link to={`game`}>
          <Btn2d content1="Let's start!" content2="MEOOOW!" />
        </Link>
        <button onClick={(e) => SingUp(e)}>Sing Up!</button>
        <button onClick={(e) => LogIn(e)}>Log In!</button>
      </div>
      <div className={showcaseClass.showcase}>
        <div className={`${showcaseClass.item} ${showcaseClass.item1}`}>
          <ColoredBox color="green" textContent="Level 1" />
          <img
            className={showcaseClass.image}
            src={catWhiteBg}
            alt="Cat lvl 1"
          />
        </div>

        <div className={`${showcaseClass.item} ${showcaseClass.item2}`}>
          <ColoredBox color="yellow" textContent="Level 2" />
          <img
            className={showcaseClass.image}
            src={catWhiteBg}
            alt="Cat lvl 2"
          />
        </div>

        <div className={`${showcaseClass.item} ${showcaseClass.item3}`}>
          <ColoredBox color="orange" textContent="Level 3" />

          <img
            className={showcaseClass.image}
            src={catWhiteBg}
            alt="Cat lvl 3"
          />
        </div>
      </div>
    </main>
  );
}
