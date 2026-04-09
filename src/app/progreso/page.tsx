"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { PASOS, FASES } from "@/lib/pasos";
import { getData, resetData, type GobernanzaData } from "@/lib/store";
import { exportarPDF, exportarJSON, exportarCSV } from "@/lib/exportPdf";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }
    let start = 0;
    const duration = 800;
    const stepTime = Math.max(Math.floor(duration / value), 30);
    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display}</>;
}

export default function ProgresoPage() {
  const [data, setData] = useState<GobernanzaData | null>(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    setData(getData());
  }, []);

  if (!data) return null;

  const completados: number[] = [];
  if (data.diagnostico.length > 0) completados.push(1, 2);
  if (data.diagnostico.length >= 10) completados.push(3);
  if (data.dominios.length > 0) completados.push(4);
  if (data.estructuraGobierno.consejo) completados.push(5);
  if (data.raci.length > 0) completados.push(6);
  if (data.politicas.length > 0) completados.push(7);
  if (data.kpis.length > 0) completados.push(8);
  if (data.hojaDeRuta.length > 0) completados.push(9);
  if (data.socializacion.length > 0) completados.push(10);

  const porcentaje = Math.round((completados.length / PASOS.length) * 100);

  const stats = [
    { label: "Respuestas diagnóstico", value: data.diagnostico.length },
    { label: "Dominios configurados", value: data.dominios.length },
    { label: "Procesos RACI", value: data.raci.length },
    { label: "Políticas redactadas", value: data.politicas.length },
    { label: "KPIs definidos", value: data.kpis.length },
    { label: "Hitos en hoja de ruta", value: data.hojaDeRuta.length },
    { label: "Actividades socialización", value: data.socializacion.length },
  ];

  const handleReset = () => {
    resetData();
    setData(getData());
    setShowReset(false);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target?.result as string);
          localStorage.setItem("gobernanza-alico-data", JSON.stringify(imported));
          setData(getData());
        } catch {
          alert("Error al importar el archivo. Verifique que sea un JSON válido.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h1
            className="text-3xl font-bold text-alico-dark mb-2"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            Mi Progreso
          </motion.h1>
          <motion.p
            className="text-alico-gray mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Resumen del avance en la construcción del modelo de gobernanza
          </motion.p>

          {/* Progreso general */}
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 border rounded-xl p-6 mb-8 shadow-sm"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-alico-dark">
                Progreso General
              </h2>
              <span className="text-2xl font-bold text-alico-teal">
                {porcentaje}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-alico-teal to-teal-400 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${porcentaje}%` }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={cardVariant}
                  className="text-center p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-2xl font-bold text-alico-dark">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="text-xs text-alico-gray">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Pasos detalle */}
          <motion.div
            className="space-y-3 mb-8"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {FASES.map((fase) => (
              <motion.div key={fase.nombre} variants={cardVariant}>
                <h3 className="text-sm font-bold text-alico-gray uppercase tracking-wider mb-2 mt-6">
                  {fase.nombre}
                </h3>
                {fase.pasos.map((pid) => {
                  const paso = PASOS.find((p) => p.id === pid)!;
                  const done = completados.includes(pid);
                  return (
                    <Link
                      key={pid}
                      href={`/paso/${pid}`}
                      className="flex items-center gap-4 bg-white border rounded-lg p-4 mb-2 hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          done
                            ? "bg-alico-teal text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {done ? (
                          <svg
                            className="w-4 h-4"
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
                        ) : (
                          <span className="text-sm font-bold">{pid}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-alico-dark">
                          {paso.titulo}
                        </h4>
                        <p className="text-xs text-alico-gray">
                          {paso.subtitulo}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          done
                            ? "bg-teal-100 text-teal-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {done ? "Completado" : "Pendiente"}
                      </span>
                    </Link>
                  );
                })}
              </motion.div>
            ))}
          </motion.div>

          {/* Acciones */}
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 border rounded-xl p-6 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-bold text-alico-dark mb-4">
              Acciones
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportarPDF}
                className="bg-alico-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors"
              >
                Exportar Reporte (Imprimir / PDF)
              </button>
              <button
                onClick={exportarJSON}
                className="bg-alico-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
              >
                Exportar Datos (JSON)
              </button>
              <button
                onClick={exportarCSV}
                className="bg-white border border-alico-teal text-alico-teal px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-50 transition-colors"
              >
                Exportar Diagnóstico (CSV)
              </button>
              <button
                onClick={handleImport}
                className="bg-white border border-alico-dark text-alico-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Importar Datos
              </button>
              <button
                onClick={() => setShowReset(true)}
                className="bg-white border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Reiniciar Todo
              </button>
            </div>
            {showReset && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 mb-3">
                  Esta acción eliminará todos los datos guardados. ¿Está seguro?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                  >
                    Sí, reiniciar todo
                  </button>
                  <button
                    onClick={() => setShowReset(false)}
                    className="bg-white border text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="text-center text-xs text-alico-gray mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Última actualización:{" "}
            {new Date(data.ultimaActualizacion).toLocaleString("es-CO")}
          </motion.div>
        </div>
      </main>
    </>
  );
}
