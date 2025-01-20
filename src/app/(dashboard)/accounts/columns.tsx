"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Action from "./action";

export type Account = {
  _id: string;
  account_balance: number;
  account_name: string;
};

export const column: ColumnDef<Account>[] = [
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
    accessorKey: "account_name",
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
    accessorKey: "account_balance",
    header: () => {
      return <span className="font-normal text-secondary-foreground">Balance</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Action id={row.original._id} />,
  },
];
