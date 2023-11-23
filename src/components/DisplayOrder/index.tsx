import React from "react";
import { useSelector } from "react-redux";
import { getCartState } from "@/store/slices/cartSlice";
import Image from "next/image";
import logoText from "@assets/logo-text.png";

function DisplayOrder({ className }: { className?: string }) {
  const { items: cartItems, total, shipping } = useSelector(getCartState);

  return (
    <aside className={`${className}`}>
      <h3 className="border-b-2 border-orange-1 py-1 mb-4 text-2xl font-bold">
        Your order
      </h3>
      <ul>
        {cartItems.length ? (
          cartItems.map((item, idx) => (
            <li key={idx}>
              <div className="flex justify-between w-full gap-6 my-4 ">
                <Image
                  src={item.costume.image || logoText}
                  alt={`${item.costume.model}'s image`}
                  height={50}
                  width={35}
                />
                <div className="flex flex-col items-start">
                  <span>
                    {item.costume.model} x {item.quantity}
                  </span>
                  <span className="text-xs">Size: {item.size}</span>
                </div>
                <span className="ml-auto">
                  ${(Number(item.costume.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>Nothing here... yet!</p>
        )}
      </ul>

      <section className="w-full p-4 border-t border-purple-3">
        {/* <div className="flex items-center justify-between">
          <span className="font-bold">Subtotal:</span>
          <span className="text-xl">${total?.toFixed(2)}</span>
        </div> */}
        <div className="flex items-center justify-between">
          <span className="font-bold">Shipping Cost:</span>
          <span className="text-xl">${shipping?.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mt-6">
          <span className="font-bold text-2xl">Total:</span>
          <span className="text-2xl">${total?.toFixed(2)}</span>
        </div>
      </section>
    </aside>
  );
}

export default DisplayOrder;
