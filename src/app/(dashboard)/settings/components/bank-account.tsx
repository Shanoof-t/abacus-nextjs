"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateConsent, useGetConsent } from "@/hooks/use-bank";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BankAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [enabled, setEnabled] = useState(false);
  const { data, isSuccess } = useCreateConsent(enabled);

  useEffect(() => {
    if (isSuccess && data) {
      const { url } = data.data;
      router.replace(url);
    }
  }, [isSuccess, data, router]);

  const success = Boolean(searchParams.get("success"));
  const id = searchParams.get("id");

  const { data: consentData } = useGetConsent(id, success);
  console.log("data from consent", consentData);

  return (
    <>
      <Separator className="border-gray-300" />
      <div className="flex justify-between py-5 items-center">
        <div className="flex justify-between space-x-36">
          <div>
            <h1 className="text-base font-medium">Bank account</h1>
          </div>
          <div className="text-muted-foreground flex justify-center items-center">
            <h1 className="text-muted-foreground">No bank account connected</h1>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="outline-0 border-none"
            onClick={() => setEnabled(true)}
          >
            conncet
          </Button>
        </div>
      </div>
    </>
  );
};

export default BankAccount;
