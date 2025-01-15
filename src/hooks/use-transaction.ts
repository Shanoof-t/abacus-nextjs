import {
  createTransaction,
  deleteTranaction,
  deleteTransactions,
  editTransaction,
  fetchAllTransactions,
  fetchTransaction,
} from "@/services/transaction-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import {
  useEditTransactionStore,
  useNewTransactionStore,
} from "@/store/transaction-store";
import useBudgetAlert from "./use-alert";

export const useNewTransaction = () => {
  const queryClient = useQueryClient();
  const { onClose } = useNewTransactionStore();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      console.log("data", data.alert);
      if (data.alert) {
        const { setIsBudgetAlertVisible } = useBudgetAlert({
          title: "Alert.",
          description: data.alert,
        });
        setIsBudgetAlertVisible(true);
      }
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useGetAllTransaction = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactions,
  });
};

export const useBulkTransactionDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransactions,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTranaction,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useGetTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransaction(id),
    enabled: !!id,
  });
};

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  const { onClose } = useEditTransactionStore();
  return useMutation({
    mutationFn: editTransaction,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
