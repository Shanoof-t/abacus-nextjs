import { fetchHistory, fetchSummaryByDate, useGetHistory } from "@/services/overview-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFinancialSummary = () => {
  return useMutation({
    mutationFn: fetchSummaryByDate,
  });
};

export const useFinancialHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchHistory,
    onSuccess: (data) => {
      queryClient.setQueryData(["financialHistory"], data.data);
    },
  });
};

export const useGetFinancialHistory = () => {
  return useQuery({
    queryKey: ["financialHistory"],
    queryFn: useGetHistory,
    staleTime: Infinity,
  });
};
