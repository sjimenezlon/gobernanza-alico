"use client";

import { useState, useEffect } from "react";
import { getData, saveData, type Socializacion } from "@/lib/store";

const SOCIALIZACION_SUGERIDA: Socializacion[] = [
  {
    audiencia: "Junta Directiva y Gerencia General",
    mensaje:
      "Presentar el modelo de gobernanza como habilitador estrategico del plan de transformacion digital. Mostrar el diagnostico de madurez, la hoja de ruta y el ROI esperado.",
    formato: "presentacion",
    fecha: "",
    responsable: "Consultor / Gerencia General",
  },
  {
    audiencia: "Data Owners (Propietarios de Datos)",
    mensaje:
      "Capacitar en las responsabilidades del rol de propietario de datos: definir politicas del dominio, aprobar reglas de calidad, escalar incidentes y rendir cuentas sobre el uso de los datos.",
    formato: "taller",
    fecha: "",
    responsable: "Consultor / PMO",
  },
  {
    audiencia: "Data Stewards (Custodios de Datos)",
    mensaje:
      "Formacion practica sobre la ejecucion operativa de la gobernanza: monitoreo de calidad, gestion de metadatos, documentacion de procesos y reporte de metricas.",
    formato: "taller",
    fecha: "",
    responsable: "Consultor / TI",
  },
  {
    audiencia: "Organizacion General (todos los colaboradores)",
    mensaje:
      "Comunicar que es la gobernanza de datos, por que importa para Alico y como impacta el trabajo diario de cada persona. Enfatizar que no es un proyecto de TI sino una iniciativa organizacional.",
    formato: "email",
    fecha: "",
    responsable: "Gerencia General / Comunicaciones",
  },
  {
    audiencia: "Areas Operativas (Produccion, Logistica, Calidad)",
    mensaje:
      "Sesion de preguntas y respuestas para resolver dudas, recoger feedback y asegurar que las areas entienden los cambios practicos en sus procesos de manejo de datos.",
    formato: "reunion",
    fecha: "",
    responsable: "Data Owners / Data Stewards",
  },
];

const FORMATOS = [
  { valor: "presentacion", etiqueta: "Presentacion" },
  { valor: "taller", etiqueta: "Taller" },
  { valor: "email", etiqueta: "Correo Electronico" },
  { valor: "video", etiqueta: "Video" },
  { valor: "reunion", etiqueta: "Reunion" },
];

const ENTREGABLES = [
  {
    titulo: "Politica de Gobernanza de Datos",
    descripcion:
      "Documento formal que establece los principios, roles, procesos y reglas para la gestion de datos como activo organizacional en Alico Empaques.",
  },
  {
    titulo: "Dashboard de Diagnostico de Madurez",
    descripcion:
      "Tablero interactivo con los resultados del diagnostico por dominio, brechas identificadas y prioridades de accion.",
  },
  {
    titulo: "Memoria Tecnica y Reflexiones",
    descripcion:
      "Documento que recoge las decisiones tomadas, lecciones aprendidas, y las reflexiones del equipo durante todo el proceso de consultoria.",
  },
];

const PRINCIPIOS_CAMBIO = [
  {
    titulo: "Patrocinio Ejecutivo Visible",
    descripcion:
      "La Gerencia General y la Junta deben respaldar activamente la iniciativa con comunicaciones, presencia en hitos clave y asignacion de recursos.",
  },
  {
    titulo: "Victorias Tempranas",
    descripcion:
      "Demostrar valor rapido con el piloto en Cadena de Suministro para generar confianza y traccion antes de escalar a otros dominios.",
  },
  {
    titulo: "Comunicacion Continua",
    descripcion:
      "Mantener informada a toda la organizacion sobre avances, logros y proximos pasos. La falta de comunicacion genera resistencia.",
  },
  {
    titulo: "Formacion Progresiva",
    descripcion:
      "Capacitar de forma gradual y practica, empezando por los roles clave (Data Owners y Stewards) y expandiendo segun la madurez.",
  },
  {
    titulo: "Medir y Celebrar",
    descripcion:
      "Usar los KPIs definidos para mostrar progreso tangible. Reconocer publicamente a las areas y personas que adoptan las buenas practicas.",
  },
];

function socializacionVacia(): Socializacion {
  return {
    audiencia: "",
    mensaje: "",
    formato: "presentacion",
    fecha: "",
    responsable: "",
  };
}

