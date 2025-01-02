import React from "react";
import HeaderLogo from "./header-logo";
import Navigations from "./navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Loader2 } from "lucide-react";

const Navbar = () => {
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
          <Bell className="text-white w-5 h-5 m-1"/>
          <span className="absolute top-0 right-0.5 h-3 w-3 bg-red-600 rounded-full border-2"></span>
        </div>
        <div className="ms-4 lg:ms-6">
          <Avatar className="size-8" >
            <AvatarImage src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"></AvatarImage>
            <AvatarFallback><Loader2  className="size-8 animate-spin text-slate-400"/></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
