import React, { FC, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Frijole } from "next/font/google";
import styles from "./styles.module.css";
import logo from "@assets/logo-mask.png";
import { Category, Costume } from "@/interfaces/costume";
import Link from "next/link";
import Carousel from "../Carousel";


const frijole = Frijole({
    subsets: ["latin"],
    variable: "--font-frijole",
    weight: "400",
  });
  
type Props = {
  title: string
  categories: Costume[];
  // categories: Category[];

};

const CategoriesBanner: FC<Props> = ({title, categories}) => {
  const [allCategories,setAllCategories] = useState(categories);
  return (
    <section className="w-full">
      <h4 className={`${frijole.className} text-4xl text-orange-2`} style={{textShadow: '2px 2px 2px rgba(0, 0, 0, 1)'}}>{title}</h4>
      <div className="py-2 overflow-visible">
        <Carousel>
          {allCategories.map((item) => (
            <Link href={`/ruta-de-tu-pagina?category=${item.id}`} key={item.id} className={`${styles.card}`} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '16px', transition: 'box-shadow 0.3s' }}>
              <div>
                <Image
                  src={item.url_image}
                  className="h-48 w-80 object-scale-down rounded-t-xl"
                  alt={item.name}
                  width={500}
                  height={500}
                />
              </div>
              <div>
                <h4 className={`${frijole.className} text-4xl text-orange-2`} style={{textShadow: '2px 2px 2px rgba(0, 0, 0, 1)'}}>{item.name}</h4>
              </div>
              <Image className={`${styles.logo}`} src={logo} alt="Logo" width="70" />
          </Link>
          ))}
        </Carousel>
      </div>
    </section>
  )
};

export default CategoriesBanner;
