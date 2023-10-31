import React from 'react';
import logo from "@assets/logo.png";
import banner from "@assets/mainBanner.png";
import styles from './styles.module.css'
import Image from "next/image";
import Button from '../Button';

function Banner() {
  return (
    <div className="container mx-auto text-center">
      <figure className='flex flex-col items-center'>
        <Image src={logo} alt="Logo" style={{ width: '70%', maxWidth: '717px', height: 'auto' }} />
        <div className={`${styles.cropped} flex justify-center`}>
          <Image src={banner} alt="BannerPrincipal" className={`${styles.primaryBanner}`} style={{ width: '90%', maxWidth: '1400px', height: 'auto' }} />
        </div>
      </figure>
      <div className="flex flex-row justify-center gap-6 mb-8 md:mb-10">
        <Button buttonStyle='primary' label='Shop Now' />
        <Button buttonStyle='secondary' label='Flash Sales' />
      </div>
      <div>
        <button type="submit" className={`${styles.tertiaryButton}`}>Small Moments, Monster Memories</button>
      </div>
      <figure className='flex flex-col items-center'>
        <div className={`${styles.cropped} ${styles.hiddenInFullW}`}>
          <Image src={banner} className={`${styles.secondaryBanner}`} alt="BannerPrincipal" style={{ width: '90%', maxWidth: '1300px', height: 'auto' }} />
        </div>
      </figure>
    </div>
  );
}

export default Banner;
