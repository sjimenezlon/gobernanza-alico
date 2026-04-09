"use client";

import { useState, useEffect } from "react";
import { getData, saveData, type HitoRuta } from "@/lib/store";

const HITOS_SUGERIDOS: HitoRuta[] = [
  // Fase 1
  {
    fase: "Fase 1: Fundacion y Pilotaje",
    titulo: "Constitucion del Consejo de Gobernanza de Datos",
    descripcion:
      "Formalizar el consejo con representantes de Gerencia General, TI, PMO y las areas priorizadas. Definir el charter, frecuencia de sesiones y mecanismos de reporte.",
    meses: "1-2",
    dominios: "Todos",
    estado: "pendiente",
  },
  {
    fase: "Fase 1: Fundacion y Pilotaje",
    titulo: "Designacion de Data Owners y Data Stewards",
    descripcion:
      "Asignar formalmente los roles de propietario y custodio de datos para el dominio piloto, con responsabilidades documentadas.",
    meses: "2-3",
    dominios: "Cadena de Suministro",
    estado: "pendiente",
  },
  {
    fase: "Fase 1: Fundacion y Pilotaje",
    titulo: "Piloto de Gobernanza en Cadena de Suministro",
    descripcion:
      "Implementar el modelo completo de gobernanza en el dominio de Cadena de Suministro: politicas, reglas de calidad, metricas y flujos de escalamiento.",
    meses: "3-6",
    dominios: "Cadena de Suministro",
    estado: "pendiente",
  },
  {
    fase: "Fase 1: Fundacion y Pilotaje",
    titulo: "Definicion de Politicas y Estandares Base",
    descripcion:
      "Redactar y aprobar las politicas fundacionales de gobernanza de datos: clasificacion, calidad, seguridad y ciclo de vida.",
    meses: "2-5",
    dominios: "Todos",
    estado: "pendiente",
  },
  // Fase 2
  {
    fase: "Fase 2: Expansion y Madurez",
    titulo: "Despliegue a Dominio de Producto",
    descripcion:
      "Extender el modelo de gobernanza al dominio de Producto: asignacion de roles, politicas especificas de BOM y especificaciones tecnicas.",
    meses: "7-10",
    dominios: "Producto",
    estado: "pendiente",
  },
  {
    fase: "Fase 2: Expansion y Madurez",
    titulo: "Despliegue a Dominio de Cliente",
    descripcion:
      "Aplicar el modelo al dominio de Cliente: calidad de datos maestros, deduplicacion, reglas de validacion.",
    meses: "9-12",
    dominios: "Cliente",
    estado: "pendiente",
  },
  {
    fase: "Fase 2: Expansion y Madurez",
    titulo: "Implementacion de Catalogo de Datos",
    descripcion:
      "Seleccionar e implementar una herramienta de catalogo de datos para centralizar metadatos, linaje y diccionario de datos.",
    meses: "8-14",
    dominios: "Todos",
    estado: "pendiente",
  },
  {
    fase: "Fase 2: Expansion y Madurez",
    titulo: "Dashboard de Metricas de Gobernanza",
    descripcion:
      "Construir un tablero ejecutivo con los KPIs de gobernanza: calidad, cumplimiento, incidentes y satisfaccion de usuarios.",
    meses: "10-15",
    dominios: "Todos",
    estado: "pendiente",
  },
  // Fase 3
  {
    fase: "Fase 3: Optimizacion e Innovacion",
    titulo: "Gobernanza como Proceso Estandar",
    descripcion:
      "La gobernanza opera de forma integrada en todos los dominios. Procesos maduros con mejora continua, auditorias periodicas y optimizacion basada en datos.",
    meses: "19-24",
    dominios: "Todos",
    estado: "pendiente",
  },
  {
    fase: "Fase 3: Optimizacion e Innovacion",
    titulo: "Iniciativas de IA a Escala",
    descripcion:
      "Con datos gobernados y confiables, lanzar proyectos de IA y analitica avanzada: prediccion de demanda, mantenimiento predictivo, optimizacion de produccion.",
    meses: "20+",
    dominios: "Produccion, Cadena de Suministro",
    estado: "pendiente",
  },
  {
    fase: "Fase 3: Optimizacion e Innovacion",
    titulo: "Medicion de ROI y Valor Generado",
    descripcion:
      "Evaluar el retorno sobre la inversion del programa de gobernanza: reduccion de errores, ahorro en reprocesos, mejora en tiempos de decision.",
    meses: "22+",
    dominios: "Financiero, Todos",
    estado: "pendiente",
  },
];

