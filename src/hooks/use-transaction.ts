import {
  createTransaction,
  deleteTransactions,
  fetchAllTransactions,
} from "@/services/transaction-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useNewTransactionStore } from "@/store/transaction-store";

export const useNewTransaction = () => {
  const queryClient = useQueryClient();
  const { onClose } = useNewTransactionStore();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
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
