import {
  BudgetData,
  createBudget,
  deleteBudget,
  fetchAllBudget,
  fetchBudget,
  fetchBudgetByCategory,
  updateBudget,
} from "@/services/budget-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useBudgetDrawerStore, useBudgetStore } from "@/store/budget-store";
import { useEffect, useState } from "react";

export const useNewBudget = () => {
  const { onClose } = useBudgetStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBudget,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      queryClient.invalidateQueries({
        queryKey: ["budget", data.data.category_name],
      });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({
        queryKey: ["budget", data.data.id],
      });
    },
  });
};

export const useGetAllBudget = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: fetchAllBudget,
  });
};

export const useGetBudget = (id: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["budget", id],
    queryFn: async () => await fetchBudget(id),
    enabled,
  });
};

export const useGetBudgetByCategory = (
  categoryName: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["budget", categoryName],
    queryFn: async () => await fetchBudgetByCategory(categoryName),
    enabled,
  });
};

export const useDeleteBudget = () => {
  const { onClose } = useBudgetDrawerStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

export const useEditBudget = () => {
  const { onClose } = useBudgetStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBudget,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({
        queryKey: ["budget", data.data.id],
      });
    },
  });
};

export const useBudgetstuffs = ({ data }: { data?: BudgetData }) => {
  const [status, setStatus] = useState("");
  const [badgeColor, setBadgeColor] = useState("#FFFFFF");
  const [remaining, setRemaing] = useState(0);

  useEffect(() => {
    if (data?.progress !== undefined) {
      switch (true) {
        case data.progress === 0:
          setStatus("Just Started");
          setBadgeColor("#90EE90");
          break;
        case data.progress > 0 && data.progress < 50:
          setStatus("Getting There");
          setBadgeColor("#FFD700");
          break;
        case data.progress === 50:
          setStatus("Halfway There");
          setBadgeColor("#FFA500");
          break;
        case data.progress > 50 && data.progress < 100:
          setStatus("Almost There");
          setBadgeColor("#FF4500");
          break;
        case data.progress === 100:
          setStatus("Fully Utilized");
          setBadgeColor("#F43F5E");
          break;
        default:
          setStatus("No Status");
          setBadgeColor("#6C757D");
      }
    }
    if (data) {
      const remain = Number(data.amount_limit) - Number(data.total_spent);
      if (remain < 0) {
        setRemaing(0);
      } else {
        setRemaing(remain);
      }
    }
  }, [data]);

  return { status, badgeColor, remaining };
};
