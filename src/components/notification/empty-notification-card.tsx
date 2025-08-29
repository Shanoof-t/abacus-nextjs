import { BellOff } from "lucide-react";
import React from "react";

export default function EmptyNotificationCard() {
  return (
    <div className="flex flex-col items-center py-4 px-2">
      <BellOff className="w-8 h-8 text-gray-400 mb-2" />
      <p className="text-sm text-gray-500">No notifications</p>
    </div>
  );
}
