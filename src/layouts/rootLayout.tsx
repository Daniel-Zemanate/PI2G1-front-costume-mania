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
      <main className={`mt-24 ${raleway.className}`}>{children}</main>
      <Footer />
    </>
  );
}
