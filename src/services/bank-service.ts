import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const createConsent = async (mobileNumber: string) => {
  const response = await apiClient.get(
    API_ROUTES.BANK_ACCOUNT.CREATE_CONSENT + mobileNumber
  );
  return response.data;
};

export const getBankTransactions = async (id: string | null) => {
  console.log("get consent triggered", id);
  const response = await apiClient.get(
    API_ROUTES.BANK_ACCOUNT.GET_CONSENT + id
  );
  console.log("res", response.data);
  return response.data;
};
