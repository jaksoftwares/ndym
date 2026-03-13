import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "NDYM - Nairobi Diocese Youth Ministry",
  description: "Raising a Godly Generation - Anglican Church of Kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", geist.variable, montserrat.variable)}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          geist.variable,
          montserrat.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}