const FASES = [
  {
    nombre: "Fase 1: Fundacion y Pilotaje",
    periodo: "Meses 1-6",
    color: "blue",
    descripcion:
      "Establecer el Consejo de Gobernanza y lanzar un piloto en el dominio de Cadena de Suministro.",
  },
  {
    nombre: "Fase 2: Expansion y Madurez",
    periodo: "Meses 7-18",
    color: "teal",
    descripcion:
      "Desplegar el modelo a dominios como Producto y Cliente. Implementar herramientas de catalogo de datos.",
  },
  {
    nombre: "Fase 3: Optimizacion e Innovacion",
    periodo: "Meses 19+",
    color: "amber",
    descripcion:
      "La gobernanza opera como proceso estandar. Foco en ROI continuo y lanzamiento de iniciativas de IA a escala.",
  },
];

const ESTADOS: { valor: HitoRuta["estado"]; etiqueta: string }[] = [
  { valor: "pendiente", etiqueta: "Pendiente" },
  { valor: "en_curso", etiqueta: "En Curso" },
  { valor: "completado", etiqueta: "Completado" },
];

function hitoVacio(): HitoRuta {
  return {
    fase: FASES[0].nombre,
    titulo: "",
    descripcion: "",
    meses: "",
    dominios: "",
    estado: "pendiente",
  };
}

function colorEstado(estado: HitoRuta["estado"]) {
  switch (estado) {
    case "pendiente":
      return "bg-gray-100 text-gray-600";
    case "en_curso":
      return "bg-amber-100 text-amber-700";
    case "completado":
      return "bg-green-100 text-green-700";
  }
}

