import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "../SearchBar";
import NavLink from "../NavLink/NavLink";
import { useState } from "react";
import Drawer from "./Drawer";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../Button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <div className="fixed top-0 w-full bg-purple-1 shadow-lg border-b-2 border-gray-500 z-50 h-24">
      <div className="flex items-center justify-between gap-4 container mx-auto px-6 md:px-4 items-center h-full">
        <Link href="/" className="h-full flex items-center">
          <Image src={logo} alt="Costume Mania logo" width={100} height={100} />
        </Link>
        <div className="w-full hidden md:block">
          <SearchBar />
          <nav className="flex space-x-4 mt-2 hidden md:block">
            <NavLink label="Categories" route="/" textColor="white" />
            <NavLink label="Popular Models" route="/about" textColor="white" />
            <NavLink label="On Sale" route="/contact" textColor="white" />
            <NavLink
              label="Customer Service"
              route="/contact"
              textColor="white"
            />
            <NavLink label="About us" route="/contact" textColor="white" />
          </nav>
        </div>
        <nav className="flex space-x-4 items-center hidden md:flex">
          {session?.user ? (
            <>
              <NavLink route="/user-info" textColor="white">
                Welcome, {session.user.name}
              </NavLink>
              <NavLink route="/" textColor="white" className="text-2xl">
                <AiOutlineShoppingCart />
              </NavLink>
              <Button
                label="Sign out"
                buttonStyle="secondary"
                size="small"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <>
              <Button
                label="Log in"
                buttonStyle="secondary"
                size="small"
                onClick={() => signIn()}
              />
              <Button
                label="Sign up"
                buttonStyle="primary"
                size="small"
                to="/auth/signup"
              />
            </>
          )}
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden p-4 border rounded text-white"
        >
          <AiOutlineMenu />
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <NavLink label="Categories" route="/" textColor="black" />
          <NavLink label="Popular Models" route="/about" textColor="black" />
          <NavLink label="On Sale" route="/contact" textColor="black" />
          <NavLink
            label="Customer Service"
            route="/contact"
            textColor="black"
          />
          <NavLink label="About us" route="/contact" textColor="black" />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
