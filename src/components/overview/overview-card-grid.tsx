"use client";

import OverViewCard from "./card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

type CardGrid = {
  startDate: string;
  endDate: string;
  data?: {
    remaining: number;
    income: number;
    expense: number;
    pastMonthIncomePercentage: number;
    pastMonthExpensePercentage: number;
    pastMonthRemainingPercentage: number;
  };
};

const CardGrid = ({ startDate, endDate, data }: CardGrid) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <OverViewCard
        title="Remaining"
        dateRange={startDate + " - " + endDate}
        icon={FaPiggyBank}
        percentage={data?.pastMonthRemainingPercentage}
        value={data?.remaining}
        variant={"default"}
      />
      <OverViewCard
        title="Income"
        dateRange={startDate + " - " + endDate}
        icon={FaArrowTrendUp}
        percentage={data?.pastMonthIncomePercentage}
        value={data?.income}
        variant={"success"}
      />
      <OverViewCard
        title="Expense"
        dateRange={startDate + " - " + endDate}
        icon={FaArrowTrendDown}
        percentage={data?.pastMonthExpensePercentage}
        value={data?.expense}
        variant={"danger"}
      />
    </div>
  );
};

export default CardGrid;
