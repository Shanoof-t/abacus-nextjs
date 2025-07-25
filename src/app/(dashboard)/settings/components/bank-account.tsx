"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetConsent, useUpdateConsent } from "@/hooks/use-bank";
import useConfirm from "@/hooks/use-confirm";
import { toast } from "@/hooks/use-toast";
import { IGetConsent } from "@/services/bank-service";
import { useConsentCreationStore } from "@/store/bank-store";
import { useSocketStore } from "@/store/socket-store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const BankAccount = () => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();

  const { onOpen } = useConsentCreationStore();

  const [isConnected, setIsConnected] = useState(false);
  const [isDisconnect, setIsDisconnect] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [consentId, setConsentId] = useState("");

  const { data, isLoading: getConsentLoading, isSuccess } = useGetConsent();
  const {
    isLoading: updateConsentLoading,
    isSuccess: updateConsentSuccess,
    data: consentUpdateResponse,
  } = useUpdateConsent(consentId, isDisconnect);

  useEffect(() => {
    if (updateConsentSuccess) {
      setIsDisconnect(false);
      setIsConnected(false);
      toast({ description: consentUpdateResponse.message });
    }
  }, [updateConsentSuccess, consentUpdateResponse]);

  useEffect(() => {
    if (isSuccess && data.data) {
      setIsConnected(data.data.isApproved);
      setConsentId(data?.data.consent_id);
    }
  }, [isSuccess, data?.data]);

  useEffect(() => {
    if (socket) {
      socket.on("bank:connected", ({ message, data }) => {
        toast({ description: message });
        setIsConnected(true);
        setIsConnecting(false);
        queryClient.setQueryData(["consent"], (prev: IGetConsent) => {
          return {
            ...prev,
            data,
          };
        });
      });
    }
  }, [socket, queryClient]);

  const isLoading = getConsentLoading || updateConsentLoading || isConnecting;

  const { ConfirmDialog, confirm } = useConfirm({
    title: "Are you sure?",
    description:
      "Disconnecting your bank account will also remove your saved transaction history. Are you sure you want to proceed?",
  });

  return (
    <>
      <ConfirmDialog />
      <Separator className="border-gray-300" />
      <div className="flex justify-between py-5 items-center">
        <div className="flex justify-between lg:w-1/2 items-center">
          <div className="w-1/3">
            <h1 className="text-base font-medium">Bank account</h1>
          </div>
          <div className="text-muted-foreground w-2/3 flex justify-start items-center">
            <h1 className="text-muted-foreground line-clamp-2">
              {isLoading
                ? "waiting for bank details"
                : isConnected && data?.data
                ? `${data?.data.connectedAccounts.join(",")} is connected`
                : "No bank account connected"}
            </h1>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Button variant="outline" disabled={isLoading}>
              Loading...
            </Button>
          ) : isConnected ? (
            <Button
              variant="outline"
              onClick={async () => {
                const ok = await confirm();
                if (ok) {
                  setIsDisconnect(true);
                }
              }}
              disabled={isLoading}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setIsConnecting(true);
                onOpen();
              }}
              disabled={isLoading}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default BankAccount;
