import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../../components/ui/sheet";

import { useBudgetStore } from "@/store/budget-store";
import BudgetForm from "./budget-form";

import { useGetAllAccount, useNewAccount } from "@/hooks/use-account";
import { useGetAllCategories, useNewCategory } from "@/hooks/use-categorie";
import { useGetBudget } from "@/hooks/use-budget";

export const initialValues = {
  budget_name: "",
  category_name: "",
  amount_limit: "",
  budget_start_date: undefined,
  budget_end_date: undefined,
  notification_status: false,
  budget_note: "",
  alert_threshold: 0,
};

const BudgetSheet = () => {
  const { isOpen, onClose, mode, id } = useBudgetStore();

  // account section ------------------------------------

  // fetch accounts
  const {
    data: accountData,
    isLoading: accountLoading,
    isSuccess: accountSuccess,
    isError: accountError,
  } = useGetAllAccount(isOpen);

  // filtter account names
  const accountValues: string[] =
    accountData?.data.map((account) => account.account_name) || [];

  const { mutate: accountMutate } = useNewAccount();
  const onCreateAccount = (name: string) =>
    accountMutate({ account_name: name });

  // category section-------------------------------------

  // fetch categories
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
    isError: categoryError,
  } = useGetAllCategories(isOpen);

  // filter category name
  const categoryValues: string[] =
    categoryData?.data.map((category) => category.category_name) || [];
  const { mutate: categoryMutate } = useNewCategory();

  const onCreateCategory = (name: string) =>
    categoryMutate({ category_name: name });

  // fetch existing budget
  const { data } = useGetBudget(id, mode === "edit");


  const isLoading = accountLoading || categoryLoading;
  const isSuccess = accountSuccess || categorySuccess || data?.data;
  const isError = accountError || categoryError;

  const budgetData = data?.data
    ? {
        ...data.data,
        amount_limit: data?.data.amount_limit.toString(),
        budget_start_date: data.data.budget_start_date
          ? new Date(data.data.budget_start_date)
          : undefined,
        budget_end_date: data.data.budget_end_date
          ? new Date(data.data.budget_end_date)
          : undefined,
      }
    : initialValues;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white w-full">
        <SheetHeader>
          <SheetTitle>
            {mode === "create" ? "New Budget" : "Edit Budget"}
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-black/50">
          {mode === "create"
            ? "Create a new budget to track your budget"
            : "Edit an existing budget"}
        </SheetDescription>

        {isLoading && <div>Loading Form...</div>}

        {!isLoading && isError && <div>Something wrong happened</div>}

        {isSuccess && !isLoading && data?.data && (
          <BudgetForm
            accountValues={accountValues}
            onAccountCreate={onCreateAccount}
            categoryValues={categoryValues}
            onCategoryCreate={onCreateCategory}
            mode={mode}
            initialValues={budgetData}
          />
        )}
        {isSuccess && !isLoading && !data?.data && (
          <BudgetForm
            accountValues={accountValues}
            onAccountCreate={onCreateAccount}
            categoryValues={categoryValues}
            onCategoryCreate={onCreateCategory}
            mode={mode}
            initialValues={initialValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BudgetSheet;
