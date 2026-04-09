"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";
import { getData } from "@/lib/store";
import {
  generarInformeDiagnostico,
  generarFichaDominio,
  generarDocumentoPolitica,
  generarRACIExcel,
  generarKPIsExcel,
  generarDiagnosticoExcel,
  generarHojaRutaExcel,
  generarSocializacionExcel,
  generarActaConsejo,
  exportarPDF,
} from "@/lib/generarDocumentos";
import { exportarJSON } from "@/lib/exportPdf";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function HerramientasPage() {
  const [data, setData] = useState(getData());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setData(getData());
  }, []);

  if (!mounted) return null;

  const tieneDiag = data.diagnostico.length > 0;
  const tieneDominios = data.dominios.length > 0;
  const tieneRaci = data.raci.length > 0;
  const tienePoliticas = data.politicas.length > 0;
  const tieneKpis = data.kpis.length > 0;
  const tieneRuta = data.hojaDeRuta.length > 0;
  const tieneSocial = data.socializacion.length > 0;

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-alico-dark mb-2">
              Herramientas y Documentos
            </h1>
            <p className="text-alico-gray mb-8">
              Descargue informes, plantillas y datos para documentar e implementar
              su modelo de gobernanza. Los documentos se generan con la información
              que ha completado en cada paso.
            </p>
          </motion.div>

          {/* Guía: ¿Qué hacer con la información? */}
          <AnimatedSection delay={0.1}>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-bold text-alico-dark mb-3">
                ¿Qué hacer con la información recopilada?
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-alico-dark mb-2">1. Documentar</h3>
                  <p className="text-alico-gray">
                    Use los documentos PDF y Excel generados para crear el expediente
                    formal de gobernanza. Cada descarga es un entregable listo para
                    presentar al Consejo o archivar como evidencia.
                  </p>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-alico-dark mb-2">2. Socializar</h3>
                  <p className="text-alico-gray">
                    El Informe de Diagnóstico y las Fichas de Dominio son ideales para
                    presentar hallazgos a la gerencia. Las políticas descargadas están
                    listas para revisión y aprobación.
                  </p>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-alico-dark mb-2">3. Implementar</h3>
                  <p className="text-alico-gray">
                    La Matriz RACI en Excel se convierte en su herramienta de seguimiento
                    diario. Los KPIs se trasladan al dashboard de gestión. La Hoja de Ruta
                    guía las reuniones del Consejo.
                  </p>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-alico-dark mb-2">4. Iterar</h3>
                  <p className="text-alico-gray">
                    Repita el diagnóstico cada 6 meses para medir progreso. Actualice las
                    políticas anualmente. Use el Acta de Consejo para registrar cada sesión
                    de gobernanza.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Documentos PDF */}
          <AnimatedSection delay={0.2}>
            <h2 className="text-xl font-bold text-alico-dark mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
              Documentos PDF
            </h2>
            <p className="text-sm text-alico-gray mb-4">
              Se generan en una nueva ventana listos para imprimir o guardar como PDF (Ctrl+P / Cmd+P → &quot;Guardar como PDF&quot;).
            </p>
            <motion.div
              className="grid md:grid-cols-2 gap-4 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-alico-dark mb-1">Informe de Diagnóstico Completo</h3>
                <p className="text-xs text-alico-gray mb-3">
                  Documento ejecutivo con resultados por dominio, barras de madurez,
                  interpretación y próximos pasos recomendados.
                </p>
                <button
                  onClick={generarInformeDiagnostico}
                  disabled={!tieneDiag}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {tieneDiag ? "Generar Informe PDF" : "Complete el diagnóstico primero"}
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-alico-dark mb-1">Documento Completo de Gobernanza</h3>
                <p className="text-xs text-alico-gray mb-3">
                  Todos los pasos consolidados: diagnóstico, dominios, estructura,
                  RACI, políticas, KPIs, hoja de ruta y socialización.
                </p>
                <button
                  onClick={exportarPDF}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  Generar Documento Completo PDF
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-alico-dark mb-1">Acta de Consejo de Gobernanza</h3>
                <p className="text-xs text-alico-gray mb-3">
                  Plantilla formal para registrar reuniones del Consejo: asistentes,
                  agenda, decisiones, KPIs revisados y compromisos.
                </p>
                <button
                  onClick={generarActaConsejo}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  Generar Plantilla de Acta PDF
                </button>
              </motion.div>

              {/* Fichas de dominio */}
              <motion.div variants={fadeUp} className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-alico-dark mb-1">Fichas de Dominio Individuales</h3>
                <p className="text-xs text-alico-gray mb-3">
                  Documento por dominio con propietario, custodio, diagnóstico,
                  riesgos, KPIs y plan de acción.
                </p>
                {tieneDominios ? (
                  <div className="flex flex-wrap gap-2">
                    {data.dominios.map((d) => (
                      <button
                        key={d.nombre}
                        onClick={() => generarFichaDominio(d.nombre)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        {d.nombre}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-alico-gray italic">Complete el Paso 4 primero</p>
                )}
              </motion.div>

              {/* Políticas individuales */}
              <motion.div variants={fadeUp} className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all duration-300 md:col-span-2">
                <h3 className="font-bold text-alico-dark mb-1">Políticas Individuales</h3>
                <p className="text-xs text-alico-gray mb-3">
                  Cada política como documento formal con metadatos, secciones
                  estándar, espacio de firmas e historial de cambios.
                </p>
                {tienePoliticas ? (
                  <div className="flex flex-wrap gap-2">
                    {data.politicas.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => generarDocumentoPolitica(i)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                      >
                        {p.titulo}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-alico-gray italic">Complete el Paso 7 primero</p>
                )}
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Archivos Excel/CSV */}
          <AnimatedSection delay={0.3}>
            <h2 className="text-xl font-bold text-alico-dark mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
              Archivos Excel / CSV
            </h2>
            <p className="text-sm text-alico-gray mb-4">
              Se descargan como CSV compatible con Excel, Google Sheets y LibreOffice.
              Al abrir en Excel, los acentos se muestran correctamente.
            </p>
            <motion.div
              className="grid md:grid-cols-3 gap-4 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                { titulo: "Diagnóstico", fn: generarDiagnosticoExcel, activo: tieneDiag, desc: "Respuestas por dominio con niveles y comentarios" },
                { titulo: "Matriz RACI", fn: generarRACIExcel, activo: tieneRaci, desc: "Procesos con roles R, A, C, I asignados" },
                { titulo: "KPIs", fn: generarKPIsExcel, activo: tieneKpis, desc: "Indicadores con metas, frecuencia y responsables" },
                { titulo: "Hoja de Ruta", fn: generarHojaRutaExcel, activo: tieneRuta, desc: "Hitos por fase con plazos y estados" },
                { titulo: "Socialización", fn: generarSocializacionExcel, activo: tieneSocial, desc: "Actividades con audiencia, formato y fechas" },
                { titulo: "Backup Completo (JSON)", fn: exportarJSON, activo: true, desc: "Todos los datos en formato JSON para respaldo" },
              ].map((item) => (
                <motion.div
                  key={item.titulo}
                  variants={fadeUp}
                  className="bg-white border rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-bold text-alico-dark text-sm mb-1">{item.titulo}</h3>
                  <p className="text-xs text-alico-gray mb-3">{item.desc}</p>
                  <button
                    onClick={item.fn}
                    disabled={!item.activo}
                    className="w-full py-2 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {item.activo ? "Descargar CSV" : "Sin datos aún"}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Guía de escritura */}
          <AnimatedSection delay={0.4}>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-bold text-alico-dark mb-3">
                ¿Cómo comenzar a escribir las políticas?
              </h2>
              <div className="space-y-4 text-sm">
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">Paso 1: Use las plantillas como base</h3>
                  <p className="text-alico-gray">
                    Cada política en el Paso 7 ya tiene un <strong>objetivo y alcance pre-redactado</strong>.
                    No empiece de cero — revise lo sugerido, ajuste al contexto de Alico y expanda.
                  </p>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">Paso 2: Siga la estructura estándar</h3>
                  <p className="text-alico-gray mb-2">Cada política debe contener estas secciones:</p>
                  <ol className="list-decimal list-inside text-alico-gray space-y-1 ml-2">
                    <li><strong>Principios generales</strong> — Los valores que guían la política (ej: los datos son un activo corporativo)</li>
                    <li><strong>Directrices específicas</strong> — Las reglas concretas (ej: todo dato maestro requiere aprobación del Data Owner)</li>
                    <li><strong>Procedimientos</strong> — El paso a paso para cumplir (ej: para solicitar acceso, usar formulario X)</li>
                    <li><strong>Excepciones</strong> — Cuándo y cómo se permiten excepciones</li>
                    <li><strong>Monitoreo</strong> — Cómo se verifica el cumplimiento</li>
                  </ol>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">Paso 3: Use lenguaje claro y accionable</h3>
                  <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-red-50 rounded p-3">
                      <p className="font-bold text-red-700 mb-1">Evite (vago):</p>
                      <p className="text-red-600">&quot;Los datos deben ser gestionados adecuadamente por las áreas correspondientes.&quot;</p>
                    </div>
                    <div className="bg-green-50 rounded p-3">
                      <p className="font-bold text-green-700 mb-1">Prefiera (concreto):</p>
                      <p className="text-green-600">&quot;El Data Owner de cada dominio debe revisar y aprobar los estándares de calidad trimestralmente, reportando al Consejo.&quot;</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">Paso 4: Itere — no busque perfección</h3>
                  <p className="text-alico-gray">
                    La primera versión es un <strong>borrador vivo</strong>. Escriba lo esencial,
                    socialice con los Data Owners, recoja feedback y refine. Es mejor una política
                    imperfecta pero implementada, que una perfecta que nadie usa.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Flujo de trabajo recomendado */}
          <AnimatedSection delay={0.5}>
            <div className="bg-white border rounded-xl p-6 mb-8">
              <h2 className="text-lg font-bold text-alico-dark mb-4">
                Flujo de trabajo recomendado
              </h2>
              <div className="relative">
                {[
                  {
                    paso: "1",
                    titulo: "Completar el diagnóstico",
                    desc: "Llene las 21 preguntas del Paso 2. Involucre a los gerentes de cada área — ellos conocen la realidad operativa.",
                    accion: "Descargar: Informe de Diagnóstico PDF + Excel",
                  },
                  {
                    paso: "2",
                    titulo: "Presentar hallazgos a la gerencia",
                    desc: "Use el Informe PDF en una reunión ejecutiva. Enfoque en: dónde estamos, qué riesgos tenemos, qué priorizar.",
                    accion: "Descargar: Fichas de Dominio para cada gerente",
                  },
                  {
                    paso: "3",
                    titulo: "Definir la estructura y roles",
                    desc: "En taller con líderes, complete los Pasos 4-6. Asigne Data Owners y Stewards. Construya la Matriz RACI.",
                    accion: "Descargar: RACI en Excel para seguimiento",
                  },
                  {
                    paso: "4",
                    titulo: "Redactar las políticas",
                    desc: "El Data Owner de cada dominio lidera la redacción con apoyo del Steward. Use la guía de escritura y las plantillas.",
                    accion: "Descargar: Políticas individuales PDF para revisión",
                  },
                  {
                    paso: "5",
                    titulo: "Aprobar y socializar",
                    desc: "Presente al Consejo para aprobación formal. Ejecute el plan de socialización. Use el Acta para documentar.",
                    accion: "Descargar: Acta de Consejo + Documento Completo",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 mb-6 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-alico-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.paso}
                      </div>
                      {i < 4 && <div className="w-0.5 h-full bg-alico-teal/20 mt-1" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="font-bold text-alico-dark">{item.titulo}</h3>
                      <p className="text-sm text-alico-gray mt-1">{item.desc}</p>
                      <p className="text-xs text-alico-teal font-medium mt-2">{item.accion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </>
  );
}
