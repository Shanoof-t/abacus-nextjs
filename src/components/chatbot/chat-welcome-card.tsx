import Image from "next/image";
import React from "react";

export default function ChatWelcomeCard() {
  return (
    <div className="flex  justify-center items-center overflow-y-auto p-2 w-full h-full  relative">
      <Image
        src="/robot.png"
        alt="robot"
        className="absolute animate-float"
        width={200}
        height={100}
      />

      <div className=" w-36 h-10 absolute bottom-36 right-1 animate-float">
        <div className="relative">
          {" "}
          <div className="bg-white shadow w-1 h-1 absolute top-0 left-0  rounded-full"></div>
          <div className="bg-white shadow w-2 h-2 absolute top-1 left-1  rounded-full"></div>
          <div className="shadow bg-neutral-100 w-32 z-50 absolute right-3 top-1 rounded-2xl px-3 py-2 leading-tight">
            <span className="text-xs text-neutral-700 font-sans">
              Hey there!👋 <br></br>
              <span className="font-semibold text-neutral-900">
                Need any advice?
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
