import React from "react";
import classes from "./_clicker.module.scss";
import { useSelector } from "react-redux";

import { GiFishbone } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlineAutoGraph } from "react-icons/md";
import { MdOutlineAutorenew } from "react-icons/md";
const Statistics = () => {
  const game = useSelector((state) => state.game);

  return (
    <div className={classes.statistics}>
      <h1>
        {game.money.toFixed(2)}
        <GiFishbone size={35} />
      </h1>
      <h1>
        {game.moneyMultiplier.toFixed(2)}x
        <FaMoneyBillTrendUp size={35} />
      </h1>
      <h1>
        {game.xpMultiplier.toFixed(2)}x
        <MdOutlineAutoGraph size={35} />
      </h1>
      <h1>
        {game.autoClickPerSec.toFixed(2)} CPS
        <MdOutlineAutorenew size={35} />
      </h1>
    </div>
  );
};

export default Statistics;
