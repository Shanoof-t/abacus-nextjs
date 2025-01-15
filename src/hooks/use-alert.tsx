import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type BudgetAlertDialog = {
  title?: string;
  description?: string;
} 

const useBudgetAlert = ({ title, description }: BudgetAlertDialog={}) => {
  const [isBudgetAlertVisible, setIsBudgetAlertVisible] = useState(false);

  const BudgetAlertDialog = () => {
    const handleAction = () => {
      setIsBudgetAlertVisible(false);
    };

    return (
      <AlertDialog open={isBudgetAlertVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAction}>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  return { BudgetAlertDialog, setIsBudgetAlertVisible };
};

export default useBudgetAlert;
