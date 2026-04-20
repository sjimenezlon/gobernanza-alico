"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EJECUCION_POR_PASO, ItemEjecucion } from "@/lib/ejecucion";
import { getData, saveData, EjecucionEstado } from "@/lib/store";

interface Props {
  pasoId: number;
}

const ESTADO_LABEL: Record<EjecucionEstado["estado"], string> = {
  pendiente: "Pendiente",
  en_curso: "En curso",
  completado: "Completado",
};

const ESTADO_COLOR: Record<EjecucionEstado["estado"], string> = {
  pendiente: "bg-gray-100 text-gray-700 border-gray-300",
  en_curso: "bg-amber-50 text-amber-800 border-amber-300",
  completado: "bg-teal-50 text-teal-800 border-teal-300",
};

export default function EjecucionAlico({ pasoId }: Props) {
  const items = EJECUCION_POR_PASO[pasoId];
  const [estados, setEstados] = useState<Record<string, EjecucionEstado>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = getData();
    setEstados(data.ejecucion ?? {});
  }, []);

  if (!items || items.length === 0) return null;

  const actualizarItem = (
    itemId: string,
    cambios: Partial<EjecucionEstado>,
  ) => {
    const actual: EjecucionEstado = estados[itemId] ?? { estado: "pendiente" };
    const nuevo: EjecucionEstado = { ...actual, ...cambios };
    const siguienteEstados = { ...estados, [itemId]: nuevo };
    setEstados(siguienteEstados);
    saveData({ ejecucion: siguienteEstados });
  };

  const descargarPlantilla = (item: ItemEjecucion) => {
    if (!item.plantilla) return;
    const blob = new Blob([item.plantilla.contenido], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.plantilla.nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const completados = items.filter(
    (it) => estados[it.id]?.estado === "completado",
  ).length;
  const progreso = Math.round((completados / items.length) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-12 border-2 border-alico-teal/30 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-teal-50/40 shadow-sm"
    >
      <div className="bg-gradient-to-r from-alico-dark to-alico-teal text-white px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span>🛠️</span> Ejecución Alico
            </h2>
            <p className="text-sm text-teal-100">
              Acciones concretas que el equipo Alico debe ejecutar en este paso
            </p>
          </div>
          {mounted && (
            <div className="text-right">
              <div className="text-xs text-teal-100">
                Progreso: {completados} de {items.length}
              </div>
              <div className="w-40 bg-white/20 rounded-full h-2 mt-1">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item, i) => {
          const estadoItem: EjecucionEstado = estados[item.id] ?? {
            estado: "pendiente",
          };
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="p-5 hover:bg-white/60 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-alico-teal/10 text-alico-teal font-bold flex items-center justify-center text-sm">
                  {item.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <h3 className="font-bold text-alico-dark">{item.titulo}</h3>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        ESTADO_COLOR[estadoItem.estado]
                      }`}
                    >
                      {ESTADO_LABEL[estadoItem.estado]}
                    </span>
                  </div>
                  <p className="text-sm text-alico-gray mb-3">
                    {item.descripcion}
                  </p>

                  <div className="grid md:grid-cols-3 gap-3 text-xs mb-3">
                    <div className="bg-white border rounded-lg p-2.5">
                      <div className="text-alico-gray/70 uppercase tracking-wide text-[10px] mb-0.5">
                        Responsable
                      </div>
                      <div className="font-medium text-alico-dark">
                        {item.responsable}
                      </div>
                    </div>
                    <div className="bg-white border rounded-lg p-2.5">
                      <div className="text-alico-gray/70 uppercase tracking-wide text-[10px] mb-0.5">
                        Entregable
                      </div>
                      <div className="font-medium text-alico-dark">
                        {item.entregable}
                      </div>
                    </div>
                    <div className="bg-white border rounded-lg p-2.5">
                      <div className="text-alico-gray/70 uppercase tracking-wide text-[10px] mb-0.5">
                        Duración estimada
                      </div>
                      <div className="font-medium text-alico-dark">
                        {item.duracion}
                      </div>
                    </div>
                  </div>

                  {mounted && (
                    <div className="grid md:grid-cols-3 gap-3 text-xs mb-3">
                      <div>
                        <label className="block text-alico-gray/70 uppercase tracking-wide text-[10px] mb-1">
                          Asignado a
                        </label>
                        <input
                          type="text"
                          value={estadoItem.responsableAsignado ?? ""}
                          onChange={(e) =>
                            actualizarItem(item.id, {
                              responsableAsignado: e.target.value,
                            })
                          }
                          placeholder="Nombre persona Alico"
                          className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-alico-teal focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-alico-gray/70 uppercase tracking-wide text-[10px] mb-1">
                          Fecha objetivo
                        </label>
                        <input
                          type="date"
                          value={estadoItem.fechaObjetivo ?? ""}
                          onChange={(e) =>
                            actualizarItem(item.id, {
                              fechaObjetivo: e.target.value,
                            })
                          }
                          className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-alico-teal focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-alico-gray/70 uppercase tracking-wide text-[10px] mb-1">
                          Estado
                        </label>
                        <select
                          value={estadoItem.estado}
                          onChange={(e) =>
                            actualizarItem(item.id, {
                              estado: e.target
                                .value as EjecucionEstado["estado"],
                            })
                          }
                          className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-alico-teal focus:border-transparent outline-none bg-white"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="en_curso">En curso</option>
                          <option value="completado">Completado</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {item.plantilla && (
                    <button
                      onClick={() => descargarPlantilla(item)}
                      className="inline-flex items-center gap-2 text-xs font-medium text-alico-teal hover:text-alico-dark transition-colors bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Descargar plantilla ({item.plantilla.nombre})
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
