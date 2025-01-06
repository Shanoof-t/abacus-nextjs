import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const createNewAccount = async (data: {
  account_name: string;
  account_balance: number | null;
}) => {
  const response = await apiClient.post(
    API_ROUTES.ACCOUNT.CREATE_ACCOUNT,
    data
  );
  return response.data;
};
