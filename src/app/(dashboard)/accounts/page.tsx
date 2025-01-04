"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/hooks/account-hooks";

import { Plus } from "lucide-react";
import { columns, Account } from "./column";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await apiClient.get(API_ROUTES.ACCOUNT.GET_ALL_ACCOUNTS);
      return response.data;
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
          <DataTable
            onDelete={() => {}}
            disabled={false}
            columns={columns}
            data={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
