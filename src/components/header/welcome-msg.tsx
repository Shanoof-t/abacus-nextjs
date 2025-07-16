"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const WelcomeMsg = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [userName, setUserName] = useState<string>(searchParams.get("name")!);
  
  useEffect(() => {
    const name = localStorage.getItem("user_name");
    if (name) {
      setUserName(name);
    }
  }, [name]);

  return (
    <div className="mb-4 mt-6 space-y-2">
      <h2 className="text-2xl lg:text-4xl text-white font-semibold">
        Welcome Back, {userName} 👋🏻
      </h2>

      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your financial overview Report
      </p>
    </div>
  );
};

export default WelcomeMsg;
