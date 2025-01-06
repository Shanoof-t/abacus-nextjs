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

export const fetchAllAccounts = async () => {
  const response = await apiClient.get(API_ROUTES.ACCOUNT.GET_ALL_ACCOUNTS);
  return response.data;
};

export const deleteBulkAccounts = async (ids: string[]) => {
  const response = await apiClient.post(
    API_ROUTES.ACCOUNT.BULK_DELETE_ACCOUNTS,
    ids
  );
  return response.data;
};
