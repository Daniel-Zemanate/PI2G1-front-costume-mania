import React from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import Button from "../Button";

const PasswordRecoverySchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  emailConfirmation: yup
    .string()
    .email("Enter a valid email")
    .oneOf([yup.ref("password"), undefined], "Emails must match")
    .required(),
});

function PasswordRecoveryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(PasswordRecoverySchema) });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Form onSubmit={onSubmit}>
      <Form.Header>
        <Form.Title>Recover your password</Form.Title>
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
          name="emailConfirmation"
          type="email"
          label="Email confirmation"
          placeholder="Repeat your email"
          error={errors.emailConfirmation?.message}
          autoFocus
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

export default PasswordRecoveryForm;
