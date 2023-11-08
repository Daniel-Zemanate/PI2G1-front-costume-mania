import React, { useEffect } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import logoText from "@assets/logo-text.png";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { signIn, signOut, useSession } from "next-auth/react";
import NavLink from "@/components/NavLink/NavLink";
import Button from "@/components/Button";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Drawer({ children, isOpen, setIsOpen }: Props) {
  const { data: session } = useSession();

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
          "w-full right-0 absolute bg-white h-4/6 shadow-xl delay-400 duration-500 ease-in-out transform overflow-hidden border-b-2" +
          (isOpen ? " translate-y-0 " : " -translate-y-full ")
        }
      >
        <article className="relative w-full flex flex-col overflow-y-scroll h-full">
          <div className="flex w-full justify-between p-2 items-center bg-purple-1">
            <Link href="/">
              <Image
                src={logoText}
                alt="Costume Mania logo"
                width={100}
                height={60}
              />
            </Link>
            {!session?.user && (
              <div className="text-white flex gap-4 text-lg">
                <button onClick={() => signIn()}>Log in</button>|
                <Link href={`/auth/signup`}>Sign up</Link>
              </div>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 text-white text-4xl"
            >
              <AiOutlineClose />
            </button>
          </div>
          {session?.user && (
            <div className="flex items-center justify-between bg-orange-2 px-3">
              <NavLink route="/user-info" textColor="black">
                Welcome, {session.user.name}
              </NavLink>
              <Button
                label="Sign out"
                buttonStyle="secondary"
                size="small"
                onClick={() => signOut()}
              />
            </div>
          )}
          <div className="bg-purple-2 bg-opacity-20 text-black flex flex-col h-full gap-6 p-4">
            {session?.user && (
              <NavLink route="/" textColor="black" className="text-2xl">
                <AiOutlineShoppingCart />
              </NavLink>
            )}
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
