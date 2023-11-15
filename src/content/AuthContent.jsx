import React from "react";
import classes from "./_auth-content.module.scss";
import { GiFishbone } from "react-icons/gi";
import supabase from "../supabaseClient";
import { notify } from "../toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEmail } from "../features/gameSlice";
import { useNavigate } from "react-router-dom";

const AuthContent = () => {
  const [email, setEmail] = useState("deyapi9609@othao.com");
  const [password, setPassword] = useState("fds%#363!GDS");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function HandleSingup(e) {
    try {
      e.preventDefault();
      if (checkEmpty()) throw new Error("Data is missing");

      const { error } = await supabase.auth.signUp({ email, password });

      if (error) throw new Error(error);
      else {
        notify("success", "Account created");
        dispatch(updateEmail(email));
        navigate("/game");

        // Tworzenie nowy wiersz w tabelach dla gracza, id jako email
      }
    } catch (error) {
      notify("error", error.message + "💥");
      console.error(error.message + "💥");
    }
  }
  async function HandleLogin(e) {
    try {
      e.preventDefault();
      if (checkEmpty()) throw new Error("Data is missing");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error);
      else {
        // fetchowanie emaila
        notify("success", "Logged in");
        dispatch(updateEmail(email));
        navigate("/game");
      }
    } catch (error) {
      notify("error", error.message + "💥");
      console.error(error.message + "💥");
    }
  }
  function clearInputs(e) {
    e.preventDefault();
    setEmail("");
    setPassword("");
    notify("info", "Data cleared", 500);
  }
  function checkEmpty() {
    return !email || !password;
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
          <button className={classes.green} onClick={HandleLogin}>
            Log in
          </button>
          <button className={classes.yellow} onClick={HandleSingup}>
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
