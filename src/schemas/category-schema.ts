import * as Yup from "yup";

export const validationSchema = Yup.object({
  category_name: Yup.string()
    .required("Please add account name.")
    .min(1, "Account name cannot be empty."),
});
