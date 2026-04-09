"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { getData } from "@/lib/store";
import { generarInformeDiagnostico, generarDiagnosticoExcel } from "@/lib/generarDocumentos";
import { DOMINIOS_DIAGNOSTICO, PREGUNTAS, NIVELES_MADUREZ } from "@/lib/diagnostico-preguntas";

interface DominioResultado {
  dominio: string;
  promedio: number;
  nivel: string;
  respuestas: number;
  total: number;
  detalles: { pregunta: string; valor: number; comentario?: string }[];
}

/* Animated counter component */
function AnimatedCounter({ value, decimals = 1, className = "" }: { value: number; decimals?: number; className?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(start + (value - start) * eased);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isInView]);

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
    </span>
  );
}

function RadarChart({ datos }: { datos: { label: string; valor: number }[] }) {
  const size = 300;
  const center = size / 2;
  const radius = 120;
  const levels = 5;
  const angleStep = (2 * Math.PI) / datos.length;

  const getPoint = (i: number, level: number) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (radius * level) / levels;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = datos.map((d, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (radius * d.valor) / levels;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  });

  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] mx-auto">
      {/* Grid levels */}
      {Array.from({ length: levels }, (_, l) => {
        const pts = datos.map((_, i) => getPoint(i, l + 1));
        const path =
          pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return (
          <path
            key={l}
            d={path}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={l === levels - 1 ? 1.5 : 0.5}
          />
        );
      })}

      {/* Axes */}
      {datos.map((_, i) => {
        const end = getPoint(i, levels);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="#e2e8f0"
            strokeWidth={0.5}
          />
        );
      })}

      {/* Data area */}
      <path d={dataPath} fill="rgba(44, 122, 123, 0.2)" stroke="#2c7a7b" strokeWidth={2} />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#2c7a7b" />
      ))}

      {/* Labels */}
      {datos.map((d, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const labelR = radius + 24;
        const x = center + labelR * Math.cos(angle);
        const y = center + labelR * Math.sin(angle);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[10px] fill-alico-dark font-medium"
          >
            {d.label}
          </text>
        );
      })}

      {/* Level labels */}
      {Array.from({ length: levels }, (_, l) => (
        <text
          key={l}
          x={center + 4}
          y={center - (radius * (l + 1)) / levels + 3}
          className="text-[8px] fill-gray-400"
        >
          {l + 1}
        </text>
      ))}
    </svg>
  );
}

