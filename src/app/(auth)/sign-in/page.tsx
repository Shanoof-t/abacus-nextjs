"use client";
import Image from "next/image";
import React from "react";
import AuthForm from "../components/form";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  min-h-screen">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
        <h6 className="lg:text-base text-[#7E8CA0] xs:text-sm sm:text-xs text-center mt-3">
          Log in or Create account to get back to your dashboard!
        </h6>

        <div className="border rounded shadow-xl py-5 px-10 mt-4">
          <div className="flex flex-col justify-center items-center">
            <h6 className="font-bold text-sm">Sign In to Abacus</h6>
            <p className="text-xs">Welcome back! Please sign in to continue</p>
          </div>
          {/* google button  */}
          <div className="flex justify-center mt-4">
            <Button className="shadow-lg hover:bg-gray-100 h-[1.5rem] w-full border rounded text-[0.700rem]">
              <Image
                src="./google-icon.svg"
                width={15}
                height={15}
                alt="google-icon"
              />
              Continue with Google
            </Button>
          </div>

          <div className="mt-3 mb-1 w-full flex items-center">
            <hr className="flex-grow text-[#7E8CA0]" />
            <span className="mx-4 text-xs">or</span>
            <hr className="flex-grow text-[#7E8CA0]" />
          </div>

          {/* form */}

          <AuthForm type="sign-in" />

          <div className="my-4 w-full flex items-center">
            <hr className="flex-grow text-[#7E8CA0]" />
            <hr className="flex-grow text-[#7E8CA0]" />
          </div>

          <div className="text-xs flex items-center space-x-1 justify-center">
            <p>Don’t have an account?</p>
            <Link href="./sign-up" className="font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 flex justify-center items-center hidden lg:flex">
        <Image src="./logo.svg" width={100} height={100} alt="logo" />
      </div>
    </div>
  );
}

export default Page;
