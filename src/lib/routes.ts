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
  CATEGORY: {
    CREATE_CATEGORY: "/api/v1/category",
    GET_CATEGORY: "/api/v1/category/",
    GET_ALL_CATEGORY: "/api/v1/category",
    DELETE_CATEGORY: "/api/v1/category/",
    BULK_DELETE_CATEGORY: "/api/v1/category/bulk-delete",
    EDIT_CATEGORY: "/api/v1/category/",
  },
  TRANSACTION: {
    CREATE_TRANSACTION: "/api/v1/transaction",
    GET_TRANSACTION: "/api/v1/transaction/",
    GET_ALL_TRANSACTION: "/api/v1/transaction",
    DELETE_TRANSACTION: "/api/v1/transaction/",
    BULK_DELETE_TRANSACTION: "/api/v1/transaction/bulk-delete",
    EDIT_TRANSACTION: "/api/v1/transaction/",
    CREATE_BULK_TRANSACTIONS: "/api/v1/transaction/bulk-create",
  },
  BUDGET: {
    CREATE_BUDGET: "/api/v1/budget",
    GET_BUDGET: "/api/v1/budget/",
    GET_BUDGET_CATEGORY: "/api/v1/budget/category/",
    GET_ALL_BUDGET: "/api/v1/budget",
    DELETE_BUDGET: "/api/v1/budget/",
    BULK_DELETE_BUDGET: "/api/v1/budget/bulk-delete",
    EDIT_BUDGET: "/api/v1/budget/",
  },
  OVERVIEW: {
    FINANCIAL_SUMMARY: "/api/v1/statistics/financial-summary",
    FINANCIAL_HISTORY: "/api/v1/statistics/financial-history",
  },
  NOTIFICATION: {
    ALL_NOTIFICATIONS: "/api/v1/notifications",
    UPDATE_NOTIFICATION: "/api/v1/notifications/",
    RESCHEDULE_RECURRING_TRANSCTION: "/api/v1/notifications/",
  },
  BANK_ACCOUNT: {
    CREATE_CONSENT: "/api/v1/bank/consent/create/",
    GET_CONSENT: "/api/v1/bank/consent",
    UPDATE_CONSENT: "/api/v1/bank/consent/",
  },
};

export default API_ROUTES;
