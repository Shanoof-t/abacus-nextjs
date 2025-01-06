import { createNewAccount } from "@/services/account-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useNewAccount = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
