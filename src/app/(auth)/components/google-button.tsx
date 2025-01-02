import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ROUTES from "@/lib/routes";
import apiClient from "@/lib/axios.config";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const GoogleButton = () => {
  const [toggleFetch, setToggleFetch] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get("code") as string;

  const router = useRouter();
  useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: string) => {
      console.log("code", data);
      const res = await apiClient.post(API_ROUTES.AUTH.GOOGLE_AUTH_POST, {
        code: data,
      });
      return res.data;
    },
  });

  const { isSuccess } = useQuery({
    enabled: toggleFetch,
    queryKey: ["google-auth"],
    queryFn: async () => {
      const response = await apiClient.get(API_ROUTES.AUTH.GOOGLE_AUTH);
      console.log(response.data.data.redirectUrl);
      router.replace(response.data.data.redirectUrl);
      return response.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      mutate(code!);
    }
  }, [isSuccess, code, mutate]);

  const handleGoogleAuth = () => {
    console.log("clicked");
    setToggleFetch(true);
  };

  return (
    <Button
      className="shadow-lg hover:bg-gray-100 h-[1.5rem] w-full border rounded text-[0.700rem]"
      onClick={handleGoogleAuth}
    >
      <Image src="./google-icon.svg" width={15} height={15} alt="google-icon" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
