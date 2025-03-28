import { createConsent, getBankTransactions } from "@/services/bank-service";
import { useQuery } from "@tanstack/react-query";

export const useCreateConsent = ({
  enabled,
  mobileNumber,
}: {
  mobileNumber: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["account-consent"],
    queryFn: async()=>await createConsent(mobileNumber),
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
