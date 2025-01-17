import { format } from "date-fns";
import { Separator } from "./ui/separator";

const CustomTooltip = ({ active, payload }: any) => {
  console.log(active);
  if (!active) return null;
  const date = payload[0].payload.date;
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
