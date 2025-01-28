import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const BankAccount = () => {
  return (
    <>
      <Separator className="border-gray-300" />
      <div className="flex justify-between py-5 items-center">
        <div className="flex justify-between space-x-36">
          <div>
            <h1 className="text-base font-medium">Bank account</h1>
          </div>
          <div className="text-muted-foreground flex justify-center items-center">
            <h1 className="text-muted-foreground">No bank account connected</h1>
          </div>
        </div>
        <div>
          <Button variant="outline" className="outline-0 border-none">
            conncet
          </Button>
        </div>
      </div>
    </>
  );
};

export default BankAccount;
