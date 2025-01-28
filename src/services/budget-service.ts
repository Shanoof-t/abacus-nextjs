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

export interface BudgetData
  extends Omit<
    z.infer<typeof budgetSchema>,
    "budget_start_date" | "budget_end_date"
  > {
  budget_start_date?: Date;
  budget_end_date?: Date;
  total_spent?: number;
  progress?: number;
  _id?: string;
}

interface FetchBudget extends Fetch {
  data: BudgetData;
}

export const fetchBudget = async (id: string): Promise<FetchBudget> => {
  const response = await apiClient.get(API_ROUTES.BUDGET.GET_BUDGET + id);
  return response.data;
};

export const deleteBudget = async (id: string): Promise<Fetch> => {
  const response = await apiClient.delete(API_ROUTES.BUDGET.DELETE_BUDGET + id);
  return response.data;
};

interface UpdateBudget extends FetchBudget {}

export const updateBudget = async ({
  data,
  id,
}: {
  data: BudgetData;
  id: string;
}): Promise<UpdateBudget> => {
  console.log("data in edit", data);
  const response = await apiClient.post(
    API_ROUTES.BUDGET.EDIT_BUDGET + id,
    data
  );
  return response.data;
};
