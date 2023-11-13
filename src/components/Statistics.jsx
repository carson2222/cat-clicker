import React from "react";
import classes from "./_clicker.module.scss";
import { useSelector, shallowEqual } from "react-redux";

import { GiFishbone } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlineAutoGraph } from "react-icons/md";
import { MdOutlineAutorenew } from "react-icons/md";
const Statistics = () => {
  const money = useSelector((state) => state.game.money, shallowEqual);
  const moneyMultiplier = useSelector(
    (state) => state.game.moneyMultiplier,
    shallowEqual
  );
  const xpMultiplier = useSelector(
    (state) => state.game.xpMultiplier,
    shallowEqual
  );
  const autoClickPerSec = useSelector(
    (state) => state.game.autoClickPerSec,
    shallowEqual
  );

  return (
    <div className={classes.statistics}>
      <h1>
        {money.toFixed(2)}
        <GiFishbone size={35} />
      </h1>
      <h1>
        {moneyMultiplier.toFixed(2)}x
        <FaMoneyBillTrendUp size={35} />
      </h1>
      <h1>
        {xpMultiplier.toFixed(2)}x
        <MdOutlineAutoGraph size={35} />
      </h1>
      <h1>
        {`${autoClickPerSec.toFixed(2)} cps`}
        <MdOutlineAutorenew size={35} />
      </h1>
    </div>
  );
};

export default Statistics;
