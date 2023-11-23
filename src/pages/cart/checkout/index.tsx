import * as yup from "yup";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Breadcrumbs from "@/components/Breadcrumbs";
import RootLayout from "@/layouts/rootLayout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Frijole } from "next/font/google";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { fetchDummyUserData } from "@/utils/user";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/components/Form";
import FormInput from "@/components/Form/FormInput";
import { getShipping } from "@/services/shipping.service";
import { GetServerSideProps, NextPage } from "next";
import { ApiShipping } from "@/interfaces/shipping";
import FormSelect, { SelectOption } from "@/components/Form/FormSelect";
import { useSelector } from "react-redux";
import { getCartState, removeItem } from "@/store/slices/cartSlice";
import Dropdown from "@/components/Dropdown";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

const frijole = Frijole({
    subsets: ["latin"],
    weight: "400",
});

export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    personalId: string;
    birth: string;
    phone: string;
    city: string;
    zipCode: string;
    country: string;
    password: string;
}

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

interface Props {
    apiShipping: ApiShipping[];
}

// validation
const AccountDetailsSchema = yup.object().shape({
    fullName: yup
        .string()
        .min(5, "Full name should have at least 2 characters")
        .max(100, "Full name should not exceed 50 characters")
        .required("Full name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    phoneNumber: yup
        .string()
        .min(8, "Phone number should have at least 8 characters")
        .required("Phone number is required"),
    address: yup
        .string()
        .min(5, "Address should have at least 5 characters")
        .max(100, "Address should not exceed 100 characters")
        .required("Address is required"),
    zipCode: yup
        .string()
        .min(4, "Zip code should have at least 4 characters")
        .required("Zip code is required"),
    cardNumber: yup
        .string()
        .required('Card number is requires')
        .matches(/^\d{16}$/, 'Card number must be 16 digits'),
    cardName: yup
        .string()
        .required('Card name is requires'),
    expirationDate: yup
        .string()
        .required('Expiration date is requires')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date format invalid'),
    cvc: yup
        .string()
        .required('CVC is requires')
        .matches(/^\d{3}$/, 'CVC must be 3 digits'),
    phoneNumberBill: yup
        .string()
        .min(8, "Phone number should have at least 8 characters")
        .required("Phone number is required"),
    addressBill: yup
        .string()
        .min(5, "Address should have at least 5 characters")
        .max(100, "Address should not exceed 100 characters")
        .required("Address is required"),
    zipCodeBill: yup
        .string()
        .min(4, "Zip code should have at least 4 characters")
        .required("Zip code is required"),
})

const CheckoutPage: NextPage<Props> = ({ apiShipping }) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<UserData>();
    const [checkoutData, setCheckoutData] = useState<CheckoutData>();
    const [cities, setCities] = useState<SelectOption[]>();
    const { items: cartItems, total, shipping } = useSelector(getCartState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!session) return;
        const userData = fetchDummyUserData({
            email: session?.user?.email,
            name: session?.user?.name,
        });

        const selectOptions: SelectOption[] = []

        apiShipping?.forEach((item) => {
            selectOptions.push({ value: item.idShippping, label: item.destination })
        })
        setCities(selectOptions)
        setUser(userData);
    }, [session, apiShipping]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(AccountDetailsSchema) });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
    });

    const handleRemoveFromCart = (idCatalog: number) => {
        dispatch(removeItem(idCatalog));
    };

    const validateOrder = async () => {
        const cart = cartItems.map((e) => ({
            catalog: e.idCatalog,
            quantitySold: e.quantity,
        }))
    };

    const submitOrder = async () => {
        const cart = cartItems.map((e) => ({
            catalog: e.idCatalog,
            quantitySold: e.quantity,
        }))
    };

    return (
        <RootLayout>
            <Head>
                <title>Checkout</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="min-h-[50%] w-[90vw] px-4 sm:px-6 lg:px-8">
                <h1
                    className={`${frijole.className} text-5xl py-4 md:py-6 text-orange-2`}
                    style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
                >
                    Account
                </h1>
                <Breadcrumbs
                    homeElement={<AiOutlineHome />}
                    separator={<span> / </span>}
                    activeClasses="text-amber-500"
                    containerClasses="flex py-2 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 items-center"
                    listClasses="hover:underline mx-2 font-bold"
                    capitalizeLinks
                />
                <div>
                    <Form className={`w-full rounded p-2 mb-8 flex flex-wrap`} onSubmit={onSubmit} >
                        <Form.Body register={register} className="flex-1 flex-wrap min-w-400 bg-white bg-white relative">
                            <Form.Body register={register} className="flex-1 flex-wrap min-w-400 bg-white bg-white relative">
                                <h6 className="py-2 mb-4 font-bold">Shippping Address</h6>
                                <FormInput
                                    name="lastName"
                                    label="Last Name"
                                    wrapperClass="w-full px-2 mb-4 "
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl"
                                    value={checkoutData?.fullName}
                                    error={errors.fullName?.message}
                                />
                                <FormInput
                                    name="email"
                                    type="email"
                                    label="Email"
                                    error={errors.email?.message}
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.email}
                                />
                                <FormInput
                                    name="phone"
                                    label="Phone Number"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.phoneNumber}
                                    error={errors.phoneNumber?.message}
                                />
                                <FormInput
                                    name="address"
                                    label="Address"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.address}
                                    error={errors.address?.message}
                                />
                                <FormSelect
                                    name="city"
                                    options={cities ?? []}
                                    label="City"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.city}
                                />
                                <FormInput
                                    name="zipCode"
                                    label="Zip Code"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.zipCode}
                                    error={errors.zipCode?.message}
                                />
                            </Form.Body>
                            <Form.Body register={register} className="flex-1 flex-wrap min-w-400 bg-white bg-white relative">
                                <h6 className="py-2 mb-4 font-bold border-t-2 border-purple-3">Payment Method</h6>
                                <Cards
                                    number={watch("cardNumber", '')}
                                    name={watch("cardName", '')}
                                    expiry={watch("expirationDate", '')}
                                    cvc={watch("cvc", '')}
                                />
                                <FormInput
                                    name="cardNumber"
                                    label="Card Number"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.cardNumber}
                                    error={errors.cardNumber?.message}
                                />
                                <FormInput
                                    name="cardName"
                                    label="Card Name"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.cardName}
                                    error={errors.cardName?.message}
                                />
                                <FormInput
                                    name="expirationDate"
                                    label="Expiration Date"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.expirationDate}
                                    error={errors.expirationDate?.message}
                                />
                                <FormInput
                                    name="cvc"
                                    label="CVC"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.cvc}
                                    error={errors.cvc?.message}
                                />
                            </Form.Body>
                            <Form.Body register={register} className="flex-1 flex-wrap min-w-400 bg-white bg-white relative">
                                <h6 className="py-2 mb-4 font-bold border-t-2 border-purple-3">Billing Address</h6>
                                <FormInput
                                    name="phoneNumberBill"
                                    label="Phone Number"
                                    wrapperClass="w-full px-2 mb-4 "
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl"
                                    value={checkoutData?.phoneNumberBill}
                                    error={errors.phoneNumberBill?.message}
                                />
                                <FormInput
                                    name="addressBill"
                                    label="Address"
                                    error={errors.addressBill?.message}
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.addressBill}
                                />
                                <FormSelect
                                    name="city"
                                    options={cities ?? []}
                                    label="City"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.cityBill}
                                />
                                <FormInput
                                    name="zipCode"
                                    label="Zip Code"
                                    wrapperClass="w-full px-2 mb-4"
                                    className="ring-2 ring-black/30 focus:outline-orange-2 max-w-xl "
                                    value={checkoutData?.zipCode}
                                    error={errors.zipCode?.message}
                                />
                            </Form.Body>
                        </Form.Body>
                        <Form.Body register={register} className="flex-none w-96 h-max bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white relative">
                            <h6 className="py-2 m-4 font-bold">Your Order</h6>
                            {cartItems.length ? (
                                cartItems.map((item, idx) => (
                                    <Dropdown.Item key={idx}>
                                        <div className="flex justify-between w-full gap-6 ">
                                            <div className="flex flex-col items-start">
                                                <span>
                                                    {item.costume.model} x {item.quantity}
                                                </span>
                                                <span className="text-xs">Size: {item.size}</span>
                                            </div>
                                            <span className="ml-auto">
                                                ${(Number(item.costume.price) * item.quantity).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => handleRemoveFromCart(item.idCatalog)}
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <p>Nothing here... yet!</p>
                            )}


                        </Form.Body>
                    </Form>

                </div>
            </section>
        </RootLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    query,
    res,
}) => {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );

    const apiShipping = await getShipping();

    return {
        props: {
            apiShipping,
        },
    };
};

export default CheckoutPage;