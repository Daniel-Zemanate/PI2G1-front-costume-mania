import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  route: string;
  label?: string;
  textColor: 'white' | 'black' | 'purple-2';
  children?: ReactNode;
  className?: string
};

function NavLink({ route, label, textColor = 'black', children, className }: Props) {
  const textColorClass = `text-${textColor}`

  return (
    <Link href={route} className={`whitespace-nowrap ${textColorClass} ${className}`}>
      {label}
      {children}
    </Link>
  );
}

export default NavLink;
