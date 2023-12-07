import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import { UserData } from "@/interfaces/user";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

// validation
const AccountDetailsSchema = yup.object().shape({
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
  lastName: yup
    .string()
    .min(2, "Last name should have at least 2 characters")
    .max(50, "Last name should not exceed 50 characters")
    .required("Last name is required"),
  firstName: yup
    .string()
    .min(2, "First name should have at least 2 characters")
    .max(50, "First name should not exceed 50 characters")
    .required("First name is required"),
  personalId: yup.string().required("First name is required"),
  phone: yup
    .string()
    .min(8, "Phone number should have at least 8 characters")
    .required("Phone number is required"),
  address: yup
    .string()
    .min(5, "Address should have at least 5 characters")
    .max(100, "Address should not exceed 100 characters")
    .required("Address is required"),
  city: yup
    .string()
    .min(3, "City should have at least 3 characters")
    .required("City is required"),
  zipCode: yup
    .string()
    .min(4, "Zip code should have at least 4 characters")
    .required("Zip code is required"),
  country: yup
    .string()
    .min(3, "City should have at least 3 characters")
    .required("City is required"),
});

function AccountDetailsForm({
  account,
  className,
  onUpdate,
}: {
  account: UserData;
  className?: string;
  onUpdate: () => void;
}) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AccountDetailsSchema) });

  const { data: session } = useSession();

  const onSubmit = handleSubmit(async (data) => {
    if (!session) return;
    const { firstName, lastName, personalId, email, password } = data;
    const id = session.user.user_id;

    const body = {
      id,
      dni: personalId,
      email,
      password,
      firstName,
      lastName,
    };

    const response = await fetch("/api/users/update", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: `User data successfully modified`,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
      });
      resetField("password")
      resetField("passwordConfirmation")
      onUpdate();
    }
  });

  return (
    <>
      <Form
        className={`w-full rounded p-2 border mb-8 ${className}`}
        onSubmit={onSubmit}
      >
        {/* Personal information */}
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
          Personal Information
        </h3>
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="email"
            type="email"
            label="Email"
            error={errors.email?.message}
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={account.email}
            disabled
          />
          <FormInput
            name="personalId"
            label="Identification Number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={account.dni}
            error={errors.personalId?.message}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={account.last_name}
            error={errors.lastName?.message}
          />
          <FormInput
            name="firstName"
            label="First Name"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={account.first_name}
            error={errors.firstName?.message}
          />
          <FormInput
            name="password"
            label="Change password"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            error={errors.password?.message}
          />
          <FormInput
            name="passwordConfirmation"
            label="Confirm new password"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            error={errors.passwordConfirmation?.message}
          />
        </Form.Body>

        {/* Contact */}
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
          Contact
        </h3>
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="phone"
            label="Phone Number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={"541112345678"}
            error={errors.phone?.message}
          />
          <FormInput
            name="address"
            label="Address"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={"Calle falsa 123"}
            error={errors.address?.message}
          />
          <FormInput
            name="city"
            label="City"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={"City"}
            error={errors.city?.message}
          />
          <FormInput
            name="zipCode"
            label="Zip Code"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={"1111"}
            error={errors.zipCode?.message}
          />
          <FormInput
            name="country"
            label="Country"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="focus:outline-orange-2"
            defaultValue={"Country"}
            error={errors.country?.message}
          />
        </Form.Body>
        <Form.ButtonSection className="mt-4 flex justify-center gap-4">
          <Button label="Save" buttonStyle="primary" type="submit" />
        </Form.ButtonSection>
      </Form>
    </>
  );
}

export default AccountDetailsForm;
