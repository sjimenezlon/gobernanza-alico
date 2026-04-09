"use client";

import { useState, useEffect } from "react";
import { getData, saveData, type RACIEntry } from "@/lib/store";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const PROCESOS_DEFAULT: RACIEntry[] = [
  {
    proceso: "Definición de estándares de calidad de datos",
    responsable: "Data Steward",
    aprobador: "Data Owner",
    consultado: "Comité Ejecutivo de Datos",
    informado: "Usuarios de negocio",
  },
  {
    proceso: "Aprobación de cambios en datos maestros",
    responsable: "Data Steward",
    aprobador: "Data Owner",
    consultado: "TI / Administrador de sistemas",
    informado: "Usuarios afectados",
  },
  {
    proceso: "Monitoreo de calidad de datos",
    responsable: "Data Steward",
    aprobador: "Data Owner",
    consultado: "TI",
    informado: "Comité Ejecutivo de Datos",
  },
  {
    proceso: "Gestión de accesos y seguridad de datos",
    responsable: "TI / Seguridad",
    aprobador: "Data Owner",
    consultado: "Jurídica",
    informado: "Consejo de Gobernanza",
  },
  {
    proceso: "Resolución de incidentes de datos",
    responsable: "Data Steward",
    aprobador: "Data Owner",
    consultado: "TI",
    informado: "Comité Ejecutivo de Datos",
  },
  {
    proceso: "Auditoría de cumplimiento de políticas",
    responsable: "Comité Ejecutivo de Datos",
    aprobador: "Consejo de Gobernanza",
    consultado: "Data Owners",
    informado: "Gerencia General",
  },
  {
    proceso: "Evaluación de nuevas fuentes de datos",
    responsable: "Data Owner",
    aprobador: "Comité Ejecutivo de Datos",
    consultado: "TI / Data Steward",
    informado: "Consejo de Gobernanza",
  },
  {
    proceso: "Capacitación en gestión de datos",
    responsable: "Comité Ejecutivo de Datos",
    aprobador: "Consejo de Gobernanza",
    consultado: "Gestión Humana",
    informado: "Todas las áreas",
  },
];

