import { createBudget, fetchAllBudget } from "@/services/budget-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useNewBudgetStore } from "@/store/budget-store";

export const useNewBudget = () => {
  const { onClose } = useNewBudgetStore();
  return useMutation({
    mutationFn: createBudget,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
    },
  });
};

export const useGetAllBudget = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: fetchAllBudget,
  });
};
