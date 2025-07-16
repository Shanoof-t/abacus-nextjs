"use client";
import TopSection from "@/components/header/top-section";
import { Toaster } from "@/components/ui/toaster";
import { useSocket } from "@/hooks/use-socket";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const { init } = useSocket();

  useEffect(() => {
    localStorage.setItem("user_name", name!);
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
    init();
  }, [name, init]);

  return (
    <>
      <Toaster />
      <TopSection />
      <main className="flex justify-center">{children}</main>
    </>
  );
}

export default Layout;
