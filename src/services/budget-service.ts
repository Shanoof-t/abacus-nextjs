import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { budgetSchema } from "@/schemas/budget-schema";
import { z } from "zod";

interface Fetch {
  status: string;
  message: string;
}

export const createBudget = async (data: z.infer<typeof budgetSchema>) => {
  const response = await apiClient.post(API_ROUTES.BUDGET.CREATE_BUDGET, data);
  return response.data;
};

export const fetchAllBudget = async () => {
  const response = await apiClient.get(API_ROUTES.BUDGET.GET_ALL_BUDGET);
  return response.data.data;
};

export interface BudgetData extends z.infer<typeof budgetSchema> {
  total_spent: number;
  progress: number;
}

interface FetchBudget extends Fetch {
  data: BudgetData;
}

export const fetchBudget = async (name: string): Promise<FetchBudget> => {
  const response = await apiClient.get(API_ROUTES.BUDGET.GET_BUDGET + name);
  return response.data;
};

export const deleteBudget = async (name: string): Promise<Fetch> => {
  const response = await apiClient.delete(
    API_ROUTES.BUDGET.DELETE_BUDGET + name
  );
  return response.data;
};
