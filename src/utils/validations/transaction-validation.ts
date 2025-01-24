import { z } from "zod";

export const transactionSchema = z.object({
  transaction_type: z
    .string()
    .min(1, { message: "Transaction type is required" }),
  account_name: z.string().min(1, { message: "Account name is required" }),
  category_name: z.string().min(1, { message: "Category name is required" }),
  transaction_date: z.union([
    z.date({
      message: "Please select a date for transaction.",
    }),
    z.string(),
  ]),
  transaction_payee: z.string().min(1, { message: "Payee name is required" }),
  transaction_amount: z.string({ message: "The amount is required." }),
  transaction_note: z.string().optional(),
  is_recurring: z.boolean().optional(),
  recurring_frequency: z.string().optional(),
});