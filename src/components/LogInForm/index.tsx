import React from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import Button from "../Button";
import NavLink from "../NavLink/NavLink";

// validation
const LogInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .max(32, "Max password length is 32")
    .required("Password is required"),
});

function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LogInSchema) });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Form onSubmit={onSubmit}>
      <Form.Header>
        <Form.Title>Log in</Form.Title>
        <Form.TextSection>
          <span>
            Don&apos;t have an account? <NavLink label="Sign up" route="/signup" textColor="purple-2"/>
          </span>
        </Form.TextSection>
      </Form.Header>
      <Form.Body register={register}>
        <FormInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          autoFocus
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          error={errors.password?.message}
        />
      </Form.Body>
      <p className="self-end">Forgot password? <NavLink label="Recover" route="/password-recovery" textColor="purple-2"/></p>
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

export default LogInForm;
