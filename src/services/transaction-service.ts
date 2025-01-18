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

export type FetchTransactions = {
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

export const deleteTranaction = async (id: string) => {
  const response = await apiClient.delete(
    API_ROUTES.TRANSACTION.DELETE_TRANSACTION + id
  );
  return response.data;
};

export type TransactionInput = {
  _id: string;
  user_id: string;
  account_name: string;
  transaction_amount: string;
  category_name: string;
  transaction_type: string;
  transaction_date: string;
  transaction_payee: string;
  transaction_note: string;
};

export const fetchTransaction = async (
  id: string
): Promise<TransactionInput> => {
  const response = await apiClient.get(
    API_ROUTES.TRANSACTION.GET_TRANSACTION + id
  );
  return response.data.data;
};

type EditTransaction = { data: z.infer<typeof transactionSchema>; id: string };
export const editTransaction = async ({ data, id }: EditTransaction) => {
  const response = await apiClient.put(
    API_ROUTES.TRANSACTION.EDIT_TRANSACTION + id,
    data
  );
  return response.data;
};

export const createBulkTransactions = async (data: any) => {
  const response = await apiClient.post(
    API_ROUTES.TRANSACTION.CREATE_BULK_TRANSACTIONS,
    data
  );
  return response.data;
};
