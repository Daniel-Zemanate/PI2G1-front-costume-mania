import React from "react";
import { CostumeCard } from "@/components/Costumes";
import { Frijole } from "next/font/google";
import Carousel from "../Carousel";
import { Costume } from "@/interfaces/costume";

const frijole = Frijole({
  subsets: ["latin"],
  variable: "--font-frijole",
  weight: "400",
});

type Props = {
  title: string,
  costumes: Costume[]
}

function CostumesSection({title, costumes}: Props) {
  return (
    <section className="w-full my-4">
      <h4 className={`${frijole.className} text-4xl`}>{title}</h4>
      <div className="py-8 overflow-visible">
        <Carousel>
          {costumes.map((item) => (
            <CostumeCard key={item.id} costume={item} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default CostumesSection