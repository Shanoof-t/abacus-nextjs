import {
  createNewCategory,
  deleteCategories,
  deleteCategory,
  editCategory,
  fetchAllCategories,
  fetchCategory,
} from "@/services/category-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useNewCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewCategory,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useGetAllCategories = (enabled = false) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    enabled,
  });
};

export const useDeleteBulkCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategories,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ description: data.message });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ description: data.message });
    },
  });
};

export const useGetCategory = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategory(id),
    enabled,
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ description: data.message });
    },
  });
};
