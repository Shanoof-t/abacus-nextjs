"use client";

import { useNewTransactionStore } from "@/store/transaction-store";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useEffect, useState } from "react";
import CreatableSelect from "@/components/creatable-select";
import { useGetAllAccount, useNewAccount } from "@/hooks/use-account";
import TransactionForm from "./transaction-form";

const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransactionStore();

  // account section

  // fetch accounts
  const {
    data: accountData,
    isLoading: accountLoading,
    isSuccess: accountSuccess,
    isError: accountError,
  } = useGetAllAccount();

  // filtter account names
  const accountValues: string[] =
    accountData?.data.map((account) => account.account_name) || [];

  const { mutate: accountMutate } = useNewAccount();
  
  const isLoading = accountLoading;
  const isSuccess = accountSuccess;
  const isError = accountError;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white w-full">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-black/50">
          Add a new transaction
        </SheetDescription>

        {isLoading && <div>Loading Form...</div>}

        {!isLoading && isError && <div>Something wrong happened</div>}

        {isSuccess && !isLoading && (
          <TransactionForm
            accountValues={accountValues}
            accountMutate={accountMutate}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
