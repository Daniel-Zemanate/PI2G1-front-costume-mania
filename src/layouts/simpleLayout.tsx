import React from "react";
import Header from '@/components/Header'
import Footer from "@/components/Footer";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header simple/>
      <main className={`mt-16 ${raleway.className} flex flex-col justify-between items-center min-h-[70vh] w-full`}>{children}</main>
      <Footer />
    </>
  );
}
