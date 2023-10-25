import React from "react";
import NavBar from '@components/NavBar'
import Footer from "@/components/Footer";
import Banner from "@/components/MainBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <Banner></Banner>
      <main>{children}</main>
      <Footer />
    </>
  );
}
