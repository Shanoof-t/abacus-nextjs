"use client";
import { format, subMonths } from "date-fns";
import OverViewCard from "./card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useFinancialSummary } from "@/hooks/use-overview";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
const CardGrid = () => {
  // date period

  const searchParams = useSearchParams();

  const to = useMemo(
    () => searchParams.get("to") || new Date(),
    [searchParams]
  );

  const from = useMemo(
    () => searchParams.get("from") || subMonths(to, 1),
    [to, searchParams]
  );

  const account = useMemo(
    () => searchParams.get("account") || "all",
    [searchParams]
  );

  const endDate = format(to, "PP");
  const startDate = format(from, "MMM d");

  const { mutate, data } = useFinancialSummary();

  useEffect(() => {
    const query = {
      from,
      to,
      account,
    };
    if (account === "all") {
      query.account = "";
    }
    mutate({ to: query.to, from: query.from, account: query.account });
  }, [mutate, to, from, account]);

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
