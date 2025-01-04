const API_ROUTES = {
  AUTH: {
    SIGNIN: "/api/v1/auth/sign-in",
    SIGNUP: "/api/v1/auth/sign-up",
    VERIFY_OTP: "api/v1/auth/verify-otp",
    RESEND_OTP: "api/v1/auth/resend-otp",
    GOOGLE_AUTH: "/api/v1/auth/google-auth",
    GOOGLE_AUTH_POST:"/api/v1/auth/oauth2-callback"
  },
  ACCOUNT:{
    CREATE_ACCOUNT:"/api/v1/account"
  }
};

export default API_ROUTES;
