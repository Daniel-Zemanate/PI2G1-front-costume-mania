import React from "react";
import logo from "@assets/logo-mask.png";
import banner from "@assets/mainBanner.png";
import star from "@assets/star.svg";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "../Button";
import { Frijole } from "next/font/google";

const frijole = Frijole({
  subsets: ["latin"],
  weight: "400",
});

function Banner() {
  return (
    <div className="container mx-auto text-center pb-4 md:pb-12">
      <figure className="flex flex-col items-center">
        <span className="flex flex-col md:flex-row items-center gap-4">
          <Image className="-rotate-12" src={logo} alt="Logo" width="120" />
          <h1
            className={`${frijole.className} text-2xl sm:text-5xl md:text-6xl ${styles.title}`}
          >
            CostumeMania
          </h1>
        </span>
        <div className={`${styles.cropped} flex justify-center`}>
          <Image
            src={banner}
            alt="BannerPrincipal"
            className={`${styles.primaryBanner}`}
            style={{ width: "90%", maxWidth: "1400px", height: "auto" }}
          />
        </div>
      </figure>
      <div className="flex flex-col items-center gap-8">
        <span className="relative">
          <h4 className="bg-white border-2 border-purple-2 border-primary rounded-full p-6 font-bold text-xl italic hover:shadow-md hover:border-2 hover:border-purple-3">
            Small Moments, Monster Memories
          </h4>
          <div className="absolute -top-[1.225rem] right-10">
            <Image src={star} alt="star" />
          </div>
        </span>
      </div>
      <div></div>
      <figure className="flex flex-col items-center">
        <div className={`${styles.cropped} ${styles.hiddenInFullW}`}>
          <Image
            src={banner}
            className={`${styles.secondaryBanner}`}
            alt="BannerPrincipal"
            style={{ width: "90%", maxWidth: "1300px", height: "auto" }}
          />
        </div>
      </figure>
    </div>
  );
}

export default Banner;
