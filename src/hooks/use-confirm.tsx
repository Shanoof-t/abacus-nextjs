import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { JSX, useState } from "react";

type Confirm = {
  title: string;
  description: string;
};

type useConfirm = {
  ConfirmDialog: () => JSX.Element;
  confirm: () => Promise<unknown>;
};

const useConfirm = ({ title, description }: Confirm): useConfirm => {
  type Promise = {
    resolve: (value: boolean) => void;
  } | null;
  
  const [promise, setPromise] = useState<Promise>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleConfirm = () => {
    promise?.resolve(true);
    setPromise(null);
  };

  const handleCancel = () => {
    setPromise(null);
  };

  const ConfirmDialog = () => {
    return (
      <AlertDialog open={promise !== null}>
        <AlertDialogContent className="bg-white border">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  return { ConfirmDialog, confirm };
};

export default useConfirm;
