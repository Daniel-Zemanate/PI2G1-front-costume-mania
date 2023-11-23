
import {
  getCartState,
  validateCart,
  removeItem,
  submitCart,
} from "@/store/slices/cartSlice";
import Button from "../Button";
import { useDispatch, useSelector } from "@/store/store";
import Swal from "sweetalert2";
import router from "next/router";
import { useSession } from "next-auth/react";
import { Purchase } from "@/interfaces/user";
import { PayloadAction } from "@reduxjs/toolkit";

interface TotalAmountProps {
  totalPrices: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ totalPrices }) => {
  const { items: cartItems, total, shipping } = useSelector(getCartState);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const validateOrder = async () => {
    const cart = cartItems.map((e) => ({
      catalog: e.idCatalog,
      quantitySold: e.quantity,
    }));
    console.log(cart)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        submitOrder()
      }
    });
  }

  const submitOrder = async () => {
    const cart = cartItems.map((e) => ({
      catalog: e.idCatalog,
      quantitySold: e.quantity,
    }));

    if (session) {
      const { payload } = (await dispatch(
        submitCart({
          cart: cart,
          idUser: session.user.user_id,
          token: session.user.token,
        })
      )) as PayloadAction<Purchase>;
      
      Swal.fire({
        text: "Your cart is empty!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl hover:shadow-xl bg-white sm:w-1/4 md:max-w-2xl my-8 flex-column items-center justify-center p-8 h-fit">
        <div className="flex items-center justify-between my-2">
          <span>Subtotal</span>
          <span className="text-lg font-bold text-black truncate block capitalize">{totalPrices}</span>
          
        </div>
        <hr></hr>
        <div className="flex items-center justify-between my-2">
          <span>Grand Total</span>
          <span className="text-lg font-bold text-black truncate block capitalize">{totalPrices}</span>

        </div>
        <div className="flex items-center justify-center my-2">
        <Button
          label={"Checkout"}
          buttonStyle="primary"
          size="small"
          className="w-full"
          onClick={() => validateOrder()}
          disabled={false}
        />
        </div>
      </div>
    </>
  );
};

export default TotalAmount;
