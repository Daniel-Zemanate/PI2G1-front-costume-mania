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
import { FaHeart, FaShoppingCart, FaUser, FaRegTrashAlt } from "react-icons/fa";
import logoText from "@assets/logo-text.png";
import { useDispatch, useSelector } from "@/store/store";
import { getCartState, removeItem } from "@/store/slices/cartSlice";
import { fetchFavs, getFavoritesState } from "@/store/slices/favoritesSlices";
import { FaChartBar, FaDatabase } from "react-icons/fa";

import Button from "../Button";

const Header = ({ simple = false }: { simple?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { items: cartItems } = useSelector(getCartState);
  const { favorites, status } = useSelector(getFavoritesState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle" && session) {
      dispatch(fetchFavs(Number(session.user.user_id)));
    }
  }, [dispatch, session, status]);

  const handleRemoveFromCart = (idCatalog: number) => {
    dispatch(removeItem(idCatalog));
  };

  const CartHeader = () => (
    <>
      <FaShoppingCart />
      {cartItems.length > 0 && (
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-2 border-2 border-white rounded-full -top-3 right-2 dark:border-gray-900">
          {cartItems.length}
        </div>
      )}
    </>
  );

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
          </nav>
        </div>
        <nav className="flex items-baseline hidden md:flex w-full lg:w-1/2 justify-end">
          {session?.user ? (
            <>
              <Dropdown
                buttonIcon={
                  !simple ? <Image src={bwLogo} alt="user avatar" /> : null
                }
                buttonText={session.user.email}
              >
                <Dropdown.Item onClick={() => router.push("/account")}>
                  My Account
                </Dropdown.Item>
                <Dropdown.Item onClick={() => signOut()}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
              {session.user.role === "USER" && (
                <Dropdown
                  buttonIcon={!simple ? <FaHeart /> : null}
                  buttonText={"Favorites"}
                >
                  {favorites.length ? (
                    favorites.map((fav, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => router.push(`/costumes/${fav.idModel}`)}
                      >
                        <div className="flex justify-between gap-4 items-center">
                          <Image
                            src={fav.urlImage || logoText}
                            alt={`${fav.nameModel}'s image`}
                            height={50}
                            width={35}
                          />
                          <span className="text-sm">{fav.nameModel}</span>
                        </div>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <p>No favorites</p>
                  )}
                </Dropdown>
              )}
            </>
          ) : (
            <>
              <Dropdown
                buttonIcon={!simple ? <FaUser /> : null}
                buttonText={"Account"}
              >
                <Dropdown.Item onClick={() => signIn()}>Log in</Dropdown.Item>
                <Dropdown.Item onClick={() => router.push("/auth/signup")}>
                  Sign up
                </Dropdown.Item>
              </Dropdown>
            </>
          )}
          {session?.user.role === "USER" && (
            <Dropdown
              buttonIcon={!simple ? <CartHeader /> : null}
              buttonText={`Cart`}
            >
              {cartItems.length ? (
                cartItems.map((item, idx) => (
                  <Dropdown.Item key={idx}>
                    <div className="flex justify-between w-full gap-6 ">
                      <div className="flex flex-col items-start">
                        <span>
                          {item.costume.model} x {item.quantity}
                        </span>
                        <span className="text-xs">Size: {item.size}</span>
                      </div>
                      <span className="ml-auto">
                        $
                        {(Number(item.costume.price) * item.quantity).toFixed(
                          2
                        )}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.idCatalog)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </Dropdown.Item>
                ))
              ) : (
                <p>Nothing here... yet!</p>
              )}

              {cartItems.length > 0 && (
                <div className="flex ">
                  <Button
                    label="Go to cart"
                    className="m-auto"
                    buttonStyle="primary"
                    size="small"
                    to="/cart"
                  />
                </div>
              )}
            </Dropdown>
          )}

          {session?.user.role === "ADMIN" && (
            <button
              className="flex flex-col space-y-2 w-full h-full items-center rounded-md px-4 text-sm font-medium text-white focus:outline-none"
              onClick={() => router.push("/admin")}
            >
              <span className="text-3xl">
                {!simple && <FaDatabase />}
              </span>
              <span className="flex m-auto whitespace-nowrap">Admin</span>
            </button>
          )}

          {session?.user.role === "ADMIN" && (
            <button
              className="flex flex-col space-y-2 w-full h-full items-center rounded-md px-4 text-sm font-medium text-white focus:outline-none"
              onClick={() => router.push("/admin/reports")}
            >
              <span className="text-3xl">
                {!simple && <FaChartBar /> }
              </span>
              <span className="flex m-auto whitespace-nowrap">Reports</span>
            </button>
          )}
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden p-4 text-white text-4xl"
        >
          <AiOutlineMenu />
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <NavLink label="Costumes" route="/costumes" textColor="black" />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
