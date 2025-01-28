"use client";
import {
  logOut,
  resendOTP,
  signIn,
  signUp,
  verifyOTP,
} from "@/services/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("data in useSign", data);
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
  return useMutation({
    mutationFn: verifyOTP,
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
