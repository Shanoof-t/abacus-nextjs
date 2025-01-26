"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AreaVariant from "./area-variant";
import { useGetFinancialHistory } from "@/hooks/use-overview";

const TransactionGraph = () => {
  const { data, isLoading, isSuccess } = useGetFinancialHistory();
  if (!data) return <div>Loading..</div>;

  if (data) {
    return (
      <Card className=" border-none drop-shadow-sm bg-white p-4 border rounded-[.50rem]">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.transaction.length === 0 ? (
            <div>No data for this period</div>
          ) : (
            <AreaVariant data={data?.transaction} />
          )}
        </CardContent>
      </Card>
    );
  }
};

export default TransactionGraph;
