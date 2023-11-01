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
      <Header />
      <main className={`mt-24 ${raleway.className} flex flex-col justify-between items-center pb-4 min-h-screen w-full`}>{children}</main>
      <Footer />
    </>
  );
}
