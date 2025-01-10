import React from "react";
import HeaderLogo from "./header-logo";
import Navigations from "./navigation"; 
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Bell, Loader2, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

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
      <div className="flex justify-between items-center">
        <div className="relative">
          <Bell className="text-white w-5 h-5 m-1" />
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
