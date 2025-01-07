"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransactionStore } from "@/store/transaction-store";

const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransactionStore();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white w-full">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-black/50">
          Create a new transaction to track your transactions
        </SheetDescription>
        <SheetFooter className="mt-4">
          <div className="w-full">
            <Button
              type="submit"
              variant="primary"
              className="w-full border rounded-[.50rem] text-white"
            >
              Add Transaction
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
