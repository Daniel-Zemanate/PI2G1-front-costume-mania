import { ApiCostume } from "@/interfaces/costume";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Button from "../Button";
import logoText from "@assets/logo-text.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  costume: ApiCostume;
}

export const CostumeCard: FC<Props> = ({ costume }) => {
  const { data: session } = useSession();

  const router = useRouter();
  const [favs, setFavs] = useState<ApiCostume[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem("favs");
    if (favs) setFavs(JSON.parse(favs));
  }, []);

  const handleFavClick = () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }
    console.log(costume)
    const favs = localStorage.getItem("favs");
    if (!favs) {
      const newFavs = [costume];
      localStorage.setItem("favs", JSON.stringify(newFavs));
      setFavs(newFavs);
      return;
    }
    const existingFavs = JSON.parse(favs);
    existingFavs.push(costume);
    localStorage.setItem("favs", JSON.stringify(existingFavs));
    setFavs(existingFavs);
  };

  const handleFavRemove = () => {
    const favs = localStorage.getItem("favs");
    if (!favs) return;
    const existingFavs: ApiCostume[] = JSON.parse(favs);
    const newFavs = existingFavs.filter((e) => e.idModel !== costume.idModel);
    localStorage.setItem("favs", JSON.stringify(newFavs));
    setFavs(newFavs);
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
              <div
                key={size.noSize}
                className="bg-white dark:bg-white-500 text-purple-2 dark:text-purple-2 dark:border-purple-2 dark:border dark:rounded py-1 px-2 mr-2 text-sm"
              >
                {size.noSize}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Button label="Add to Cart" buttonStyle="primary" size="small" />
            <button
              className="flex items-center justify-center rounded-full bg-orange-2 w-10 h-10 text-white drop-shadow-sm"
              onClick={
                favs.some((e) => e.idModel === costume.idModel)
                  ? handleFavRemove
                  : handleFavClick
              }
            >
              <svg
                className="w-5 h-5 transform transition-transform duration-300 hover:orange-2"
                fill={
                  favs.some((e) => e.idModel === costume.idModel)
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
