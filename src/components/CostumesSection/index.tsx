import React from "react";
import { CostumeCard } from "@/components/Costumes";
import { Frijole } from "next/font/google";
import Carousel from "../Carousel";
import { Costume } from "@/interfaces/costume";
import styles from './styles.module.css'

const frijole = Frijole({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  title: string,
  costumes: Costume[]
}

function CostumesSection({title, costumes}: Props) {
  return (
    <section className="w-full">
      <h4 className={`${frijole.className} text-4xl text-orange-2`} style={{textShadow: '2px 2px 2px rgba(0, 0, 0, 1)'}}>{title}</h4>
      <div className="py-2 overflow-visible">
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