import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useNewAccount } from "@/hooks/account-hooks";
import { Formik, Form, Field } from "formik";
import { Label } from "./ui/label";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import * as Yup from "yup";

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const queryClient = useQueryClient();

  const initialValues = {
    account_name: "",
    account_balance: 0,
  };

  const validationSchema = Yup.object({
    account_name: Yup.string()
      .required("Please add account name.")
      .min(1, "Account name cannot be empty."),
    account_balance: Yup.number()
      .typeError("Account balance must be a number.")
      .min(0, "Balance must be non-negative."),
  });

  const { mutate, error, isSuccess } = useMutation({
    mutationFn: async (data: {
      account_name: string;
      account_balance: number | null;
    }) => {
      const response = await apiClient.post(
        API_ROUTES.ACCOUNT.CREATE_ACCOUNT,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      // queryClient.refetchQueries({queryKey:["accounts"] })
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const handleSubmit = async (values: {
    account_name: string;
    account_balance: number;
  }) => {
    mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="bg-white w-full">
            <SheetHeader>
              <SheetTitle>New Account</SheetTitle>
            </SheetHeader>
            <SheetDescription className="text-black/50">
              Create a new account to track your transactions
            </SheetDescription>

            <Form className="mt-3">
              <Label>Name</Label>
              <br />
              <Field
                type="text"
                name="account_name"
                placeholder="eg: Savings.."
                className="flex h-10 w-full border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-1 border rounded-[.50rem] border-black"
              />
              {errors.account_name && touched.account_name && (
                <p className="text-red-500 text-sm mt-3">
                  {errors.account_name}
                </p>
              )}

              <Label>Current Balance</Label>
              <br />
              <Field
                type="number"
                name="account_balance"
                placeholder="Enter your balance here"
                className="flex h-10 w-full border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-1 border rounded-[.50rem] border-black"
              />
              {errors.account_balance && touched.account_balance && (
                <p className="text-red-500 text-sm mt-3">
                  {errors.account_balance}
                </p>
              )}
              {error?.message && (
                <p className="text-red-500 text-sm mt-3">{error.message}</p>
              )}
              <SheetFooter className="mt-4">
                <div className="w-full">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full border rounded-[.50rem] text-white"
                  >
                    Create account
                  </Button>
                </div>
              </SheetFooter>
            </Form>
          </SheetContent>
        </Sheet>
      )}
    </Formik>
  );
};

export default NewAccountSheet;
