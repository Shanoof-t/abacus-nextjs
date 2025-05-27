"use client";
import {
  logOut,
  resendOTP,
  signIn,
  signUp,
  verifyOTP,
} from "@/services/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.setItem("userDetails", JSON.stringify(data.data));
      queryClient.setQueryData(["signup"], data);
    },
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useOtpVerify = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      router.replace("/sign-in");
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOTP,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      localStorage.clear();
    },
  });
};
