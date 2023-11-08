import React, { FC } from "react";
import Image from "next/image";
import { Frijole } from "next/font/google";
import styles from "./styles.module.css";
import { Category } from "@/interfaces/costume";
import Link from "next/link";
import Carousel from "../Carousel";
import logoText from "@assets/logo-text.png";
import { getCategoryImage } from "@/utils/categories";

const frijole = Frijole({
  subsets: ["latin"],
  variable: "--font-frijole",
  weight: "400",
});

type Props = {
  title: string;
  categories: Category[];
};

const CategoriesBanner: FC<Props> = ({ title, categories }) => {  
  return (
    <section className="w-full">
      <h4
        className={`${frijole.className} text-4xl text-orange-2`}
        style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
      >
        {title}
      </h4>
      <Carousel>
        {categories.map((item) => (
          <Link
            href={`/costumes?category=${item.idCategory}`}
            key={item.idCategory}
            className={`${styles.card} p-4 relative cursor-pointer bg-white m-4 rounded-lg shadow-lg overflow-hidden h-64 lg:h-80`}
          >
            <div className={`${styles.imageContainer} w-full h-full overflow-hidden`}>
              <Image
                src={getCategoryImage(item.name) || logoText}
                className="h-48 rounded-t-xl"
                alt={item.name}
                fill
                objectFit="cover"
              />
            </div>
            <div className={`${styles.titleContainer}`}>
              <h4
                className={`${frijole.className} text-4xl sm:text-2xl md:text-2xl lg:text-3xl text-orange-2 text-center`}
                style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
              >
                {item.name}
              </h4>
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  );
};

export default CategoriesBanner;
