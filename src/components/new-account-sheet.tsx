import React from "react";
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

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const validationSchema = Yup.object().shape({
    account_name: Yup.string().required("Please add account name."),
  });

  const handleSubmit = (values: { account_name: string }) => {
    console.log(values);
    onClose();
  };

  return (
    <Formik
      initialValues={{ account_name: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
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

              <SheetFooter className="mt-4">
                <div className="w-full">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full border rounded-[.50rem] text-white"
                    disabled={isSubmitting}
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
