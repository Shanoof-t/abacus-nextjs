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
  FormMessage,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useGetBudget } from "@/hooks/use-budget";
import BudgetSummary from "./budget-summary";
import TransactionSummaryMessage from "./budget-summary-message";

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
          is_recurring: false,
          recurring_frequency: undefined,
          transaction_type: "",
        },
  });

  const { mutate: newTransactionMutate } = useNewTransaction();
  const { mutate: editTransactionMutate } = useEditTransaction();
  const { mutate: getBudgetMutate, data, isSuccess, reset } = useGetBudget();

  const { id } = useEditTransactionStore();

  const onSubmit = (values: z.infer<typeof transactionSchema>) => {
    if (isEdit) {
      editTransactionMutate({ data: values, id });
    } else {
      newTransactionMutate(values);
    }
  };

  const formWatch = form.watch();
  useEffect(() => {
    if (formWatch.transaction_type === "expense" && formWatch.category_name) {
      getBudgetMutate(formWatch.category_name);
    } else {
      reset();
    }
  }, [formWatch.transaction_type, formWatch.category_name]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-3">
        {/* type select */}
        <FormField
          name="transaction_type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <RadioGroupItem value="expense" />
                  <FormLabel>Expense</FormLabel>
                  <RadioGroupItem value="income" />
                  <FormLabel>Income</FormLabel>
                </RadioGroup>
              </FormControl>
              <FormMessage />
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
              <FormMessage />

              <BudgetSummary
                variant="success"
                isSuccess={isSuccess}
                data={data?.data}
                field="category_name"
                isSelected={!!field.value}
              />
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* date picker */}
        <FormField
          name="transaction_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
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
              <FormMessage />
              <BudgetSummary
                variant="default"
                isSuccess={isSuccess}
                data={data?.data}
                field="budget_date"
                isSelected={!!field.value}
                value={field.value}
              />
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
                  className="items-center placeholder-shown:text-gray-500 border-gray-200  rounded-[.50rem] w-full justify-start transition"
                  placeholder="Add a payee"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
              {/* <BudgetSummary
                variant="success"
                isSuccess={isSuccess}
                data={data?.data}
                field="amount_top"
                isSelected={!!field.value}
              /> */}
              <FormControl>
                <AmountInput
                  placeholder="0.00"
                  disabled={false}
                  isEdit={isEdit}
                  {...field}
                />
              </FormControl>

              <FormMessage />
              <BudgetSummary
                variant="default"
                isSuccess={isSuccess}
                data={data?.data}
                field="amount_bottom"
                isSelected={!!field.value}
                value={field.value}
              />
            </FormItem>
          )}
        />

        {/* reccuring option */}
        <FormField
          name="is_recurring"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-medium pb-1">
                Is this a recurring transaction?
              </FormLabel>
            </FormItem>
          )}
        />

        {/* select time period */}
        {form.getValues().is_recurring && (
          <FormField
            name="recurring_frequency"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel className="text-sm font-medium">
                  Select frequency
                </FormLabel>
                <FormControl>
                  <ShadcnSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Frequency</SelectLabel>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </ShadcnSelect>
                </FormControl>
                {field.value &&
                  formWatch.transaction_amount &&
                  formWatch.transaction_type && (
                    <TransactionSummaryMessage
                      variant="default"
                      message={`This recurring transaction will add ₹${formWatch.transaction_amount} to your ${formWatch.recurring_frequency} ${formWatch.transaction_type}.`}
                    />
                  )}
              </FormItem>
            )}
          />
        )}

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
                  className="items-center placeholder-shown:text-gray-500 border-gray-200  rounded-[.50rem] w-full justify-start transition"
                />
              </FormControl>
              <FormMessage />
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
