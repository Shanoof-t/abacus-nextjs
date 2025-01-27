import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";
import { SheetProvider } from "@/providers/sheet-provider";
import AlertProvider from "@/providers/alert-provider";
import DialogProvider from "@/providers/dialog-provider";
import DrawerProvider from "@/providers/drawer-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abacus",
  description: "A Comprehensive Personal Finance Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Suspense>
            <DrawerProvider />
            <DialogProvider />
            <AlertProvider />
            <SheetProvider />
            {children}
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
