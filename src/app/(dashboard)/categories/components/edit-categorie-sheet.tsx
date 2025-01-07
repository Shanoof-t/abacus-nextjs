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

import { validationSchema } from "@/schemas/category-schema";
import { useEditCategory, useGetCategory } from "@/hooks/use-categorie";
import { useEditCategoryStore } from "@/store/category-store";

const EditCategorySheet = () => {
  const { id, isOpen, onClose } = useEditCategoryStore();
  const { data } = useGetCategory(id);
  const { mutate, isSuccess, error } = useEditCategory();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        category_name: data?.category_name || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate({ values, id });
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="bg-white w-full">
            <SheetHeader>
              <SheetTitle>Edit Category</SheetTitle>
            </SheetHeader>
            <SheetDescription className="text-black/50">
              Edit an existing category
            </SheetDescription>

            <Form className="mt-3">
              <Label>Name</Label>
              <br />
              <Field
                type="text"
                name="category_name"
                placeholder="eg: Food.."
                className="flex h-10 w-full border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-1 border rounded-[.50rem] border-black"
              />
              {errors.category_name && touched.category_name && (
                <p className="text-red-500 text-sm mt-3">
                  {errors.category_name}
                </p>
              )}
              {error?.message && (
                <p className="text-red-500 text-sm mt-3">{error?.message}</p>
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

export default EditCategorySheet;
