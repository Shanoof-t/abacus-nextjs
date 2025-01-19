import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

type SummaryByDate = {
  from: Date;
  to: Date;
};

type fetchSummaryByDateReponse = {
  status: string;
  message: string;
  data: {
    remaining: number;
    income: number;
    expense: number;
    pastMonthIncomePercentage: number;
    pastMonthExpensePercentage: number;
    pastMonthRemainingPercentage: number;
  };
};
export const fetchSummaryByDate = async (
  data: SummaryByDate
): Promise<fetchSummaryByDateReponse> => {
  const response = await apiClient.post(
    API_ROUTES.OVERVIEW.FINANCIAL_SUMMARY,
    data
  );
  return response.data;
};

export type Transaction = {
  _id: string;
  date: string;
  income: number;
  expense: number;
};

export type Category = {
  _id: string;
  category_name: string;
  category_amount: number;
};

type FetchHistory = {
  status: string;
  message: string;
  data: {
    transaction: Transaction[];
    categories: Category[];
  };
};

export const fetchHistory = async (): Promise<FetchHistory> => {
  const response = await apiClient.get(API_ROUTES.OVERVIEW.FINANCIAL_HISTORY);
  return response.data;
};
