"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatBotLoading() {
  const loadingItems = Array.from({ length: 3 });

  return (
    <div className="w-full flex flex-col p-2 h-full overflow-scroll space-y-4 bg-neutral-100">
      {loadingItems.map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="w-full flex items-start justify-end gap-2 min-h-[2.5rem]">
            <Skeleton 
              className={`inline-block max-w-[60%] lg:max-w-[70%] min-w-[30%] h-6 lg:h-8 rounded-2xl rounded-br-sm bg-neutral-300 animate-pulse`} 
            />
          </div>

          <div className="w-full flex items-start justify-start gap-2 min-h-[2.5rem]">
            <Skeleton className="w-8 h-8 bg-neutral-300 rounded-full animate-pulse" />

            <Skeleton 
              className={`relative inline-block max-w-[65%] lg:max-w-[70%] min-w-[40%] h-6 lg:h-8 rounded-2xl rounded-tl-sm bg-blue-500/20 animate-pulse`} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
