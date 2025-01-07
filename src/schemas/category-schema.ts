import * as Yup from "yup";

export const validationSchema = Yup.object({
  category_name: Yup.string()
    .required("Please add category name.")
    .min(1, "Category name cannot be empty."),
});
