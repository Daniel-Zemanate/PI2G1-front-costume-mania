import Image from 'next/image'
import React from 'react'
import logo from '@assets/logo-mask.png'

function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-48 md:h-auto ">
      <Image
        src={logo}
        alt='spinner'
        className="animate-spin w-16 h-16"
      />
    </div>
  )
}

export default Spinner