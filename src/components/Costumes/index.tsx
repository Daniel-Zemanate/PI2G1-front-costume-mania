import { Costume } from "@/interfaces/costume";
import Image from "next/image";
import { FC } from "react";
import Button from "../Button";

interface Props {
  costume: Costume;
}

export const CostumeCard: FC<Props> = ({ costume }) => {
  return (
    <>
      <div className="w-64 h-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Image
          src={costume.url_image}
          className="h-48 w-80 object-scale-down rounded-t-xl"
          alt={costume.name}
          height={320}
          width={288}
        />
        <div className="px-4 py-3 w-64">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {costume.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg text-black cursor-auto my-3">
              ${costume.price}
            </p>
          </div>
          <div className="flex items-center">
            {costume.sizes?.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-white-500 text-violet-500 dark:text-violet dark:border-violet-500 dark:border dark:rounded py-1 px-2 mr-2 text-sm"
              >
                {item.no_size}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Button label="Add to Cart" buttonStyle="primary" size="small" />
            <button className="flex items-center justify-center rounded-full bg-violet-500 w-10 h-10 text-white border border-violet-500 hover:bg-white hover:text-violet-500">
              <svg
                className="w-5 h-5 transform transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
