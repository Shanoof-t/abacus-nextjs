import { useGetAllNotification } from "@/hooks/use-notification";

import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Separator } from "../ui/separator";
import { Bell } from "lucide-react";

import NotificationCard from "./notification-card";
const Notifications = () => {
  const { data } = useGetAllNotification();

  return (
    <div className="relative">
      <HoverCard>
        <HoverCardTrigger>
          <Bell className="text-white w-5 h-5 m-1 cursor-pointer" />
        </HoverCardTrigger>
        <HoverCardContent className="w-[30rem] mr-16 mt-5">
          <h1>Notification</h1>
          <Separator className="my-4" />
          {data?.data.length === 0 && (
            <div>
              <h1>No messages.</h1>
            </div>
          )}
          {data?.data.map((notification) => (
            <NotificationCard notification={notification} />
          ))}
        </HoverCardContent>
      </HoverCard>
      {data?.data && data?.data.length > 0 ? (
        <span className="absolute top-0 right-0.5 h-3 w-3 bg-red-600 rounded-full border-2"></span>
      ) : null}
    </div>
  );
};

export default Notifications;
