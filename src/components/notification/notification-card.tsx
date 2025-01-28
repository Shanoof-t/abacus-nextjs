import { Bell } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useTransactionRescheduleStore } from "@/store/notification-store";
import { useUpdateNotification } from "@/hooks/use-notification";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Notification } from "@/services/notification-service";

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const { onOpen, setNotificationId } = useTransactionRescheduleStore();
  const { mutate: notificationMutation } = useUpdateNotification();

  return (
    <div>
      <div className="flex">
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
              {/* <div>
            <span className="text-sm text-muted-foreground">
              2h ago
            </span>
          </div> */}
            </div>
            <h6 className="text-sm text-muted-foreground ">
              <div
                dangerouslySetInnerHTML={{
                  __html: notification.message,
                }}
              ></div>
            </h6>
          </div>
          <div className="space-x-2 space-y-2 flex justify-between items-center">
            <div className="space-y-2 space-x-2">
              <Button
                className="text-xs font-semibold "
                size="sm"
                variant="primary"
                onClick={() =>
                  notificationMutation({
                    id: notification._id,
                    action: "ESTIMATED",
                  })
                }
              >
                Approve
              </Button>
              <Button
                className="text-xs font-semibold"
                variant="outline"
                size="sm"
                onClick={() => {
                  setNotificationId(notification._id);
                  onOpen();
                }}
              >
                Reschedule
              </Button>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    className="text-xs font-semibold"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      notificationMutation({
                        id: notification._id,
                        action: "CANCEL_RECURRING",
                      })
                    }
                  >
                    Cancel
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mx-8 my-2">
                  Cancel the recurring transaction
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
    </div>
  );
};

export default NotificationCard;
