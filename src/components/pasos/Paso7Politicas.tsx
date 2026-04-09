"use client";

import { useState, useEffect } from "react";
import { getData, saveData, type Politica } from "@/lib/store";
import { generarDocumentoPolitica } from "@/lib/generarDocumentos";
import { PLANTILLAS_CONTENIDO } from "@/lib/plantillas-politicas";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const POLITICAS_DEFAULT: Politica[] = [
  {
    titulo: "Política General de Gobernanza de Datos",
    objetivo:
      "Establecer el marco general de gobernanza de datos de Alico Empaques, definiendo los principios, la estructura organizacional y los mecanismos de rendición de cuentas para la gestión de datos como activo estratégico.",
    alcance:
      "Aplica a todas las áreas de la organización, todos los tipos de datos (estructurados y no estructurados) y todos los sistemas de información de Alico Empaques S.A.S BIC.",
    contenido: "",
    responsable: "Consejo de Gobernanza de Datos",
  },
  {
    titulo: "Política de Calidad de Datos",
    objetivo:
      "Definir los estándares, métricas y procesos para asegurar que los datos de la organización cumplan con los niveles de exactitud, completitud, consistencia, oportunidad y validez requeridos por el negocio.",
    alcance:
      "Aplica a todos los dominios de datos críticos: Cliente, Producto, Proveedor, Financiero, Producción y Cadena de Suministro. Incluye datos en sistemas ERP, CRM y sistemas complementarios.",
    contenido: "",
    responsable: "Comité Ejecutivo de Datos",
  },
  {
    titulo: "Política de Seguridad y Privacidad de Datos",
    objetivo:
      "Garantizar la protección de los datos contra accesos no autorizados, pérdida o alteración, cumpliendo con la Ley 1581 de 2012 de protección de datos personales y los requisitos de seguridad del Operador Económico Autorizado (OEA).",
    alcance:
      "Aplica a todos los datos personales de empleados, clientes y proveedores, datos confidenciales de negocio, datos de comercio exterior y toda información sujeta a regulación.",
    contenido: "",
    responsable: "Director de TI / Jurídica",
  },
  {
    titulo: "Política de Acceso y Uso de Datos",
    objetivo:
      "Regular quién puede acceder a qué datos, bajo qué condiciones y con qué propósito, asegurando el principio de mínimo privilegio y la trazabilidad de accesos.",
    alcance:
      "Aplica a todos los usuarios internos y externos que accedan a los sistemas de información de Alico Empaques. Cubre accesos a bases de datos, reportes, dashboards y archivos compartidos.",
    contenido: "",
    responsable: "Data Owners / TI",
  },
  {
    titulo: "Política de Gestión de Datos Maestros",
    objetivo:
      "Establecer las reglas para la creación, modificación, desactivación y mantenimiento de datos maestros (clientes, productos, proveedores, materiales), asegurando una fuente única de verdad.",
    alcance:
      "Aplica a los datos maestros de todos los dominios, con énfasis en los registros maestros del ERP y sistemas conectados. Incluye reglas de validación, duplicados y ciclo de vida.",
    contenido: "",
    responsable: "Data Owners de cada dominio",
  },
  {
    titulo: "Política de IA y Analítica",
    objetivo:
      "Guiar el diseño, desarrollo, despliegue y monitoreo de soluciones de inteligencia artificial y analítica avanzada de manera ética, transparente y segura, alineada con el NIST AI Risk Management Framework.",
    alcance:
      "Aplica a todos los proyectos actuales y futuros de IA, machine learning, automatización inteligente y analítica avanzada en Alico Empaques. Incluye modelos predictivos, asistentes conversacionales y sistemas de recomendación.",
    contenido: "",
    responsable: "Comité Ejecutivo de Datos / Gte. Gestión Tecnológica",
  },
];

