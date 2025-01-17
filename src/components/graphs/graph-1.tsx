"use client";
import { useFinancialHistory } from "@/hooks/use-overview";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import AreaVariant from "./area-variant";
const Graph1 = () => {
  const { data, isSuccess, isLoading } = useFinancialHistory();

  if (isLoading) return <div>Loading..</div>;
  if (isSuccess) {
    return (
      <Card className=" border-none drop-shadow-sm bg-white p-4 border rounded-[.50rem]">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {data.data.length === 0 ? (
            <div>No data for this period</div>
          ) : (
            <AreaVariant data={data.data} />
          )}
        </CardContent>
      </Card>
    );
  }
};

export default Graph1;
