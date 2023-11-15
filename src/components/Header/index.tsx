import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";
import SearchBar from "../SearchBar";
import NavLink from "../NavLink/NavLink";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { AiOutlineMenu } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import Dropdown from "../Dropdown";
import { useRouter } from "next/router";
import bwLogo from "@assets/logo-bw.svg";
import { ApiCostume } from "@/interfaces/costume";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import logoText from "@assets/logo-text.png";
import { useSelector } from "@/store/store";
import { getCartState } from "@/store/slices/cartSlice";

const Header = ({ simple = false }: { simple?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { items: cartItems } = useSelector(getCartState);

  const [favs, setFavs] = useState<ApiCostume[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem("favs");
    if (favs) setFavs(JSON.parse(favs));
  }, []);

  return (
    <div
      className={`fixed top-0 w-full bg-purple-1 shadow-lg border-b-2 border-gray-500 z-50 ${
        !simple ? "h-24" : "h-16"
      }`}
    >
      <div className="flex items-center justify-between gap-8 lg:gap-24 container mx-auto px-6 md:px-4 items-center w-full md:w-[90vw] h-full">
        <Link href="/" className="h-full flex items-center min-w-[100px]">
          <Image
            src={!simple ? logo : logoText}
            alt="Costume Mania logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="w-full hidden md:flex flex-col gap-2 justify-center h-full">
          {!simple && (
            <SearchBar
              inputClassName="border-0 focus:outline-none rounded-r-none"
              buttonClassName="bg-white text-purple-1"
            />
          )}
          <nav className="flex space-x-16 hidden md:block">
            <NavLink label="Costumes" route="/costumes" textColor="white" />
            <NavLink label="About us" route="/" textColor="white" />
          </nav>
        </div>
        <nav className="flex items-baseline hidden md:flex w-full lg:w-1/2 justify-end">
          {session?.user ? (
            <>
              <Dropdown
                buttonIcon={
                  !simple ? <Image src={bwLogo} alt="user avatar" /> : null
                }
                buttonText={session.user.name}
              >
                <Dropdown.Item onClick={() => router.push("/account")}>
                  My Account
                </Dropdown.Item>
                <Dropdown.Item onClick={() => signOut()}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <>
              <Dropdown
                buttonIcon={!simple ? <FaUser /> : null}
                buttonText={"Account "}
              >
                <Dropdown.Item onClick={() => signIn()}>Log in</Dropdown.Item>
                <Dropdown.Item onClick={() => router.push("/auth/signup")}>
                  Sign up
                </Dropdown.Item>
              </Dropdown>
            </>
          )}
          <Dropdown
            buttonIcon={!simple ? <FaHeart /> : null}
            buttonText={"Favorites"}
          >
            {favs.map((fav, idx) => (
              <Dropdown.Item key={idx}>
                <div className="flex justify-between w-full">
                  <span>{fav.name} </span>
                  <span>${Number(fav.price).toFixed(2)}</span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown
            buttonIcon={!simple ? <FaShoppingCart /> : null}
            buttonText={"Cart"}
          >
            {cartItems.length ? (
              cartItems.map((item, idx) => (
                <Dropdown.Item key={idx}>
                  <div className="flex justify-between w-full gap-6">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </Dropdown.Item>
              ))
            ) : (
              <p>Nothing here... yet!</p>
            )}
          </Dropdown>
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden p-4 text-white text-4xl"
        >
          <AiOutlineMenu />
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <NavLink label="Costumes" route="/costumes" textColor="black" />
          <NavLink label="About us" route="/" textColor="black" />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
