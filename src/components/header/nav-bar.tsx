import React from "react";
import HeaderLogo from "./header-logo";
import Navigations from "./navigation";

import { Settings } from "lucide-react";
import Notifications from "../notification/notifications";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

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
        <Settings
          className="text-white w-5 h-5 m-1 cursor-pointer"
          onClick={() => router.replace("settings")}
        />
      </div>
    </div>
  );
};

export default Navbar;
