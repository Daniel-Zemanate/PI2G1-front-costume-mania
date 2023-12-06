import React from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import Button from "../Button";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import NavLink from "../NavLink/NavLink";

const PasswordRecoverySchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  emailConfirmation: yup
    .string()
    .email("Enter a valid email")
    .oneOf([yup.ref("email"), undefined], "Emails must match")
    .required(),
});

function PasswordRecoveryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(PasswordRecoverySchema) });

  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const { email } = data;

    const body = {
      email,
    };

    const response = await fetch("/api/users/reset", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

    const { message } = await response.json();

    console.log(response);
    console.log(response.statusText);
    console.log(message);

    Swal.fire({
      icon: response.ok ? "success" : "error",
      title: response.ok ? "Success!" : "Error",
      text: `${message}`,
    });

    if (response.ok) router.push("/");
  });

  return (
    <Form
      onSubmit={onSubmit}
      className="bg-purple-3 bg-opacity-25 px-16 py-8 my-8 rounded-lg flex flex-col max-w-screen-lg shadow min-w-[33%] m-auto"
    >
      <Form.Header className="text-center p-4">
        <Form.Title className="text-2xl font-bold">
          Recover your password
        </Form.Title>
        <Form.TextSection className="mt-4 flex justify-center gap-4">
          <span>
            Don&apos;t have an account?{" "}
            <NavLink
              label="Sign up"
              route="/auth/signup"
              textColor="purple-2"
            />
          </span>
        </Form.TextSection>
      </Form.Header>
      <Form.Body register={register} className="flex flex-col justify-center">
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

export default PasswordRecoveryForm;
