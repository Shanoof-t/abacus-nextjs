import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/store/alert-store";
import { AlertCircle } from "lucide-react";

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
