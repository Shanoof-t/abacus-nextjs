import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const createConsent = async (mobileNumber: string) => {
  const response = await apiClient.get(
    API_ROUTES.BANK_ACCOUNT.CREATE_CONSENT + mobileNumber
  );
  console.log("consenr", response.data);
  return response.data;
};

interface IFetch {
  status: string;
  message: string;
}

export interface IGetConsent extends IFetch {
  data: {
    consent_id: string;
    user_id: string;
    user_email: string;
    connected_accounts: string[];
    is_approved: boolean;
  };
}

export const getConsent = async (): Promise<IGetConsent> => {
  const response = await apiClient.get(API_ROUTES.BANK_ACCOUNT.GET_CONSENT);
  return response.data;
};

export const updateConsent = async (consentId: string) => {
  const response = await apiClient.delete(
    API_ROUTES.BANK_ACCOUNT.UPDATE_CONSENT + consentId
  );
  return response.data;
};

export const getBankTransactions = async (id: string | null) => {
  const response = await apiClient.get(
    API_ROUTES.BANK_ACCOUNT.GET_CONSENT + id
  );
  return response.data;
};
