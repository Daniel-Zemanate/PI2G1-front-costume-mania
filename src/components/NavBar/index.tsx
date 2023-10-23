import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "../SearchBar";

const NavBar = () => {
  return (
    <header className="bg-violet-500 shadow-lg border-b-2 border-gray-500">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <Image
              src={logo}
              alt="Costume Mania logo"
              width={250}
              height={40}
            />
          </Link>
          <div className="w-full">
            <div className="flex items-center space-x-4 justify-between">
              <SearchBar />
              <nav className="flex space-x-4">
                <Link href="/">Log in</Link>
                <Link href="/about">Sign up</Link>
                <Link href="/contact">Cart</Link>
              </nav>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/">Categories</Link>
                </li>
                <li>
                  <Link href="/about">Popular Models</Link>
                </li>
                <li>
                  <Link href="/contact">On Sale</Link>
                </li>
                <li>
                  <Link href="/contact">Customer Service</Link>
                </li>
                <li>
                  <Link href="/contact">About us</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default NavBar;
