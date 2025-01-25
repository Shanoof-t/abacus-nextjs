"use client";

import { useQueryClient } from "@tanstack/react-query";

const WelcomeMsg = () => {
  const queryClient = useQueryClient();
  const cashedSignIn: { user_name: string } | undefined =
    queryClient.getQueryData(["signin"]);

  return (
    <div className="mb-4 mt-6 space-y-2">
      <h2 className="text-2xl lg:text-4xl text-white font-semibold">
        Welcome Back, {cashedSignIn?.user_name} 👋🏻
      </h2>

      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your financial overview Report
      </p>
    </div>
  );
};

export default WelcomeMsg;
