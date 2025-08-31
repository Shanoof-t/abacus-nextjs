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
import { useCreateAnswer, userGetChats } from "@/hooks/use-chatbot";
import { useQueryClient } from "@tanstack/react-query";
import { IGetChats } from "@/services/chatbot-service";

// const dummyData: IGetChats = {
//   status: "success",
//   message: "Dummy chats fetched",
//   data: [
//     {
//       id: 1,
//       prompt: "Hi, how are you?",
//       answer: "I'm doing great! How can I assist you today?",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       type: "user",
//     },
//     {
//       id: 2,
//       prompt: "What's my balance?",
//       answer: "Your current balance is ₹12,500.",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       type: "bot",
//     },
//     {
//       id: 3,
//       prompt: "Can I afford a ₹10,000 phone this month?",
//       answer: "Based on your expenses, yes, you can afford it.",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       type: "bot",
//     },
//     {
//       id: 4,
//       prompt: "Thanks!",
//       answer: "You're welcome! Do you need any finance advice or rules?",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       type: "bot",
//     },
//   ],
// };

export default function Chatbot() {
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = React.useState("");
  const { data } = userGetChats(true);

  const { mutate, isPending } = useCreateAnswer();

  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleOpenChatbot = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);

      const rafId = requestAnimationFrame(() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      });

      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(rafId);
      };
    }
  }, [isOpen]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateAnswer();
    }
  };

  const handleCreateAnswer = () => {
    if (!prompt.trim()) {
      inputRef.current?.focus();
      return;
    }

    const newData: IChatbot = {
      answer: "",
      createdAt: new Date().toISOString(),
      id: Date.now(),
      prompt: prompt.trim(),
      type: "user",
      updatedAt: new Date().toISOString(),
      is_temp: true,
    };

    queryClient.setQueryData<IGetChats>(["chats"], (prev) => {
      if (!prev) {
        return {
          status: "success",
          message: "Chat created",
          data: [newData],
        };
      }

      return {
        ...prev,
        data: [...prev.data, newData],
      };
    });

    mutate({ prompt: prompt.trim() });
    setPrompt("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
          onClick={handleOpenChatbot}
        >
          <Image src="/bot.jpg" fill alt="bot" className="rounded-full" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 lg:w-96 h-96 p-2 flex flex-col justify-between bg-neutral-100"
        side="top"
        align="end"
      >
        {!data?.data.length ? (
          <ChatWelcomeCard />
        ) : (
          <ChatBotChats chats={data.data} isLoading={isPending} />
        )}

        {/* {!dummyData?.data.length ? (
          <ChatWelcomeCard />
        ) : (
          <ChatBotChats chats={dummyData.data} isLoading={isPending} />
        )} */}

        <div className="flex items-center gap-2">
          <input
            placeholder="Ask Something..."
            className="flex-1 h-10 w-full rounded-md px-3 py-2 text-sm border focus-visible:border focus-visible:outline-none focus-visible:border-blue-600 transition"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            ref={inputRef}
            autoComplete="off"
          />

          <Button
            size="icon"
            className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-full hover:from-blue-800 hover:to-blue-700 transition-all"
            onClick={handleCreateAnswer}
            type="submit"
            disabled={isPending || !prompt.trim()}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
