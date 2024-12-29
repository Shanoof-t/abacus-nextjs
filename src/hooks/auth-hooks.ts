"use client";
import { createUser } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: createUser,
    
  });
};
