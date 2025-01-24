import { fieldEnum } from "@/app/(dashboard)/transactions/components/budget-summary";
import { BudgetData } from "@/services/budget-service";
import { format } from "date-fns";

type CalculateRemainingBudget = {
  amount_limit: string;
  total_spent: number;
};

export const calculateRemainingBudget = ({
  amount_limit,
  total_spent,
}: CalculateRemainingBudget) => {
  return Math.max(Number(amount_limit) - total_spent, 0);
};

export const calculateAmountBalance = ({
  remainingBudget,
  value,
}: {
  remainingBudget: number;
  value?: string | Date;
}) => {
  return remainingBudget - Number(value);
};

type GenerateMessages = {
  data?: BudgetData;
  value?: string | Date;
  remainingBudget: number;
  amountBalance: number;
};

export const generateMessages = ({
  data,
  value,
  remainingBudget,
  amountBalance,
}: GenerateMessages) => {
  // remaining Budget - category_name
  const remainingBudgetMessage = `${data?.progress}% of your ${data?.category_name} budget is used. Remaining Budget: ₹${remainingBudget} out of ₹${data?.amount_limit}.`;

  // const amountBalance = remainingBudget - Number(value);

  // amount messages - transaction_amount
  let amountBottomMessage = `After this transaction of ${value} remaining budget will be ${amountBalance}`;

  if (amountBalance < 0) {
    console.log("totalSpemd", data?.total_spent);
    console.log("value", value);
    const exceededAmount = Number(data?.total_spent) + Number(value);

    amountBottomMessage = `This transaction will exceed the budget by ${exceededAmount}`;
  }

  // amount top messages

  const amountTopMessage = `Remaining Budget: ${remainingBudget}`;

  // budget date messages

  const start = data?.budget_start_date;
  const end = data?.budget_end_date;
  const startDate = start ? format(new Date(start), "MMM d") : "Invalid date";
  const endDate = end ? format(new Date(end), "MMMM d") : "Invalid date";
  const budgetPeriod = `${startDate} - ${endDate}`;
  const budgetDateMessage = `Budget Period : ${budgetPeriod}`;

  return {
    remainingBudgetMessage,
    amountBottomMessage,
    amountTopMessage,
    budgetDateMessage,
  };
};

type DetermineVariant = {
  variant: "default" | "warning" | "success" | "danger";
  field: fieldEnum;
  data: BudgetData;
  amountBalance: number;
  remainingBudget: number;
};

export const determineVariant = ({
  variant,
  field,
  data,
  amountBalance,
  remainingBudget,
}: DetermineVariant) => {
  if (field === "amount_bottom" && amountBalance < 0) {
    variant = "warning";
  }

  if (field === "category_name" && data.progress === 100) {
    variant = "danger";
  }

  if (field === "amount_top" && remainingBudget <= 0) {
    variant = "danger";
  }
  return variant;
};
