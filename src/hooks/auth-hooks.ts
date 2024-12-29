"use client";
import { signIn, signUp } from "@/services/auth-service";
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
