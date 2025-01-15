"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Action from "./action";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { budgetSchema } from "@/schemas/budget-schema";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Budget extends z.infer<typeof budgetSchema> {
  _id: string;
  progress: number;
  spent:number
}
export const column: ColumnDef<Budget>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="h-5 w-5 rounded border-gray-300 checked:bg-black checked:border-black text-white  transition-all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="h-5 w-5 rounded border-gray-300 checked:bg-black checked:border-black text-white  transition-all"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "budget_start_date",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) =>
      moment(row.original.budget_start_date).format("DD MMM, YYYY"),
  },
  {
    accessorKey: "budget_end_date",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) =>
      moment(row.original.budget_end_date).format("DD MMM, YYYY"),
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "budget_name",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount_limit",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number(row.original.amount_limit);
      return (
        <Badge
          className="text-xs font-medium px-3.5 py-2.5"
          variant={amount < 0 ? "destructive" : "primary"}
        >
          {amount}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "account_name",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Account
  //         <ArrowUpDown />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Progress
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-xl font-medium w-8 h-8">
                <CircularProgressbar
                  value={row.original.progress}
                  text={`${row.original.progress}%`}
                  styles={{
                    path: {
                      stroke: "#4caf50",
                      strokeWidth: 10,
                    },
                    trail: {
                      stroke: "#e6e6e6",
                      strokeWidth: 10,
                    },
                    text: {
                      fill: "#4caf50",
                      fontWeight: "bold",
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                    },
                  }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm text-center bg-white">
                Used: ₹{row.original.spent} of ₹{row.original.amount_limit}
                <br />
                Progress: {Math.round(row.original.progress)}%
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Action id={row.original._id} />,
  },
];
