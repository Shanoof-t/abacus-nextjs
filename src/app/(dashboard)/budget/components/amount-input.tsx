import { cn } from "@/lib/utils";
import React from "react";
import CurrencyInput from "react-currency-input-field";

type AmountInput = {
  placeholder?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  value: string;
  currentBalance?: string;
  isEdit?: boolean;
};

const AmountInput = ({ onChange, placeholder, value }: AmountInput) => {
  return (
    <CurrencyInput
      className={cn(
        "h-10 bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border  items-center placeholder-shown:text-gray-500 border-gray-200  rounded-[.50rem] w-full justify-start transition "
      )}
      prefix="₹"
      onValueChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default AmountInput;
