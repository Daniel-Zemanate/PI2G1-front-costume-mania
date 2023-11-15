import { Costume } from "@/interfaces/costume";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Button from "../Button";
import logoText from "@assets/logo-text.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

interface Props {
  costume: Costume;
}


export const CostumeCardDetail: FC<Props> = ({ costume }) => {
  const { data: session } = useSession();

  const router = useRouter();
  const [favs, setFavs] = useState<Costume[]>([]);

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
    const existingFavs: Costume[] = JSON.parse(favs);
    const newFavs = existingFavs.filter((e) => e.modelId !== costume.modelId);
    localStorage.setItem("favs", JSON.stringify(newFavs));
    setFavs(newFavs);
  };

  const handleImageClick = () => {
    router.push(`/costumes/${costume.modelId}`);
  };

  return (
    <>
  <div className={`${styles.container} bg-white px-16 py-8 my-8 rounded-lg flex max-w-screen-lg min-w-[33%] m-auto`}>
        <Image 
          src={costume.image || logoText}
          className={`${styles.image} object-scale-down rounded-lg`}
          alt={costume.model}
          height={320}
          width={288}
          onClick={handleImageClick}
        />
        <div className="px-4 py-3 w-auto">
          <section  className={`${styles.serctionContainer} w-full md:w-3/5 text-left`}>
            <h1 className="text-2xl md:text-5xl font-bold tracking-wider tracking-widest mb-4">{costume.category}</h1>
            <p className="text-base sm:text-2xl">{costume.model}</p>
          </section>
          <section  className={`${styles.serctionContainer} w-full md:w-3/5 text-left`}>
            <p className="text-base sm:text-2xl font-bold" >Size</p>
            <div className="flex items-center">
            {costume.sizes?.map((size) => (
              <div
                key={size.no_size}
                className="bg-white dark:bg-white-500 text-purple-2 dark:text-purple-2 rounded-lg border-2 border-purple-2 border-primary dark:border-purple-2 dark:border dark:rounded py-1 px-2 mr-2 text-sm"
                style={{width: '50px', height: '50px'}}
                >
                {size.no_size}
              </div>
            ))}
            </div>
          </section>
          <section  className={`${styles.serctionContainer2} w-full md:w-3/5`}>
            <p className="text-base sm:text-2xl font-bold">Quantity</p>
            <input type="number" defaultValue={0} style={{width:'50px' , border:'solid 1px'}} className="text-lg font-bold text-black  rounded-lg border-2 border-purple-2 border-primary truncate block capitalize text-right"/>
              
             
          </section>
          <section  className={`${styles.serctionContainer2} w-full md:w-3/5`}>
              <p className="text-base sm:text-2xl font-bold"> Price</p>

              <p className="text-base sm:text-2xl font-bold">
              ${costume.price.toFixed(2)}
             </p>
          </section>
          
          <section  className={`${styles.serctionContainer2} w-full md:w-3/5`}>

            <Button label="Add to Cart" buttonStyle="primary" size="small" />
            <button
              className="flex items-center justify-center rounded-full bg-orange-2 w-10 h-10 text-white drop-shadow-sm"
              onClick={
                favs.some((e) => e.modelId === costume.modelId)
                  ? handleFavRemove
                  : handleFavClick
              }
            >
              <svg
                className="w-5 h-5 transform transition-transform duration-300 hover:orange-2"
                fill={
                  favs.some((e) => e.modelId === costume.modelId)
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
