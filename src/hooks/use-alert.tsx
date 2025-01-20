import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/store/alert-store";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

type BudgetAlertDialog = {
  title?: string;
  description?: string;
};

// const useBudgetAlert = ({ title, description }: BudgetAlertDialog = {}) => {
//   const [isBudgetAlertVisible, setIsBudgetAlertVisible] = useState(false);

//   console.log("isBudgetAlertVisible", isBudgetAlertVisible);
//   console.log("title", title);
//   console.log("description", description);
//   const BudgetAlertDialog = () => {
//     const handleAction = () => {
//       setIsBudgetAlertVisible(false);
//     };

//     return (
//       <AlertDialog open={isBudgetAlertVisible}>
//         <AlertDialogContent>
//           <AlertDialogHeader>{title}</AlertDialogHeader>
//           <AlertDialogDescription>{description}</AlertDialogDescription>
//           <AlertDialogFooter>
//             <AlertDialogAction onClick={handleAction}>Ok</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     );
//   };
//   return { BudgetAlertDialog, setIsBudgetAlertVisible };
// };

const useBudgetAlert = () => {
  const { isOpen, onClose, title, description } = useAlertStore();
  const BudgetAlert = () => {
    return isOpen ? (
      <Alert variant="destructive" className="flex justify-between bg-black">
        <AlertCircle className="h-4 w-4" />
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </div>
        <div>
          <Button
            variant="destructive"
            size="sm"
            className="text-white border rounded-lg w-full lg:w-auto"
            onClick={onClose}
          >
            Ok
          </Button>
        </div>
      </Alert>
    ) : null;
  };
  return { BudgetAlert };
};

export default useBudgetAlert;
