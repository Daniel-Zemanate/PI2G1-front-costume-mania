import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "../SearchBar";

const NavBar = () => {
  return (
    <nav className="p-4 h-16 overflow-hidden flex w-full justify-between shadow-lg border-b-2 border-gray-500 bg-violet-500">
      <Link href="/">
        <Image
          className="h-auto w-auto max-h-8"
          src={logo}
          alt="Costume Mania logo object-cover"
        />
      </Link>

      <SearchBar/>

      <ul className="flex space-x-4">
        <li>
          <Link href="/">Log in</Link>
        </li>
        <li>
          <Link href="/about">Register</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
