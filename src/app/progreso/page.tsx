"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { PASOS, FASES } from "@/lib/pasos";
import { getData, resetData, type GobernanzaData } from "@/lib/store";

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
    { label: "Respuestas diagnostico", value: data.diagnostico.length },
    { label: "Dominios configurados", value: data.dominios.length },
    { label: "Procesos RACI", value: data.raci.length },
    { label: "Politicas redactadas", value: data.politicas.length },
    { label: "KPIs definidos", value: data.kpis.length },
    { label: "Hitos en hoja de ruta", value: data.hojaDeRuta.length },
    { label: "Actividades socializacion", value: data.socializacion.length },
  ];

  const handleReset = () => {
    resetData();
    setData(getData());
    setShowReset(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gobernanza-alico-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
          alert("Error al importar el archivo. Verifique que sea un JSON valido.");
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
          <h1 className="text-3xl font-bold text-alico-dark mb-2">
            Mi Progreso
          </h1>
          <p className="text-alico-gray mb-8">
            Resumen del avance en la construccion del modelo de gobernanza
          </p>

          {/* Progreso general */}
          <div className="bg-white border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-alico-dark">
                Progreso General
              </h2>
              <span className="text-2xl font-bold text-alico-teal">
                {porcentaje}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-alico-teal h-4 rounded-full transition-all duration-500"
                style={{ width: `${porcentaje}%` }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-alico-dark">
                    {s.value}
                  </div>
                  <div className="text-xs text-alico-gray">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pasos detalle */}
          <div className="space-y-3 mb-8">
            {FASES.map((fase) => (
              <div key={fase.nombre}>
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
                      className="flex items-center gap-4 bg-white border rounded-lg p-4 mb-2 hover:shadow transition-shadow"
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
              </div>
            ))}
          </div>

          {/* Acciones */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-bold text-alico-dark mb-4">
              Acciones
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExport}
                className="bg-alico-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors"
              >
                Exportar Datos (JSON)
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
                  Esta accion eliminara todos los datos guardados. Esta seguro?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                  >
                    Si, reiniciar todo
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
          </div>

          <div className="text-center text-xs text-alico-gray mt-8">
            Ultima actualizacion:{" "}
            {new Date(data.ultimaActualizacion).toLocaleString("es-CO")}
          </div>
        </div>
      </main>
    </>
  );
}
