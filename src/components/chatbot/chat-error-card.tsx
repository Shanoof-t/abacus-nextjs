import Image from "next/image";
import React from "react";

export default function ChatErrorCard() {
  return (
    <div className="flex  justify-center items-center overflow-y-auto p-2 w-full h-full  relative">
      <Image
        src="/robot-error.png"
        alt="robot"
        className="absolute animate-float"
        width={200}
        height={100}
      />

      <div className=" w-36 h-10 absolute bottom-36 right-6 animate-float">
        <div className="relative">
          {" "}
          <div className="bg-white shadow w-1 h-1 absolute top-0 left-0  rounded-full"></div>
          <div className="bg-white shadow w-2 h-2 absolute top-1 left-1  rounded-full"></div>
          <div className="shadow bg-neutral-100 w-36 z-50 absolute -right-1 top-1 rounded-2xl px-3 py-2 leading-tight">
            <span className="text-xs text-red-600 font-sans">
              Ooh no! <br></br>
              <span className="font-semibold text-red-800">
                Unable to process.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
