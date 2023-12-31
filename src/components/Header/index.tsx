import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "../SearchBar";
import NavLink from "../NavLink/NavLink";
import { useState } from "react";
import Drawer from "./Drawer";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-violet-500 shadow-lg border-b-2 border-gray-500 z-50 h-24">
      <div className="flex items-center justify-between gap-4 container mx-auto p-2 md:p-4 items-center h-full">
        <Link href="/">
          <Image src={logo} alt="Costume Mania logo" width={250} height={40} />
        </Link>
        <div className="w-full hidden md:block">
          <div className="flex items-center space-x-4 justify-between">
            <SearchBar />
            <nav className="flex space-x-4">
              <NavLink route="/" label="Log in" textColor="black" />
              <NavLink route="/" label="Sign up" textColor="black" />
              <NavLink route="/" label="Cart" textColor="black" />
            </nav>
          </div>
          <nav className="flex space-x-4 mt-2 hidden md:block">
            <NavLink label="Categories" route="/" textColor="black" />
            <NavLink label="Popular Models" route="/about" textColor="black" />
            <NavLink label="On Sale" route="/contact" textColor="black" />
            <NavLink label="Customer Service" route="/contact" textColor="black" />
            <NavLink label="About us" route="/contact" textColor="black" />
          </nav>
        </div>
        <button onClick={() => setIsOpen(true)} className="block md:hidden p-4 border rounded">
          <AiOutlineMenu />
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <NavLink label="Categories" route="/" textColor="black" />
          <NavLink label="Popular Models" route="/about" textColor="black" />
          <NavLink label="On Sale" route="/contact" textColor="black" />
          <NavLink label="Customer Service" route="/contact" textColor="black" />
          <NavLink label="About us" route="/contact" textColor="black" />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
