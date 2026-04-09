"use client";

import Link from "next/link";
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
      <div className="bg-white border-b no-print">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-alico-gray mb-2">
            <Link href="/" className="hover:text-alico-teal">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-alico-dark">{paso.fase}</span>
            <span>/</span>
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
              <p className="text-alico-gray">{paso.subtitulo}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">{paso.descripcion}</p>
          </div>
          {children}
        </div>
      </main>

      <div className="bg-white border-t no-print">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/paso/${prev}`}
              className="text-alico-teal hover:underline flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Paso {prev}: {PASOS[prev - 1].titulo}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/paso/${next}`}
              className="text-alico-teal hover:underline flex items-center gap-1"
            >
              Paso {next}: {PASOS[next - 1].titulo}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/"
              className="text-alico-teal hover:underline"
            >
              Volver al Inicio
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
