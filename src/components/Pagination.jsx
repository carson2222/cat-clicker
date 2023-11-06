import React from "react";
import classes from "./_pagination.module.scss";
import { updatePage } from "../features/shopSlice";
import { useDispatch, useSelector } from "react-redux";
export function Pagination({ left, right }) {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);

  if (shop.maxPages === 1 && shop.page === 1) {
    left = "inactive";
    right = "inactive";
  }
  if (shop.maxPages > 1 && shop.page === 1) {
    left = "inactive";
    right = "active";
  }
  if (shop.page === shop.maxPages && shop.maxPages > 1) {
    left = "active";
    right = "inactive";
  }
  if (shop.page !== shop.maxPages && shop.maxPages > 1) {
    left = "active";
    right = "inactive";
  }
  return (
    <div className={classes.pagination}>
      {left === "active" ? (
        <p
          className={`${classes.pagination} ${classes.pagination_active}`}
          onClick={() => dispatch(updatePage(-1))}
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
          onClick={() => dispatch(updatePage(1))}
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
