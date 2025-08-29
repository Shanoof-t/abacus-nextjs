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
      <div className="flex justify-between items-center space-x-6">
        <Notifications />
        <Settings
          className="text-white w-5 h-5 m-1 cursor-pointer"
          onClick={() => router.replace("settings")}
        />
      </div>
    </div>
  );
};

export default Navbar;