export default function Paso3Resultados() {
  const [resultados, setResultados] = useState<DominioResultado[]>([]);
  const [mounted, setMounted] = useState(false);
  const [expandido, setExpandido] = useState<string | null>(null);

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
      <AnimatedSection delay={0.1}>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <p className="text-amber-800 text-lg font-medium mb-2">
            No hay datos de diagnóstico aún
          </p>
          <p className="text-amber-700 text-sm">
            Complete primero el Paso 2 (Diagnóstico de Madurez) para ver los
            resultados aquí.
          </p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <div className="space-y-8" id="dashboard-resultados">
      {/* Resumen General */}
      <AnimatedSection delay={0.1}>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            Resumen General de Madurez
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-5xl font-bold ${getTextColor(promedioGeneral)}`}>
                <AnimatedCounter value={promedioGeneral} />
              </div>
              <div className="text-sm text-alico-gray mt-1">de 5.0</div>
              <div className={`text-lg font-medium ${getTextColor(promedioGeneral)} mt-1`}>
                {nivelGeneral}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-alico-dark">
                <AnimatedCounter value={totalRespondidas} decimals={0} />
              </div>
              <div className="text-sm text-alico-gray mt-1">
                de {totalPreguntas} preguntas
              </div>
              <div className="text-sm text-alico-gray mt-1">respondidas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-alico-dark">
                <AnimatedCounter
                  value={resultados.filter((r) => r.promedio > 0 && r.promedio < 3).length}
                  decimals={0}
                />
              </div>
              <div className="text-sm text-alico-gray mt-1">dominios</div>
              <div className="text-sm text-alico-red mt-1">requieren atención</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Radar de madurez */}
      <AnimatedSection delay={0.15}>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-alico-dark mb-4 text-center">
            Mapa de Madurez por Dominio
          </h2>
          <RadarChart
            datos={resultados
              .filter((r) => r.promedio > 0)
              .map((r) => ({ label: r.dominio, valor: r.promedio }))}
          />
          <p className="text-xs text-alico-gray text-center mt-3">
            El área sombreada representa el nivel actual. Un hexágono completo indica madurez nivel 5 en todos los dominios.
          </p>
        </div>
      </AnimatedSection>

      {/* Barras por dominio */}
      <AnimatedSection delay={0.2}>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            Madurez por Dominio
          </h2>
          <div className="space-y-4">
            {resultados
              .filter((r) => r.promedio > 0)
              .sort((a, b) => a.promedio - b.promedio)
              .map((r, idx) => (
                <motion.div
                  key={r.dominio}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-alico-dark text-sm">
                      {r.dominio}
                    </span>
                    <span className={`text-sm font-bold ${getTextColor(r.promedio)}`}>
                      {r.promedio} — {r.nivel}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className={`h-4 rounded-full ${getColor(r.promedio)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(r.promedio / 5) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Detalle por dominio */}
      <AnimatedSection delay={0.3}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-alico-dark">
            Detalle por Dominio
          </h2>
          {resultados
            .filter((r) => r.promedio > 0)
            .map((r) => (
              <motion.div
                key={r.dominio}
                className="bg-white border rounded-xl overflow-hidden shadow-sm"
                layout
              >
                <button
                  onClick={() =>
                    setExpandido(expandido === r.dominio ? null : r.dominio)
                  }
                  className="w-full p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-3 h-3 rounded-full ${getColor(r.promedio)}`}
                      animate={{ scale: expandido === r.dominio ? 1.3 : 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="font-bold text-alico-dark">{r.dominio}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getTextColor(r.promedio)}`}>
                      {r.promedio}/5
                    </span>
                    <motion.span
                      animate={{ rotate: expandido === r.dominio ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-alico-gray text-xs"
                    >
                      &#9660;
                    </motion.span>
                  </div>
                </button>
                <AnimatePresence>
                  {expandido === r.dominio && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t p-4 space-y-3">
                        {r.detalles.map((d, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                          >
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
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
        </div>
      </AnimatedSection>

      {/* Interpretación */}
      <AnimatedSection delay={0.4}>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            Cómo Interpretar los Resultados
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              className="bg-red-50 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h4 className="font-bold text-red-800 mb-2">1-2: Zona Crítica</h4>
              <p className="text-sm text-red-700">
                Los procesos son inexistentes o ad-hoc. Hay riesgo alto de errores,
                duplicados y decisiones basadas en datos incorrectos. Requiere
                acción inmediata.
              </p>
            </motion.div>
            <motion.div
              className="bg-amber-50 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h4 className="font-bold text-amber-800 mb-2">
                3: Zona de Desarrollo
              </h4>
              <p className="text-sm text-amber-700">
                Existen procesos pero no son consistentes. Hay documentación parcial.
                Es el punto de partida típico para formalizar la gobernanza.
              </p>
            </motion.div>
            <motion.div
              className="bg-green-50 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h4 className="font-bold text-green-800 mb-2">
                4-5: Zona de Madurez
              </h4>
              <p className="text-sm text-green-700">
                Procesos documentados, medidos y en mejora continua. Permite avanzar
                hacia analítica avanzada e IA con confianza en los datos.
              </p>
            </motion.div>
            <motion.div
              className="bg-blue-50 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h4 className="font-bold text-blue-800 mb-2">Siguiente Paso</h4>
              <p className="text-sm text-blue-700">
                Use estos resultados para priorizar los dominios en el Paso 4.
                Los dominios con menor madurez y mayor impacto estratégico deben
                atenderse primero.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ¿Qué hacer con estos resultados? */}
      <AnimatedSection delay={0.5}>
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-alico-dark mb-3">
            ¿Qué hacer con estos resultados?
          </h2>
          <div className="grid md:grid-cols-3 gap-3 text-sm mb-4">
            <div className="bg-white/80 rounded-lg p-3">
              <h4 className="font-bold text-alico-dark mb-1">Socializar</h4>
              <p className="text-xs text-alico-gray">
                Descargue el informe PDF y preséntelo a la Gerencia General.
                Los hallazgos por dominio facilitan la conversación con cada gerente de área.
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-3">
              <h4 className="font-bold text-alico-dark mb-1">Priorizar</h4>
              <p className="text-xs text-alico-gray">
                Los dominios con menor madurez y mayor impacto estratégico van primero.
                Avance al Paso 4 para configurar los dominios.
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-3">
              <h4 className="font-bold text-alico-dark mb-1">Medir</h4>
              <p className="text-xs text-alico-gray">
                Exporte a Excel para tener la línea base. Repita el diagnóstico
                en 6 meses para medir progreso.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={generarInformeDiagnostico}
              className="bg-alico-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar Informe PDF
            </motion.button>
            <motion.button
              onClick={generarDiagnosticoExcel}
              className="bg-white border border-alico-dark text-alico-dark px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar Excel/CSV
            </motion.button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
