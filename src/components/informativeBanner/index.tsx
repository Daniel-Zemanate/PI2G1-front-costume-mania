import React from 'react';
import mancha1 from "../informativeBanner/assets/mancha1.png";
import custome1 from "../informativeBanner/assets/custome1.png";
import mancha2 from "../informativeBanner/assets/mancha2.png";
import custome2 from "../informativeBanner/assets/custome2.png";
import styles from "@/styles/Home.module.css"
import Image from "next/image";

interface ChildProps {
  bannerInfo: number;
}

interface BannerInfoProps {
  titulo: string;
  imagen: string;
  texto: string;
}

const bannersInfo = [{
  titulo: "WHERE PERSONALITY MEETS FABRIC",
  imagen: custome1,
  fondoImagen: mancha2,
  texto: "Personal style in fashion is more than just what you wear—it's a visual manifestation of your personality. It's the art of curating outfits that resonate with your inner essence.",
},
{titulo: "INTERSECTION OF CONFIDENCE AND COUTURE",
  imagen: custome2,
  fondoImagen: mancha1,
  texto: "Staying confidently true to who you are in fashion involves embracing your quirks. It's about exuding an authenticity that is truly captivating.",
}]

const BannerInfo: React.FC<ChildProps> = ({ bannerInfo }) => {
  
const infoBanner = bannersInfo[bannerInfo]
  return (
    
        <div className={`${styles.informattiveBanner}`}>
          <section>
            <h1>{infoBanner.titulo}</h1>
            <p>
              {infoBanner.texto}
            </p>
          </section>
          <div>
          <figure >
             <Image src={infoBanner.fondoImagen} alt="BannerPrincipal" style={{ width: '90%', height: '420px', zIndex:0,objectFit:'contain'}}/>
             <Image src={infoBanner.imagen} alt="BannerPrincipal" style={{ height: '420px', position:'absolute', objectFit: 'contain'}}/>
          </figure>
          </div>
        </div>
        
  );
}

export default BannerInfo;

