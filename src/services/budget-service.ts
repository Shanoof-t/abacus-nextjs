import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { budgetSchema } from "@/schemas/budget-schema";
import { z } from "zod";

export const createBudget = async (data: z.infer<typeof budgetSchema>) => {
  const response = await apiClient.post(API_ROUTES.BUDGET.CREATE_BUDGET, data);
  return response.data;
};

export const fetchAllBudget = async () => {
  const response = await apiClient.get(API_ROUTES.BUDGET.GET_ALL_BUDGET);
  return response.data.data;
};
