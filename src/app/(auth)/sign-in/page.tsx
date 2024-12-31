"use client";
import Image from "next/image";
import React from "react";
import AuthForm from "../components/form";
import Link from "next/link";

function Page() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
        <h6 className="text-base text-[#7E8CA0]">
          Log in or Create account to get back to your dashboard!
        </h6>
        <div className="border rounded bg-slate-400 p-10 mt-7">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold">Sign In to Abacus</h1>
            <p>Welcome back! Please sign in to continu</p>
          </div>
          {/* google button  */}
          <div className="flex justify-center mt-4">
            <button className="flex w-full bg-red-50 justify-center p-2">
              <Image
                src="./google-icon.svg"
                width={20}
                height={20}
                alt="google-icon"
              />
              <span className="ml-2">Continue with Google</span>
            </button>
          </div>

          <div className="mt-4 w-full flex items-center">
            <hr className="flex-grow text-[#7E8CA0]" />
            <span className="mx-4">or</span>
            <hr className="flex-grow text-[#7E8CA0]" />
          </div>

          {/* form */}

          <AuthForm type="sign-in" />

          <div className="mt-4 w-full flex items-center">
            <hr className="flex-grow text-[#7E8CA0]" />
            <hr className="flex-grow text-[#7E8CA0]" />
          </div>

          <div>
            <p>Don’t have an account?</p>
            <Link href="./sign-up">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 flex justify-center items-center">
        <Image src="./logo.svg" width={100} height={100} alt="logo" />
      </div>
    </div>
  );
}

export default Page;
