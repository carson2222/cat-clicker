import React from "react";
import classes from "./_auth-form.module.scss";
import { GiFishbone } from "react-icons/gi";
import supabase from "../supabaseClient";
import { notify } from "../toastify";
import { useState } from "react";
const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("deyapi9609@othao.com");
  const [password, setPassword] = useState("fds%#363!GDS");
  //   console.log(supabase);
  async function HandleSingup(e) {
    try {
      e.preventDefault();
      const { error } = await supabase.auth.signUp({ email, password });
      //   console.log(data);
      if (error) throw new Error(error);
      else notify("success", "Account created");
    } catch (error) {
      notify("error", error.message + "💥");
      console.error(error.message + "💥");
    }
  }
  async function HandleSingin(e) {
    try {
      e.preventDefault();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
      if (error) throw new Error(error);
      else notify("success", "Logged in");
    } catch (error) {
      console.error(error.message + "💥");
    }
  }
  function clearInputs(e) {
    e.preventDefault();
    setEmail("");
    setPassword("");
    notify("info", "Data cleared", 500);
  }
  return (
    <>
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
          <button className={classes.green} onClick={HandleSingin}>
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
      {/*       <form onSubmit={HandleSingup} className={classes.authForm}>
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
      </form>*/}
    </>
  );
};

export default AuthForm;
