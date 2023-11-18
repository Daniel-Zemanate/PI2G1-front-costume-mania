import { ApiCostume, Costume } from "@/interfaces/costume";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Button from "../Button";
import logoText from "@assets/logo-text.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  getFavoritesState,
  removeFav,
} from "@/store/slices/favoritesSlices";
import { CartCostume, addItem } from "@/store/slices/cartSlice";
import StepInput from "../StepInput";
import { AppDispatch } from "@/store/store";

interface Props {
  costume: ApiCostume;
}

export const CostumeCardDetail: FC<Props> = ({ costume }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector(getFavoritesState);

  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState(1);

  const handleFavClick = () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    dispatch(addFav(costume.modelId));
  };

  const handleFavRemove = () => {
    const fav = favorites.find((e) => e.idModel === costume.modelId)
    if(!fav) return
    const {idFav} = fav    
    dispatch(removeFav(idFav));
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize((prevSize) => (prevSize === size ? undefined : size));
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const cartItem: CartCostume = {
      ...costume,
      quantity: quantity,
    };

    dispatch(addItem(cartItem));
    setSelectedSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg flex flex-col px-4 md:py-12 md:flex-row items-center justify-center gap-16 max-w-screen-lg m-auto mb-12`}
      >
        <Image
          src={costume.image || logoText}
          alt={costume.model}
          height={320}
          width={288}
        />
        <div className="px-4 py-3 w-full md:max-w-[40%]">
          <span className="p-1 text-white bg-purple-2 text-center rounded drop-shadow-sm mb-8">
            {costume.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {costume.model}
          </h1>
          <div className="flex flex-col gap-6">
            <section className={`w-full`}>
              <p className="text-base sm:text-2xl mb-2 font-bold">Size</p>
              <div className="flex items-center gap-2">
                {costume.sizes?.map((size) => (
                  <button
                    key={size.size}
                    className={`dark:border-purple-2 dark:border dark:rounded py-2 px-3 mr-2 text-sm ${
                      selectedSize === size.size
                        ? "bg-purple-2 text-white"
                        : "bg-white text-purple-2"
                    }`}
                    onClick={() => handleSizeClick(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </section>
            <section
              className={`flex justify-between w-full items-center min-h-[75px]`}
            >
              {selectedSize && (
                <>
                  <div>
                    <p className="text-base sm:text-2xl font-bold">Quantity</p>
                    <p>
                      Available stock:{" "}
                      {
                        costume.sizes.find((e) => e.size === selectedSize)
                          ?.quantity
                      }
                    </p>
                  </div>
                  <StepInput
                    max={
                      costume.sizes.find((e) => e.size === selectedSize)
                        ?.quantity || 1
                    }
                    min={1}
                    setState={setQuantity}
                  />
                </>
              )}
            </section>
            <section className={`flex w-full justify-between items-center`}>
              <p className="text-base sm:text-2xl font-bold"> Price</p>

              <p className="text-base sm:text-2xl font-bold">
                ${costume.price.toFixed(2)}
              </p>
            </section>

            <section className={`flex justify-between w-full items-center`}>
              <Button
                label="Add to Cart"
                buttonStyle="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              />
              <button
                className="flex items-center justify-center rounded-full bg-orange-2 w-10 h-10 text-white drop-shadow-sm"
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
