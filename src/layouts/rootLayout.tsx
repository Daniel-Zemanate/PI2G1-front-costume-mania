import React from "react";
import NavBar from '@components/NavBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <footer>sdassa</footer>
    </>
  );
}
