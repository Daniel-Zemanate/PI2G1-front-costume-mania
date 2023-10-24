import React from "react";
import NavBar from '@/components/Header'
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="mt-24">{children}</main>
      <Footer />
    </>
  );
}
