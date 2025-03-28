import {
  createNewAccount,
  deleteAccount,
  deleteBulkAccounts,
  editAccount,
  fetchAccount,
  fetchAllAccounts,
} from "@/services/account-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useNewAccount = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createNewAccount,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useGetAllAccount = (enabled: boolean) => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAllAccounts,
    enabled,
  });
};

export const useGetAccount = (id: string, isOpen: boolean) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: () => fetchAccount(id),
    enabled: isOpen,
  });
};

export const useBulkAccountDelete = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: deleteBulkAccounts,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useEditAccount = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: editAccount,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
