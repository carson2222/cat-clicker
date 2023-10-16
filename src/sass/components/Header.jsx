import React from "react";
import logo from "../../images/logo.png";
import "./_header.scss";

export function Header({}) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Cat Clicker Logo" className="logo__img" />
        <h1 className="logo__text">Cat Clicker</h1>
      </div>
      <ul className="nav">
        <li className="nav__item">
          <a href="#">Home</a>
        </li>
        <li className="nav__item">
          <a href="#">Clicker</a>
        </li>
        <li className="nav__item">
          <a href="#">Shop</a>
        </li>
        <li className="nav__item">
          <a href="#">Faq</a>
        </li>
        <li className="nav__item">
          <a href="#">Info</a>
        </li>
      </ul>
    </header>
  );
}