export default function Paso7Politicas() {
  const [politicas, setPoliticas] = useState<Politica[]>([]);
  const [expandido, setExpandido] = useState<number | null>(0);
  const [guardado, setGuardado] = useState(false);
  const [nuevaTitulo, setNuevaTitulo] = useState("");

  useEffect(() => {
    const data = getData();
    if (data.politicas.length > 0) {
      setPoliticas(data.politicas);
    } else {
      setPoliticas(POLITICAS_DEFAULT);
    }
  }, []);

  function handleChange(
    idx: number,
    campo: keyof Politica,
    valor: string
  ) {
    setPoliticas((prev) => {
      const copia = [...prev];
      copia[idx] = { ...copia[idx], [campo]: valor };
      return copia;
    });
    setGuardado(false);
  }

  function agregarPolitica() {
    const titulo = nuevaTitulo.trim();
    if (!titulo) return;
    setPoliticas((prev) => [
      ...prev,
      {
        titulo,
        objetivo: "",
        alcance: "",
        contenido: "",
        responsable: "",
      },
    ]);
    setNuevaTitulo("");
    setExpandido(politicas.length);
    setGuardado(false);
  }

  function eliminarPolitica(idx: number) {
    setPoliticas((prev) => prev.filter((_, i) => i !== idx));
    if (expandido === idx) setExpandido(null);
    setGuardado(false);
  }

  function guardar() {
    saveData({ politicas });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Introducción */}
      <AnimatedSection delay={0.1}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-3">
            Políticas de Gobernanza de Datos
          </h2>
          <p className="text-alico-gray mb-4">
            Las políticas formalizan las reglas y principios que rigen la
            gestión de datos en la organización. Cada política tiene un
            objetivo claro, un alcance definido y un contenido que detalla
            las directrices específicas. Estas políticas son aprobadas por el
            Consejo de Gobernanza y comunicadas a toda la organización.
          </p>
        </section>
      </AnimatedSection>

      {/* Guía de escritura */}
      <AnimatedSection delay={0.15}>
        <details className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl overflow-hidden group">
          <summary className="p-5 cursor-pointer hover:bg-amber-50/80 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-amber-800">¿Cómo escribir una buena política? — Guía rápida</span>
            </div>
            <svg className="w-5 h-5 text-amber-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-5 pb-5 space-y-3 text-sm">
            <div className="bg-white/80 rounded-lg p-4">
              <p className="font-bold text-amber-800 mb-2">Estructura recomendada para el contenido:</p>
              <ol className="list-decimal list-inside text-alico-gray space-y-2 ml-1">
                <li><strong>Principios generales</strong> — Declaraciones de valor (ej: &quot;Los datos son un activo corporativo estratégico de Alico Empaques&quot;)</li>
                <li><strong>Directrices específicas</strong> — Reglas concretas (ej: &quot;Todo dato maestro requiere aprobación del Data Owner antes de su modificación&quot;)</li>
                <li><strong>Procedimientos</strong> — El paso a paso para cumplir cada directriz</li>
                <li><strong>Excepciones</strong> — Cuándo y cómo se permiten desviaciones</li>
                <li><strong>Monitoreo y cumplimiento</strong> — Cómo se verificará la adopción</li>
              </ol>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-red-50/80 rounded-lg p-3">
                <p className="font-bold text-red-700 text-xs mb-1">Evite:</p>
                <p className="text-xs text-red-600">&quot;Los datos deben ser gestionados adecuadamente.&quot;</p>
              </div>
              <div className="bg-green-50/80 rounded-lg p-3">
                <p className="font-bold text-green-700 text-xs mb-1">Prefiera:</p>
                <p className="text-xs text-green-600">&quot;El Data Owner revisa estándares de calidad trimestralmente y reporta al Consejo.&quot;</p>
              </div>
            </div>
            <p className="text-xs text-amber-700">
              <strong>Consejo:</strong> No busque perfección en la primera versión. Escriba lo esencial,
              socialice, recoja feedback y refine. Al guardar, podrá descargar cada política como
              documento PDF formal desde la página de Herramientas.
            </p>
          </div>
        </details>
      </AnimatedSection>

      {/* Resumen de políticas */}
      <AnimatedSection delay={0.2}>
        <section className="bg-white border rounded-xl p-5">
          <h3 className="text-sm font-bold text-alico-dark mb-3">
            Políticas definidas: {politicas.length}
          </h3>
          <div className="flex flex-wrap gap-2">
            {politicas.map((pol, idx) => {
              const tieneContenido = pol.contenido.trim().length > 0;
              return (
                <motion.button
                  key={idx}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  onClick={() => setExpandido(expandido === idx ? null : idx)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    tieneContenido
                      ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } ${expandido === idx ? "ring-2 ring-alico-teal" : ""}`}
                >
                  {pol.titulo}
                </motion.button>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      {/* Políticas expandibles */}
      <AnimatedSection delay={0.3}>
        <section className="space-y-4">
          {politicas.map((pol, idx) => {
            const abierto = expandido === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Cabecera */}
                <button
                  type="button"
                  onClick={() => setExpandido(abierto ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-alico-dark rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-alico-dark">
                        {pol.titulo}
                      </h3>
                      <p className="text-xs text-alico-gray mt-0.5">
                        Responsable: {pol.responsable || "Sin asignar"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {pol.contenido.trim().length > 0 && (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                        Redactada
                      </span>
                    )}
                    <motion.svg
                      animate={{ rotate: abierto ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 text-alico-gray"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </div>
                </button>

                {/* Contenido expandible */}
                <AnimatePresence initial={false}>
                  {abierto && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                        {/* Título editable */}
                        <div>
                          <label className="block text-sm font-medium text-alico-dark mb-1">
                            Título de la política
                          </label>
                          <input
                            type="text"
                            value={pol.titulo}
                            onChange={(e) =>
                              handleChange(idx, "titulo", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                          />
                        </div>

                        {/* Objetivo */}
                        <div>
                          <label className="block text-sm font-medium text-alico-dark mb-1">
                            Objetivo
                          </label>
                          <textarea
                            rows={3}
                            value={pol.objetivo}
                            onChange={(e) =>
                              handleChange(idx, "objetivo", e.target.value)
                            }
                            placeholder="Qué busca lograr esta política..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                          />
                        </div>

                        {/* Alcance */}
                        <div>
                          <label className="block text-sm font-medium text-alico-dark mb-1">
                            Alcance
                          </label>
                          <textarea
                            rows={3}
                            value={pol.alcance}
                            onChange={(e) =>
                              handleChange(idx, "alcance", e.target.value)
                            }
                            placeholder="A quiénes, qué datos y qué sistemas aplica esta política..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                          />
                        </div>

                        {/* Contenido principal */}
                        <div>
                          <label className="block text-sm font-medium text-alico-dark mb-1">
                            Contenido de la política
                          </label>
                          <p className="text-xs text-alico-gray mb-2">
                            Redacte aquí las directrices, principios, reglas y
                            procedimientos específicos de la política. Sea lo más
                            concreto posible para facilitar su implementación.
                          </p>
                          {/* Botón cargar plantilla */}
                          {PLANTILLAS_CONTENIDO[pol.titulo] && (
                            <button
                              type="button"
                              onClick={() => {
                                if (pol.contenido.trim().length > 0) {
                                  if (!confirm("Ya tiene contenido redactado. ¿Desea reemplazarlo con la plantilla sugerida?")) return;
                                }
                                handleChange(idx, "contenido", PLANTILLAS_CONTENIDO[pol.titulo]);
                              }}
                              className="mb-3 px-4 py-2 bg-amber-50 border border-amber-300 text-amber-800 text-xs font-medium rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Cargar plantilla sugerida (contenido pre-redactado)
                            </button>
                          )}
                          <textarea
                            rows={10}
                            value={pol.contenido}
                            onChange={(e) =>
                              handleChange(idx, "contenido", e.target.value)
                            }
                            placeholder="Redacte las directrices y reglas específicas de esta política..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent font-mono"
                          />
                        </div>

                        {/* Responsable */}
                        <div>
                          <label className="block text-sm font-medium text-alico-dark mb-1">
                            Responsable de la política
                          </label>
                          <input
                            type="text"
                            value={pol.responsable}
                            onChange={(e) =>
                              handleChange(idx, "responsable", e.target.value)
                            }
                            placeholder="Cargo o área responsable de la política..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                          />
                        </div>

                        {/* Acciones */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => eliminarPolitica(idx)}
                            className="text-sm text-red-600 hover:text-red-800 transition-colors"
                          >
                            Eliminar esta política
                          </button>
                          <button
                            type="button"
                            onClick={() => generarDocumentoPolitica(idx)}
                            className="text-sm font-medium text-alico-teal hover:text-teal-800 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Descargar como PDF
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </section>
      </AnimatedSection>

      {/* Agregar política */}
      <AnimatedSection delay={0.4}>
        <section className="bg-white border rounded-xl p-5">
          <h3 className="text-sm font-bold text-alico-dark mb-3">
            Agregar nueva política
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={nuevaTitulo}
              onChange={(e) => setNuevaTitulo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && agregarPolitica()}
              placeholder="Título de la nueva política..."
              className="flex-1 border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
            />
            <button
              type="button"
              onClick={agregarPolitica}
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
            Guardar Políticas
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
            <strong>Siguiente paso:</strong> Con las políticas redactadas,
            avance al Paso 8 para definir los KPIs y métricas que permitirán
            medir el éxito de la gobernanza de datos.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
