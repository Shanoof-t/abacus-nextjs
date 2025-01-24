import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Select from "@/components/creatable-select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { budgetSchema } from "@/schemas/budget-schema";
import { z } from "zod";
import { format } from "date-fns";
import AmountInput from "./amount-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNewBudget } from "@/hooks/use-budget";
import { Calendar } from "@/components/ui/calendar";

const initialValues = {
  budget_name: "",
  category_name: "",
  amount_limit: "",
  budget_start_date: undefined,
  budget_end_date: undefined,
  notification_status: false,
  budget_note: "",
  alert_threshold: 0,
};

type BudgetForm = {
  accountValues: string[];
  onAccountCreate: (name: string) => void;
  categoryValues: string[];
  onCategoryCreate: (name: string) => void;
};

const BudgetForm = ({ categoryValues, onCategoryCreate }: BudgetForm) => {
  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: initialValues,
  });

  const { mutate } = useNewBudget();
  const onSubmit = (values: z.infer<typeof budgetSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-6">
        {/* start date */}
        <FormField
          name="budget_start_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
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
                  <PopoverContent className="bg-white items-center flex justify-center z-50">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              {form.formState.errors.budget_start_date && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.budget_start_date.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* end date */}
        <FormField
          name="budget_end_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
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
                  <PopoverContent className="bg-white items-center flex justify-center z-50">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date)}
                      initialFocus
                    ></Calendar>
                  </PopoverContent>
                </Popover>
              </FormControl>
              {form.formState.errors.budget_end_date && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.budget_end_date.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          name="budget_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter budget name"
                  className="items-center placeholder-shown:text-gray-500  rounded-[.50rem] w-full justify-start transition"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.budget_name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.budget_name.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* account select */}

        {/* <FormField
          name="account_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
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
        /> */}

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

        <FormField
          name="amount_limit"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput {...field} placeholder="Add amount limit" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="notification_status"
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
                Notify when the budget is close to being used up
              </FormLabel>
            </FormItem>
          )}
        />
        {/* slider for threshold */}
        {form.getValues().notification_status && (
          <FormField
            name="alert_threshold"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Threshold (%)</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{field.value}%</span>

                    <Slider
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                      min={0}
                      max={100}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {/* budget note */}
        <FormField
          name="budget_note"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your notes here."
                  {...field}
                  className="items-center placeholder-shown:text-gray-500 border-gray-200 rounded-[.50rem] w-full justify-start transition"
                />
              </FormControl>
              {form.formState.errors.budget_note && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.budget_note.message}
                </p>
              )}
            </FormItem>
          )}
        />
        {/* submit button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full border rounded-[.50rem] text-white"
        >
          Add Budget
        </Button>
      </form>
    </Form>
  );
};

export default BudgetForm;
