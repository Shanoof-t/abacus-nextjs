"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetBankTransactions } from "@/hooks/use-bank";
import { useConsentCreationStore } from "@/store/bank-store";
import { useSearchParams } from "next/navigation";

const BankAccount = () => {
  const searchParams = useSearchParams();

  const { onOpen } = useConsentCreationStore();

  const success = Boolean(searchParams.get("success"));
  const id = searchParams.get("id");

  const { data: transactions } = useGetBankTransactions(id, success);
  console.log("transactions", transactions);
  
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
          <Button
            variant="outline"
            className="outline-0 border-none"
            onClick={onOpen}
          >
            connect
          </Button>
        </div>
      </div>
    </>
  );
};

export default BankAccount;
