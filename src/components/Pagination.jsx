import React from "react";
import classes from "./_pagination.module.scss";

export function Pagination({}) {
  return (
    <div className={classes.pagination}>
      <p>&larr;</p>
      <p className={`${classes.pagination} ${classes.pagination_inactive}`}>&rarr;</p>
    </div>
  );
}
