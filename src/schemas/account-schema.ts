import * as Yup from "yup";

export const validationSchema = Yup.object({
  account_name: Yup.string()
    .required("Please add account name.")
    .min(1, "Account name cannot be empty."),
  account_balance: Yup.number()
    .typeError("Account balance must be a number.")
    .min(0, "Balance must be non-negative."),
});
