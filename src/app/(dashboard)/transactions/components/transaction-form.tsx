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

import { SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CreatableSelect from "@/components/creatable-select";
import { useState } from "react";

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

const transactionSchema = z.object({
  account_name: z.string().min(1, { message: "Account name is required" }),
  category_name: z.string().min(1, { message: "Category name is required" }),
  transaction_date: z.date({
    message: "Please select a date for transaction.",
  }),
  transaction_payee: z.string().min(1, { message: "Payee name is required" }),
});

type TransactionForm = {
  accountValues: string[];
  onAccountCreate: (name: string) => void;
  categoryValues: string[];
  onCategoryCreate: (name: string) => void;
};

const TransactionForm = ({
  accountValues,
  onAccountCreate,
  categoryValues,
  onCategoryCreate,
}: TransactionForm) => {
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      account_name: "",
      transaction_date: undefined,
      category_name: "",
      transaction_payee: "",
    },
  });

  const onSubmit = (values: z.infer<typeof transactionSchema>) => {
    console.log("onSubmit", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      className="border-gray-200 rounded-[.50rem] hover:bg-gray-100 w-[15.625rem] justify-start transition"
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
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
                  // field={field}
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
                  // value={field.value}
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
                <Input className="" placeholder="Add a payee" {...field} />
              </FormControl>
              {form.formState.errors.transaction_payee && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.transaction_payee.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <div className="w-full mt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full border rounded-[.50rem] text-white"
          >
            Add Transaction
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