export default function Paso6RACI() {
  const [raci, setRaci] = useState<RACIEntry[]>([]);
  const [guardado, setGuardado] = useState(false);
  const [nuevoProceso, setNuevoProceso] = useState("");

  useEffect(() => {
    const data = getData();
    if (data.raci.length > 0) {
      setRaci(data.raci);
    } else {
      setRaci(PROCESOS_DEFAULT);
    }
  }, []);

  function handleChange(
    idx: number,
    campo: keyof RACIEntry,
    valor: string
  ) {
    setRaci((prev) => {
      const copia = [...prev];
      copia[idx] = { ...copia[idx], [campo]: valor };
      return copia;
    });
    setGuardado(false);
  }

  function agregarProceso() {
    const nombre = nuevoProceso.trim();
    if (!nombre) return;
    setRaci((prev) => [
      ...prev,
      {
        proceso: nombre,
        responsable: "",
        aprobador: "",
        consultado: "",
        informado: "",
      },
    ]);
    setNuevoProceso("");
    setGuardado(false);
  }

  function eliminarProceso(idx: number) {
    setRaci((prev) => prev.filter((_, i) => i !== idx));
    setGuardado(false);
  }

  function guardar() {
    saveData({ raci });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Introducción */}
      <AnimatedSection delay={0.1}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-3">
            Matriz RACI de Gobernanza de Datos
          </h2>
          <p className="text-alico-gray mb-4">
            La Matriz RACI define con claridad quién es Responsable de ejecutar
            cada proceso, quién Aprueba (tiene la autoridad final), quién debe
            ser Consultado antes de tomar decisiones y quién debe ser Informado
            sobre los resultados. Esto elimina ambigüedades y asegura la
            rendición de cuentas.
          </p>
        </section>
      </AnimatedSection>

      {/* Leyenda RACI */}
      <AnimatedSection delay={0.2}>
        <section className="bg-white border rounded-xl p-5">
          <h3 className="text-sm font-bold text-alico-dark mb-3">
            Referencia RACI
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-3"
            >
              <p className="font-bold text-blue-800 text-sm">R - Responsable</p>
              <p className="text-xs text-blue-700 mt-1">
                Ejecuta la actividad. Puede haber múltiples R.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="bg-teal-50 border border-teal-200 rounded-lg p-3"
            >
              <p className="font-bold text-teal-800 text-sm">A - Aprobador</p>
              <p className="text-xs text-teal-700 mt-1">
                Tiene la autoridad final. Solo debe haber un A.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.45 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-3"
            >
              <p className="font-bold text-amber-800 text-sm">C - Consultado</p>
              <p className="text-xs text-amber-700 mt-1">
                Se le pide opinión antes de actuar. Comunicación bidireccional.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3"
            >
              <p className="font-bold text-gray-800 text-sm">I - Informado</p>
              <p className="text-xs text-gray-600 mt-1">
                Se le notifica después de la decisión. Comunicación unidireccional.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Tabla RACI */}
      <AnimatedSection delay={0.3}>
        <section className="space-y-4">
          {/* Vista de escritorio como tabla */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl border overflow-hidden">
              <thead>
                <tr className="bg-alico-dark text-white">
                  <th className="text-left p-3 text-sm font-medium w-1/5">
                    Proceso
                  </th>
                  <th className="text-left p-3 text-sm font-medium w-1/5">
                    Responsable (R)
                  </th>
                  <th className="text-left p-3 text-sm font-medium w-1/5">
                    Aprobador (A)
                  </th>
                  <th className="text-left p-3 text-sm font-medium w-1/5">
                    Consultado (C)
                  </th>
                  <th className="text-left p-3 text-sm font-medium w-1/5">
                    Informado (I)
                  </th>
                  <th className="p-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {raci.map((entry, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-2">
                      <input
                        type="text"
                        value={entry.proceso}
                        onChange={(e) =>
                          handleChange(idx, "proceso", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded p-2 text-sm text-alico-dark font-medium focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={entry.responsable}
                        onChange={(e) =>
                          handleChange(idx, "responsable", e.target.value)
                        }
                        className="w-full border border-blue-200 rounded p-2 text-sm text-alico-dark bg-blue-50/50 focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={entry.aprobador}
                        onChange={(e) =>
                          handleChange(idx, "aprobador", e.target.value)
                        }
                        className="w-full border border-teal-200 rounded p-2 text-sm text-alico-dark bg-teal-50/50 focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={entry.consultado}
                        onChange={(e) =>
                          handleChange(idx, "consultado", e.target.value)
                        }
                        className="w-full border border-amber-200 rounded p-2 text-sm text-alico-dark bg-amber-50/50 focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={entry.informado}
                        onChange={(e) =>
                          handleChange(idx, "informado", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded p-2 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => eliminarProceso(idx)}
                        className="text-alico-gray hover:text-red-600 transition-colors"
                        title="Eliminar proceso"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista móvil como tarjetas */}
          <div className="lg:hidden space-y-4">
            {raci.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border rounded-xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-alico-gray mb-1">
                      Proceso
                    </label>
                    <input
                      type="text"
                      value={entry.proceso}
                      onChange={(e) =>
                        handleChange(idx, "proceso", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded p-2 text-sm text-alico-dark font-medium focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => eliminarProceso(idx)}
                    className="ml-2 mt-5 text-alico-gray hover:text-red-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-blue-700 mb-1">
                      Responsable (R)
                    </label>
                    <input
                      type="text"
                      value={entry.responsable}
                      onChange={(e) =>
                        handleChange(idx, "responsable", e.target.value)
                      }
                      className="w-full border border-blue-200 rounded p-2 text-sm text-alico-dark bg-blue-50/50 focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-teal-700 mb-1">
                      Aprobador (A)
                    </label>
                    <input
                      type="text"
                      value={entry.aprobador}
                      onChange={(e) =>
                        handleChange(idx, "aprobador", e.target.value)
                      }
                      className="w-full border border-teal-200 rounded p-2 text-sm text-alico-dark bg-teal-50/50 focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-amber-700 mb-1">
                      Consultado (C)
                    </label>
                    <input
                      type="text"
                      value={entry.consultado}
                      onChange={(e) =>
                        handleChange(idx, "consultado", e.target.value)
                      }
                      className="w-full border border-amber-200 rounded p-2 text-sm text-alico-dark bg-amber-50/50 focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Informado (I)
                    </label>
                    <input
                      type="text"
                      value={entry.informado}
                      onChange={(e) =>
                        handleChange(idx, "informado", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded p-2 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Agregar proceso */}
      <AnimatedSection delay={0.4}>
        <section className="bg-white border rounded-xl p-5">
          <h3 className="text-sm font-bold text-alico-dark mb-3">
            Agregar nuevo proceso
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={nuevoProceso}
              onChange={(e) => setNuevoProceso(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && agregarProceso()}
              placeholder="Nombre del nuevo proceso de gobernanza..."
              className="flex-1 border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
            />
            <button
              type="button"
              onClick={agregarProceso}
              className="px-5 py-3 bg-alico-dark text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors"
            >
              Agregar
            </button>
          </div>
        </section>
      </AnimatedSection>

      {/* Botón Guardar */}
      <AnimatedSection delay={0.5}>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={guardar}
            className="px-6 py-3 bg-alico-teal text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Guardar Matriz RACI
          </button>
          <AnimatePresence>
            {guardado && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm text-teal-700 font-medium"
              >
                Datos guardados correctamente.
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-800">
            <strong>Siguiente paso:</strong> Con la matriz RACI definida,
            avance al Paso 7 para redactar las políticas de gobernanza de
            datos que regirán la organización.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
