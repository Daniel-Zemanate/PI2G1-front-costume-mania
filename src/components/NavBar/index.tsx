import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "../SearchBar";
import NavLink from "../NavLink/NavLink";

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
                <NavLink route="/" label="Log in" />
                <NavLink route="/" label="Sign up" />
                <NavLink route="/" label="Cart" />
              </nav>
            </div>
            <nav className="flex space-x-4 mt-2">
              <NavLink label="Categories" route="/" />
              <NavLink label="Popular Models" route="/about" />
              <NavLink label="On Sale" route="/contact" />
              <NavLink label="Customer Service" route="/contact" />
              <NavLink label="About us" route="/contact" />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ text, route }) => {
  return (
    <li>
      <Link href={route}>{text}</Link>
    </li>
  );
};

export default NavBar;
