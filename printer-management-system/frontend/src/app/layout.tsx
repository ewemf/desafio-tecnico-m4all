import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from '../components/QueryProvider';
import { Toaster } from "../components/ui/sonner";
import { Header } from "@/components/Header";
import { BackToTopButton } from "@/components/BackToTopButton"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestão de Impressoras",
  description: "Sistema de Gestão de Impressoras",
};

/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          {children}
          <Toaster richColors />
          <BackToTopButton />
        </QueryProvider>
      </body>
    </html>
  );
}