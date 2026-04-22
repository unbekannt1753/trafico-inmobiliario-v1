"use client";
import React from 'react';
import Nav from '@/src/components/Nav';
import Footer from '@/src/components/Footer';
import { usePathname } from 'next/navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSearch = pathname === "/search";

  return (
    <>
      <Nav />
      <main>{children}</main>
      {!isSearch && <Footer />}
    </>
  );
}
