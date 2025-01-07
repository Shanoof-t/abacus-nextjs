import {
  createNewCategory,
  fetchAllCategories,
} from "@/services/category-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useNewCategory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewCategory,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });
};
