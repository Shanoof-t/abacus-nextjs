import { transactionSchema } from "@/app/(dashboard)/transactions/components/transaction-form";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { z } from "zod";

export const createTransaction = async (
  data: z.infer<typeof transactionSchema>
) => {
  console.log("datas in create", data);
  const response = await apiClient.post(
    API_ROUTES.TRANSACTION.CREATE_TRANSACTION,
    data
  );
  return response.data;
};

type FetchTransactions = {
  status: string;
  message: string;
  data: z.infer<typeof transactionSchema>;
};

export const fetchAllTransactions = async (): Promise<FetchTransactions> => {
  const response = await apiClient.get(
    API_ROUTES.TRANSACTION.GET_ALL_TRANSACTION
  );
  return response.data;
};

export const deleteTransactions = async (ids: string[]) => {
  const response = await apiClient.post(
    API_ROUTES.TRANSACTION.BULK_DELETE_TRANSACTION,
    ids
  );
  return response.data;
};
