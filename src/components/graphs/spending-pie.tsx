import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PieVariant from "./pie-variant";

const SpendingPie = () => {
  //   const { data, isSuccess, isLoading } = useFinancialHistory();

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  if (false) return <div>Loading..</div>;
  if (true) {
    return (
      <Card className=" border-none drop-shadow-sm bg-white p-4 border rounded-[.50rem]">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div>No data for this period</div>
          ) : (
            <PieVariant />
          )}
        </CardContent>
      </Card>
    );
  }
};

export default SpendingPie;
