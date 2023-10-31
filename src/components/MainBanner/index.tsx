import React from "react";
import logo from "@assets/logo-mask.png";
import banner from "@assets/mainBanner.png";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "../Button";
import { Frijole } from "next/font/google";

const frijole = Frijole({
  subsets: ["latin"],
  variable: "--font-frijole",
  weight: "400",
});

function Banner() {
  return (
    <div className="container mx-auto text-center py-4 md:py-12">
      <figure className="flex flex-col items-center">
        <span className="flex flex-col md:flex-row items-center gap-4">
          <Image className="-rotate-12" src={logo} alt="Logo" width="120" />
          <h1 className={`${frijole.className} text-4xl md:text-6xl ${styles.title}`}>CostumeMania</h1>
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
      <div className="flex flex-row justify-center gap-6 mb-8 md:mb-10">
        <Button buttonStyle="primary" label="Shop Now" />
        <Button buttonStyle="secondary" label="Flash Sales" />
      </div>
      <div>
        <button type="submit" className={`${styles.tertiaryButton}`}>
          Small Moments, Monster Memories
        </button>
      </div>
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
