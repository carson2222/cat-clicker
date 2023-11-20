import React from "react";
import classes from "./_auth-content.module.scss";
import { GiFishbone } from "react-icons/gi";
import supabase from "../supabaseClient";
import { notify } from "../toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadData, updateEmail } from "../features/gameSlice";
import { useNavigate } from "react-router-dom";
import { upgradesData, itemsData } from "../shopData";
import skinsData from "../skinsData";
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

        const { data, error } = await supabase
          .from("profiles")
          .insert([{ email }])
          .select();
        if (error) throw new Error(error);
        dispatch(
          loadData({ newData: data[0], upgradesData, skinsData, itemsData })
        );
        navigate("/game");
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

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error);
      else {
        notify("success", "Logged in");
        dispatch(updateEmail(email));
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("email", email);

        dispatch(
          loadData({ newData: data[0], upgradesData, skinsData, itemsData })
        );

        console.log(data[0]);
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
