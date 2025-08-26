"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "@/components/ui/data-table";
import { column } from "./columns";
import { useNewAccountStore } from "@/store/account-store";
import { useBulkAccountDelete, useGetAllAccount } from "@/hooks/use-account";

const AccountsPage = () => {
  const { onOpen } = useNewAccountStore();

  const { data, isLoading, isSuccess } = useGetAllAccount(true);

  const { mutate } = useBulkAccountDelete();

  if (isLoading) {
    return (
      <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="lg:flex-row lg:justify-between lg:items-center">
            <Skeleton className="h-8 w-48 bg-gray-200 border rounded" />{" "}
            <Skeleton className="h-8 w-40 bg-gray-200 border rounded" />
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[500px]">
            <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
        <Card className="border-none drop-shadow-sm">
          <CardContent className="flex justify-center items-center h-[500px]">
            <CardTitle className="text-xl line-clamp-1">
              Something Wrongs Happened!
            </CardTitle>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex-row lg:justify-between lg:items-center ">
          <CardTitle className="text-xl line-clamp-1">Accounts</CardTitle>
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
            data={data.data}
            columns={column}
            filterKey="account_name"
            filterPlaceholder="name"
            disabled={false}
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              mutate(ids);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
