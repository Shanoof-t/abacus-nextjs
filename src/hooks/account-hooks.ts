import {
  createNewAccount,
  deleteAccount,
  deleteBulkAccounts,
  editAccount,
  fetchAccount,
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

// type GetAccount = {
//   account_name: string;
//   account_balance: number | null;
//   _id?: string;
//   user_id?: string;
// };

export const useGetAccount = (id: string) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: () => fetchAccount(id),
    enabled: !!id,
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
