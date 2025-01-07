"use client";
import EditAccountSheet from "@/app/(dashboard)/accounts/components/account-edit-sheet";
import NewAccountSheet from "@/app/(dashboard)/accounts/components/new-account-sheet";
import NewCategorieSheet from "@/app/(dashboard)/categories/components/new-categorie-sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorieSheet />
    </>
  );
};
