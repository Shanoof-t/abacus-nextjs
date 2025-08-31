"use client";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Ellipsis } from "lucide-react";

export interface IChatbot {
  id: number;
  prompt: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  userId?: number;
  type: "user" | "bot";
  is_temp?: boolean;
}

export default function ChatBotChats({
  chats,
  isLoading,
}: {
  chats: IChatbot[];
  isLoading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="w-full flex flex-col p-2 h-full overflow-scroll space-y-2 bg-neutral-100">
      {chats.map((chat) => (
        <div key={chat.id} className="space-y-2">
          <div className="w-full flex items-start justify-end gap-2 min-h-[2.5rem]">
            <div className="inline-block max-w-[65%] lg:max-w-[70%] min-w-[12%] bg-white text-center rounded-3xl rounded-br-sm p-2 lg:p-3 shadow-md break-words whitespace-pre-wrap">
              <h1 className="text-xs lg:text-sm text-neutral-800 font-medium font-sans">
                {chat.prompt}
              </h1>
              {/* <div className="flex justify-end mt-1">
                <p className="text-[10px] lg:text-xs text-neutral-400">
                  {format(chat.updatedAt, "h:mm a")}
                </p>
              </div> */}
            </div>
            {/* <Avatar className="w-8 h-8">
              <AvatarImage src={localStorage.getItem("picture")!} alt="User" />
              <AvatarFallback className="bg-neutral-300 items-center">
                {localStorage.getItem("user_name")?.slice(0, 1)}
              </AvatarFallback>
            </Avatar> */}
          </div>

          {!chat.is_temp && (
            <div className="w-full flex items-start justify-start gap-2 min-h-[2.5rem]">
              <Avatar className="w-8 h-8">
                <AvatarImage src="bot.jpg" alt="Bot" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>

              <div className="relative inline-block max-w-[65%] lg:max-w-[70%] min-w-[12%] bg-blue-500 rounded-3xl rounded-tl-sm p-2 lg:p-3 shadow-md break-words whitespace-pre-wrap">
                <h1 className="text-xs lg:text-sm text-white font-medium font-sans">
                  {chat.answer}
                </h1>
                {/* <div className="flex justify-end mt-1">
                  <p className="text-[10px] lg:text-xs text-blue-200">
                    {format(chat.updatedAt, "h:mm a")}
                  </p>
                </div> */}
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="w-full flex items-start justify-start gap-2 min-h-[2.5rem]">
          <Avatar className="w-8 h-8">
            <AvatarImage src="bot.jpg" alt="Bot" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>

          <div className="flex items-center justify-center bg-gray-200 rounded-2xl px-4 py-2 shadow-sm">
            <Ellipsis className="w-5 h-5 text-gray-500 animate-pulse" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
