import React from "react";
import NavLink from "../NavLink/NavLink";
import { FaInstagram, FaFacebook, FaSnapchat } from "react-icons/fa";
import logoText from "@assets/logo-text.png";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-purple-3 bg-opacity-50 text-black py-6 flex flex-col justify-between px-6 gap-4">
      <div className="flex flex-col w-full justify-between md:flex-row md:space-x-4">
        <div className="flex flex-col">
          <Image src={logoText} width={100} alt="Costume Mania" />
          <p className="text-sm text-end md:text-start hidden md:block">
            Discover Your Distinctive Look: <br />
            Fashioned with Precision, Worn with Confidence
          </p>
        </div>
        <div>
          <nav className="flex flex-col md:flex-row md:space-x-4 justify-end w-full py-4 gap-2">
            <NavLink label="Home" route="/" textColor="black" />
            <NavLink label="Models" route="/" textColor="black" />
            <NavLink label="Sale" route="/" textColor="black" />
            <NavLink label="Cart" route="/cart" textColor="black" />
            <NavLink label="Customer Service" route="/" textColor="black" />
          </nav>
          <div className="flex w-full justify-end gap-4">
            <FaInstagram />
            <FaFacebook />
            <FaSnapchat />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col md:flex-row justify-between">
        <p>Privacy Policy</p>
        <p>© Digital House 2023</p>
        <p>Terms & Conditions</p>
      </div>
    </footer>
  );
}

export default Footer;
