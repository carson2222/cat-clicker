import React from "react";
import logo from "../images/logo.png";
import classes from "./_header.module.scss";

export function Header({}) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt="Cat Clicker Logo" className={classes.logo__img} />
        <h1 className={classes.logo__text}>Cat Clicker</h1>
      </div>
      <ul className={classes.nav}>
        <li className={classes.nav__item}>
          <a href="#">Home</a>
        </li>
        <li className={classes.nav__item}>
          <a href="#">Clicker</a>
        </li>
        <li className={classes.nav__item}>
          <a href="#">Shop</a>
        </li>
        <li className={classes.nav__item}>
          <a href="#">Faq</a>
        </li>
        <li className={classes.nav__item}>
          <a href="#">Info</a>
        </li>
      </ul>
    </header>
  );
}
