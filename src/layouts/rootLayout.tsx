import React from "react";
import Header from '@/components/Header'
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mt-24">{children}</main>
      <Footer />
    </>
  );
}
