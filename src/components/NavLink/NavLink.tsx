import React from 'react'
import Link from "next/link";

function NavLink({route, label}: {route: string, label: string}) {
  return (
    <Link href={route} className='whitespace-nowrap text-white'>{label}</Link>
  )
}

export default NavLink