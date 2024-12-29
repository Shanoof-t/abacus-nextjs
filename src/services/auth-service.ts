import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { SignUpType } from "@/types/auth-types";

export const createUser = async (data: SignUpType): Promise<void> => {
  return await apiClient.post(API_ROUTES.AUTH.SIGNUP, data);
};
