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
import { Input } from "@/components/ui/input";
import { SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CreatableSelect from "@/components/creatable-select";
import { useEffect, useState } from "react";
import { useGetAllAccount } from "@/hooks/use-account";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

// types
import { AccountInputs } from "@/services/account-service";
import { MutateFunction } from "@tanstack/react-query";
const transactionSchema = z.object({
  account_name: z.string().min(1),
  // transaction_date: z.date(),
});

type TransactionForm = {
  accountValues: string[];
  accountMutate: (data: AccountInputs) => void;
};

const TransactionForm = ({ accountValues, accountMutate }: TransactionForm) => {
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      account_name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof transactionSchema>) => {
    console.log("onSubmit", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="account_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                {/* account selector */}

                <CreatableSelect
                  values={accountValues}
                  placeholder="Select an account"
                  // setNewValue={() => {}}
                  isLoading={false}
                  // {...field}
                  mutate={accountMutate}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <SheetFooter className="mt-4">
          <div className="w-full">
            <Button
              type="submit"
              variant="primary"
              className="w-full border rounded-[.50rem] text-white"
            >
              Add Transaction
            </Button>
          </div>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default TransactionForm;

// const [date, setDate] = useState<Date>();

{
  /* <FormField
          name="transaction_date"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant={"outline"}
                      className="border-gray-200 rounded-[.50rem] hover:bg-gray-100 w-[15.625rem] justify-start transition"
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    ></Calendar>
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        /> */
}
