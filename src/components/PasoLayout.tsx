"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "./Header";
import { PASOS } from "@/lib/pasos";

interface Props {
  pasoId: number;
  children: React.ReactNode;
}

export default function PasoLayout({ pasoId, children }: Props) {
  const paso = PASOS.find((p) => p.id === pasoId);
  if (!paso) return null;

  const prev = pasoId > 1 ? pasoId - 1 : null;
  const next = pasoId < PASOS.length ? pasoId + 1 : null;

  return (
    <>
      <Header />

      {/* Breadcrumb & title */}
      <div className="bg-white/80 backdrop-blur-sm border-b no-print">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-alico-gray mb-3">
            <Link href="/" className="hover:text-alico-teal transition-colors-smooth">
              Inicio
            </Link>
            <svg className="w-3.5 h-3.5 text-alico-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-alico-dark">{paso.fase}</span>
            <svg className="w-3.5 h-3.5 text-alico-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-alico-dark font-medium">
              Paso {pasoId}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{paso.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-alico-dark">
                {paso.titulo}
              </h1>
              <p className="text-alico-gray mt-0.5">{paso.subtitulo}</p>
            </div>
          </div>

          {/* Step indicator dots */}
          <div className="flex items-center gap-2 mt-4">
            {PASOS.map((p) => (
              <Link
                key={p.id}
                href={`/paso/${p.id}`}
                title={`Paso ${p.id}: ${p.titulo}`}
                className="group"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-smooth ${
                    p.id === pasoId
                      ? "bg-alico-teal scale-125 ring-2 ring-alico-teal/30"
                      : p.id < pasoId
                        ? "bg-alico-teal/40 group-hover:bg-alico-teal/60"
                        : "bg-gray-300 group-hover:bg-gray-400"
                  }`}
                />
              </Link>
            ))}
            <span className="text-xs text-alico-gray ml-2">
              {pasoId} de {PASOS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main content with fade-in */}
      <motion.main
        className="flex-1 py-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-blue-800 leading-relaxed">{paso.descripcion}</p>
          </div>
          {children}
        </div>
      </motion.main>

      {/* Navigation buttons */}
      <div className="bg-white/80 backdrop-blur-sm border-t no-print">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/paso/${prev}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-alico-dark/5 to-alico-teal/5 text-alico-teal hover:from-alico-dark/10 hover:to-alico-teal/10 transition-smooth text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Paso {prev}: {PASOS[prev - 1].titulo}</span>
              <span className="sm:hidden">Anterior</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/paso/${next}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-alico-teal to-alico-dark text-white hover:opacity-90 transition-smooth text-sm font-medium shadow-sm"
            >
              <span className="hidden sm:inline">Paso {next}: {PASOS[next - 1].titulo}</span>
              <span className="sm:hidden">Siguiente</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-alico-teal to-alico-dark text-white hover:opacity-90 transition-smooth text-sm font-medium shadow-sm"
            >
              Volver al inicio
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
