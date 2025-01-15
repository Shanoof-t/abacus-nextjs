"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import Select from "@/components/creatable-select";
import AmountInput from "./amount-input";
import { Textarea } from "@/components/ui/textarea";
import { useEditTransaction, useNewTransaction } from "@/hooks/use-transaction";
import { useEditTransactionStore } from "@/store/transaction-store";
import { TransactionInput } from "@/services/transaction-service";
import useBudgetAlert from "@/hooks/use-alert";

export const transactionSchema = z.object({
  account_name: z.string().min(1, { message: "Account name is required" }),
  category_name: z.string().min(1, { message: "Category name is required" }),
  transaction_date: z.date({
    message: "Please select a date for transaction.",
  }),
  transaction_payee: z.string().min(1, { message: "Payee name is required" }),
  transaction_amount: z.string({ message: "The amount is required." }),
  transaction_note: z.string().optional(),
});

type TransactionForm = {
  accountValues: string[];
  onAccountCreate: (name: string) => void;
  categoryValues: string[];
  onCategoryCreate: (name: string) => void;
  isEdit?: boolean;
  transactionData?: TransactionInput;
};

const TransactionForm = ({
  accountValues,
  onAccountCreate,
  categoryValues,
  onCategoryCreate,
  isEdit,
  transactionData,
}: TransactionForm) => {
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: isEdit
      ? {
          ...transactionData,
          transaction_date: transactionData?.transaction_date
            ? new Date(transactionData.transaction_date)
            : undefined,
        }
      : {
          account_name: "",
          transaction_date: undefined,
          category_name: "",
          transaction_payee: "",
        },
  });

  const { mutate: newTransactionMutate, isSuccess, data } = useNewTransaction();
  const { mutate: editTransactionMutate } = useEditTransaction();
  const { BudgetAlertDialog } = useBudgetAlert();

  const { id } = useEditTransactionStore();
  const onSubmit = (values: z.infer<typeof transactionSchema>) => {
    if (isEdit) {
      editTransactionMutate({ data: values, id });
    } else {
      newTransactionMutate(values);
    }
  };

  return (
    <Form {...form}>
      <BudgetAlertDialog />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-6">
        {/* date picker */}
        <FormField
          name="transaction_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="border-gray-200 rounded-[.50rem] hover:bg-gray-100 w-full justify-start transition"
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white items-center flex justify-center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date)}
                      initialFocus
                    ></Calendar>
                  </PopoverContent>
                </Popover>
              </FormControl>
              {form.formState.errors.transaction_date && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.transaction_date.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* account select */}

        <FormField
          name="account_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                {/* account selector */}
                <Select
                  values={accountValues}
                  placeholder="Select an account"
                  value={field.value}
                  onChange={field.onChange}
                  onCreate={onAccountCreate}
                />
              </FormControl>
              {form.formState.errors.account_name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.account_name.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* category select */}
        <FormField
          name="category_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                {/* account selector */}
                <Select
                  values={categoryValues}
                  placeholder="Select an account"
                  onCreate={onCategoryCreate}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              {form.formState.errors.category_name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.category_name.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* transaction payee */}
        <FormField
          name="transaction_payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  className="items-center placeholder-shown:text-gray-500 border-gray-200 focus:border-black rounded-[.50rem] w-full justify-start transition"
                  placeholder="Add a payee"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.transaction_payee && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.transaction_payee.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* transaction amount */}
        <FormField
          name="transaction_amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  placeholder="0.00"
                  disabled={false}
                  isEdit={isEdit}
                  {...field}
                />
              </FormControl>

              {form.formState.errors.transaction_amount && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.transaction_amount.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* transaction note */}
        <FormField
          name="transaction_note"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your notes here."
                  {...field}
                  className="items-center placeholder-shown:text-gray-500 border-gray-200 focus:border-black rounded-[.50rem] w-full justify-start transition"
                />
              </FormControl>
              {form.formState.errors.transaction_note && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.transaction_note.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full border rounded-[.50rem] text-white"
        >
          {isEdit ? "Edit Transaction" : "Add Transaction"}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
