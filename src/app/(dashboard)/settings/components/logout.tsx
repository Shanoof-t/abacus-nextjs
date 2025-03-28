"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/hooks/use-auth";
import React from "react";

const Logout = () => {
  const { mutate, isSuccess } = useLogout();
  if (isSuccess) {
    window.location.reload();
  }

  return (
    <>
      <Separator className="border-gray-300" />
      <div className="flex justify-between py-5 items-center">
        <div className="flex justify-between space-x-36">
          <div>
            <h1 className="text-base font-medium">Log Out</h1>
          </div>
          <div className="text-muted-foreground flex justify-center items-center">
            <h1 className="text-muted-foreground">Logout current account.</h1>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="outline-0 border-none"
            onClick={() => mutate()}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Logout;
