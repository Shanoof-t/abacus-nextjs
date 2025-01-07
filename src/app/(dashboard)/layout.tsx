import TopSection from "@/components/header/top-section";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <Toaster />
      <TopSection />
      <main className="flex justify-center">{children}</main>
    </>
  );
}

export default layout;
