import * as Yup from "yup";
export const authValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter valid email format!")
    .required("Email is required!"),
  password: Yup.string().min(6).max(12).required("Password is required!"),
});
