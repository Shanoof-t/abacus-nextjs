import {
  createNewAccount,
  deleteAccount,
  deleteBulkAccounts,
  editAccount,
  fetchAllAccounts,
} from "@/services/account-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNewAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useGetAllAccount = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAllAccounts,
  });
};

export const useBulkAccountDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBulkAccounts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useEditAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
