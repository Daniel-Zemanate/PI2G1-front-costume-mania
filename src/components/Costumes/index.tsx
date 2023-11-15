import { ApiCostume } from "@/interfaces/costume";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Button from "../Button";
import logoText from "@assets/logo-text.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CartCostume, addItem, getCartState } from "@/store/slices/cartSlice";
import { addFavorite, getFavoritesState, removeFavorite } from "@/store/slices/favoritesSlices";

interface Props {
  costume: ApiCostume;
}

export const CostumeCard: FC<Props> = ({ costume }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>();
  const { favorites } = useSelector(getFavoritesState)

  const handleFavClick = () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    dispatch(addFavorite(costume));
  };

  const handleFavRemove = () => {
    dispatch(removeFavorite(costume.idModel));
  };

  const handleImageClick = () => {
    router.push(`/costumes/${costume.idModel}`);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize((prevSize) => (prevSize === size ? undefined : size));
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const cartItem: CartCostume = {
      ...costume,
      quantity: 1,
    };

    dispatch(addItem(cartItem));
    setSelectedSize(undefined);
  };

  return (
    <>
      <div className="w-64 h-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white">
        <Image
          src={costume.urlImage || logoText}
          className="h-48 w-80 object-scale-down rounded-t-xl"
          alt={costume.name}
          height={320}
          width={288}
          onClick={handleImageClick}
        />
        <div className="px-4 py-3 w-64">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {costume.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg text-black cursor-auto my-3">
              $ {costume.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center">
            {costume.sizes?.map((size) => (
              <button
                key={size.noSize}
                className={`dark:border-purple-2 dark:border dark:rounded py-1 px-2 mr-2 text-sm ${
                  selectedSize === size.noSize
                    ? "bg-purple-2 text-white"
                    : "bg-white text-purple-2"
                }`}
                onClick={() => handleSizeClick(size.noSize)}
              >
                {size.noSize}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Button
              label="Add to Cart"
              buttonStyle="primary"
              size="small"
              onClick={handleAddToCart}
              disabled={!selectedSize && true}
            />
            <button
              className="flex items-center justify-center rounded-full bg-orange-2 w-10 h-10 text-white drop-shadow-sm"
              onClick={
                favorites.some((e) => e.idModel === costume.idModel)
                  ? handleFavRemove
                  : handleFavClick
              }
            >
              <svg
                className="w-5 h-5 transform transition-transform duration-300 hover:orange-2"
                fill={
                  favorites.some((e) => e.idModel === costume.idModel)
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
          </div>
        </div>
      </div>
    </>
  );
};
