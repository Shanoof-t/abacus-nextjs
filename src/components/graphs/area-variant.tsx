import { Transaction } from "@/services/overview-service";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CustomTooltip from "./transaction-tooltip";
import { format } from "date-fns";

const AreaVariant = ({ data }: { data?: Transaction[] }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="transaction_date"
          tickFormatter={(value) => {
            return format(value, "dd MMM");
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="income" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expense" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#income)"
          className="drop-shadow-sm"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stackId="expense"
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#expense)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaVariant;
