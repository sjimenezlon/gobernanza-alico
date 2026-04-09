"use client";

import { useState, useEffect } from "react";
import { getData, saveData, type KPI } from "@/lib/store";
import { generarKPIsExcel } from "@/lib/generarDocumentos";
import AnimatedSection from "@/components/AnimatedSection";

const KPI_SUGERIDOS: KPI[] = [
  {
    nombre: "Índice de Calidad de Datos (por dominio)",
    descripcion:
      "Mide el porcentaje de registros que cumplen las reglas de calidad definidas (completitud, precisión, consistencia) en cada dominio de datos.",
    metaInicial: ">= 80% en el dominio piloto",
    frecuencia: "mensual",
    responsable: "Data Steward del dominio",
    dominio: "Todos",
  },
  {
    nombre: "Tasa de Duplicados en Datos Maestros",
    descripcion:
      "Porcentaje de registros duplicados detectados en las entidades maestras (clientes, productos, proveedores) respecto al total de registros.",
    metaInicial: "< 5% de duplicados",
    frecuencia: "mensual",
    responsable: "Data Steward de cada dominio",
    dominio: "Cliente, Producto, Proveedor",
  },
  {
    nombre: "Tiempo de Resolución de Incidentes de Datos",
    descripcion:
      "Tiempo promedio desde la detección de un incidente de calidad de datos hasta su corrección y cierre.",
    metaInicial: "<= 5 días hábiles",
    frecuencia: "mensual",
    responsable: "Comité Ejecutivo de Gobernanza",
    dominio: "Todos",
  },
  {
    nombre: "Porcentaje de Datos con Propietario Asignado",
    descripcion:
      "Proporción de activos de datos críticos que tienen un Data Owner formalmente asignado y documentado.",
    metaInicial: "100% en dominios priorizados",
    frecuencia: "trimestral",
    responsable: "Consejo de Gobernanza",
    dominio: "Todos",
  },
  {
    nombre: "Cumplimiento de Políticas de Gobernanza",
    descripcion:
      "Porcentaje de áreas y procesos que cumplen con las políticas de gobernanza de datos aprobadas.",
    metaInicial: ">= 70% en Fase 1",
    frecuencia: "trimestral",
    responsable: "Consejo de Gobernanza",
    dominio: "Todos",
  },
  {
    nombre: "Disponibilidad de Datos Críticos",
    descripcion:
      "Porcentaje de tiempo en que los datos críticos están accesibles y disponibles para los usuarios autorizados.",
    metaInicial: ">= 95%",
    frecuencia: "mensual",
    responsable: "TI / Data Steward",
    dominio: "Produccion, Cadena de Suministro",
  },
  {
    nombre: "Nivel de Satisfacción de Usuarios con Datos",
    descripcion:
      "Resultado de encuesta interna que evalúa la percepción de los usuarios sobre la calidad, accesibilidad y utilidad de los datos.",
    metaInicial: ">= 3.5 / 5.0",
    frecuencia: "semestral",
    responsable: "Comité Ejecutivo de Gobernanza",
    dominio: "Todos",
  },
  {
    nombre: "Porcentaje de Procesos Documentados",
    descripcion:
      "Proporción de procesos de gestión de datos que cuentan con documentación formal (procedimientos, flujos, políticas).",
    metaInicial: ">= 60% en Fase 1",
    frecuencia: "trimestral",
    responsable: "PMO / Consejo de Gobernanza",
    dominio: "Todos",
  },
];

const FRECUENCIAS = ["mensual", "trimestral", "semestral"];

const DOMINIOS_OPCIONES = [
  "Todos",
  "Cliente",
  "Producto",
  "Proveedor",
  "Financiero",
  "Produccion",
  "Cadena de Suministro",
];

function kpiVacio(): KPI {
  return {
    nombre: "",
    descripcion: "",
    metaInicial: "",
    frecuencia: "mensual",
    responsable: "",
    dominio: "",
  };
}

