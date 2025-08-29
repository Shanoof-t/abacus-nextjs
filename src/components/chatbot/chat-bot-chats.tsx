import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface IChatbot {
  id: number;
  prompt: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  type: "user" | "bot";
}

export default function ChatBotChats({ chats }: { chats: IChatbot[] }) {
  return (
    <div className="w-full flex flex-col p-2 h-full overflow-scroll space-y-2 bg-neutral-100">
      <div className="w-full flex items-start justify-start min-h-10 gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="bot.jpg" alt="Bot" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="w-[70%] bg-blue-500 rounded-2xl p-3 shadow-sm">
          <h1 className="text-sm text-white font-medium">
            You have ₹8,500 left. Buying a ₹10,000 phone will exceed your limit.
          </h1>
          <div className="flex justify-end">
            <p className="text-xs text-blue-200">8:30 PM</p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-start justify-end min-h-10 gap-2">
        <div className="w-[70%] bg-white rounded-2xl p-3 shadow-sm">
          <h1 className="text-sm text-neutral-800 font-medium">
            Can I afford a ₹10,000 phone this month?
          </h1>
          <div className="flex justify-end">
            <p className="text-xs text-neutral-400">8:30 PM</p>
          </div>
        </div>
        <Avatar className="w-8 h-8">
          <AvatarImage src={localStorage.getItem("picture")!} alt="User" />
          <AvatarFallback className="bg-neutral-300 items-center">
            {localStorage.getItem("user_name")?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
