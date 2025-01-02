import axios, { InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Request timed out. Please check your network connection and try again.",
});

apiClient.interceptors.response.use(
  (res) => {
    console.log("SUCCESS-RESPONSE>>>>>", res);
    return res;
  },
  (err) => {
    console.log("ERROR-RESPONSE>>>>>", err);
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
