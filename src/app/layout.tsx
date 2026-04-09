import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gobernanza de Datos e IA — Alico Empaques",
  description:
    "Plataforma paso a paso para construir el modelo de Gobernanza de Datos e IA de Alico Empaques, basado en ISO/IEC 38505, DAMA-DMBOK2 y NIST AI RMF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
