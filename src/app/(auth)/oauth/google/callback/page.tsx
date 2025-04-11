"use client";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import { LucideLoader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const { mutate, error } = useMutation({
    mutationFn: async (data: string) => {
      const res = await apiClient.post(API_ROUTES.AUTH.GOOGLE_AUTH_POST, {
        code: data,
      });
      return res.data;
    },
    onSuccess: () => {
      router.replace("https://abacuss.online");
    },
  });

  useEffect(() => {
    if (code) mutate(code);
  }, [code, mutate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6  rounded-lg  space-y-4">
        <h1 className="text-lg font-bold text-gray-800 text-center">
          Your Google has been authenticated.
        </h1>
        <p className="text-sm text-gray-600 text-center">
          You will be logged in.
        </p>
        {error ? (
          <div className="text-center text-red-500 text-sm">
            <p>{error.message}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <LucideLoader2 className="h-6 w-6 text-gray-500 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
