import React, { useState } from "react";
import catWhiteBg from "../images/cat_white-bg.png";
import ColoredBox from "../components/ColoredBox";
import { Btn2d } from "../components/Btn2d";
import homeClass from "./_home-content.module.scss";
import showcaseClass from "../components/_showcase.module.scss";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import { notify } from "../toastify";

export function HomeContent() {
  // const email = "deyapi9609@othao.com";
  // const password = "fds%#363!GDS";
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("deyapi9609@othao.com");
  const [password, setPassword] = useState("fds%#363!GDS");
  console.log(supabase);
  async function HandleSingup(e) {
    try {
      e.preventDefault();
      let { error } = await supabase.auth.signUp({ email, password });

      if (error) throw new Error(error);
      else notify("success", "Account created");
    } catch (error) {
      console.error(error.message + "💥💥💥💥");
    }
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

        <form onSubmit={HandleSingup}>
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sing up!</span>}
            </button>
          </div>
        </form>
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
