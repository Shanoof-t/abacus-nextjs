"use client";
import { Button } from "@/components/ui/button";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { authValidationSchema } from "@/utils/validations/auth-validation";
import { SignInType, SignUpType } from "@/types/auth-types";
import { useSignin, useSignup } from "@/hooks/auth-hooks";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const router = useRouter();

  const signUpInitialValues: SignUpType = {
    email: "",
    password: "",
  };

  const signInInitialValues: SignInType = {
    email: "",
    password: "",
  };
  
  const query = useQueryClient();

  const { error: signUpError, mutate: signUpMutate } = useSignup();
  const { error: signInError, mutate: signInMutate } = useSignin();

  type SignUpHandler = {
    signUpInputs: SignUpType;
    resetForm: () => void;
  };

  type SignInHandler = {
    signInInputs: SignInType;
    resetForm: () => void;
  };

  const signUpHandler = ({ signUpInputs, resetForm }: SignUpHandler) => {
    signUpMutate(
      { email: signUpInputs.email, password: signUpInputs.password },
      {
        onSuccess: (data) => {
          query.setQueryData(["signup"], data);
          resetForm();
          router.replace("/sign-up/verify-email");
        },
      }
    );
  };

  const signInHandler = ({ signInInputs, resetForm }: SignInHandler) => {
    signInMutate(
      { email: signInInputs.email, password: signInInputs.password },
      {
        onSuccess: () => {
          resetForm();
          router.replace("/");
        },
      }
    );
  };

  const handleSubmit = (
    formInputs: SignInType | SignUpType,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (type === "sign-up") {
      signUpHandler({ signUpInputs: formInputs, resetForm });
    } else if (type === "sign-in") {
      signInHandler({ signInInputs: formInputs, resetForm });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <Formik
        initialValues={
          type === "sign-in" ? signInInitialValues : signUpInitialValues
        }
        validationSchema={authValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, errors, values, touched }) => (
          <Form className="space-y-6">
            {/* Email Input */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                className="input-field"
                placeholder="Enter your email"
              />
              {touched.email && errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
              {touched.email &&
                (signUpError?.message || signInError?.message) && (
                  <p className="text-sm text-red-600">
                    {signUpError?.message || signInError?.message}
                  </p>
                )}
            </div>

            {/* Password Input */}
            <div className="space-y-1 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type={isPasswordShow ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={values.password}
                className="input-field"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setIsPasswordShow((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <FontAwesomeIcon icon={isPasswordShow ? faEyeSlash : faEye} />
              </button>
              {touched.password && errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Continue
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AuthForm;
