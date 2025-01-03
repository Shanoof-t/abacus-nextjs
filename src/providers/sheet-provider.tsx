"use client";
import NewAccountSheet from "@/components/new-account-sheet";
// import { useEffect, useState } from "react";

export const SheetProvider = () => {
//   const [isMount, setIsMount] = useState(false);

//   useEffect(() => {
//     setIsMount(true);
//   }, []);

//   if (!isMount) return null;

  return (
    <>
      <NewAccountSheet />
    </>
  );
};
