import React from "react";
import { BudgetData } from "@/services/budget-service";
import {
  calculateAmountBalance,
  calculateRemainingBudget,
  determineVariant,
  generateMessages,
} from "@/utils/budget-utils";
import TransactionSummaryMessage from "./transaction-summary-message";
import Link from "next/link";
import { useBudgetStore } from "@/store/budget-store";

export type fieldEnum =
  | "category_name"
  | "amount_top"
  | "amount_bottom"
  | "budget_date";

type BudgetSummary = {
  variant: "default" | "warning" | "success" | "danger";
  isSuccess: boolean;
  data?: BudgetData;
  field: fieldEnum;
  isSelected?: boolean;
  value?: string | Date;
};

const BudgetSummary = ({
  variant,
  isSuccess,
  data,
  field,
  isSelected,
  value,
}: BudgetSummary) => {
  // if the user dont have any budget with selected category
  if (!data) {
    const { onOpen, setMode } = useBudgetStore();
    return (
      <>
        {isSuccess && isSelected ? (
          <TransactionSummaryMessage
            variant={"default"}
            message={
              <>
                You don’t have a budget with this {value?.toString()}, create
                one{" "}
                <span
                  onClick={() => {
                    onOpen();
                    setMode("create");
                  }}
                  className="text-blue-700 cursor-pointer"
                >
                  Budget
                </span>
                .
              </>
            }
          />
        ) : null}
      </>
    );
  }

  const remainingBudget = calculateRemainingBudget({
    amount_limit: data.amount_limit,
    total_spent: data.total_spent || 0,
  });

  const amountBalance = calculateAmountBalance({ remainingBudget, value });

  const messages = generateMessages({
    data,
    remainingBudget,
    value,
    amountBalance,
  });

  variant = determineVariant({
    amountBalance,
    data,
    field,
    remainingBudget,
    variant,
  });

  const budgetMessages = messages && {
    category_name: messages.remainingBudgetMessage,
    amount_top: messages.amountTopMessage,
    amount_bottom: messages.amountBottomMessage,
    budget_date: messages.budgetDateMessage,
  };

  return (
    <>
      {isSuccess && isSelected ? (
        <TransactionSummaryMessage
          variant={variant}
          message={budgetMessages[field]}
        />
      ) : null}
    </>
  );
};

export default BudgetSummary;
