import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../../components/ui/sheet";

import { useNewBudgetStore } from "@/store/budget-store";
import BudgetForm from "./budget-form";

import { useGetAllAccount, useNewAccount } from "@/hooks/use-account";
import { useGetAllCategories, useNewCategory } from "@/hooks/use-categorie";

const NewBudgetSheet = () => {
  const { isOpen, onClose } = useNewBudgetStore();

  // const { isSuccess, mutate, error } = useNewCategory();

  // useEffect(() => {
  //   if (isSuccess) {
  //     onClose();
  //   }
  // }, [isSuccess, onClose]);

  // account section ------------------------------------

  // fetch accounts
  const {
    data: accountData,
    isLoading: accountLoading,
    isSuccess: accountSuccess,
    isError: accountError,
  } = useGetAllAccount();

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
  } = useGetAllCategories();

  // filter category name
  const categoryValues: string[] =
    categoryData?.data.map((category) => category.category_name) || [];
  const { mutate: categoryMutate } = useNewCategory();

  const onCreateCategory = (name: string) =>
    categoryMutate({ category_name: name });

  const isLoading = accountLoading || categoryLoading;
  const isSuccess = accountSuccess || categorySuccess;
  const isError = accountError || categoryError;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white w-full">
        <SheetHeader>
          <SheetTitle>New Budget</SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-black/50">
          Create a new budget to track your budget
        </SheetDescription>

        {isLoading && <div>Loading Form...</div>}

        {!isLoading && isError && <div>Something wrong happened</div>}

        {isSuccess && !isLoading && (
          <BudgetForm
            accountValues={accountValues}
            onAccountCreate={onCreateAccount}
            categoryValues={categoryValues}
            onCategoryCreate={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewBudgetSheet;
