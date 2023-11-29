import React from "react";
import classes from "./_pagination.module.scss";
import { useSelector } from "react-redux";
import useShop from "../../hooks/useShop";
export function Pagination({ left, right }) {
  const page = useSelector((state) => state.game.page);
  const maxPages = useSelector((state) => state.game.maxPages);

  const { changePage } = useShop();
  if (maxPages === 1 && page === 1) {
    left = "inactive";
    right = "inactive";
    return <div className={classes.pagination}></div>;
  }
  if (maxPages > 1 && page === 1) {
    left = "inactive";
    right = "active";
  }
  if (page === maxPages && maxPages > 1) {
    left = "active";
    right = "inactive";
  }
  if (page > 1 && page < maxPages) {
    left = "active";
    right = "active";
  }
  return (
    <div className={classes.pagination}>
      {left === "active" ? (
        <p
          className={`${classes.pagination} ${classes.pagination_active}`}
          onClick={() => changePage(-1)}
        >
          &larr;
        </p>
      ) : (
        <p className={`${classes.pagination} ${classes.pagination_inactive}`}>
          &larr;
        </p>
      )}

      {right === "active" ? (
        <p
          className={`${classes.pagination} ${classes.pagination_active}`}
          onClick={() => changePage(1)}
        >
          &rarr;
        </p>
      ) : (
        <p className={`${classes.pagination} ${classes.pagination_inactive}`}>
          &rarr;
        </p>
      )}
    </div>
  );
}
