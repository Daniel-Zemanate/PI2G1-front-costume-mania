import { Order } from "@/interfaces/user";
import React from "react";

type Props = {
  purchases: Order[];
};

function Purchases({ purchases }: Props) {
  return (
    <section className="w-full rounded p-2 border mb-8">
      <h3 className="border-b-2 border-purple-300 py-2 mb-4 text-2xl font-bold">
        Last Purchases
      </h3>

      <ul className="grid grid-cols-1 gap-4 px-4">
        {!purchases.length ? (
          <h3 className="text-2xl text-center py-8">No data</h3>
        ) : (
          purchases.map((purchase, index) => (
            <li
              key={index}
              className="flex flex-col md:flex-row justify-between bg-gray-100 p-8 rounded border border-orange-2"
            >
              <div>
                <p className="font-bold text-xl">
                  Invoice n° {purchase.no_invoice}
                </p>
                <p className="italic text-gray-600">
                  Status: {purchase.status}
                </p>
                <p className="text-grey">{purchase.shippingCity}</p>
              </div>
              <p className="mt-2 font-bold">
                Total: ${purchase.total.toFixed(2)}
              </p>
              <ul className="w-full md:w-1/2 mt-4">
                {purchase.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex border-b border-lightGrey py-2 gap-4"
                  >
                    <span>{item.quantity} un.</span>
                    <span className="w-full md:w-1/2">{item.model}</span>
                    <span className="m-auto">${item.pxQ.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default Purchases;
