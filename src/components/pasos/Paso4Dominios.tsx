"use client";

import { useState, useEffect } from "react";
import { getData, saveData, type DominioConfig } from "@/lib/store";

const DOMINIOS_DEFAULT: DominioConfig[] = [
  {
    nombre: "Cliente",
    propietario: "Gte. Mercadeo y Ventas",
    custodio: "",
    descripcion:
      "Datos maestros y transaccionales de clientes: contactos, contratos, historial de pedidos, preferencias y metricas de satisfaccion.",
    prioridad: "alta",
    riesgos:
      "Perdida de oportunidades comerciales, mala experiencia del cliente, incumplimiento de Ley 1581 de proteccion de datos personales.",
  },
  {
    nombre: "Producto",
    propietario: "Gte. Gestion Tecnologica",
    custodio: "",
    descripcion:
      "Especificaciones tecnicas, BOM, fichas de calidad, datos de desarrollo de producto, cromatografia y resultados de pruebas.",
    prioridad: "alta",
    riesgos:
      "Retrasos en desarrollo de nuevos productos, problemas de calidad, reprocesos costosos.",
  },
  {
    nombre: "Proveedor",
    propietario: "Gte. Abastecimiento",
    custodio: "",
    descripcion:
      "Datos de proveedores, evaluaciones de desempeno, terminos de compra, certificaciones y documentacion de import/export.",
    prioridad: "media",
    riesgos:
      "Interrupciones en cadena de suministro, dependencia de fuentes unicas, problemas de trazabilidad.",
  },
  {
    nombre: "Financiero",
    propietario: "Director Financiero",
    custodio: "",
    descripcion:
      "Datos contables, costos de produccion, presupuestos, facturacion, cuentas por cobrar/pagar y reportes financieros.",
    prioridad: "alta",
    riesgos:
      "Decisiones basadas en datos incorrectos, riesgos de auditoria, problemas con NIIF.",
  },
  {
    nombre: "Produccion",
    propietario: "Gte. Manufactura",
    custodio: "",
    descripcion:
      "Datos de planeacion de produccion, OEE, mantenimiento preventivo y correctivo, consumo de materiales e indicadores de eficiencia.",
    prioridad: "alta",
    riesgos:
      "Baja eficiencia operativa, paradas no planificadas, desperdicio de materiales.",
  },
  {
    nombre: "Cadena de Suministro",
    propietario: "Gte. Abastecimiento",
    custodio: "",
    descripcion:
      "Datos de logistica, inventarios, despachos, import/export, trazabilidad de lotes y cumplimiento OEA.",
    prioridad: "media",
    riesgos:
      "Retrasos en entregas, incumplimiento normativo OEA, falta de trazabilidad.",
  },
];

const COLORES_DOMINIO: Record<string, string> = {
  Cliente: "border-blue-300 bg-blue-50",
  Producto: "border-teal-300 bg-teal-50",
  Proveedor: "border-amber-300 bg-amber-50",
  Financiero: "border-green-300 bg-green-50",
  Produccion: "border-purple-300 bg-purple-50",
  "Cadena de Suministro": "border-red-300 bg-red-50",
};

const BADGE_PRIORIDAD: Record<string, string> = {
  alta: "bg-red-100 text-red-700",
  media: "bg-amber-100 text-amber-700",
  baja: "bg-green-100 text-green-700",
};

