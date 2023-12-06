import { Order } from "@/interfaces/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { STATUS } from "@/constants";
import logo from "@assets/logo-mask.png";
import Image from "next/image";
import Swal from "sweetalert2";

type Props = {
  purchases: Order[];
};

function Purchases({ purchases }: Props) {
  const { data: session } = useSession();
  const [purchaseData, setPurchaseData] = useState(purchases);

  useEffect(() => {
    setPurchaseData(purchases);
  }, [purchases]);

  const handleCancelInvoiceClick = async (idInvoice: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/users/purchases/${idInvoice}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      if (res.ok) {
        fetchUpdatedPurchases();
        Swal.fire({
          icon: "success",
          title: `Invoice n°${idInvoice} successfully cancelled`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire("Error", "Failed to cancel the invoice.", "error");
      }
    }
  };

  const fetchUpdatedPurchases = async () => {
    try {
      const response = await fetch(
        `/api/users/purchases/${session?.user.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      if (response.ok) {
        const updatedPurchases = await response.json();
        setPurchaseData(updatedPurchases);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full rounded p-2 border mb-8">
      <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
        Last Purchases
      </h3>

      <ul className="grid grid-cols-1 px-4">
        {!purchaseData.length ? (
          <h3 className="text-2xl text-center py-8">No purchases yet</h3>
        ) : (
          purchaseData.map((purchase, index) => (
            <li
              key={index}
              className="flex flex-col justify-between bg-gray-100 py-6 md:p-8 border-b border-orange-2 gap-2 md:gap-8"
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="font-bold text-xl md:text-2xl">
                    Invoice n° {purchase.no_invoice}
                  </p>
                  <p className="italic text-sm md:text-sm">
                    Status: {purchase.status}
                  </p>
                  <p className="text-grey text-sm">{purchase.shippingCity}</p>
                  <small>
                    Shipping cost: $ {purchase.shippingcost.toFixed(2)}
                  </small>
                </div>
                <p className="mt-2 font-bold md:text-xl text-end">
                  Total: ${purchase.total.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="">
                  <p>Details:</p>
                  <ul className="w-full md:w-96">
                    {purchase.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center gap-8 md:ml-6"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={logo}
                            alt="costume mania bullet"
                            width={20}
                            height={20}
                          />
                          <span>{item.quantity} un.</span>
                          <span>{item.model}</span>
                        </div>
                        <span>${item.pxQ.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {purchase.status === STATUS.IN_PROGRESS && (
                  <Button
                    buttonStyle="secondary"
                    onClick={() =>
                      handleCancelInvoiceClick(purchase.no_invoice)
                    }
                    label="Cancel Order"
                    className="self-center mt-8 md:mt-0"
                  />
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default Purchases;
