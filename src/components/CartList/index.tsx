import Image from "next/image";
import logoText from "@assets/logo-text.png";

import {
  getCartState,
  validateCart,
  removeItem,
  submitCart,
} from "@/store/slices/cartSlice";
import { FC, useState } from "react";
import { CartCostume, SelectedSize } from "@/interfaces/costume";
import Button from "../Button";
import StepInput from "../StepInput";
import { useDispatch } from "@/store/store";

type Props = {
  cartItems: CartCostume[];
};

export const CartList: FC<Props> = ({ cartItems }) => {
  const [selectedSize, setSelectedSize] = useState<SelectedSize>();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (idCatalog: number) => {
    dispatch(removeItem(idCatalog));
  };

  const handleSizeClick = ({ idCatalog, size }: SelectedSize) => {
    setSelectedSize((prevSize) =>
      prevSize?.idCatalog === idCatalog ? undefined : { idCatalog, size }
    );
  };

  // handleSizeClick()
  return (
    <>
      {cartItems && cartItems.length > 0 ?(<table className="bg-white shadow-md rounded-xl hover:shadow-xl bg-white w-3/4 my-8">
        <thead>
          <tr>
            <th style={{ width: 300 }}>MODEL</th>
            <th style={{ width: 200 }}>QUANTITY</th>
            <th style={{ width: 200 }}>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item) => (
              <tr key={item.idCatalog} className="">
                <td>
                  <div className=" flex justify-start my-3">
                    <Image
                      src={item.costume.image || logoText}
                      className="h-28 w-60 object-scale-down rounded-t-xl cursor-pointer"
                      alt={item.costume.model}
                      height={320}
                      width={288}
                    />
                    {/* <Image ></Image> */}
                    <div className=" flex flex-col">
                      <p className="text-lg font-bold text-black truncate block capitalize">
                        {item.costume.model}
                      </p>
                      <div className="flex items-center">
                        {item.size && (
                          <button
                            key={item.size}
                            className={`  dark:rounded py-1 px-2 mr-2 text-sm ${
                              selectedSize?.idCatalog === item.idCatalog
                                ? "bg-purple-2 text-white"
                                : "bg-white "
                            } ${
                              item.quantity === 0
                                ? "bg-grey bg-opacity-30 cursor-not-allowed text-grey"
                                : "border border-purple-2 text-purple-2"
                            }`}
                            onClick={() =>
                              handleSizeClick({
                                idCatalog: item.idCatalog,
                                size: item.size,
                              })
                            }
                            disabled={item.quantity === 0}
                          >
                            {item.size}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className=" flex flex-col justify-center items-center">
                    {
                      <StepInput
                        max={
                          item.costume.sizes.find(
                            (e) => e.idCatalog === selectedSize?.idCatalog
                          )?.quantity || 1
                        }
                        // max={item.quantity}
                        min={1}
                        state={quantity}
                        setState={setQuantity}
                        inline
                      />
                    }
                    <Button
                      label={"remove"}
                      buttonStyle="primary"
                      size="small"
                      onClick={() => handleRemoveFromCart(item.idCatalog)}
                      disabled={!item}
                    />
                  </div>
                </td>
                <td>
                  <div className=" flex flex-col justify-center items-center">
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      ${(Number(item.costume.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>):(
            <h3 className="m-auto py-36 text-xl md:text-3xl">No costumes found in your cart!</h3>
      )}
    </>
  );
};
