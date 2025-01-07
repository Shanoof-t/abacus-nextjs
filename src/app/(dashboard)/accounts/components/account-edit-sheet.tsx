import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";

import { Formik, Form, Field } from "formik";
import { validationSchema } from "@/schemas/account-schema";

import { useEditAccountStore } from "@/store/account-store";
import { useEditAccount, useGetAccount } from "@/hooks/use-account";
import { Loader2 } from "lucide-react";

const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useEditAccountStore();

  const [initialValues, setInitialValues] = useState({
    account_name: "",
    account_balance: 0,
  });

  const { mutate, error, isSuccess } = useEditAccount();

  const { data, isLoading, isSuccess: getAccountSuccess } = useGetAccount(id);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  // assign with account existing data
  useEffect(() => {
    if (getAccountSuccess && data) {
      setInitialValues({
        account_name: data.account_name,
        account_balance: data.account_balance,
      });
      console.log(initialValues);
    }
  }, [getAccountSuccess, data]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate({ values, id });
        resetForm();
      }}
    >
      {({ errors, touched, values }) => (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="bg-white w-full">
            <SheetHeader>
              <SheetTitle>Edit Account</SheetTitle>
            </SheetHeader>
            <SheetDescription className="text-black/50">
              Edit an existing account
            </SheetDescription>

            {isLoading ? (
              <div className="mt-6 items-ce6ter flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Form className="mt-3">
                <Label>Name</Label>
                <br />
                <Field
                  type="text"
                  value={values.account_name}
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
                  value={values.account_balance}
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
            )}
          </SheetContent>
        </Sheet>
      )}
    </Formik>
  );
};

export default EditAccountSheet;
