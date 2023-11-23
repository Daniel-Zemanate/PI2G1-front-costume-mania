import { CartCostume, SelectedSize } from "@/interfaces/costume";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addItem, removeItem } from "@/store/slices/cartSlice";
import logoText from "@assets/logo-text.png";
import StepInput from "../StepInput";

type Props = {
  item: CartCostume;
};

function CartItem({ item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = (idCatalog: number) => {
    dispatch(removeItem(idCatalog));
  };

  useEffect(() => {
    dispatch(addItem({...item, quantity}));
  }, [dispatch, item, quantity])

  const stock =
    item.costume.sizes.find((size) => size.size === item.size)?.quantity || 0;

  return (
    <tr key={item.idCatalog} className="">
      <td>
        <div className=" flex items-center justify-start my-3 gap-4">
          <div className="w-36">
            <Image
              src={item.costume.image || logoText}
              className="h-36 w-80 object-scale-down rounded-t-xl cursor-pointer"
              alt={item.costume.model}
              height={320}
              width={288}
            />
          </div>
          <div className=" flex flex-col">
            <p className="text-xl font-bold text-black truncate block capitalize">
              {item.costume.model}
            </p>
            <div className="flex items-center">
              <p>Size: {item.size}</p>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex justify-center gap-4 items-center">
          {
            <StepInput
              max={stock}
              min={1}
              state={quantity}
              setState={setQuantity}
              inline
            />
          }
          <button onClick={() => handleRemoveFromCart(item.idCatalog)}>
            <FaRegTrashAlt />
          </button>
        </div>
      </td>
      <td>
        <div className=" flex flex-col justify-center items-center">
          <p className="text-xl font-bold text-black truncate block capitalize">
            ${(Number(item.costume.price) * item.quantity).toFixed(2)}
          </p>
        </div>
      </td>
    </tr>
  );
}

export default CartItem;
