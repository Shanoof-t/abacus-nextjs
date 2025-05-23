import { Separator } from "../ui/separator";

interface PayloadItem {
  name: string;
  value: number;
}

interface CategoryTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
}

const CategoryTooltip = ({ active, payload }: CategoryTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const name = payload[0].name;
  const value = payload[0].value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-gray-200 text-gray-600">{name}</div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-gray-600">Amount</p>
          </div>
          <p className="text-sm text-right font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryTooltip;