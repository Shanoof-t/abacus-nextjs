import { createNewCategory } from "@/services/category-service";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useNewCategory = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: createNewCategory,
    onSuccess: (data) => {
      toast({ description: data.message });
    },
  });
};
