import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "../SearchBar";
import NavLink from "../NavLink/NavLink";
import { useState } from "react";
import Drawer from "./Drawer";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <div className="fixed top-0 w-full bg-purple-1 shadow-lg border-b-2 border-gray-500 z-50 h-24">
      <div className="flex items-center justify-between gap-8 lg:gap-24 container mx-auto px-6 md:px-4 items-center w-full">
        <Link href="/" className="h-full flex items-center min-w-[100px]">
          <Image src={logo} alt="Costume Mania logo" width={100} height={100} />
        </Link>
        <div className="w-full hidden md:block">
          <SearchBar inputClassName="border-0 focus:outline-none rounded-r-none" buttonClassName="bg-white text-purple-1" />
          <nav className="flex space-x-4 mt-2 hidden md:block">
            <NavLink label="Costumes" route="/costumes" textColor="white" />
            <NavLink label="Popular Models" route="/" textColor="white" />
            <NavLink label="On Sale" route="/" textColor="white" />
            <NavLink label="About us" route="/" textColor="white" />
          </nav>
        </div>
        <nav className="flex items-center hidden md:flex w-full lg:w-1/2 gap-8 justify-between">
          <span className="flex text-white w-48 justify-between gap-2 xl:gap-6">
            {session?.user ? (
              <>
                <NavLink
                  route="/account"
                  textColor="white"
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl">
                    <AiOutlineUser />
                  </span>
                  <span className="flex text-orange-2 font-bold">
                    {session.user.name}
                  </span>
                </NavLink>
                |
                <button
                  onClick={() => signOut()}
                  className="text-white whitespace-nowrap"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => signIn()} className="text-white">
                  Log in
                </button>
                |
                <NavLink route="/auth/signup" textColor="white">
                  Sign up
                </NavLink>
              </>
            )}
          </span>
          <NavLink route="/" textColor="white" className="text-3xl">
            <AiOutlineShoppingCart />
          </NavLink>
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden p-4 text-white text-4xl"
        >
          <AiOutlineMenu />
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <NavLink label="Costumes" route="/costumes" textColor="black" />
          <NavLink label="Popular Models" route="/" textColor="black" />
          <NavLink label="On Sale" route="/" textColor="black" />
          <NavLink label="About us" route="/" textColor="black" />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
