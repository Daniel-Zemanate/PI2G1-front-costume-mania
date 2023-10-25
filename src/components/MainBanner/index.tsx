import React from 'react';
import logo from "@assets/logo.png";
import banner from "@assets/mainBenner.png";
import styles from '@/styles/Home.module.css'
import Image from "next/image";

function Banner() {
  return (
      <div className="container mx-auto text-center"  style={{ marginTop: '100px' }}>
        <figure style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <Image src={logo} alt="Logo" style={{ width: '70%', height: '200px' }}/>
          <Image src={banner} alt="BannerPrincipal" style={{ width: '90%', height: '420px' }}/>
        </figure>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', gap: '20px', margin:'0px 0px 40px 0px'}}>
          <button type="submit" className={`${styles.primaryButton}`}>Shop Now</button>
          <button type="submit" className={`${styles.secondaryButton}`}>Flash Sales</button>
        </div>
        <div>
        <button type="submit" className={`${styles.tertiaryButton}`}>Small Moments, Monster Memories</button>
        </div>
      </div>
  );
}

export default Banner;
