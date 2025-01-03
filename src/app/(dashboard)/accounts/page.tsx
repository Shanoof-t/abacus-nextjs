"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/hooks/account-hooks";

import { Plus } from "lucide-react";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  return (
    <div>
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
      </Card>
    </div>
  );
};

export default AccountsPage;
