"use client";

import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { useBudgetstuffs, useGetBudget } from "@/hooks/use-budget";
import { useBudgetDrawerStore } from "@/store/budget-store";
import SemiCircleProgress from "./progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BudgetDetailsHeader from "./budget-drawer-header";

const BudgetDetails = () => {
  const { isOpen, onClose, id } = useBudgetDrawerStore();
  const { data, isSuccess } = useGetBudget(id, id !== "");
  const { badgeColor, status, remaining } = useBudgetstuffs({
    data: data?.data,
  });

  if (isSuccess) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className=" border-none">
          <div className="mx-auto w-full max-w-sm">
            <BudgetDetailsHeader data={data.data} />
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter"></div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground"></div>
                </div>
              </div>
              <div className="mt-3 w-full h-auto">
                <SemiCircleProgress
                  progress={data.data.progress}
                  total_spent={data.data.total_spent}
                />
              </div>
              <div className="flex justify-center items-center mt-8">
                <Separator className="flex-1 bg-gray-300 max-w-[40%]" />
                <Badge
                  className="border-none rounded mx-2 w-auto h-8 items-center flex justify-center"
                  style={{ backgroundColor: badgeColor }}
                >
                  {status}
                </Badge>
                <Separator className="flex-1 bg-gray-300 max-w-[40%]" />
              </div>
            </div>
            <DrawerFooter className="py-4">
              <div className="flex justify-between items-center px-5">
                {/* Total Budget */}
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    ₹{data.data.amount_limit}
                  </h1>
                  <p className="text-sm text-gray-600">Total Budget</p>
                </div>
                {/* Vertical Separator */}
                <Separator
                  orientation="vertical"
                  className="h-8 mx-4 bg-gray-300"
                />
                {/* Total Spent */}
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    ₹{data.data.total_spent}
                  </h1>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </div>
                {/* Vertical Separator */}
                <Separator
                  orientation="vertical"
                  className="h-8 mx-4 bg-gray-300"
                />
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    ₹{remaining}
                  </h1>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return null;
};

export default BudgetDetails;
