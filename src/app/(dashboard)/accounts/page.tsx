"use client";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/hooks/account-hooks";

import { Plus } from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "@/components/ui/data-table";
import { column, Account } from "./columns";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await apiClient.get(API_ROUTES.ACCOUNT.GET_ALL_ACCOUNTS);
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (ids: string[]) => {
      console.log("ids", ids);
      const response = await apiClient.post(
        API_ROUTES.ACCOUNT.BULK_DELETE_ACCOUNTS,
        ids
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  return (
    <div className="-mt-28 bg-white container overflow-y-auto border rounded-[.50rem]">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex-row lg:justify-between lg:items-center ">
          <CardTitle className="text-xl line-clamp-1">Accounts</CardTitle>
          <Button
            size="sm"
            variant="primary"
            className="bg-slate-900 text-white border rounded-[.50rem]"
            onClick={onOpen}
          >
            <Plus /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
              <Skeleton className="w-full h-10 my-3 border rounded bg-gray-200 " />
            </div>
          ) : (
            <DataTable
              data={data.data}
              columns={column}
              filterKey="account_name"
              filterPlaceholder="name"
              disabled={false}
              onDelete={(rows) => {
                const ids = rows.map((row) => row.original._id);
                mutate(ids);
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
