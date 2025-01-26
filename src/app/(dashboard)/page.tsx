"use client";
import Graphs from "@/components/graphs/main";
import CardGrid from "@/components/overview/overview-card-grid";
import { useFinancialHistory, useFinancialSummary } from "@/hooks/use-overview";
import { format, subMonths } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const Page = () => {
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

  const { mutate: financialSummaryMutate, data: financialSummaryData } =
    useFinancialSummary();
  const { mutate: financialHistoryMutate, data: financialHistoryData } =
    useFinancialHistory();

  useEffect(() => {
    const query = {
      from,
      to,
      account,
    };
    if (account === "all") {
      query.account = "";
    }
    financialSummaryMutate({
      to: query.to,
      from: query.from,
      account: query.account,
    });
    financialHistoryMutate({
      to: query.to,
      from: query.from,
      account: query.account,
    });
  }, [financialSummaryMutate, to, from, account]);

  return (
    <div className="-mt-28 border-none container overflow-y-auto ">
      <CardGrid
        endDate={endDate}
        startDate={startDate}
        data={financialSummaryData?.data}
      />
      <Graphs />
    </div>
  );
};

export default Page;
