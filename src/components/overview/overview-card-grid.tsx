"use client";
import { format, subMonths } from "date-fns";
import OverViewCard from "./card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useFinancialSummary } from "@/hooks/use-overview";
import { useEffect } from "react";
const CardGrid = () => {
  // date period

  const to = new Date();
  const from = subMonths(to, 1);

  const endDate = format(to, "PP");
  const startDate = format(from, "MMM MM");

  const { mutate, data } = useFinancialSummary();

  useEffect(() => {
    mutate({ to, from });
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <OverViewCard
        title="Remaining"
        dateRange={startDate + " - " + endDate}
        icon={FaPiggyBank}
        percentage={data?.data.pastMonthRemainingPercentage}
        value={data?.data.remaining}
        variant={"default"}
      />
      <OverViewCard
        title="Income"
        dateRange={startDate + " - " + endDate}
        icon={FaArrowTrendUp}
        percentage={data?.data.pastMonthIncomePercentage}
        value={data?.data.income}
        variant={"success"}
      />
      <OverViewCard
        title="Expense"
        dateRange={startDate + " - " + endDate}
        icon={FaArrowTrendDown}
        percentage={data?.data.pastMonthExpensePercentage}
        value={data?.data.expense}
        variant={"danger"}
      />
    </div>
  );
};

export default CardGrid;
