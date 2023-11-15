import { ApiCostume, Costume } from "@/interfaces/costume";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Button from "../Button";
import logoText from "@assets/logo-text.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  getFavoritesState,
  removeFavorite,
} from "@/store/slices/favoritesSlices";

interface Props {
  costume: ApiCostume;
}

export const CostumeCardDetail: FC<Props> = ({ costume }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const { favorites } = useSelector(getFavoritesState);

  const handleFavClick = () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    dispatch(addFavorite(costume));
  };

  const handleFavRemove = () => {
    dispatch(removeFavorite(costume.modelId));
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg flex flex-col px-4 md:flex-row items-center justify-center gap-16 max-w-screen-lg m-auto mb-12`}
      >
        <Image
          src={costume.image || logoText}
          alt={costume.model}
          height={320}
          width={288}
        />
        <div className="px-4 py-3 w-full md:max-w-[40%]">
          <small className="p-1 text-white md:text-lg bg-purple-2 text-center rounded drop-shadow-sm mb-16">
            {costume.category}
          </small>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {costume.model}
          </h1>
          <section
            className={`${styles.serctionContainer} w-full md:w-3/5 text-left`}
          >
            <p className="text-base sm:text-2xl font-bold">Size</p>
            <div className="flex items-center">
              {costume.sizes?.map((size) => (
                <div
                  key={size.size}
                  className="bg-white dark:bg-white-500 text-purple-2 dark:text-purple-2 rounded-lg border-2 border-purple-2 border-primary dark:border-purple-2 dark:border dark:rounded py-1 px-2 mr-2 text-sm"
                  style={{ width: "50px", height: "50px" }}
                >
                  {size.size}
                </div>
              ))}
            </div>
          </section>
          <section className={`${styles.serctionContainer2} w-full`}>
            <p className="text-base sm:text-2xl font-bold">Quantity</p>
            <input
              type="number"
              defaultValue={0}
              style={{ width: "50px", border: "solid 1px" }}
              className="text-lg font-bold text-black  rounded-lg border-2 border-purple-2 border-primary truncate block capitalize text-right"
            />
          </section>
          <section className={`${styles.serctionContainer2} w-full`}>
            <p className="text-base sm:text-2xl font-bold"> Price</p>

            <p className="text-base sm:text-2xl font-bold">
              ${costume.price.toFixed(2)}
            </p>
          </section>

          <section className={`${styles.serctionContainer2} w-full`}>
            <Button label="Add to Cart" buttonStyle="primary" size="small" />
            <button
              className="flex items-center justify-center rounded-full bg-orange-2 w-10 h-10 text-white drop-shadow-sm"
              onClick={
                favorites.some((e) => e.modelId === costume.modelId)
                  ? handleFavRemove
                  : handleFavClick
              }
            >
              <svg
                className="w-5 h-5 transform transition-transform duration-300 hover:orange-2"
                fill={
                  favorites.some((e) => e.modelId === costume.modelId)
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
    </>
  );
};
