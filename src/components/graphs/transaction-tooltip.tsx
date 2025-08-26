import { format } from "date-fns";
import { Separator } from "../ui/separator";

interface PayloadItem {
  value: number;
  payload: {
    transaction_date: string | Date;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length < 2) return null;

  const date = payload[0].payload.transaction_date;
  const income = payload[0].value;
  const expense = payload[1].value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-gray-200 text-gray-600">
        {format(date, "MMM dd,yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-gray-600">Income</p>
          </div>
          <p className="text-sm text-right font-medium">{income}</p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-gray-600">Expense</p>
          </div>
          <p className="text-sm text-right font-medium">{expense}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
