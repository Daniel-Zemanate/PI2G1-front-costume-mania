import { ApiCostume, CartCostume, SelectedSize } from "@/interfaces/costume";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Button from "../Button";
import logoText from "@assets/logo-text.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCartState } from "@/store/slices/cartSlice";
import {
  addFav,
  getFavoritesState,
  removeFav,
} from "@/store/slices/favoritesSlices";
import { AppDispatch } from "@/store/store";
import StepInput from "../StepInput";

interface Props {
  costume: ApiCostume;
}

export const CostumeCard: FC<Props> = ({ costume }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<SelectedSize>();
  const { favorites } = useSelector(getFavoritesState);
  const [quantity, setQuantity] = useState(1);
  const { items: cartItems } = useSelector(getCartState);

  const handleFavClick = () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    dispatch(addFav({ idModel: costume.modelId, idUser: session.user.user_id, token: session.user.token }));
  };

  const handleFavRemove = () => {
    const fav = favorites.find((e) => e.idModel === costume.modelId);
    if (!fav) return;
    const { idFav } = fav;
    dispatch(removeFav(idFav));
  };

  const handleImageClick = () => {
    router.push(`/costumes/${costume.modelId}`);
  };

  const handleSizeClick = ({ idCatalog, size }: SelectedSize) => {
    setSelectedSize((prevSize) =>
      prevSize?.idCatalog === idCatalog ? undefined : { idCatalog, size }
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const cartItem: CartCostume = {
      ...selectedSize,
      quantity,
      costume,
    };

    dispatch(addItem(cartItem));
    setSelectedSize(undefined);
  };

  return (
    <>
      <div className="w-64 h-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white relative">
        <Image
          src={costume.image || logoText}
          className="h-48 w-80 object-scale-down rounded-t-xl cursor-pointer"
          alt={costume.model}
          height={320}
          width={288}
          onClick={handleImageClick}
        />
        <button
          className="flex items-center absolute top-2 right-2 justify-center rounded-full bg-orange-2 w-10 h-10 text-white drop-shadow-sm"
          onClick={
            favorites.some((e) => e.idModel === costume.modelId)
              ? handleFavRemove
              : handleFavClick
          }
        >
          <svg
            className="w-5 h-5 transform transition-transform duration-300 hover:orange-2"
            fill={
              favorites.some((e) => e.idModel === costume.modelId)
                ? "white"
                : "none"
            }
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <div className="px-4 py-3 w-64">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {costume.model}
          </p>
          <div className="flex items-center">
            <p className="text-lg text-black cursor-auto my-3">
              $ {costume.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center">
            {costume.sizes?.map((size) => (
              <button
                key={size.size}
                className={`  dark:rounded py-1 px-2 mr-2 text-sm ${
                  selectedSize?.idCatalog === size.idCatalog
                    ? "bg-purple-2 text-white"
                    : "bg-white "
                } ${
                  size.quantity === 0
                    ? "bg-grey bg-opacity-30 cursor-not-allowed text-grey"
                    : "border border-purple-2 text-purple-2"
                }`}
                onClick={() =>
                  handleSizeClick({
                    idCatalog: size.idCatalog,
                    size: size.size,
                  })
                }
                disabled={size.quantity === 0}
              >
                {size.size}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            {selectedSize && (
              <StepInput
                max={
                  costume.sizes.find(
                    (e) => e.idCatalog === selectedSize?.idCatalog
                  )?.quantity || 1
                }
                min={1}
                state={quantity}
                setState={setQuantity}
                inline
              />
            )}
            <Button
              label={
                cartItems.some((e) => e.idCatalog === selectedSize?.idCatalog)
                  ? "Modify"
                  : "Add to cart"
              }
              buttonStyle="primary"
              size="small"
              onClick={handleAddToCart}
              disabled={!selectedSize && true}
              className="ml-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};
