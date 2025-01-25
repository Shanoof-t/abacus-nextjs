import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/hooks/use-auth";
import { SignUpType } from "@/types/auth-types";
import { signUpValidationSchema } from "@/utils/validations/auth-validation";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  const signUpInitialValues: SignUpType = {
    email: "",
    password: "",
    user_name: "",
  };

  type SignUpHandler = {
    signUpInputs: SignUpType;
    resetForm: () => void;
  };

  const { error: signUpError, mutate } = useSignup();
  const query = useQueryClient();
  const router = useRouter();
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  const signUpHandler = ({ signUpInputs, resetForm }: SignUpHandler) => {
    mutate(
      {
        email: signUpInputs.email,
        password: signUpInputs.password,
        user_name: signUpInputs.user_name,
      },
      {
        onSuccess: (data) => {
          query.setQueryData(["signup"], data);
          resetForm();
          router.replace("/sign-up/verify-email");
        },
      }
    );
  };

  const handleSubmit = (
    formInputs: SignUpType,
    { resetForm }: { resetForm: () => void }
  ) => {
    signUpHandler({ signUpInputs: formInputs, resetForm });
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white">
      <Formik
        initialValues={signUpInitialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, errors, values, touched }) => (
          <Form className="space-y-3">
            {/* User Name Input */}

            <div className="space-y-1">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="user_name" className="font-semibold text-xs">
                  User Name
                </Label>
                <Input
                  type="text"
                  name="user_name"
                  onChange={handleChange}
                  value={values.user_name}
                  className="h-[1.5rem] border rounded text-xs border-[0.1rem] border-gray-400"
                />
              </div>

              {touched.user_name && errors.user_name && (
                <p className="text-sm text-red-600">{errors.user_name}</p>
              )}
            </div>

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
                  className="h-[1.5rem] border rounded text-xs border-[0.1rem] border-gray-400"
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
                    className="h-[1.5rem] border rounded text-xs border-[0.1rem] border-gray-400 pr-10"
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
              {touched.email && signUpError?.message && (
                <p className="text-sm text-red-600">{signUpError?.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                className="bg-zinc-800 hover:bg-zinc-700 text-white h-[1.5rem] w-full border rounded text-[0.700rem]"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
