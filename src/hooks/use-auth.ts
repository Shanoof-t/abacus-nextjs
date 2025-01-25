"use client";
import {
  logOut,
  resendOTP,
  signIn,
  signUp,
  verifyOTP,
} from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: signUp,
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
