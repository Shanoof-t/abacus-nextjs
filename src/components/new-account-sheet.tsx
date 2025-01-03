import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useNewAccount } from "@/hooks/account-hooks";

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Create a new account to track your transactions
        </SheetDescription>
        <SheetFooter>
          <SheetClose>
            <Button type="submit">Create account</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
