"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-alico-dark text-white no-print">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight">alico</span>
          <span className="text-sm text-teal-300 border-l border-teal-500 pl-3">
            Gobernanza de Datos
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-teal-300 transition-colors">
            Inicio
          </Link>
          <Link
            href="/progreso"
            className="hover:text-teal-300 transition-colors"
          >
            Mi Progreso
          </Link>
        </nav>
      </div>
    </header>
  );
}
