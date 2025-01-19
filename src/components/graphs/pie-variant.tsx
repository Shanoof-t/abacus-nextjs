"use client";
import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Tooltip,
} from "recharts";
import CategoryTooltip from "./category-tooltip";

type Category = {
  _id: string;
  category_name: string;
  category_amount: number;
};

const PieVariant = ({ data }: { data: Category[] }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const displayedData = data.slice(0, 3);
  const otherData = data.slice(3);
  const otherCategoryAmount = otherData.reduce(
    (acc, item) => acc + item.category_amount,
    0
  );

  const changedData = [
    ...displayedData,
    { category_name: "Other", category_amount: otherCategoryAmount },
  ];

  const finalData = changedData.map((category) => {
    return {
      name: category.category_name,
      value: category.category_amount,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        {/* <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ paylaod }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {paylaod.map((entry: any, index: number) => {
                  <li key={`item-${index}`}>
                    <span />
                  </li>;
                })}
              </ul>
            );
          }}
        /> */}
        <Legend />
        <Tooltip content={<CategoryTooltip />}/>
        <Pie
          data={finalData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVariant;
