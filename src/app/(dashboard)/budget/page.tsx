"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";

import { useNewBudgetStore } from "@/store/budget-store";
import { column } from "./components/column";
import { useGetAllBudget } from "@/hooks/use-budget";

const BudgetPage = () => {
  const { onOpen } = useNewBudgetStore();
  const { data, isSuccess } = useGetAllBudget();
console.log("in budget",data)
  if (isSuccess)
    return (
      <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="lg:flex-row lg:justify-between lg:items-center ">
            <CardTitle className="text-xl line-clamp-1">Budget</CardTitle>
            <Button
              variant="primary"
              size="sm"
              className="text-white border rounded-[.50rem]"
              onClick={onOpen}
            >
              <Plus /> Add new
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              data={data}
              columns={column}
              filterKey=""
              filterPlaceholder=""
              disabled={false}
              onDelete={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    );
};

export default BudgetPage;
