import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter valid email format!")
    .required("Email is required!"),
  password: Yup.string().min(6).max(12).required("Password is required!"),
  user_name: Yup.string().required("Please enter your user name"),
});
export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter valid email format!")
    .required("Email is required!"),
  password: Yup.string().min(6).max(12).required("Password is required!"),
});
