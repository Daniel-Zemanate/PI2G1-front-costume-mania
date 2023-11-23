import React, { useEffect, useState } from "react";
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
import { getCartState, submitCart } from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { Purchase } from "@/interfaces/user";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";

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
  city: yup.string().required("City is required"),
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
  const { data: session } = useSession();
  const { items: cartItems, total, shipping, city } = useSelector(getCartState);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(AccountDetailsSchema) });
  const [selectedCity, setSelectedCity] = useState(
    cities.find((c) => c.value === city)?.label
  );

  useEffect(() => {
    setSelectedCity(cities.find((c) => c.value === city)?.label);
  }, [cities, city]);

  const onSubmit = handleSubmit(async (data) => {
    const cart = cartItems.map((e) => ({
      catalog: e.idCatalog,
      quantitySold: e.quantity,
    }));

    if (session && city) {
      const { payload } = (await dispatch(
        submitCart({
          cart: cart,
          idUser: session.user.user_id,
          token: session.user.token,
          city: city,
        })
      )) as PayloadAction<Purchase>;
      
      Swal.fire({
        icon: "success",
        title: `Purchase Successfull`,
        text: `Invoice n°${
          payload.invoiceNumber
        } generated. Total: $ ${payload.total.toFixed(2)}`,
      });
      router.push("/");
    }
  });

  return (
    <>
      <Form
        className={`rounded p-2 border mb-8 ${className}`}
        onSubmit={onSubmit}
      >
        {/* Shipping */}
        <div className="flex justify-between border-b-2 border-purple-3 py-2 mb-4 items-end">
          <span className="text-2xl font-bold">Shipping Address</span>
          <small className="w-1/2 text-orange-2 font-semibold">If the selected region is incorrect, please go back to the cart and select the appropiate</small>
        </div>
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
            name="phone"
            label="Phone number"
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
            error={errors.phone?.message}
          />
          <FormInput
            name="address"
            label="Address"
            error={errors.address?.message}
            wrapperClass="w-full md:w-1/2 px-2 mb-4"
            className="ring-1 ring-black/30 focus:outline-orange-2"
          ></FormInput>
          <div className="w-1/2 flex items-center mb-4">
              <span className="text-xl font-bold">{selectedCity}</span>
          </div>
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
