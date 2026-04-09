import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gobernanza de Datos - Alico",
  description:
    "Plataforma paso a paso para construir el modelo de Gobernanza de Datos e IA de Alico Empaques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
