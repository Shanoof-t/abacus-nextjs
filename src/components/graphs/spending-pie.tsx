"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PieVariant from "./pie-variant";
import { useGetFinancialHistory } from "@/hooks/use-overview";

const SpendingPie = () => {
  const { data } = useGetFinancialHistory();

  if (!data) return <div>Loading..</div>;

  if (data) {
    return (
      <Card className=" border-none drop-shadow-sm bg-white p-4 border rounded-[.50rem]">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.categories.length === 0 ? (
            <div>No data for this period</div>
          ) : (
            <PieVariant data={data?.categories} />
          )}
        </CardContent>
      </Card>
    );
  }
};

export default SpendingPie;
