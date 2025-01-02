import TopSection from "@/components/top-section";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <TopSection />
      <main>{children}</main>
    </>
  );
}

export default layout;
