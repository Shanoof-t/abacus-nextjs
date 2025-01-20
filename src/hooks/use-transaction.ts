import {
  createBulkTransactions,
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
import { useAlertStore } from "@/store/alert-store";

export const useNewTransaction = () => {
  const queryClient = useQueryClient();
  const { onOpen, setContent } = useAlertStore();
  const { onClose } = useNewTransactionStore();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      if (data.alert) {
        setContent({ title: "Budget alert", description: data.alert });
        onOpen();
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

export const useCreateBulkTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBulkTransactions,
    onSuccess: (data) => {
      console.log("data", data);
      toast({ description: "Successfully imported." });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
