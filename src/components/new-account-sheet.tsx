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
import * as Yup from "yup";
import { Label } from "./ui/label";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const initialValue = { account_name: "" };
  const validationSchema = Yup.object().shape({
    account_name: Yup.string().required("Please add account name."),
  });

  const { mutate, error, isSuccess } = useMutation({
    mutationFn: async (data: { account_name: string }) => {
      console.log("in mutate fun", data);
      const response = await apiClient.post(
        API_ROUTES.ACCOUNT.CREATE_ACCOUNT,
        data
      );

      return response.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClose();
      initialValue.account_name = "";
    }
  }, [isSuccess, onClose]);

  const handleSubmit = async (values: { account_name: string }) => {
    mutate(values);
  };

  return (
    <Formik
      initialValues={initialValue}
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
