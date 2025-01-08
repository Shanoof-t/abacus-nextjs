"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import { useNewTransactionStore } from "@/store/transaction-store";
import { Plus } from "lucide-react";
import React from "react";

const Page = () => {
  const { onOpen } = useNewTransactionStore();
  
  return (
    <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="text-xl line-clamp-1">
            Transaction history
          </CardTitle>
          <Button
            variant="primary"
            size="sm"
            className="text-white border rounded-[.50rem]"
            onClick={() => onOpen()}
          >
            <Plus /> Add new
          </Button>
        </CardHeader>
        <CardContent className="h-64">
          <DataTable
            columns={[]}
            data={[]}
            filterKey=""
            filterPlaceholder=""
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
