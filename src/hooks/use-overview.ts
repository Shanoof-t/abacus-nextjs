import { fetchHistory, fetchSummaryByDate } from "@/services/overview-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFinancialSummary = () => {
  return useMutation({
    mutationFn: fetchSummaryByDate,
  });
};

export const useFinancialHistory = ()=>{
  return useQuery({
    queryKey:["financial-history"],
    queryFn:fetchHistory
  })
}