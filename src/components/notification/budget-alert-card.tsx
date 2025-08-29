"use client";
import { Bell } from "lucide-react";
import React from "react";

import { Notification } from "@/services/notification-service";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useUpdateNotification } from "@/hooks/use-notification";

const BudgetAlertCard = ({ notification }: { notification: Notification }) => {
  const { mutate } = useUpdateNotification();
  return (
    <>
      <div className="flex p-2">
        <div className="mr-5">
          {notification.is_server_notification && (
            <div className="bg-slate-200 p-3 rounded-full border-[0.0.5rem] border-gray-600 text-gray-600">
              <Bell className="size-4" />
            </div>
          )}
        </div>
        <div>
          <div>
            {/* title */}
            <div className="flex justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-600">
                  {notification.title}
                </h2>
              </div>
            </div>
            <h6 className="text-sm text-muted-foreground ">
              <div
                dangerouslySetInnerHTML={{
                  __html: notification.message,
                }}
              ></div>
            </h6>
          </div>
          <div className="flex justify-end">
            <Button
              className="text-xs font-semibold"
              variant="primary"
              size="sm"
              onClick={() =>
                mutate({ action: "READED_BUDGET_ALERT", id: notification.id })
              }
            >
              Okey
            </Button>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator />
    </>
  );
};

export default BudgetAlertCard;
