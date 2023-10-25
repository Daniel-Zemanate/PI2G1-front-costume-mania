import React from "react";
import NavLink from "../NavLink/NavLink";
import { Frijole } from "next/font/google";
import { FaInstagram, FaFacebook, FaSnapchat } from "react-icons/fa";

const frijole = Frijole({
  subsets: ["latin"],
  variable: "--font-frijole",
  weight: "400",
});

function Footer() {
  return (
    <footer className="bg-gray-400 text-black py-6 flex flex-col justify-between px-6 gap-4">
      <p className={`${frijole.className} text-lg`}>Costume Mania</p>
      <div className="flex flex-col w-full justify-between md:flex-row md:space-x-4">
        <p className="text-sm text-end md:text-start">
          Discover Your Distinctive Look: <br />
          Fashioned with Precision, Worn with Confidence
        </p>
        <nav className="flex flex-col md:flex-row md:space-x-4 justify-end w-full py-4 gap-2">
          <NavLink label="Home" route="/" textColor="black" />
          <NavLink label="Models" route="/about" textColor="black" />
          <NavLink label="Sale" route="/contact" textColor="black" />
          <NavLink label="Cart" route="/contact" textColor="black" />
          <NavLink label="Checkout" route="/contact" textColor="black" />
        </nav>
      </div>
      <div className="flex w-full justify-end gap-4">
        <FaInstagram />
        <FaFacebook />
        <FaSnapchat />
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
