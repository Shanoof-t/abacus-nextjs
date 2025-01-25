export interface SignUpType {
  email: string;
  password: string;
  user_name: string;
}

export interface SignInType {
  email: string;
  password: string;
}

export type OtpVerifyParams = {
  otp: string;
  userId: string;
};
