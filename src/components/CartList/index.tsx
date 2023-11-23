
import { FC } from "react";
import { CartCostume, SelectedSize } from "@/interfaces/costume";
import NavLink from "../NavLink/NavLink";
import CartItem from "../CartItem";

type Props = {
  cartItems: CartCostume[];
};

export const CartList: FC<Props> = ({ cartItems }) => {
  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <table className="bg-white shadow-md rounded-xl bg-white w-3/4 my-8 ">
          <thead className="border-2 border-orange-2">
            <tr>
              <th style={{ width: 300 }}>MODEL</th>
              <th style={{ width: 200 }}>QUANTITY</th>
              <th style={{ width: 200 }}>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((item) => (
                <CartItem key={item.idCatalog} item={item} />
              ))}
          </tbody>
        </table>
      ) : (
        <h3 className="m-auto py-36 text-xl md:text-3xl">
          No costumes found in your cart!
          <NavLink route="/costumes" textColor="purple-2">
            {" "}
            Explore some!
          </NavLink>
        </h3>
      )}
    </>
  );
};
