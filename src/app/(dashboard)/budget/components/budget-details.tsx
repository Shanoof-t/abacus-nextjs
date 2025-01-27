"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useDeleteBudget, useGetBudget } from "@/hooks/use-budget";
import { useBudgetDrawerStore } from "@/store/budget-store";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import SemiCircleProgress from "./progress";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Edit,
  EllipsisVertical,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import useConfirm from "@/hooks/use-confirm";

const BudgetDetails = () => {
  const { isOpen, onClose, category_name } = useBudgetDrawerStore();
  const { mutate: getBudgetMutate, data, isSuccess } = useGetBudget();
  const { mutate: deleteBudgetMutate } = useDeleteBudget();
  useEffect(() => {
    getBudgetMutate(category_name);
  }, [getBudgetMutate, category_name]);

  const endDate =
    data?.data.budget_end_date && format(data?.data.budget_end_date, "PP");
  const startDate =
    data?.data.budget_start_date &&
    format(data?.data.budget_start_date, "MMM d");

  const [status, setStatus] = useState("");
  const [badgeColor, setBadgeColor] = useState("#FFFFFF");
  const [remaining, setRemaing] = useState(0);
  useEffect(() => {
    if (data?.data.progress !== undefined) {
      switch (true) {
        case data?.data.progress === 0:
          setStatus("Just Started");
          setBadgeColor("#90EE90"); //10B981
          break;
        case data?.data.progress > 0 && data?.data.progress < 50:
          setStatus("Getting There");
          setBadgeColor("#FFD700");
          break;
        case data?.data.progress === 50:
          setStatus("Halfway There");
          setBadgeColor("#FFA500");
          break;
        case data?.data.progress > 50 && data?.data.progress < 100:
          setStatus("Almost There");
          setBadgeColor("#FF4500");
          break;
        case data?.data.progress === 100:
          setStatus("Fully Utilized");
          setBadgeColor("#F43F5E");
          break;
        default:
          setStatus("No Status");
          setBadgeColor("#6C757D");
      }
    }
    const remain =
      Number(data?.data.amount_limit) - Number(data?.data.total_spent);
    if (remain < 0) {
      setRemaing(0);
    } else {
      setRemaing(remain);
    }
  }, [data]);

  const { confirm, ConfirmDialog } = useConfirm({
    title: "Delete budget",
    description: "you are sure about ",
  });
  if (isSuccess) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className=" border-none">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="flex items-center justify-between ">
                <div className="flex items-center justify-between space-x-2">
                  <DrawerClose asChild>
                    <ChevronLeft className="cursor-pointer" />
                  </DrawerClose>
                  <div className="text-gray-900 text-xl">
                    {data.data.budget_name}
                  </div>
                </div>

                <DropdownMenu>
                  <ConfirmDialog />
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        // onOpen();
                        // setID(id);
                      }}
                    >
                      <Edit />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        const ok = await confirm();
                        if (ok) {
                          deleteBudgetMutate(category_name);
                        }
                      }}
                    >
                      <Trash />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DrawerTitle>
              <DrawerDescription className="text-xs">
                <div className="text-muted-foreground text-xs ps-8">
                  {startDate + " - " + endDate}
                </div>
              </DrawerDescription>
            </DrawerHeader>
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
