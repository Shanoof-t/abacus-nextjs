const API_ROUTES = {
  AUTH: {
    SIGNIN: "/api/v1/auth/sign-in",
    SIGNUP: "/api/v1/auth/sign-up",
    LOGOUT: "/api/v1/auth/logout",
    VERIFY_OTP: "api/v1/auth/verify-otp",
    RESEND_OTP: "api/v1/auth/resend-otp",
    GOOGLE_AUTH: "/api/v1/auth/google-auth",
    GOOGLE_AUTH_POST: "/api/v1/auth/oauth2-callback",
  },
  ACCOUNT: {
    CREATE_ACCOUNT: "/api/v1/account",
    GET_ACCOUNT: "/api/v1/account/",
    GET_ALL_ACCOUNTS: "/api/v1/account",
    DELETE_ACCOUNT: "/api/v1/account/",
    BULK_DELETE_ACCOUNTS: "/api/v1/account/bulk-delete",
    EDIT_ACCOUNT: "/api/v1/account/",
  },
};

export default API_ROUTES;
