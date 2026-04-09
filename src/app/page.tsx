"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { PASOS, FASES } from "@/lib/pasos";
import { getData } from "@/lib/store";

export default function Home() {
  const [completados, setCompletados] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = getData();
    const done: number[] = [];
    if (data.diagnostico.length > 0) done.push(1, 2);
    if (data.diagnostico.length >= 10) done.push(3);
    if (data.dominios.length > 0) done.push(4);
    if (data.estructuraGobierno.consejo) done.push(5);
    if (data.raci.length > 0) done.push(6);
    if (data.politicas.length > 0) done.push(7);
    if (data.kpis.length > 0) done.push(8);
    if (data.hojaDeRuta.length > 0) done.push(9);
    if (data.socializacion.length > 0) done.push(10);
    setCompletados(done);
  }, []);

  const porcentaje = Math.round((completados.length / PASOS.length) * 100);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-alico-dark text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Gobernanza de Datos e IA
            </h1>
            <p className="text-xl text-teal-200 mb-2">
              Alico Empaques S.A.S BIC
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto mt-4">
              Plataforma paso a paso para disenar, implementar y socializar un
              modelo de gobernanza de datos robusto, escalable y preparado para
              la innovacion con IA.
            </p>
            {mounted && completados.length > 0 && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Progreso</span>
                  <span>{porcentaje}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-teal-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Modelo Integrado */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-alico-dark text-center mb-2">
              Modelo Integrado de Gobernanza
            </h2>
            <p className="text-center text-alico-gray mb-8">
              Basado en tres marcos de referencia internacionales
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-sm">
                    ISO/IEC
                  </span>
                </div>
                <h3 className="font-bold text-alico-dark mb-2">
                  ISO/IEC 38505
                </h3>
                <p className="text-sm text-alico-gray">
                  <strong>La Responsabilidad.</strong> Establece el mandato y la
                  rendicion de cuentas desde la Junta Directiva y la Gerencia
                  General.
                </p>
              </div>
              <div className="border-2 border-teal-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-bold text-sm">DAMA</span>
                </div>
                <h3 className="font-bold text-alico-dark mb-2">DAMA-DMBOK2</h3>
                <p className="text-sm text-alico-gray">
                  <strong>La Estructura.</strong> Proporciona el plano detallado
                  para construir la gestion de datos: roles, areas de
                  conocimiento y procesos.
                </p>
              </div>
              <div className="border-2 border-amber-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-700 font-bold text-sm">
                    NIST
                  </span>
                </div>
                <h3 className="font-bold text-alico-dark mb-2">
                  NIST AI RMF
                </h3>
                <p className="text-sm text-alico-gray">
                  <strong>El Futuro.</strong> Guia el diseno y despliegue de
                  soluciones de IA de manera etica, segura y confiable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pasos por Fase */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-alico-dark text-center mb-8">
              Hoja de Ruta: 10 Pasos hacia la Madurez
            </h2>
            {FASES.map((fase) => (
              <div key={fase.nombre} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${fase.color}`} />
                  <h3 className="text-lg font-bold text-alico-dark">
                    {fase.nombre}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fase.pasos.map((pid) => {
                    const paso = PASOS.find((p) => p.id === pid)!;
                    const done = completados.includes(pid);
                    return (
                      <Link
                        key={pid}
                        href={`/paso/${pid}`}
                        className={`block bg-white rounded-xl border-2 p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                          done
                            ? "border-alico-teal"
                            : "border-gray-200 hover:border-alico-teal/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-2xl">{paso.icon}</span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              done
                                ? "bg-teal-100 text-teal-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {done ? "Completado" : `Paso ${pid}`}
                          </span>
                        </div>
                        <h4 className="font-bold text-alico-dark mb-1">
                          {paso.titulo}
                        </h4>
                        <p className="text-sm text-alico-gray">
                          {paso.subtitulo}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pilares Estrategicos */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-alico-dark text-center mb-2">
              Alineacion con Pilares Estrategicos
            </h2>
            <p className="text-center text-alico-gray mb-8">
              La gobernanza de datos impulsa cada uno de los ejes estrategicos
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  titulo: "Transformacion Digital",
                  desc: "La gobernanza es la base para construir cualquier iniciativa de digitalizacion exitosa con datos confiables.",
                },
                {
                  titulo: "Innovacion",
                  desc: "Depende de datos de alta calidad sobre materiales, pruebas y rendimiento. La IA es tan buena como los datos con los que se entrena.",
                },
                {
                  titulo: "Desarrollo Sostenible",
                  desc: "Permite un seguimiento preciso y auditable de metricas clave de sostenibilidad (huella de carbono, material reciclado).",
                },
                {
                  titulo: "Experiencia Superior",
                  desc: "Requiere una vision 360 del cliente, solo posible con datos de ventas, servicio y marketing integrados.",
                },
                {
                  titulo: "Gestion del Desempeno",
                  desc: "Asegura que los KPIs se calculen a partir de datos verificados, enfocando la toma de decisiones.",
                },
                {
                  titulo: "Cumplimiento Normativo",
                  desc: "Facilita el cumplimiento de regulaciones como OEA, proteccion de datos personales y auditorias.",
                },
              ].map((p) => (
                <div
                  key={p.titulo}
                  className="flex items-start gap-3 p-4 rounded-lg bg-gray-50"
                >
                  <div className="w-6 h-6 bg-alico-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-alico-dark">{p.titulo}</h4>
                    <p className="text-sm text-alico-gray">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-alico-dark text-gray-400 text-center py-6 text-sm">
        <p>
          Alico Empaques S.A.S BIC &mdash; Plataforma de Gobernanza de Datos e
          IA
        </p>
        <p className="mt-1 text-gray-500">
          ISO/IEC 38505 + DAMA-DMBOK2 + NIST AI RMF
        </p>
      </footer>
    </>
  );
}
