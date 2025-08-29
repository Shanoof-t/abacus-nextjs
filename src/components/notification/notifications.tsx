import { useGetAllNotification } from "@/hooks/use-notification";
import React, { useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { useSocketStore } from "@/store/socket-store";
import { useQueryClient } from "@tanstack/react-query";
import { AllNotifications } from "@/services/notification-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import RecurringTransactionCard from "./recurring-transaction-card";
import EmptyNotificationCard from "./empty-notification-card";
import BudgetAlertCard from "./budget-alert-card";

const Notifications = () => {
  const { data } = useGetAllNotification();
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on("notification:send", (data: Notification) => {
      console.log("notification:send: ", data);
      queryClient.setQueryData(["notifications"], (prev: AllNotifications) => {
        return { ...prev, data: [...prev.data, data] };
      });
    });
  }, [socket, queryClient]);

  return (
    <div className="relative flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Bell className="text-white w-5 h-5  cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute top-0 right-0 w-64 lg:w-96">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {data?.data.length === 0 && <EmptyNotificationCard />}

          {data?.data.map((notification) => {
            switch (notification.notification_type) {
              case "reccuring-alert":
                return (
                  <RecurringTransactionCard
                    notification={notification}
                    key={notification.id}
                  />
                );
              case "budget-alert":
                return (
                  <BudgetAlertCard
                    notification={notification}
                    key={notification.id}
                  />
                );

              default:
                return <EmptyNotificationCard key={notification.id} />;
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {data?.data && data?.data.length > 0 ? (
        <span className="absolute -top-1 right-0 h-3 w-3 bg-red-600 rounded-full border-2"></span>
      ) : null}
    </div>
  );
};

export default Notifications;
