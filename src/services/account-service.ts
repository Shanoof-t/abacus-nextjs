import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export type AccountInputs = {
  account_name: string;
  account_balance?: number;
  _id?: string;
  user_id?: string;
};

export type Account = {
  account_name: string;
  account_balance?: number;
  _id: string;
  user_id: string;
};

export const createNewAccount = async (data: AccountInputs) => {
  console.log("data", data);
  const response = await apiClient.post(
    API_ROUTES.ACCOUNT.CREATE_ACCOUNT,
    data
  );
  return response.data;
};

type FetchAccount = { status: string; message: string; data: Account[] };

export const fetchAllAccounts = async (): Promise<FetchAccount> => {
  const response = await apiClient.get(API_ROUTES.ACCOUNT.GET_ALL_ACCOUNTS);
  return response.data;
};

export const fetchAccount = async (id: string): Promise<AccountInputs> => {
  const response = await apiClient.get(API_ROUTES.ACCOUNT.GET_ACCOUNT + id);
  return response.data.data;
};

export const deleteBulkAccounts = async (ids: string[]) => {
  const response = await apiClient.post(
    API_ROUTES.ACCOUNT.BULK_DELETE_ACCOUNTS,
    ids
  );
  return response.data;
};

export const deleteAccount = async (id: string) => {
  const response = await apiClient.delete(
    API_ROUTES.ACCOUNT.DELETE_ACCOUNT + id
  );
  return response.data;
};

type EditAccount = {
  values: AccountInputs;
  id: string;
};

export const editAccount = async ({ values, id }: EditAccount) => {
  const response = await apiClient.put(
    API_ROUTES.ACCOUNT.EDIT_ACCOUNT + id,
    values
  );
  return response.data;
};
