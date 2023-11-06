import React from "react";
import classes from "./_error-content.module.scss";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
const ErrorContent = ({ error }) => {
  return (
    <div className={classes.content}>
      <h1>Oooops! </h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"}>
        <BiError size={100} className={classes.errorIcon} />
      </Link>
    </div>
  );
};

export default ErrorContent;
