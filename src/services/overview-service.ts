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
    pastMonthExpensePercentage:number
    pastMonthRemainingPercentage:number
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
