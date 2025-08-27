"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Action from "./action";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
export type Transaction = {
  id: string;
  transaction_date: string;
  account_name: string;
  category_name: string;
  transaction_amount: number;
  transaction_type: string;
  transaction_payee: string;
};

export const column: ColumnDef<Transaction>[] = [
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
    accessorKey: "transaction_date",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="sort"
        >
          Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) =>
      moment(row.original.transaction_date).format("DD MMM, YYYY"),
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
    accessorKey: "transaction_payee",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="sort"
        >
          Payee
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "transaction_amount",
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
      const amount = row.original.transaction_amount;
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
  {
    accessorKey: "account_name",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="sort"
        >
          Account
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Action id={row.original.id} />,
  },
];
