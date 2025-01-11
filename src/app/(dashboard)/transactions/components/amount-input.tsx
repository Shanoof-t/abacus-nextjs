import React, { useEffect } from "react";
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
  isEdit?: boolean;
};

const AmountInput: React.FC<Props> = ({
  placeholder = "Enter amount",
  value,
  onChange,
  isEdit,
  disabled = false,
}) => {
  
  useEffect(() => {
    if (isEdit) {
      onChange(value.toString());
    }
  }, [value, isEdit, onChange]);

  const parsedValue = parseFloat(value) || 0;
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const handleReverseValue = () => {
    if (!value) return;
    const reversedValue = parseFloat(value) * -1;
    onChange(reversedValue.toString());
  };

  return (
    <div className="relative w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleReverseValue();
              }}
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
          "ps-12 h-10 bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border  focus-within:border-black items-center placeholder-shown:text-gray-500 border-gray-200 focus:border-black rounded-[.50rem] w-full justify-start transition"
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
