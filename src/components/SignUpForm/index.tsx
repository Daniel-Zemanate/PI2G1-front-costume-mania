import React from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import Button from "../Button";
import NavLink from "../NavLink/NavLink";

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
  address: yup
    .string()
    .min(5, "Address should have at least 5 characters")
    .max(100, "Address should not exceed 100 characters")
    .required("Address is required"),
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

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Form onSubmit={onSubmit}>
      <Form.Header>
        <Form.Title>Create account</Form.Title>
        <Form.TextSection>
          <span>
            Already have an account?{" "}
            <NavLink label="Log in" route="/auth/login" textColor="purple-2" />
          </span>
        </Form.TextSection>
      </Form.Header>
      <Form.Body register={register}>
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
          name="address"
          label="Address"
          placeholder="Enter your address"
          error={errors.address?.message}
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
      <Form.ButtonSection>
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
