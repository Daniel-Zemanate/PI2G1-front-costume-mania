import React, { useState } from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import Button from "../Button";
import NavLink from "../NavLink/NavLink";
import Swal from "sweetalert2";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "../Spinner";

const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name should have at least 2 characters")
    .max(50, "First name should not exceed 50 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name should have at least 2 characters")
    .max(50, "Last name should not exceed 50 characters")
    .required("Last name is required"),
  dni: yup
    .string()
    .min(8, "ID number should have at least 8 characters")
    .required("ID number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should have at least 6 characters")
    .max(32, "Max password length is 32")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignUpSchema) });

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const { passwordConfirmation, ...signUpData } = data;
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(signUpData),
    });

    console.log(response);

    if (response.status === 400) {
      setError(
        "Oops! It looks like this email or ID is already taken."
      );
      setLoading(false);
      return;
    }

    if (response.ok) {
      const result = (await signIn("credentials", {
        email: signUpData.email,
        password: signUpData.password,
        redirect: false,
      })) as any;

      if (result?.ok) {
        const session = await getSession();

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome, ${session?.user?.email}!`,
        });
        router.push("/");
      } else {
        setError(result?.error);
      }
    } else {
      setError(response.statusText);
    }

    setLoading(false);
  });

  if (loading) {
    return (
      <div className="m-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="bg-purple-3 bg-opacity-25 px-16 py-8 my-8 rounded-lg flex flex-col max-w-screen-lg shadow min-w-[33%] m-auto"
    >
      <Form.Header className="text-center p-4">
        <Form.Title className="text-2xl font-bold">Create account</Form.Title>
        <Form.TextSection className="mt-4 flex justify-center gap-4">
          <span>
            Already have an account?{" "}
            <NavLink label="Log in" route="/auth/login" textColor="purple-2" />
          </span>
        </Form.TextSection>
      </Form.Header>

      <Form.Errors>{error}</Form.Errors>

      <Form.Body register={register} className="flex flex-col justify-center">
        <FormInput
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          error={errors.firstName?.message}
          autoFocus
        />
        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          error={errors.lastName?.message}
        />
        <FormInput
          name="dni"
          label="Personal ID"
          placeholder="Enter your ID"
          error={errors.dni?.message}
        />
        <FormInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
        />
        <FormInput
          name="passwordConfirmation"
          type="password"
          label="Confirm password"
          placeholder="Repeat password"
          error={errors.passwordConfirmation?.message}
        />
      </Form.Body>
      <Form.ButtonSection className="mt-4 flex justify-center gap-4">
        <Button
          label="Cancel"
          to="/"
          type="button"
          buttonStyle="secondary"
          size="small"
        />
        <Button
          label="Submit"
          type="submit"
          buttonStyle="primary"
          size="small"
        />
      </Form.ButtonSection>
    </Form>
  );
}

export default SignUpForm;
