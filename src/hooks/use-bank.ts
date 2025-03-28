import { createConsent, getBankTransactions } from "@/services/bank-service";
import { useQuery } from "@tanstack/react-query";

export const useCreateConsent = (enabled: boolean) => {
  return useQuery({
    queryKey: ["account-consent"],
    queryFn: createConsent,
    enabled,
  });
};

export const useGetBankTransactions = (
  id: string | null,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => await getBankTransactions(id),
    enabled,
  });
};
