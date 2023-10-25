import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  route: string;
  label: string;
  textColor: 'black' | 'white'; // Define textColor prop as an enum
  children?: ReactNode;
};

function NavLink({ route, label, textColor, children }: Props) {
  const textColorClass = textColor === 'white' ? 'text-white' : 'text-black';

  return (
    <Link href={route} className={`whitespace-nowrap ${textColorClass}`}>
      {label}
      {children}
    </Link>
  );
}

export default NavLink;
