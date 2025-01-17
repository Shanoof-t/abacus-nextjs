import { fetchSummaryByDate } from "@/services/overview-service";
import { useMutation } from "@tanstack/react-query";

export const useFinancialSummary = () => {
  return useMutation({
    mutationFn: fetchSummaryByDate,
  });
};
