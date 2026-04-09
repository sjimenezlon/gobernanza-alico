"use client";

import { useState, useEffect } from "react";
import { getData, saveData, type Politica } from "@/lib/store";

const POLITICAS_DEFAULT: Politica[] = [
  {
    titulo: "Politica General de Gobernanza de Datos",
    objetivo:
      "Establecer el marco general de gobernanza de datos de Alico Empaques, definiendo los principios, la estructura organizacional y los mecanismos de rendicion de cuentas para la gestion de datos como activo estrategico.",
    alcance:
      "Aplica a todas las areas de la organizacion, todos los tipos de datos (estructurados y no estructurados) y todos los sistemas de informacion de Alico Empaques S.A.S BIC.",
    contenido: "",
    responsable: "Consejo de Gobernanza de Datos",
  },
  {
    titulo: "Politica de Calidad de Datos",
    objetivo:
      "Definir los estandares, metricas y procesos para asegurar que los datos de la organizacion cumplan con los niveles de exactitud, completitud, consistencia, oportunidad y validez requeridos por el negocio.",
    alcance:
      "Aplica a todos los dominios de datos criticos: Cliente, Producto, Proveedor, Financiero, Produccion y Cadena de Suministro. Incluye datos en sistemas ERP, CRM y sistemas complementarios.",
    contenido: "",
    responsable: "Comite Ejecutivo de Datos",
  },
  {
    titulo: "Politica de Seguridad y Privacidad de Datos",
    objetivo:
      "Garantizar la proteccion de los datos contra accesos no autorizados, perdida o alteracion, cumpliendo con la Ley 1581 de 2012 de proteccion de datos personales y los requisitos de seguridad del Operador Economico Autorizado (OEA).",
    alcance:
      "Aplica a todos los datos personales de empleados, clientes y proveedores, datos confidenciales de negocio, datos de comercio exterior y toda informacion sujeta a regulacion.",
    contenido: "",
    responsable: "Director de TI / Juridica",
  },
  {
    titulo: "Politica de Acceso y Uso de Datos",
    objetivo:
      "Regular quien puede acceder a que datos, bajo que condiciones y con que proposito, asegurando el principio de minimo privilegio y la trazabilidad de accesos.",
    alcance:
      "Aplica a todos los usuarios internos y externos que accedan a los sistemas de informacion de Alico Empaques. Cubre accesos a bases de datos, reportes, dashboards y archivos compartidos.",
    contenido: "",
    responsable: "Data Owners / TI",
  },
  {
    titulo: "Politica de Gestion de Datos Maestros",
    objetivo:
      "Establecer las reglas para la creacion, modificacion, desactivacion y mantenimiento de datos maestros (clientes, productos, proveedores, materiales), asegurando una fuente unica de verdad.",
    alcance:
      "Aplica a los datos maestros de todos los dominios, con enfasis en los registros maestros del ERP y sistemas conectados. Incluye reglas de validacion, duplicados y ciclo de vida.",
    contenido: "",
    responsable: "Data Owners de cada dominio",
  },
  {
    titulo: "Politica de IA y Analitica",
    objetivo:
      "Guiar el diseno, desarrollo, despliegue y monitoreo de soluciones de inteligencia artificial y analitica avanzada de manera etica, transparente y segura, alineada con el NIST AI Risk Management Framework.",
    alcance:
      "Aplica a todos los proyectos actuales y futuros de IA, machine learning, automatizacion inteligente y analitica avanzada en Alico Empaques. Incluye modelos predictivos, asistentes conversacionales y sistemas de recomendacion.",
    contenido: "",
    responsable: "Comite Ejecutivo de Datos / Gte. Gestion Tecnologica",
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
      {/* Introduccion */}
      <section>
        <h2 className="text-xl font-bold text-alico-dark mb-3">
          Politicas de Gobernanza de Datos
        </h2>
        <p className="text-alico-gray mb-4">
          Las politicas formalizan las reglas y principios que rigen la
          gestion de datos en la organizacion. Cada politica tiene un
          objetivo claro, un alcance definido y un contenido que detalla
          las directrices especificas. Estas politicas son aprobadas por el
          Consejo de Gobernanza y comunicadas a toda la organizacion.
        </p>
      </section>

      {/* Resumen de politicas */}
      <section className="bg-white border rounded-xl p-5">
        <h3 className="text-sm font-bold text-alico-dark mb-3">
          Politicas definidas: {politicas.length}
        </h3>
        <div className="flex flex-wrap gap-2">
          {politicas.map((pol, idx) => {
            const tieneContenido = pol.contenido.trim().length > 0;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setExpandido(expandido === idx ? null : idx)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  tieneContenido
                    ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${expandido === idx ? "ring-2 ring-alico-teal" : ""}`}
              >
                {pol.titulo}
              </button>
            );
          })}
        </div>
      </section>

      {/* Politicas expandibles */}
      <section className="space-y-4">
        {politicas.map((pol, idx) => {
          const abierto = expandido === idx;

          return (
            <div
              key={idx}
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
                  <svg
                    className={`w-5 h-5 text-alico-gray transition-transform ${
                      abierto ? "rotate-180" : ""
                    }`}
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
                  </svg>
                </div>
              </button>

              {/* Contenido expandible */}
              {abierto && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                  {/* Titulo editable */}
                  <div>
                    <label className="block text-sm font-medium text-alico-dark mb-1">
                      Titulo de la politica
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
                      placeholder="Que busca lograr esta politica..."
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
                      placeholder="A quienes, que datos y que sistemas aplica esta politica..."
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>

                  {/* Contenido principal */}
                  <div>
                    <label className="block text-sm font-medium text-alico-dark mb-1">
                      Contenido de la politica
                    </label>
                    <p className="text-xs text-alico-gray mb-2">
                      Redacte aqui las directrices, principios, reglas y
                      procedimientos especificos de la politica. Sea lo mas
                      concreto posible para facilitar su implementacion.
                    </p>
                    <textarea
                      rows={10}
                      value={pol.contenido}
                      onChange={(e) =>
                        handleChange(idx, "contenido", e.target.value)
                      }
                      placeholder="Redacte las directrices y reglas especificas de esta politica..."
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent font-mono"
                    />
                  </div>

                  {/* Responsable */}
                  <div>
                    <label className="block text-sm font-medium text-alico-dark mb-1">
                      Responsable de la politica
                    </label>
                    <input
                      type="text"
                      value={pol.responsable}
                      onChange={(e) =>
                        handleChange(idx, "responsable", e.target.value)
                      }
                      placeholder="Cargo o area responsable de la politica..."
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>

                  {/* Boton eliminar */}
                  <div className="pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => eliminarPolitica(idx)}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      Eliminar esta politica
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Agregar politica */}
      <section className="bg-white border rounded-xl p-5">
        <h3 className="text-sm font-bold text-alico-dark mb-3">
          Agregar nueva politica
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={nuevaTitulo}
            onChange={(e) => setNuevaTitulo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarPolitica()}
            placeholder="Titulo de la nueva politica..."
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

      {/* Boton Guardar */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={guardar}
          className="px-6 py-3 bg-alico-teal text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          Guardar Politicas
        </button>
        {guardado && (
          <span className="text-sm text-teal-700 font-medium">
            Datos guardados correctamente.
          </span>
        )}
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <p className="text-sm text-teal-800">
          <strong>Siguiente paso:</strong> Con las politicas redactadas,
          avance al Paso 8 para definir los KPIs y metricas que permitiran
          medir el exito de la gobernanza de datos.
        </p>
      </div>
    </div>
  );
}
