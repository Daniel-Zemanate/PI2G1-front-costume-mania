import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Form";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import { UserData } from "@/interfaces/user";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import FormSelect, { SelectOption } from "../Form/FormSelect";
import { getCartState } from "@/store/slices/cartSlice";
import { useSelector } from "react-redux";

export interface CheckoutData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  cvc: string;
  expirationDate: string;
  phoneNumberBill: string;
  addressBill: string;
  cityBill: string;
  zipCodeBill: string;
}

// validation
const AccountDetailsSchema = yup.object().shape({
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
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  address: yup
    .string()
    .min(5, "Address should have at least 5 characters")
    .max(100, "Address should not exceed 100 characters")
    .required("Address is required"),
  phone: yup
    .string()
    .min(8, "Phone number should have at least 8 characters")
    .required("Phone number is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  cardName: yup.string().required("Card name is required"),
  expirationDate: yup
    .string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date format invalid"),
  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "CVC must be 3 digits"),
  phoneNumberBill: yup
    .string()
    .min(8, "Phone number should have at least 8 characters")
    .required("Phone number is required"),
  addressBill: yup
    .string()
    .min(5, "Address should have at least 5 characters")
    .max(100, "Address should not exceed 100 characters")
    .required("Address is required"),
  zipCode: yup
    .string()
    .min(4, "Zip code should have at least 4 characters")
    .required("Zip code is required"),
});

function CheckoutForm({
  account,
  className,
  cities,
}: {
  account: UserData;
  className?: string;
  cities: SelectOption[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(AccountDetailsSchema) });

  const { items: cartItems, total, shipping } = useSelector(getCartState);

  console.log(cartItems, total, shipping)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    // const response = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify(signUpData),
    // });

    // console.log(response)

    // if (response.ok) {
    //   const result = (await signIn("credentials", {
    //     email: signUpData.email,
    //     password: signUpData.password,
    //     redirect: false,
    //   })) as any;

    //   if (result?.ok) {
    //     const session = await getSession();

    //     Swal.fire({
    //       icon: "success",
    //       title: "Login Successful!",
    //       text: `Welcome, ${session?.user?.email}!`,
    //     });
    //     router.push("/");
    //   } else {
    //     setError(result?.error);
    //   }
    // } else {
    //   setError(response.statusText)
    // }
  });

  return (
    <>
      <Form
        className={`rounded p-2 border mb-8 ${className}`}
        onSubmit={onSubmit}
      >
        {/* Shipping */}
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
          Shipping Address
        </h3>
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="email"
            type="email"
            label="Email"
            error={errors.email?.message}
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            defaultValue={account.email}
          />
          <FormInput
            name="personalId"
            label="Identification Number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            defaultValue={account.dni}
          />
          <FormInput
            name="firstName"
            label="First Name"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            defaultValue={account.first_name}
            error={errors.firstName?.message}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            defaultValue={account.last_name}
            error={errors.lastName?.message}
          />
          <FormInput
            name="addressBill"
            label="Address"
            error={errors.addressBill?.message}
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
          />
          <FormInput
            name="phone"
            label="Phone number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.phone?.message}
          />
        </Form.Body>

        {/* Payment */}
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
          Payment Method
        </h3>
        <Cards
          number={watch("cardNumber", "")}
          name={watch("cardName", "")}
          expiry={watch("expirationDate", "")}
          cvc={watch("cvc", "")}
        />
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="cardNumber"
            label="Card Number"
            wrapperClass="w-full px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.cardNumber?.message}
          />
          <FormInput
            name="cardName"
            label="Card Name"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.cardName?.message}
          />
          <FormInput
            name="expirationDate"
            label="Expiration Date"
            wrapperClass="w-full md:w-1/4 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.expirationDate?.message}
          />
          <FormInput
            name="cvc"
            label="CVC"
            wrapperClass="w-full md:w-1/4 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.cvc?.message}
          />
        </Form.Body>

        {/* Billing info */}
        <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
          Billing information
        </h3>
        <Form.Body register={register} className="flex flex-wrap">
          <FormInput
            name="phoneNumberBill"
            label="Phone Number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.phoneNumberBill?.message}
          />
          <FormInput
            name="addressBill"
            label="Address"
            error={errors.addressBill?.message}
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
          />
          <FormSelect
            name="city"
            options={cities ?? []}
            label="City"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
          />
          <FormInput
            name="zipCode"
            label="Zip Code"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.zipCode?.message}
          />
        </Form.Body>
        <Form.ButtonSection className="mt-4 flex justify-center gap-4">
          <Button label="Submit" buttonStyle="primary" type="submit" />
        </Form.ButtonSection>
      </Form>
    </>
  );
}

export default CheckoutForm;
