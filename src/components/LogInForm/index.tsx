import React, { useState } from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import Button from "../Button";
import NavLink from "../NavLink/NavLink";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Spinner from "../Spinner";

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
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const result = (await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })) as any;

    if (result?.ok) {
      const session = await getSession();

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${session?.user?.email}!`,
      });
      router.push("/");
    } else {
      setError(result?.error);
    }
    setLoading(false)
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
        <Form.Title className="text-2xl font-bold">Log in</Form.Title>
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

      <Form.Errors>{error}</Form.Errors>

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
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          error={errors.password?.message}
        />
      </Form.Body>

      <p className="self-end">
        Forgot password?{" "}
        <NavLink
          label="Recover"
          route="/auth/password-recovery"
          textColor="purple-2"
        />
      </p>

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

export default LogInForm;
