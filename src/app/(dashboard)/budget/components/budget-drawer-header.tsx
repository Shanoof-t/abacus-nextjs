import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBudget } from "@/hooks/use-budget";
import useConfirm from "@/hooks/use-confirm";
import { BudgetData } from "@/services/budget-service";
import { useBudgetDrawerStore, useBudgetStore } from "@/store/budget-store";
import { format } from "date-fns";
import { ChevronLeft, Edit, EllipsisVertical, Trash } from "lucide-react";
import React from "react";

const BudgetDetailsHeader = ({ data }: { data: BudgetData }) => {
  const { id } = useBudgetDrawerStore();
  const { mutate: deleteBudgetMutate } = useDeleteBudget();
  const { confirm, ConfirmDialog } = useConfirm({
    title: "Are you sure?",
    description: "You are about to delete this transaction.",
  });
  const { onOpen, setId, setMode } = useBudgetStore();

  const endDate = data.budget_end_date && format(data.budget_end_date, "PP");
  const startDate =
    data.budget_start_date && format(data.budget_start_date, "MMM d");

  return (
    <DrawerHeader>
      <DrawerTitle className="flex items-center justify-between ">
        <div className="flex items-center justify-between space-x-2">
          <DrawerClose asChild>
            <ChevronLeft className="cursor-pointer" />
          </DrawerClose>
          <div className="text-gray-900 text-xl">{data.budget_name}</div>
        </div>

        <DropdownMenu>
          <ConfirmDialog />
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                onOpen();
                setId(id);
                setMode("edit");
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
                  deleteBudgetMutate(id);
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
  );
};

export default BudgetDetailsHeader;
