import React from "react";
import HeaderLogo from "./header-logo";
import Navigations from "./navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, Loader2, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  useGetAllNotification,
  useUpdateNotification,
} from "@/hooks/use-notification";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useTransactionRescheduleStore } from "@/store/notification-store";

const Navbar = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(API_ROUTES.AUTH.LOGOUT);
      return response.data;
    },
  });

  if (isSuccess) {
    window.location.reload();
  }

  const { data } = useGetAllNotification();

  const handleLogout = () => {
    mutate();
  };
  const { onOpen } = useTransactionRescheduleStore();
  const handleReschedule = () => {
    onOpen();
  };
  // notification

  const { mutate: notificationMutation } = useUpdateNotification();

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-between items-center">
        <HeaderLogo />
        <div className="lg:ms-10">
          <Navigations />
        </div>
      </div>
      <div className="flex justify-between items-center">
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
                              This is sample title
                            </h2>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">
                              2h ago
                            </span>
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
                            onClick={handleReschedule}
                          >
                            Reschedule
                          </Button>
                        </div>
                        <Button
                          className="text-xs font-semibold"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            notificationMutation({
                              id: notification._id,
                              action: "NOT_ESTIMATED",
                            })
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />
                </div>
              ))}
            </HoverCardContent>
          </HoverCard>
          <span className="absolute top-0 right-0.5 h-3 w-3 bg-red-600 rounded-full border-2"></span>
        </div>
        <div className="ms-4 lg:ms-6">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="size-8">
                <AvatarImage src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"></AvatarImage>
                <AvatarFallback>
                  <Loader2 className="size-8 animate-spin text-slate-400" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className=" bg-white mt-3"
                onClick={handleLogout}
              >
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
