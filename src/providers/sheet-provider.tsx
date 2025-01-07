"use client";
import EditAccountSheet from "@/app/(dashboard)/accounts/components/account-edit-sheet";
import NewAccountSheet from "@/app/(dashboard)/accounts/components/new-account-sheet";
import EditCategorySheet from "@/app/(dashboard)/categories/components/edit-categorie-sheet";
import NewCategorieSheet from "@/app/(dashboard)/categories/components/new-categorie-sheet";
import NewTransactionSheet from "@/app/(dashboard)/transactions/components/new-transaction-sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorieSheet />
      <EditCategorySheet />
      <NewTransactionSheet />
    </>
  );
};
