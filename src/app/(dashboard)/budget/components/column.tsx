"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Action from "./action";
import moment from "moment";
import { z } from "zod";
import { budgetSchema } from "@/schemas/budget-schema";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Budget extends z.infer<typeof budgetSchema> {
  id: string;
  progress: number;
  total_spent: number;
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
          variant="sort"
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
          variant="sort"
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
          variant="sort"
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
          variant="sort"
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
          variant="sort"
        >
          Amount
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number(row.original.amount_limit);
      return <span className="font-medium">{amount}</span>;
    },
  },

  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="sort"
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
                      stroke:
                        row.original.progress < 75
                          ? "green"
                          : row.original.progress >= 75 &&
                            row.original.progress > 100
                          ? "orange"
                          : "red",
                      strokeWidth: 10,
                    },
                    trail: {
                      stroke: "#e6e6e6",
                      strokeWidth: 10,
                    },
                    text: {
                      fill:
                        row.original.progress < 75
                          ? "green"
                          : row.original.progress >= 75 &&
                            row.original.progress > 100
                          ? "orange"
                          : "red",
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
                Used: ₹{row.original.total_spent} of ₹
                {row.original.amount_limit}
                <br />
                Progress: {row.original.progress}%
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Action id={row.original.id} />,
  },
];
