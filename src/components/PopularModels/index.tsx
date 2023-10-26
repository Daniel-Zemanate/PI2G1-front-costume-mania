import React from "react";
import { CostumeCard } from "@/components/Costumes/costumeCard.component";
import { Frijole } from "next/font/google";
import Carousel from "../Carousel";
import { FC } from "react";
import { costume } from "@/interfaces/costume";

const frijole = Frijole({
  subsets: ["latin"],
  variable: "--font-frijole",
  weight: "400",
});

interface Props {
  costumes: costume[]
}

export const PopularModels: FC<Props> = ({ costumes }) => {
  return (
    <section className="w-full my-4">
      <h4 className={`${frijole.className} text-3xl mb-4`}>Popular Models</h4>
      <div className="py-8 overflow-visible">
        <Carousel>
          {costumes.map((item) => (
            <CostumeCard key={item.id} costume={item} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default PopularModels;