export default function Paso10Socializacion() {
  const [actividades, setActividades] = useState<Socializacion[]>([]);
  const [guardado, setGuardado] = useState(false);
  const [editandoIdx, setEditandoIdx] = useState<number | null>(null);

  useEffect(() => {
    const data = getData();
    if (data.socializacion.length > 0) {
      setActividades(data.socializacion);
    } else {
      setActividades(SOCIALIZACION_SUGERIDA);
    }
  }, []);

  const guardar = () => {
    saveData({ socializacion: actividades });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const actualizar = (idx: number, campo: keyof Socializacion, valor: string) => {
    setGuardado(false);
    setActividades((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, [campo]: valor } : a))
    );
  };

  const agregar = () => {
    setActividades((prev) => [...prev, socializacionVacia()]);
    setEditandoIdx(actividades.length);
  };

  const eliminar = (idx: number) => {
    setGuardado(false);
    setActividades((prev) => prev.filter((_, i) => i !== idx));
    setEditandoIdx(null);
  };

  const exportarTodo = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Introduccion */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-bold text-alico-dark mb-2">
          Plan de Socializacion y Gestion del Cambio
        </h2>
        <p className="text-sm text-alico-gray">
          La adopcion del modelo de gobernanza requiere un plan deliberado de
          comunicacion, formacion y gestion del cambio. A continuacion se
          presenta el plan de socializacion sugerido y los principios de cambio
          organizacional que guiaran la implementacion.
        </p>
      </div>

      {/* Principios de Gestion del Cambio */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-bold text-alico-dark mb-4">
          Principios de Gestion del Cambio
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPIOS_CAMBIO.map((p, idx) => (
            <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2 text-sm">
                {p.titulo}
              </h4>
              <p className="text-xs text-blue-700">{p.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actividades de Socializacion */}
      <div>
        <h3 className="font-bold text-alico-dark mb-4">
          Actividades de Socializacion
        </h3>
        <div className="space-y-4">
          {actividades.map((act, idx) => {
            const expandido = editandoIdx === idx;
            const formatoInfo = FORMATOS.find((f) => f.valor === act.formato);
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
                        {act.audiencia || "(Sin audiencia)"}
                      </p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded">
                          {formatoInfo?.etiqueta || act.formato}
                        </span>
                        {act.fecha && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {act.fecha}
                          </span>
                        )}
                        {act.responsable && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {act.responsable}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-alico-gray text-sm flex-shrink-0 ml-2">
                    {expandido ? "Contraer" : "Editar"}
                  </span>
                </button>

                {/* Contenido expandido */}
                {expandido && (
                  <div className="border-t p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Audiencia
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                        value={act.audiencia}
                        onChange={(e) =>
                          actualizar(idx, "audiencia", e.target.value)
                        }
                        placeholder="Ej: Junta Directiva"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Mensaje Clave
                      </label>
                      <textarea
                        className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                        rows={3}
                        value={act.mensaje}
                        onChange={(e) =>
                          actualizar(idx, "mensaje", e.target.value)
                        }
                        placeholder="Mensaje principal para esta audiencia..."
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Formato
                        </label>
                        <select
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={act.formato}
                          onChange={(e) =>
                            actualizar(idx, "formato", e.target.value)
                          }
                        >
                          {FORMATOS.map((f) => (
                            <option key={f.valor} value={f.valor}>
                              {f.etiqueta}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Fecha Propuesta
                        </label>
                        <input
                          type="date"
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={act.fecha}
                          onChange={(e) =>
                            actualizar(idx, "fecha", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Responsable
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={act.responsable}
                          onChange={(e) =>
                            actualizar(idx, "responsable", e.target.value)
                          }
                          placeholder="Ej: Consultor / PMO"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => eliminar(idx)}
                        className="text-sm text-alico-red hover:underline"
                      >
                        Eliminar esta actividad
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agregar actividad */}
      <button
        onClick={agregar}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm text-alico-gray hover:border-alico-teal hover:text-alico-teal transition-colors"
      >
        + Agregar actividad de socializacion
      </button>

      {/* Entregables Finales */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-bold text-alico-dark mb-4">Entregables Finales</h3>
        <p className="text-sm text-alico-gray mb-4">
          Al completar el proceso de consultoria, se entregaran los siguientes
          productos formales a Alico Empaques S.A.S BIC:
        </p>
        <div className="space-y-3">
          {ENTREGABLES.map((e, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-teal-50 border border-teal-200 rounded-lg p-4"
            >
              <span className="bg-teal-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <div>
                <h4 className="font-bold text-teal-800 text-sm">{e.titulo}</h4>
                <p className="text-xs text-teal-700 mt-1">{e.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guardar */}
      <div className="flex items-center justify-between bg-white border rounded-xl p-4">
        <div className="text-sm text-alico-gray">
          {actividades.length} actividades de socializacion
        </div>
        <button
          onClick={guardar}
          className="bg-alico-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          {guardado ? "Guardado!" : "Guardar Plan de Socializacion"}
        </button>
      </div>

      {/* Exportar Todo */}
      <div className="bg-alico-dark rounded-xl p-6 text-center">
        <h3 className="font-bold text-white mb-2">
          Exportar Documento Completo
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          Genera una version imprimible con todos los pasos completados:
          diagnostico, dominios, estructura de gobierno, RACI, politicas, KPIs,
          hoja de ruta y plan de socializacion.
        </p>
        <button
          onClick={exportarTodo}
          className="bg-alico-teal text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors"
        >
          Exportar Todo
        </button>
      </div>
    </div>
  );
}
