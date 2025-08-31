import axios, { InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 1000000,
  timeoutErrorMessage:
    "Request timed out. Please check your network connection and try again.",
});

apiClient.interceptors.response.use(
  (res) => {
    // console.log("SUCCESS-RESPONSE>>>>>", res);
    return res;
  },
  (
    err
  ): Promise<{
    error: {
      statusCode: number;
      status: "error" | "success";
      isOperational: boolean;
    };
    message: string;
    stackTrace: string;
    status: number;
  }> => {
    console.log("ERROR-RESPONSE>>>>>", err.response.data);
    return Promise.reject(err.response.data);
  }
);

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    config.withCredentials = true;
    return config;
  },
  (err) => {
    console.log("ERROR-REQUEST>>>>>", err);
    return Promise.reject(err);
  }
);

export default apiClient;
