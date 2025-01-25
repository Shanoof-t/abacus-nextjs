import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { OtpVerifyParams, SignInType, SignUpType } from "@/types/auth-types";

export const signUp = async (data: SignUpType): Promise<void> => {
  const response = await apiClient.post(API_ROUTES.AUTH.SIGNUP, data);
  return response.data;
};

type SignIn = {
  status: string;
  message: string;
  data: {
    user_name: string;
    email: string;
    _id: string;
  };
};

export const signIn = async (data: SignInType): Promise<SignIn> => {
  const response = await apiClient.post(API_ROUTES.AUTH.SIGNIN, data);
  return response.data;
};

export const verifyOTP = async (data: OtpVerifyParams): Promise<void> => {
  return await apiClient.post(API_ROUTES.AUTH.VERIFY_OTP, data);
};

export const resendOTP = async (data: { userId: string }): Promise<void> => {
  return await apiClient.post(API_ROUTES.AUTH.RESEND_OTP, data);
};
