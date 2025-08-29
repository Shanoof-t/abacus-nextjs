"use client";

import * as React from "react";
import Image from "next/image";
import { SendHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ChatBotChats, { IChatbot } from "./chat-bot-chats";
import ChatWelcomeCard from "./chat-welcome-card";

export default function Chatbot() {
  const data: IChatbot[] = [
    {
      id: 1,
      prompt: "Can I afford a ₹10,000 phone this month?",
      answer:
        "You have ₹8,500 left. Buying a ₹10,000 phone will exceed your limit.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 123,
      type: "user",
    },
    {
      id: 2,
      prompt: "Can I afford a ₹10,000 phone this month?",
      answer:
        "You have ₹8,500 left. Buying a ₹10,000 phone will exceed your limit.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 123,
      type: "user",
    },
    // {
    //   id: 2,
    //   prompt: "",
    //   answer:
    //     "Remember to save at least ₹2,000 this month to stay on track with your budget.",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   userId: 123,
    //   type: "bot",
    // },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer">
          <Image src="/bot.jpg" fill alt="bot" className="rounded-full" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 lg:w-96 h-96 p-2 flex flex-col justify-between bg-neutral-100"
        side="top"
        align="end"
      >
        {!data.length ? <ChatWelcomeCard /> : <ChatBotChats chats={data} />}

        <div className="flex items-center gap-2 ">
          <input
            placeholder="Ask Something..."
            className="flex-1 h-10 w-full rounded-md px-3 py-2 text-sm border  focus-visible:border focus-visible:outline-none focus-visible:border-blue-600 transition"
          />

          <Button
            size="icon"
            className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-full"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
