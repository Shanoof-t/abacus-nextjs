import React from "react";
import CurrencyInput from "react-currency-input-field";
import { CircleMinus, CirclePlus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

type Props = {
  placeholder?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  value: string;
};

const AmountInput: React.FC<Props> = ({
  placeholder = "Enter amount",
  value,
  onChange,
  disabled = false,
}) => {
  const parsedValue = parseFloat(value) || 0; // Ensure parsedValue is always a number
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const handleReverseValue = () => {
    if (!value) return;
    const reversedValue = (-parsedValue).toFixed(2); // Ensure consistent decimal format
    onChange(reversedValue);
  };

  return (
    <div className="relative w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleReverseValue}
              disabled={disabled}
              aria-label="Toggle income/expense"
              className={cn(
                "absolute top-1 left-1.5 flex h-8 w-8 items-center justify-center rounded-[.50rem] border bg-slate-400 p-2 text-white transition hover:bg-slate-500",
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600",
                { "opacity-50 cursor-not-allowed": disabled }
              )}
            >
              {!parsedValue && <Info className="h-5 w-5" />}
              {isIncome && <CirclePlus className="h-5 w-5" />}
              {isExpense && <CircleMinus className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-sm shadow-md">
            Click to toggle between income [+] and expense [-]
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CurrencyInput
        className={cn(
          "ps-12 transition border-gray-500 h-10 w-full bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border rounded-[.50rem] placeholder-shown:text-gray-500 focus-within:border-black"
        )}
        prefix="₹"
        onValueChange={onChange}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        decimalsLimit={2}
        decimalScale={2}
      />

      <p className="text-sm text-muted-foreground mt-2">
        {isIncome && "This will count as income"}
        {isExpense && "This will count as expense"}
      </p>
    </div>
  );
};

export default AmountInput;
