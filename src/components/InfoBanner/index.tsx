import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  text: string;
  mainImage: StaticImageData;
  backgroundImage: StaticImageData;
};

const BannerInfo: FC<Props> = ({ title, text, mainImage, backgroundImage }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <section className="w-full md:w-3/5 text-left">
        <h1 className="text-2xl md:text-5xl font-bold tracking-wider tracking-widest">{title}</h1>
        <p className="text-base sm:text-2xl">{text}</p>
      </section>
      <div>
        <figure className="flex flex-col items-center">
          <Image
            src={backgroundImage}
            alt="background"
            style={{
              width: "90%",
              height: "420px",
              zIndex: 0,
              objectFit: "contain",
            }}
          />
          <Image
            src={mainImage}
            alt={title}
            style={{
              height: "420px",
              position: "absolute",
              objectFit: "contain",
            }}
          />
        </figure>
      </div>
    </div>
  );
};

export default BannerInfo;
