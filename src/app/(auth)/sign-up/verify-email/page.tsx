"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useOtpVerify, useResendOtp, useSignup } from "@/hooks/use-auth";

type SignUpData = {
  data: {
    userId: string;
    email: string;
  };
};

const Page = () => {
  const [otp, setOtp] = useState<string>("");
  const [inputs] = useState(["key1", "key2", "key3", "key4", "key5", "key6"]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const signUpData = queryClient.getQueryData<SignUpData>(["signup"]);
  const { data } = useSignup();
  console.log("signUpdata", signUpData);
  console.log("data-sign", data);
  const { mutate: verifyMutate, error: verifyError } = useOtpVerify();
  const { mutate: resendMutate, error: resendError } = useResendOtp();

  const handleChange = (value: string) => setOtp(value);

  const handleSubmit = () => {
    console.log("handleSubmit clicked");
    if (signUpData?.data) {
      console.log("inside mutate");
      const { userId } = signUpData.data;
      verifyMutate(
        { otp, userId },
        {
          onSuccess: () => {
            router.replace("/sign-in");
          },
        }
      );
    }
  };

  const handleResendOTP = () => {
    if (signUpData?.data) {
      const { userId } = signUpData.data;
      resendMutate({ userId });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center px-6">
        <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
        <h6 className="text-base text-[#7E8CA0] text-center mt-2">
          Log in or Create an account to get back to your dashboard!
        </h6>

        <div className="border rounded shadow-xl py-5 px-10 mt-4 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="font-bold text-lg">Verify your email</h2>
            <p className="text-sm text-[#7E8CA0]">
              Enter the verification code sent to your email{" "}
              <strong>{`${signUpData?.data.email}`}</strong>
            </p>
          </div>

          <div className="items-center flex justify-center flex-col">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={handleChange}
              className="flex justify-center space-x-2 mb-4"
            >
              {inputs.map((key, index) => (
                <InputOTPGroup key={key} className="relative">
                  <InputOTPSlot
                    index={index}
                    className="w-10 h-10 text-center text-lg font-semibold border rounded-md border-gray-300"
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>

            {(verifyError?.message || resendError?.message) && (
              <p className="text-sm text-red-600 mt-2">
                {verifyError?.message || resendError?.message}
              </p>
            )}
          </div>

          {/* Resend OTP */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Didn&apos;t receive a code?
              <button
                className="font-medium hover:underline"
                onClick={handleResendOTP}
              >
                Resend
              </button>
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              onClick={handleSubmit}
              className="bg-zinc-800 hover:bg-zinc-700 text-white h-[2rem] mt-2 w-full border rounded text-[0.700rem]"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 flex justify-center items-center hidden lg:flex">
        <Image src="/logo.svg" width={100} height={100} alt="logo" />
      </div>
    </div>
  );
};

export default Page;
