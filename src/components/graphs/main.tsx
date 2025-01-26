import React, { useEffect } from "react";
import TransactionGraph from "./TransactionGraph";
import SpendingPie from "./spending-pie";

function Graphs() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2">
        <TransactionGraph />
      </div>
      <div className="col-span-1">
        <SpendingPie />
      </div>
    </div>
  );
}

export default Graphs;