export default function Paso4Dominios() {
  const [dominios, setDominios] = useState<DominioConfig[]>([]);
  const [expandido, setExpandido] = useState<number | null>(0);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const data = getData();
    if (data.dominios.length > 0) {
      setDominios(data.dominios);
    } else {
      setDominios(DOMINIOS_DEFAULT);
    }
  }, []);

  function handleChange(
    idx: number,
    campo: keyof DominioConfig,
    valor: string
  ) {
    setDominios((prev) => {
      const copia = [...prev];
      copia[idx] = { ...copia[idx], [campo]: valor };
      return copia;
    });
    setGuardado(false);
  }

  function guardar() {
    saveData({ dominios });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Introduccion */}
      <section>
        <h2 className="text-xl font-bold text-alico-dark mb-3">
          Mapeo y Priorizacion de Dominios de Datos
        </h2>
        <p className="text-alico-gray mb-4">
          Cada dominio de datos agrupa informacion critica para una funcion
          del negocio. Para cada dominio, defina quien es el propietario
          (Data Owner) responsable de la calidad y las politicas, quien es el
          custodio (Data Steward) que ejecuta las actividades del dia a dia,
          y cuales son los principales riesgos si los datos no se gestionan
          adecuadamente.
        </p>
      </section>

      {/* Dominios */}
      <section className="space-y-4">
        {dominios.map((dom, idx) => {
          const abierto = expandido === idx;
          const color = COLORES_DOMINIO[dom.nombre] || "border-gray-300 bg-gray-50";

          return (
            <div
              key={dom.nombre}
              className={`border-2 rounded-xl overflow-hidden ${color}`}
            >
              {/* Cabecera */}
              <button
                type="button"
                onClick={() => setExpandido(abierto ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-alico-dark">
                    {dom.nombre}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      BADGE_PRIORIDAD[dom.prioridad]
                    }`}
                  >
                    Prioridad {dom.prioridad}
                  </span>
                </div>
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
              </button>

              {/* Contenido expandible */}
              {abierto && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Descripcion */}
                  <div>
                    <label className="block text-sm font-medium text-alico-dark mb-1">
                      Descripcion del dominio
                    </label>
                    <textarea
                      rows={3}
                      value={dom.descripcion}
                      onChange={(e) =>
                        handleChange(idx, "descripcion", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Propietario */}
                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Propietario (Data Owner)
                      </label>
                      <input
                        type="text"
                        value={dom.propietario}
                        onChange={(e) =>
                          handleChange(idx, "propietario", e.target.value)
                        }
                        placeholder="Cargo o nombre del propietario"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                      />
                      <p className="text-xs text-alico-gray mt-1">
                        Responsable de las politicas y la calidad de los datos
                        del dominio.
                      </p>
                    </div>

                    {/* Custodio */}
                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Custodio (Data Steward)
                      </label>
                      <input
                        type="text"
                        value={dom.custodio}
                        onChange={(e) =>
                          handleChange(idx, "custodio", e.target.value)
                        }
                        placeholder="Cargo o nombre del custodio"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                      />
                      <p className="text-xs text-alico-gray mt-1">
                        Ejecuta las actividades diarias de gestion y calidad de
                        datos.
                      </p>
                    </div>
                  </div>

                  {/* Prioridad */}
                  <div>
                    <label className="block text-sm font-medium text-alico-dark mb-1">
                      Prioridad
                    </label>
                    <div className="flex gap-3">
                      {(["alta", "media", "baja"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleChange(idx, "prioridad", p)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                            dom.prioridad === p
                              ? p === "alta"
                                ? "border-red-400 bg-red-100 text-red-700"
                                : p === "media"
                                ? "border-amber-400 bg-amber-100 text-amber-700"
                                : "border-green-400 bg-green-100 text-green-700"
                              : "border-gray-200 bg-white text-alico-gray hover:border-gray-300"
                          }`}
                        >
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Riesgos */}
                  <div>
                    <label className="block text-sm font-medium text-alico-dark mb-1">
                      Riesgos principales
                    </label>
                    <textarea
                      rows={3}
                      value={dom.riesgos}
                      onChange={(e) =>
                        handleChange(idx, "riesgos", e.target.value)
                      }
                      placeholder="Riesgos si los datos del dominio no se gestionan adecuadamente..."
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Boton Guardar */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={guardar}
          className="px-6 py-3 bg-alico-teal text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          Guardar Dominios
        </button>
        {guardado && (
          <span className="text-sm text-teal-700 font-medium">
            Datos guardados correctamente.
          </span>
        )}
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <p className="text-sm text-teal-800">
          <strong>Siguiente paso:</strong> Con los dominios definidos,
          avance al Paso 5 para disenar la estructura organizacional de
          gobernanza, asignando roles y responsabilidades concretas.
        </p>
      </div>
    </div>
  );
}
