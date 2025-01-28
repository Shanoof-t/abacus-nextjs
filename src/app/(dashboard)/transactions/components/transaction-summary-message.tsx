import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const SummaryVariants = cva("text-sm mt-1", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      success: "text-emerald-500",
      warning: "text-yellow-600",
      danger: "text-rose-500",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

type SummaryVariants = VariantProps<typeof SummaryVariants>;

type TransactionSummaryMessage = {
  message: string | React.ReactNode;
  variant: "default" | "warning" | "success" | "danger";
};

const TransactionSummaryMessage = ({
  variant,
  message,
}: TransactionSummaryMessage) => {
  return (
    <div>
      <p className={cn(SummaryVariants({ variant }))}>{message}</p>
    </div>
  );
};

export default TransactionSummaryMessage;
