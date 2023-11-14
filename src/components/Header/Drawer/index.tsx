import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Link from "next/link";
import logoText from "@assets/logo-text.png";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { signIn, signOut, useSession } from "next-auth/react";
import NavLink from "@/components/NavLink/NavLink";
import Button from "@/components/Button";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Dropdown from "@/components/Dropdown";

import { useRouter } from "next/router";
import { ApiCostume } from "@/interfaces/costume";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const dummyCart = [
  {
    model: "Little Wolf",
    price: "50.50",
  },
  {
    model: "Wolf",
    price: "10.50",
  },
  {
    model: "Scream",
    price: "23",
  },
];

export default function Drawer({ children, isOpen, setIsOpen }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const [favs, setFavs] = useState<ApiCostume[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem("favs");
    if (favs) setFavs(JSON.parse(favs));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <main
      className={
        "fixed overflow-hidden z-10 bg-opacity-25 inset-0 transform ease-in-out block md:hidden" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : "transition-all delay-500 opacity-0 translate-x-full")
      }
    >
      <section
        className={
          "w-full right-0 absolute bg-white shadow-xl delay-400 duration-500 ease-in-out transform overflow-hidden border-b-2" +
          (isOpen ? " translate-y-0 " : " -translate-y-full ")
        }
      >
        <article className="relative w-full flex flex-col overflow-y-scroll h-full">
          <div className="flex w-full justify-between px-6 items-center bg-purple-1">
            <Link href="/">
              <Image
                src={logoText}
                alt="Costume Mania logo"
                width={100}
                height={60}
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 text-white text-4xl"
            >
              <IoMdCloseCircle />
            </button>
          </div>

          <div className="bg-purple-2 bg-opacity-20 text-black flex flex-col h-full gap-6 p-4">
            <span className="flex w-full justify-between">
              {session?.user ? (
                <>
                  <NavLink
                    route="/account"
                    textColor="black"
                    className="flex gap-4"
                  >
                    <span className="text-2xl">
                      <FaUser />
                    </span>
                    <span>My account</span>
                  </NavLink>
                  <button className="text-left" onClick={() => signOut()}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button className="text-left" onClick={() => signIn()}>
                    Log in
                  </button>
                  <NavLink route="/auth/signup" textColor="black">
                    Sign up
                  </NavLink>
                </>
              )}
            </span>
            <NavLink
              route="/"
              textColor="black"
              className="flex items-center gap-4"
            >
              <span className="text-2xl">
                <FaShoppingCart />
              </span>
              <span>Cart</span>
            </NavLink>
            {children}
            <div className="mt-auto">
              <SearchBar />
            </div>
          </div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
