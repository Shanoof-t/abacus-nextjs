"use client";
import EditAccountSheet from "@/app/(dashboard)/accounts/components/account-edit-sheet";
import NewAccountSheet from "@/app/(dashboard)/accounts/components/new-account-sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
