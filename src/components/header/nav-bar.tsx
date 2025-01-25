import React from "react";
import HeaderLogo from "./header-logo";
import Navigations from "./navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, Loader2, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import Notifications from "../notification/notifications";
import { useLogout } from "@/hooks/use-auth";

const Navbar = () => {
  const { mutate, isSuccess } = useLogout();

  if (isSuccess) {
    window.location.reload();
  }

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-between items-center">
        <HeaderLogo />
        <div className="lg:ms-10">
          <Navigations />
        </div>
      </div>
      <div className="flex justify-between items-center space-x-4">
        <Notifications />
        {/* <div className="ms-4 lg:ms-6">
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
        </div> */}
        <Settings className="text-white w-5 h-5 m-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
