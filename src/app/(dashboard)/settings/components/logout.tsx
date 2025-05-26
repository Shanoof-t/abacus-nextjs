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
        <div className="flex justify-between  lg:w-1/2 items-center">
          <div className=" w-1/3">
            <h1 className="text-base font-medium">Log out</h1>
          </div>
          <div className="text-muted-foreground flex justify-start items-center w-2/3">
            <h1 className="text-muted-foreground">Logout current account.</h1>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
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
