import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Drawer({ children, isOpen, setIsOpen }: Props) {
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
          "w-full right-0 absolute bg-white h-3/4 shadow-xl delay-400 duration-500 ease-in-out transform overflow-hidden" +
          (isOpen ? " translate-y-0 " : " -translate-y-full ")
        }
      >
        <article className="relative w-full flex flex-col overflow-y-scroll h-full">
          <div className="flex w-full justify-between p-2 items-center">
            <Link href="/">
              <Image
                src={logo}
                alt="Costume Mania logo"
                width={250}
                height={40}
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 border rounded"
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="bg-violet-300 text-black flex flex-col h-full gap-6 p-4">
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
