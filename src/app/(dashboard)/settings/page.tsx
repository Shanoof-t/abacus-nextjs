import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import BankAccount from "./components/bank-account";
import Logout from "./components/logout";

const Settings = () => {
  return (
    <div className="-mt-28 bg-white container overflow-y-auto border-none rounded-[.50rem]">
      <Card className="border-none">
        <CardHeader className="lg:flex-row lg:justify-between lg:items-center ">
          <CardTitle className="text-xl line-clamp-1">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <BankAccount />
          <Logout />
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
