import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import logo from "@assets/logo.png";
import Image from "next/image";

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Link href="/" className="self-center">
        <Image src={logo} alt="Costume Mania logo" width={80} height={40} />
      </Link>

      <main className="flex-grow main flex flex-col justify-between items-center py-4 px-5 my-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
