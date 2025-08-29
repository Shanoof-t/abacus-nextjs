"use client";
import Chatbot from "@/components/chatbot/chat-bot";
import TopSection from "@/components/header/top-section";
import { Toaster } from "@/components/ui/toaster";
import { useSocket } from "@/hooks/use-socket";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const picture = searchParams.get("picture");
  const router = useRouter();
  const { init } = useSocket();

  useEffect(() => {
    if (name && picture) {
      localStorage.setItem("user_name", name);
      localStorage.setItem("picture", picture);
      const newUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      router.replace(newUrl);
    } else {
      const storedName = localStorage.getItem("user_name");
      if (!storedName) {
        console.warn("No user name found in URL or localStorage");
      }
    }

    init();
  }, [name, picture, router]);

  return (
    <>
      <Toaster />
      <TopSection />
      <main className="flex justify-center">{children}</main>
      <Chatbot />
    </>
  );
}

export default Layout;
