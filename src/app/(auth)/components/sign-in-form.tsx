"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useSignin } from "@/hooks/use-auth";
import { SignInType } from "@/types/auth-types";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInValidationSchema } from "@/utils/validations/auth-validation";

const SignInForm = () => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const router = useRouter();

  const signInInitialValues: SignInType = {
    email: "",
    password: "",
  };

  const { error, mutate, isPending } = useSignin();

  type SignInHandler = {
    signInInputs: SignInType;
    resetForm: () => void;
  };

  const signInHandler = ({ signInInputs, resetForm }: SignInHandler) => {
    mutate(
      { email: signInInputs.email, password: signInInputs.password },
      {
        onSuccess: (data) => {
          localStorage.setItem("user_name", data.data.user_name);
          resetForm();
          router.replace("/");
        },
      }
    );
  };

  const handleSubmit = (
    formInputs: SignInType,
    { resetForm }: { resetForm: () => void }
  ) => {
    signInHandler({ signInInputs: formInputs, resetForm });
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white">
      <Formik
        initialValues={signInInitialValues}
        validationSchema={signInValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, errors, values, touched }) => (
          <Form className="space-y-3">
            {/* Email Input */}
            <div className="space-y-1">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email" className="font-semibold text-xs">
                  Email address
                </Label>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="placeholder-shown:text-gray-500 h-[1.5rem] rounded text-xs  border-gray-400 "
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1 relative">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password" className="font-semibold text-xs">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={isPasswordShow ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    className="placeholder-shown:text-gray-500 h-[1.5rem] rounded text-xs  border-gray-400 "
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordShow((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {isPasswordShow ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
              {error && <p className="text-sm text-red-600">{error.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                className="bg-zinc-800 hover:bg-zinc-700 text-white h-[1.5rem] w-full border rounded text-[0.700rem]"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Continue"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
