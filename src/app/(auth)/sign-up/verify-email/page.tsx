"use client";
import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useOtpVerify, useResendOtp } from "@/hooks/auth-hooks";
import { useRouter } from "next/navigation";

type SignUpData = {
  data: {
    userId: string;
  };
};

function Page() {
  const [otp, setOtp] = useState<string>("");

  const [inputs, setInputes] = useState([
    "key1",
    "key2",
    "key3",
    "key4",
    "key5",
    "key6",
  ]);

  const handleChange = (e: string) => {
    setOtp(e);
  };

  const { mutate: verifyMutate, error: verifyError } = useOtpVerify();
  const { mutate: resendMutate, error: resendError } = useResendOtp();

  const query = useQueryClient();

  const router = useRouter();

  const signUpData = query.getQueryData<SignUpData>(["signup"]);

  const handleSubmit = () => {
    if (signUpData?.data) {
      const { data } = signUpData;
      verifyMutate(
        { otp, userId: data.userId },
        {
          onSuccess: () => {
            router.replace("/sign-in");
          },
        }
      );
    }
  };

  const handleResentOTP = () => {
    if (signUpData?.data) {
      const { data } = signUpData;
      resendMutate(
        { userId: data.userId },
        {
          onSuccess: () => {
            // router.replace("/sign-in");
          },
        }
      );
    }
  };
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
        <h6 className="text-base text-[#7E8CA0]">
          Log in or Create account to get back to your dashboard!
        </h6>
        <div className="border rounded bg-slate-400 p-10 mt-7">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold">Verify your email</h1>
            <p>
              Enter the verification code sent to your email {"'this is email'"}
            </p>
          </div>

          {/* form */}

          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={handleChange}
          >
            {inputs.map((value, index) => {
              return (
                <InputOTPGroup className="flex justify-center " key={value}>
                  <InputOTPSlot index={index} />
                </InputOTPGroup>
              );
            })}
          </InputOTP>

          {verifyError?.message ||
            (resendError?.message && (
              <p className="text-sm text-red-600">
                {verifyError!.message || resendError!.message}
              </p>
            ))}

          {/* retry */}

          <div className="text-center mt-4">
            <p className="text-sm">
              Didn't receive a code?{" "}
              <button
                className="text-blue-600 hover:text-blue-700"
                onClick={handleResentOTP}
              >
                Resend(1)
              </button>
            </p>
          </div>

          {/* Submit Button */}

          <div>
            <Button
              onClick={handleSubmit}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Continue
            </Button>
          </div>

          <div className="mt-4 w-full flex items-center">
            <hr className="flex-grow text-[#7E8CA0]" />
            <hr className="flex-grow text-[#7E8CA0]" />
          </div>
        </div>
      </div>
      <div className="bg-blue-600 flex justify-center items-center">
        <Image src="../logo.svg" width={100} height={100} alt="logo" />
      </div>
    </div>
  );
}

export default Page;