function colorFase(fase: string) {
  if (fase.includes("Fase 1")) return { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", bar: "bg-blue-500" };
  if (fase.includes("Fase 2")) return { bg: "bg-teal-50", border: "border-teal-300", text: "text-teal-700", bar: "bg-teal-500" };
  return { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", bar: "bg-amber-500" };
}

export default function Paso9HojaDeRuta() {
  const [hitos, setHitos] = useState<HitoRuta[]>([]);
  const [guardado, setGuardado] = useState(false);
  const [editandoIdx, setEditandoIdx] = useState<number | null>(null);
  const [faseActiva, setFaseActiva] = useState<string | null>(null);

  useEffect(() => {
    const data = getData();
    if (data.hojaDeRuta.length > 0) {
      setHitos(data.hojaDeRuta);
    } else {
      setHitos(HITOS_SUGERIDOS);
    }
  }, []);

  const guardar = () => {
    saveData({ hojaDeRuta: hitos });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const actualizarHito = (idx: number, campo: keyof HitoRuta, valor: string) => {
    setGuardado(false);
    setHitos((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [campo]: valor } : h))
    );
  };

  const agregarHito = () => {
    setHitos((prev) => [...prev, hitoVacio()]);
    setEditandoIdx(hitos.length);
  };

  const eliminarHito = (idx: number) => {
    setGuardado(false);
    setHitos((prev) => prev.filter((_, i) => i !== idx));
    setEditandoIdx(null);
  };

  const hitosPorFase = (fase: string) => hitos.filter((h) => h.fase === fase);

  return (
    <div className="space-y-6">
      {/* Introduccion */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-bold text-alico-dark mb-2">
          Hoja de Ruta de Implementacion
        </h2>
        <p className="text-sm text-alico-gray">
          La hoja de ruta sigue el enfoque de &quot;olas de valor&quot;: avanzar
          de forma incremental, demostrando resultados en cada fase para
          mantener el impulso y el patrocinio ejecutivo. Edite los hitos
          sugeridos o agregue nuevos segun las prioridades de Alico.
        </p>
      </div>

      {/* Timeline Visual */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-bold text-alico-dark mb-4">Vista General del Timeline</h3>
        <div className="space-y-4">
          {FASES.map((fase) => {
            const hitosF = hitosPorFase(fase.nombre);
            const completados = hitosF.filter((h) => h.estado === "completado").length;
            const enCurso = hitosF.filter((h) => h.estado === "en_curso").length;
            const c = colorFase(fase.nombre);
            return (
              <div key={fase.nombre} className={`border-2 ${c.border} rounded-xl p-5 ${c.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className={`font-bold ${c.text}`}>{fase.nombre}</h4>
                    <p className="text-xs text-alico-gray">{fase.periodo}</p>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-medium text-alico-dark">
                      {hitosF.length} hitos
                    </span>
                    {completados > 0 && (
                      <span className="ml-2 text-green-600">
                        {completados} completados
                      </span>
                    )}
                    {enCurso > 0 && (
                      <span className="ml-2 text-amber-600">
                        {enCurso} en curso
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-alico-gray mb-3">{fase.descripcion}</p>
                {/* Progress bar */}
                <div className="w-full bg-white/60 rounded-full h-2">
                  <div
                    className={`${c.bar} h-2 rounded-full transition-all`}
                    style={{
                      width:
                        hitosF.length > 0
                          ? `${((completados + enCurso * 0.5) / hitosF.length) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtro por fase */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFaseActiva(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            faseActiva === null
              ? "bg-alico-dark text-white"
              : "bg-white border text-alico-gray hover:border-alico-teal"
          }`}
        >
          Todas las Fases
        </button>
        {FASES.map((fase) => (
          <button
            key={fase.nombre}
            onClick={() => setFaseActiva(fase.nombre)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              faseActiva === fase.nombre
                ? "bg-alico-dark text-white"
                : "bg-white border text-alico-gray hover:border-alico-teal"
            }`}
          >
            {fase.nombre.split(":")[0]}
            <span className="ml-2 text-xs opacity-70">
              {hitosPorFase(fase.nombre).length}
            </span>
          </button>
        ))}
      </div>

      {/* Lista de Hitos */}
      <div className="space-y-4">
        {hitos
          .map((hito, idx) => ({ hito, idx }))
          .filter(({ hito }) => !faseActiva || hito.fase === faseActiva)
          .map(({ hito, idx }) => {
            const expandido = editandoIdx === idx;
            const c = colorFase(hito.fase);
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
                    <div className={`w-1.5 h-12 rounded-full ${c.bar} flex-shrink-0`} />
                    <div>
                      <p className="font-medium text-alico-dark">
                        {hito.titulo || "(Sin titulo)"}
                      </p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded ${colorEstado(hito.estado)}`}>
                          {ESTADOS.find((e) => e.valor === hito.estado)?.etiqueta}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          Meses {hito.meses}
                        </span>
                        <span className={`text-xs ${c.bg} ${c.text} px-2 py-0.5 rounded`}>
                          {hito.dominios}
                        </span>
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
                        Fase
                      </label>
                      <select
                        className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                        value={hito.fase}
                        onChange={(e) =>
                          actualizarHito(idx, "fase", e.target.value)
                        }
                      >
                        {FASES.map((f) => (
                          <option key={f.nombre} value={f.nombre}>
                            {f.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Titulo del Hito
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                        value={hito.titulo}
                        onChange={(e) =>
                          actualizarHito(idx, "titulo", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-alico-dark mb-1">
                        Descripcion
                      </label>
                      <textarea
                        className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                        rows={3}
                        value={hito.descripcion}
                        onChange={(e) =>
                          actualizarHito(idx, "descripcion", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Meses
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={hito.meses}
                          onChange={(e) =>
                            actualizarHito(idx, "meses", e.target.value)
                          }
                          placeholder="Ej: 1-3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Dominios
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={hito.dominios}
                          onChange={(e) =>
                            actualizarHito(idx, "dominios", e.target.value)
                          }
                          placeholder="Ej: Cliente, Producto"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-alico-dark mb-1">
                          Estado
                        </label>
                        <select
                          className="w-full border rounded-lg p-2 text-sm focus:border-alico-teal focus:outline-none"
                          value={hito.estado}
                          onChange={(e) =>
                            actualizarHito(idx, "estado", e.target.value)
                          }
                        >
                          {ESTADOS.map((est) => (
                            <option key={est.valor} value={est.valor}>
                              {est.etiqueta}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => eliminarHito(idx)}
                        className="text-sm text-alico-red hover:underline"
                      >
                        Eliminar este hito
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Agregar Hito */}
      <button
        onClick={agregarHito}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm text-alico-gray hover:border-alico-teal hover:text-alico-teal transition-colors"
      >
        + Agregar hito personalizado
      </button>

      {/* Guardar */}
      <div className="flex items-center justify-between bg-white border rounded-xl p-4">
        <div className="text-sm text-alico-gray">
          {hitos.length} hitos en la hoja de ruta
        </div>
        <button
          onClick={guardar}
          className="bg-alico-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          {guardado ? "Guardado!" : "Guardar Hoja de Ruta"}
        </button>
      </div>
    </div>
  );
}
