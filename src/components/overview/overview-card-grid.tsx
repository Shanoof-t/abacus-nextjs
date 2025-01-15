"use client";
import OverViewCard from "./card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
const CardGrid = () => {
  
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <OverViewCard
        title="Remaining"
        dateRange="apr 04 - May 04,2024"
        icon={FaPiggyBank}
        percentage={-30}
        value={100}
        variant={"default"}
      />
      <OverViewCard
        title="Income"
        dateRange="apr 04 - May 04,2024"
        icon={FaArrowTrendUp}
        percentage={30}
        value={1000}
        variant={"success"}
      />
      <OverViewCard
        title="Expense"
        dateRange="apr 04 - May 04,2024"
        icon={FaArrowTrendDown}
        percentage={30}
        value={250}
        variant={"danger"}
      />
    </div>
  );
};

export default CardGrid;
