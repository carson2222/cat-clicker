import React from "react";
import classes from "./_auth-content.module.scss";
import { GiFishbone } from "react-icons/gi";
import { notify } from "../toastify";
import { useState } from "react";
import useGame from "../hooks/useGame";

const AuthContent = () => {
  const [email, setEmail] = useState("fdhgdfhd@hfdh.ggg");
  const [password, setPassword] = useState("fsafa32523!!");
  const { logIn, singUp } = useGame();

  function clearInputs(e) {
    e.preventDefault();
    setEmail("");
    setPassword("");
    notify("info", "Data cleared", 500);
  }
  return (
    <div className={classes.content}>
      <form className={classes.authForm}>
        <h2>
          <GiFishbone size={30} />
          Enter to the game!
        </h2>
        <div className={classes.inputContainer}>
          <label className={classes.input}>
            <input
              className={classes.input_field}
              type="email"
              placeholder=" "
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={classes.input_label}>E-mail</span>
          </label>
          <label className={classes.input}>
            <input
              className={classes.input_field}
              type="text"
              placeholder=" "
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={classes.input_label}>Password</span>
          </label>
        </div>
        <div className={classes.button_group}>
          <button
            className={classes.green}
            onClick={(e) => logIn(e, email, password)}
          >
            Log in
          </button>
          <button
            className={classes.yellow}
            onClick={(e) => singUp(e, email, password)}
          >
            Sing up
          </button>
          <button className={classes.orange} onClick={clearInputs}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthContent;
