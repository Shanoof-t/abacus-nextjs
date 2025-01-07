import React, { useEffect } from "react";
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

import { useNewCategoryStore } from "@/store/category-store";
import { validationSchema } from "@/schemas/category-schema";
import { useNewCategory } from "@/hooks/use-categorie";

const NewCategorieSheet = () => {
  const { isOpen, onClose } = useNewCategoryStore();

  const { isSuccess, mutate } = useNewCategory();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <Formik
      initialValues={{
        category_name: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="bg-white w-full">
            <SheetHeader>
              <SheetTitle>New Category</SheetTitle>
            </SheetHeader>
            <SheetDescription className="text-black/50">
              Create a new category to track your transactions
            </SheetDescription>

            <Form className="mt-3">
              <Label>Name</Label>
              <br />
              <Field
                type="text"
                name="category_name"
                placeholder="eg: Savings.."
                className="flex h-10 w-full border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-1 border rounded-[.50rem] border-black"
              />
              {errors.category_name && touched.category_name && (
                <p className="text-red-500 text-sm mt-3">
                  {errors.category_name}
                </p>
              )}

              <SheetFooter className="mt-4">
                <div className="w-full">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full border rounded-[.50rem] text-white"
                  >
                    Create categorie
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

export default NewCategorieSheet;
