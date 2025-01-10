"use client";

import {
  useEditTransactionStore,
  useNewTransactionStore,
} from "@/store/transaction-store";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useGetAllAccount, useNewAccount } from "@/hooks/use-account";
import TransactionForm from "./transaction-form";
import { useGetAllCategories, useNewCategory } from "@/hooks/use-categorie";
import { useGetTransaction } from "@/hooks/use-transaction";

const EdtTransactionSheet = () => {
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
  const onCreateAccount = (name: string) =>
    accountMutate({ account_name: name });

  // category section

  // fetch categories
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
    isError: categoryError,
  } = useGetAllCategories();

  // filter category name
  const categoryValues: string[] =
    categoryData?.data.map((category) => category.category_name) || [];
  const { mutate: categoryMutate } = useNewCategory();

  const onCreateCategory = (name: string) =>
    categoryMutate({ category_name: name });

  // existing transaction

  // fetch transaction

  const { id, isOpen, onClose } = useEditTransactionStore();

  const {
    data: transactionData,
    isLoading: transactionLoading,
    isError: transactionError,
    isSuccess: transactionSuccess,
  } = useGetTransaction(id);

  const isLoading = accountLoading || categoryLoading || transactionLoading;
  const isSuccess = accountSuccess || categorySuccess || transactionSuccess;
  const isError = accountError || categoryError || transactionError;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white w-full">
        <SheetHeader>
          <SheetTitle>Edi Transaction</SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-black/50">
          Edit an existing transaction
        </SheetDescription>

        {isLoading && <div>Loading Form...</div>}

        {!isLoading && isError && <div>Something wrong happened</div>}

        {isSuccess && !isLoading && (
          <TransactionForm
            accountValues={accountValues}
            onAccountCreate={onCreateAccount}
            categoryValues={categoryValues}
            onCategoryCreate={onCreateCategory}
            isEdit={true}
            transactionData={transactionData}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EdtTransactionSheet;
