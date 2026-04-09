"use client";

import { useState, useEffect } from "react";
import { getData } from "@/lib/store";
import { DOMINIOS_DIAGNOSTICO, PREGUNTAS, NIVELES_MADUREZ } from "@/lib/diagnostico-preguntas";

interface DominioResultado {
  dominio: string;
  promedio: number;
  nivel: string;
  respuestas: number;
  total: number;
  detalles: { pregunta: string; valor: number; comentario?: string }[];
}

export default function Paso3Resultados() {
  const [resultados, setResultados] = useState<DominioResultado[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = getData();
    const res = DOMINIOS_DIAGNOSTICO.map((dom) => {
      const pregs = PREGUNTAS.filter((p) => p.dominio === dom);
      const resps = data.diagnostico.filter((r) => r.dominio === dom);
      const promedio =
        resps.length > 0
          ? resps.reduce((sum, r) => sum + r.valor, 0) / resps.length
          : 0;
      const nivel =
        NIVELES_MADUREZ.find(
          (n) => n.valor === Math.round(promedio)
        )?.etiqueta || "Sin datos";

      return {
        dominio: dom,
        promedio: Math.round(promedio * 10) / 10,
        nivel,
        respuestas: resps.length,
        total: pregs.length,
        detalles: resps.map((r) => {
          const preg = PREGUNTAS.find((p) => p.id === r.pregunta);
          return {
            pregunta: preg?.pregunta || r.pregunta,
            valor: r.valor,
            comentario: r.comentario,
          };
        }),
      };
    });
    setResultados(res);
  }, []);

  if (!mounted) return null;

  const promedioGeneral =
    resultados.length > 0
      ? Math.round(
          (resultados.reduce((s, r) => s + r.promedio, 0) /
            resultados.filter((r) => r.promedio > 0).length) *
            10
        ) / 10
      : 0;

  const nivelGeneral =
    NIVELES_MADUREZ.find((n) => n.valor === Math.round(promedioGeneral))
      ?.etiqueta || "Sin datos";

  const getColor = (val: number) => {
    if (val <= 1.5) return "bg-red-500";
    if (val <= 2.5) return "bg-red-400";
    if (val <= 3.5) return "bg-amber-400";
    if (val <= 4.5) return "bg-green-400";
    return "bg-green-500";
  };

  const getTextColor = (val: number) => {
    if (val <= 2.5) return "text-red-700";
    if (val <= 3.5) return "text-amber-700";
    return "text-green-700";
  };

  const totalRespondidas = resultados.reduce((s, r) => s + r.respuestas, 0);
  const totalPreguntas = resultados.reduce((s, r) => s + r.total, 0);

  if (totalRespondidas === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
        <p className="text-amber-800 text-lg font-medium mb-2">
          No hay datos de diagnostico aun
        </p>
        <p className="text-amber-700 text-sm">
          Complete primero el Paso 2 (Diagnostico de Madurez) para ver los
          resultados aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8" id="dashboard-resultados">
      {/* Resumen General */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold text-alico-dark mb-4">
          Resumen General de Madurez
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-5xl font-bold ${getTextColor(promedioGeneral)}`}>
              {promedioGeneral}
            </div>
            <div className="text-sm text-alico-gray mt-1">de 5.0</div>
            <div className={`text-lg font-medium ${getTextColor(promedioGeneral)} mt-1`}>
              {nivelGeneral}
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-alico-dark">
              {totalRespondidas}
            </div>
            <div className="text-sm text-alico-gray mt-1">
              de {totalPreguntas} preguntas
            </div>
            <div className="text-sm text-alico-gray mt-1">respondidas</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-alico-dark">
              {resultados.filter((r) => r.promedio > 0 && r.promedio < 3).length}
            </div>
            <div className="text-sm text-alico-gray mt-1">dominios</div>
            <div className="text-sm text-alico-red mt-1">requieren atencion</div>
          </div>
        </div>
      </div>

      {/* Barras por dominio */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold text-alico-dark mb-4">
          Madurez por Dominio
        </h2>
        <div className="space-y-4">
          {resultados
            .filter((r) => r.promedio > 0)
            .sort((a, b) => a.promedio - b.promedio)
            .map((r) => (
              <div key={r.dominio}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-alico-dark text-sm">
                    {r.dominio}
                  </span>
                  <span className={`text-sm font-bold ${getTextColor(r.promedio)}`}>
                    {r.promedio} — {r.nivel}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${getColor(r.promedio)}`}
                    style={{ width: `${(r.promedio / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Detalle por dominio */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-alico-dark">
          Detalle por Dominio
        </h2>
        {resultados
          .filter((r) => r.promedio > 0)
          .map((r) => (
            <details key={r.dominio} className="bg-white border rounded-xl overflow-hidden">
              <summary className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getColor(r.promedio)}`} />
                  <span className="font-bold text-alico-dark">{r.dominio}</span>
                </div>
                <span className={`font-bold ${getTextColor(r.promedio)}`}>
                  {r.promedio}/5
                </span>
              </summary>
              <div className="border-t p-4 space-y-3">
                {r.detalles.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className={`text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 ${
                        d.valor <= 2
                          ? "bg-red-100 text-red-700"
                          : d.valor === 3
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {d.valor}
                    </span>
                    <div>
                      <p className="text-sm text-alico-dark">{d.pregunta}</p>
                      {d.comentario && (
                        <p className="text-xs text-alico-gray mt-1 italic">
                          {d.comentario}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
      </div>

      {/* Interpretacion */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold text-alico-dark mb-4">
          Como Interpretar los Resultados
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="font-bold text-red-800 mb-2">1-2: Zona Critica</h4>
            <p className="text-sm text-red-700">
              Los procesos son inexistentes o ad-hoc. Hay riesgo alto de errores,
              duplicados y decisiones basadas en datos incorrectos. Requiere
              accion inmediata.
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-bold text-amber-800 mb-2">
              3: Zona de Desarrollo
            </h4>
            <p className="text-sm text-amber-700">
              Existen procesos pero no son consistentes. Hay documentacion parcial.
              Es el punto de partida tipico para formalizar la gobernanza.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-green-800 mb-2">
              4-5: Zona de Madurez
            </h4>
            <p className="text-sm text-green-700">
              Procesos documentados, medidos y en mejora continua. Permite avanzar
              hacia analitica avanzada e IA con confianza en los datos.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 mb-2">Siguiente Paso</h4>
            <p className="text-sm text-blue-700">
              Use estos resultados para priorizar los dominios en el Paso 4.
              Los dominios con menor madurez y mayor impacto estrategico deben
              atenderse primero.
            </p>
          </div>
        </div>
      </div>

      {/* Boton exportar */}
      <div className="flex justify-center">
        <button
          onClick={() => window.print()}
          className="bg-alico-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
        >
          Exportar Resultados (Imprimir/PDF)
        </button>
      </div>
    </div>
  );
}
