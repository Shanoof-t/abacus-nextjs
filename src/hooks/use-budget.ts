import { createBudget, fetchAllBudget } from "@/services/budget-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useNewBudgetStore } from "@/store/budget-store";

export const useNewBudget = () => {
  const { onClose } = useNewBudgetStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBudget,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      queryClient.invalidateQueries({queryKey:["budgets"]})
    },
  });
};

export const useGetAllBudget = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: fetchAllBudget,
  });
};