export default function Paso8KPIs() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [guardado, setGuardado] = useState(false);
  const [editandoIdx, setEditandoIdx] = useState<number | null>(null);

  useEffect(() => {
    const data = getData();
    if (data.kpis.length > 0) {
      setKpis(data.kpis);
    } else {
      setKpis(KPI_SUGERIDOS);
    }
  }, []);

  const guardar = () => {
    saveData({ kpis });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const actualizarKPI = (idx: number, campo: keyof KPI, valor: string) => {
    setGuardado(false);
    setKpis((prev) =>
      prev.map((k, i) => (i === idx ? { ...k, [campo]: valor } : k))
    );
  };

  const agregarKPI = () => {
    setKpis((prev) => [...prev, kpiVacio()]);
    setEditandoIdx(kpis.length);
  };

  const eliminarKPI = (idx: number) => {
    setGuardado(false);
    setKpis((prev) => prev.filter((_, i) => i !== idx));
    setEditandoIdx(null);
  };

  return (
    <div className="space-y-6">
      {/* Introducción */}
      <AnimatedSection>
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-bold text-alico-dark mb-2">
            Indicadores Clave de Desempeño (KPIs)
          </h2>
          <p className="text-sm text-alico-gray">
            Los KPIs permiten medir el progreso y la efectividad del modelo de
            gobernanza de datos. Se sugieren indicadores alineados con los marcos
            ISO/IEC 38505 y DAMA-DMBOK2. Puede editar los sugeridos o agregar
            nuevos indicadores propios.
          </p>
        </div>
      </AnimatedSection>

      {/* Lista de KPIs */}
      <AnimatedSection delay={0.1}>
        <div className="space-y-4">
          {kpis.map((kpi, idx) => {
            const expandido = editandoIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border rounded-xl overflow-hidden"
              >
                {/* Cabecera */}
                <button
                  onClick={() => setEditandoIdx(expandido ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-alico-dark text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-alico-dark">
                        {kpi.nombre || "(Sin nombre)"}
                      </p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded">
                          {kpi.frecuencia}
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {kpi.dominio || "Sin dominio"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-alico-gray text-sm">
                    {expandido ? "Contraer" : "Editar"}
                  </span>
                </button>

                {/* Contenido expandido */}
                {expandido && (
                  <div className="border-t p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Nombre del KPI
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                        value={kpi.nombre}
                        onChange={(e) =>
                          actualizarKPI(idx, "nombre", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Descripción
                      </label>
                      <textarea
                        className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                        rows={3}
                        value={kpi.descripcion}
                        onChange={(e) =>
                          actualizarKPI(idx, "descripcion", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Meta Inicial
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={kpi.metaInicial}
                          onChange={(e) =>
                            actualizarKPI(idx, "metaInicial", e.target.value)
                          }
                          placeholder="Ej: >= 80%"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Frecuencia de Medición
                        </label>
                        <select
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={kpi.frecuencia}
                          onChange={(e) =>
                            actualizarKPI(idx, "frecuencia", e.target.value)
                          }
                        >
                          {FRECUENCIAS.map((f) => (
                            <option key={f} value={f}>
                              {f.charAt(0).toUpperCase() + f.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Responsable
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={kpi.responsable}
                          onChange={(e) =>
                            actualizarKPI(idx, "responsable", e.target.value)
                          }
                          placeholder="Ej: Data Steward del dominio"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Dominio
                        </label>
                        <select
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={
                            DOMINIOS_OPCIONES.includes(kpi.dominio)
                              ? kpi.dominio
                              : ""
                          }
                          onChange={(e) =>
                            actualizarKPI(idx, "dominio", e.target.value)
                          }
                        >
                          <option value="">Seleccionar dominio</option>
                          {DOMINIOS_OPCIONES.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => eliminarKPI(idx)}
                        className="text-sm text-alico-red hover:underline"
                      >
                        Eliminar este KPI
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* Agregar KPI */}
      <AnimatedSection delay={0.2}>
        <button
          onClick={agregarKPI}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm text-alico-gray hover:border-alico-teal hover:text-alico-teal transition-colors"
        >
          + Agregar KPI personalizado
        </button>
      </AnimatedSection>

      {/* Resumen */}
      <AnimatedSection delay={0.3}>
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-bold text-alico-dark mb-3">Resumen de KPIs</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-700">{kpis.length}</div>
              <div className="text-xs text-blue-600">Total KPIs</div>
            </div>
            <div className="bg-teal-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-teal-700">
                {kpis.filter((k) => k.frecuencia === "mensual").length}
              </div>
              <div className="text-xs text-teal-600">Medición Mensual</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-amber-700">
                {new Set(kpis.map((k) => k.dominio).filter(Boolean)).size}
              </div>
              <div className="text-xs text-amber-600">Dominios Cubiertos</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Guardar */}
      <AnimatedSection delay={0.4}>
        <div className="flex items-center justify-between bg-white border rounded-xl p-4 flex-wrap gap-3">
          <div className="text-sm text-alico-gray">
            {kpis.length} indicadores definidos
          </div>
          <div className="flex gap-2">
            <button
              onClick={generarKPIsExcel}
              className="bg-white border border-alico-dark text-alico-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
              Excel/CSV
            </button>
            <button
              onClick={guardar}
              className="bg-alico-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              {guardado ? "¡Guardado!" : "Guardar KPIs"}
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
