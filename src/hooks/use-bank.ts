import { createConsent, getConsent } from "@/services/bank-service";
import { useQuery } from "@tanstack/react-query";

export const useCreateConsent = (enabled: boolean) => {
  return useQuery({
    queryKey: ["account-consent"],
    queryFn: createConsent,
    enabled,
  });
};

export const useGetConsent = (id: string | null, enabled?: boolean) => {
  return useQuery({
    queryKey: ["consent", id],
    queryFn: () => getConsent(id),
    enabled,
  });
};
