"use client";
import TopSection from "@/components/header/top-section";
import { Toaster } from "@/components/ui/toaster";
import { useSocket } from "@/hooks/use-socket";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { init } = useSocket();

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Toaster />
      <TopSection />
      <main className="flex justify-center">{children}</main>
    </>
  );
}

export default Layout;
