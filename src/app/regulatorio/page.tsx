"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

interface ChecklistItem {
  id: string;
  texto: string;
}

interface Regulacion {
  id: string;
  nombre: string;
  subtitulo: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  icono: string;
  descripcion: string;
  dominiosAfectados: string[];
  requisitos: string[];
  elementosGobernanza: string[];
  checklist: ChecklistItem[];
}

const REGULACIONES: Regulacion[] = [
  {
    id: "ley1581",
    nombre: "Ley 1581 de 2012",
    subtitulo: "Protección de Datos Personales",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-800",
    icono: "🛡️",
    descripcion:
      "Ley colombiana que regula el derecho fundamental de todas las personas a conocer, actualizar y rectificar las informaciones que se hayan recogido sobre ellas en bases de datos o archivos. Establece principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad. Obliga a las organizaciones a registrar sus bases de datos ante la SIC, obtener autorización expresa de los titulares y garantizar sus derechos.",
    dominiosAfectados: ["Cliente", "Gestión Humana"],
    requisitos: [
      "Consentimiento: Obtener autorización previa, expresa e informada del titular antes de recolectar datos personales",
      "Finalidad: Informar claramente al titular la finalidad del tratamiento y no usar los datos para fines diferentes",
      "Libertad: El tratamiento solo puede ejercerse con el consentimiento previo, expreso e informado del titular",
      "Veracidad: La información sujeta a tratamiento debe ser veraz, completa, exacta, actualizada y comprobable",
      "Transparencia: Garantizar al titular el derecho a obtener información acerca de la existencia de datos que le conciernan",
      "Acceso y circulación restringida: Los datos personales solo pueden ser tratados por personas autorizadas por el titular o por la ley",
      "Seguridad: La información debe manejarse con las medidas técnicas, humanas y administrativas necesarias para dar seguridad a los registros",
      "Confidencialidad: Todas las personas que intervengan en el tratamiento de datos personales están obligadas a garantizar la reserva de la información",
    ],
    elementosGobernanza: [
      "Política de Protección de Datos Personales (obligatoria por ley)",
      "Rol de Oficial de Protección de Datos o responsable designado",
      "Registro de bases de datos ante la SIC (RNBD)",
      "Procedimiento de atención de derechos ARCO (Acceso, Rectificación, Cancelación, Oposición)",
      "Cláusulas de autorización en formularios y contratos",
      "Acuerdos de confidencialidad con terceros que traten datos",
      "Clasificación de datos personales (públicos, semiprivados, privados, sensibles)",
      "Controles de acceso basados en mínimo privilegio para datos personales",
    ],
    checklist: [
      { id: "l1581-1", texto: "Política de protección de datos personales redactada y publicada" },
      { id: "l1581-2", texto: "Bases de datos registradas ante la SIC (RNBD)" },
      { id: "l1581-3", texto: "Avisos de privacidad en todos los canales de recolección de datos" },
      { id: "l1581-4", texto: "Formularios de autorización con consentimiento expreso implementados" },
      { id: "l1581-5", texto: "Procedimiento documentado para atender peticiones de titulares (ARCO)" },
      { id: "l1581-6", texto: "Responsable de protección de datos designado formalmente" },
      { id: "l1581-7", texto: "Inventario de bases de datos con datos personales actualizado" },
      { id: "l1581-8", texto: "Acuerdos de confidencialidad con proveedores que acceden a datos personales" },
      { id: "l1581-9", texto: "Capacitación a colaboradores sobre tratamiento de datos personales" },
      { id: "l1581-10", texto: "Procedimiento de notificación de incidentes de seguridad de datos" },
    ],
  },
  {
    id: "oea",
    nombre: "OEA — Operador Económico Autorizado",
    subtitulo: "Certificación DIAN para Comercio Exterior",
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    badgeColor: "bg-teal-100 text-teal-800",
    icono: "🌐",
    descripcion:
      "Certificación otorgada por la DIAN que acredita a una empresa como operador de confianza en la cadena logística internacional. Requiere demostrar gestión integral de riesgos, trazabilidad documental completa, seguridad de la información, control de socios comerciales y cumplimiento aduanero. La certificación facilita procedimientos simplificados, reduce tiempos de despacho y mejora la competitividad en mercados internacionales.",
    dominiosAfectados: ["Cadena de Suministro", "Proveedor"],
    requisitos: [
      "Trazabilidad documental completa: desde la orden de compra hasta la entrega final, incluyendo documentos aduaneros",
      "Control de socios comerciales: verificación y evaluación periódica de proveedores, transportadores y agentes",
      "Gestión de riesgos: identificación, evaluación y mitigación de riesgos en la cadena de suministro",
      "Seguridad de la información: protección de datos comerciales, aduaneros y logísticos contra accesos no autorizados",
      "Integridad de los datos: asegurar que los registros de operaciones de comercio exterior sean completos, exactos y no alterados",
      "Conservación documental: mantener registros por los plazos legales establecidos con capacidad de recuperación rápida",
    ],
    elementosGobernanza: [
      "Política de gestión de datos de comercio exterior y cadena de suministro",
      "Estándares de calidad de datos para registros aduaneros",
      "Procedimiento de verificación y actualización de datos de socios comerciales",
      "Controles de integridad y pistas de auditoría en sistemas logísticos",
      "Clasificación de datos de comercio exterior por nivel de sensibilidad",
      "Roles definidos para la custodia de documentos de importación/exportación",
    ],
    checklist: [
      { id: "oea-1", texto: "Registros de operaciones de comercio exterior con trazabilidad completa" },
      { id: "oea-2", texto: "Base de datos de socios comerciales verificada y actualizada periódicamente" },
      { id: "oea-3", texto: "Controles de acceso a información aduanera y logística implementados" },
      { id: "oea-4", texto: "Pistas de auditoría en sistemas de gestión de comercio exterior" },
      { id: "oea-5", texto: "Procedimiento de evaluación de riesgos de proveedores documentado" },
      { id: "oea-6", texto: "Política de conservación documental alineada con plazos legales" },
      { id: "oea-7", texto: "Capacitación al personal de comercio exterior sobre seguridad de datos" },
      { id: "oea-8", texto: "Plan de continuidad para sistemas críticos de cadena de suministro" },
    ],
  },
  {
    id: "niif",
    nombre: "NIIF/NIC",
    subtitulo: "Normas Internacionales de Información Financiera",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    badgeColor: "bg-amber-100 text-amber-800",
    icono: "📊",
    descripcion:
      "Estándares contables internacionales adoptados en Colombia (Ley 1314 de 2009) que regulan la preparación y presentación de estados financieros. Exigen datos financieros fidedignos, oportunos y comparables. Requieren representación fiel de las transacciones, lo que implica controles estrictos sobre la calidad e integridad de los datos que alimentan los reportes financieros, incluyendo pistas de auditoría completas y conciliaciones periódicas.",
    dominiosAfectados: ["Financiero"],
    requisitos: [
      "Representación fiel: los estados financieros deben reflejar la sustancia económica de las transacciones de forma completa, neutral y libre de error",
      "Pistas de auditoría: cada transacción financiera debe poder rastrearse desde el registro inicial hasta el estado financiero final y viceversa",
      "Oportunidad: la información financiera debe estar disponible a tiempo para influir en las decisiones de los usuarios",
      "Consistencia: las políticas contables deben aplicarse de forma uniforme entre períodos, y los cambios deben documentarse y revelarse",
      "Conciliación: los saldos entre sistemas deben conciliarse periódicamente para asegurar integridad",
    ],
    elementosGobernanza: [
      "Política de calidad de datos financieros con umbrales de aceptación",
      "Estándares de codificación y nomenclatura para cuentas contables",
      "Procedimiento de conciliación entre sistemas fuente y sistema contable",
      "Controles de cierre de período con validación de integridad de datos",
      "Roles definidos para autorización de ajustes contables y reclasificaciones",
    ],
    checklist: [
      { id: "niif-1", texto: "Controles de integridad de datos en el cierre contable documentados" },
      { id: "niif-2", texto: "Conciliaciones periódicas entre ERP y sistema contable implementadas" },
      { id: "niif-3", texto: "Pistas de auditoría completas para transacciones financieras" },
      { id: "niif-4", texto: "Nomenclatura y codificación contable estandarizada y documentada" },
      { id: "niif-5", texto: "Procedimiento de autorización para ajustes contables formalmente definido" },
      { id: "niif-6", texto: "Backup y recuperación de datos financieros con pruebas periódicas" },
      { id: "niif-7", texto: "Segregación de funciones en el acceso a sistemas financieros" },
    ],
  },
  {
    id: "alimentaria",
    nombre: "Seguridad Alimentaria",
    subtitulo: "Regulaciones de materiales en contacto con alimentos",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    badgeColor: "bg-green-100 text-green-800",
    icono: "🍃",
    descripcion:
      "Conjunto de regulaciones nacionales e internacionales (INVIMA en Colombia, FDA en EE.UU., EU en Europa) que establecen requisitos para materiales y objetos destinados a entrar en contacto con alimentos. Exigen trazabilidad completa de materiales, certificaciones de inocuidad, cumplimiento de límites de migración y documentación técnica que respalde la seguridad del empaque. Para Alico, como fabricante de empaques, estos requisitos son particularmente relevantes cuando sus productos están destinados al sector de alimentos y bebidas.",
    dominiosAfectados: ["Producto", "Producción"],
    requisitos: [
      "Trazabilidad de materiales: rastrear cada materia prima desde el proveedor hasta el producto terminado y hasta el cliente final",
      "Certificados de conformidad: mantener certificados de inocuidad de materias primas y productos terminados actualizados",
      "Control de lotes: identificar y rastrear cada lote de producción para posibilitar retiros selectivos si es necesario",
      "Registros de producción: documentar parámetros de proceso (temperaturas, tiempos, presiones) que afectan la seguridad del producto",
      "Gestión de cambios: documentar y evaluar el impacto de cambios en materiales, procesos o proveedores sobre la seguridad alimentaria",
    ],
    elementosGobernanza: [
      "Política de trazabilidad de materiales con estándares de datos",
      "Estándares de calidad de datos para fichas técnicas de producto",
      "Procedimiento de gestión de datos de lote y control de producción",
      "Reglas de retención de registros de calidad y producción",
      "Integración de datos entre sistemas de calidad y producción",
    ],
    checklist: [
      { id: "alim-1", texto: "Sistema de trazabilidad de materiales que vincula proveedor-lote-producto-cliente" },
      { id: "alim-2", texto: "Fichas técnicas de producto con datos completos y actualizados" },
      { id: "alim-3", texto: "Certificados de conformidad de materias primas digitalizados y accesibles" },
      { id: "alim-4", texto: "Registros de parámetros de producción por lote con integridad garantizada" },
      { id: "alim-5", texto: "Procedimiento de retiro de producto con capacidad de rastreo en menos de 4 horas" },
      { id: "alim-6", texto: "Gestión de cambios en materiales/procesos con evaluación de impacto documentada" },
    ],
  },
  {
    id: "iso38505",
    nombre: "ISO/IEC 38505",
    subtitulo: "Governance of Data",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    badgeColor: "bg-indigo-100 text-indigo-800",
    icono: "📐",
    descripcion:
      "Norma internacional que proporciona principios rectores para la gobernanza de datos a nivel de la alta dirección. Se basa en el ciclo EDM (Evaluate, Direct, Monitor): Evaluar las necesidades actuales y futuras de datos; Dirigir la preparación e implementación de planes y políticas; y Monitorizar el cumplimiento de políticas y el rendimiento en relación con los planes. No es una norma de certificación sino una guía de principios que la organización adapta a su contexto.",
    dominiosAfectados: [
      "Cliente",
      "Producto",
      "Proveedor",
      "Financiero",
      "Producción",
      "Cadena de Suministro",
    ],
    requisitos: [
      "Evaluar (Evaluate): la alta dirección debe evaluar continuamente el uso actual y futuro de los datos, incluyendo las propuestas de inversión y los riesgos asociados",
      "Dirigir (Direct): la alta dirección debe dirigir la preparación e implementación de planes y políticas de datos, asignando responsabilidades y recursos",
      "Monitorizar (Monitor): la alta dirección debe supervisar el desempeño del marco de gobernanza mediante KPIs, auditorías y reportes periódicos",
      "Rendición de cuentas: establecer claramente quién es responsable de la gobernanza de datos a nivel de la junta o la gerencia general",
      "Alineación estratégica: asegurar que la estrategia de datos esté alineada con la estrategia general del negocio",
    ],
    elementosGobernanza: [
      "Consejo de Gobernanza con participación de la alta dirección",
      "Estrategia de datos alineada con los objetivos estratégicos de Alico",
      "KPIs de gobernanza revisados trimestralmente por el Consejo",
      "Ciclo EDM implementado en cada sesión del Consejo de Gobernanza",
      "Hoja de ruta de gobernanza con hitos y responsables definidos",
      "Reporte periódico de gobernanza a la Gerencia General",
    ],
    checklist: [
      { id: "iso-1", texto: "Consejo de Gobernanza constituido con acta de creación formal" },
      { id: "iso-2", texto: "Mandato de gobernanza aprobado por la Gerencia General" },
      { id: "iso-3", texto: "Estrategia de datos documentada y alineada con estrategia corporativa" },
      { id: "iso-4", texto: "Ciclo EDM integrado en las agendas del Consejo de Gobernanza" },
      { id: "iso-5", texto: "KPIs de gobernanza definidos, con metas y frecuencia de revisión" },
      { id: "iso-6", texto: "Reporte trimestral de gobernanza presentado a la Gerencia General" },
      { id: "iso-7", texto: "Roles de Data Owner y Data Steward formalmente asignados por dominio" },
      { id: "iso-8", texto: "Presupuesto asignado para iniciativas de gobernanza de datos" },
    ],
  },
];

const STORAGE_KEY = "regulatorio";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function RegulatorioPage() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setChecks(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const toggleCheck = useCallback(
    (id: string) => {
      setChecks((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore storage errors
        }
        return next;
      });
    },
    []
  );

  const getComplianceStats = (reg: Regulacion) => {
    const total = reg.checklist.length;
    const done = reg.checklist.filter((c) => checks[c.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, pct };
  };

  const getStatusColor = (pct: number) => {
    if (pct >= 80) return { bg: "bg-green-500", text: "text-green-700", light: "bg-green-100" };
    if (pct >= 50) return { bg: "bg-amber-500", text: "text-amber-700", light: "bg-amber-100" };
    if (pct > 0) return { bg: "bg-orange-500", text: "text-orange-700", light: "bg-orange-100" };
    return { bg: "bg-gray-300", text: "text-gray-500", light: "bg-gray-100" };
  };

  const getStatusLabel = (pct: number) => {
    if (pct >= 80) return "Avanzado";
    if (pct >= 50) return "En progreso";
    if (pct > 0) return "Iniciado";
    return "Pendiente";
  };

  // Global stats
  const allChecklist = REGULACIONES.flatMap((r) => r.checklist);
  const globalDone = allChecklist.filter((c) => checks[c.id]).length;
  const globalTotal = allChecklist.length;
  const globalPct = globalTotal > 0 ? Math.round((globalDone / globalTotal) * 100) : 0;

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Encabezado */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-alico-dark mb-2">
              Mapa de Cumplimiento Regulatorio
            </h1>
            <p className="text-alico-gray mb-6">
              Seguimiento del cumplimiento de{" "}
              <strong className="text-alico-dark">{REGULACIONES.length} regulaciones</strong>{" "}
              aplicables a Alico. Cada regulación incluye una checklist interactiva
              que guarda su progreso automáticamente.
            </p>
          </motion.div>

          {/* Dashboard global */}
          {mounted && (
            <AnimatedSection delay={0.1}>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-alico-dark">
                      Estado General de Cumplimiento
                    </h2>
                    <p className="text-sm text-alico-gray">
                      {globalDone} de {globalTotal} controles completados
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-3xl font-bold ${
                        getStatusColor(globalPct).text
                      }`}
                    >
                      {globalPct}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
                  <div
                    className={`${
                      getStatusColor(globalPct).bg
                    } h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${globalPct}%` }}
                  />
                </div>

                {/* Mini cards per regulation */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {REGULACIONES.map((reg) => {
                    const stats = getComplianceStats(reg);
                    const sc = getStatusColor(stats.pct);
                    return (
                      <a
                        key={reg.id}
                        href={`#reg-${reg.id}`}
                        className={`${reg.bgColor} border ${reg.borderColor} rounded-lg p-3 text-center hover:shadow-md transition-all`}
                      >
                        <span className="text-xl block mb-1">{reg.icono}</span>
                        <p className="text-xs font-bold text-alico-dark truncate">
                          {reg.nombre.split("—")[0].trim()}
                        </p>
                        <p className={`text-lg font-bold ${sc.text}`}>
                          {stats.pct}%
                        </p>
                        <p className="text-[10px] text-alico-gray">
                          {stats.done}/{stats.total}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Regulaciones detalladas */}
          {REGULACIONES.map((reg, ri) => {
            const stats = getComplianceStats(reg);
            const sc = getStatusColor(stats.pct);
            return (
              <AnimatedSection
                key={reg.id}
                delay={0.15 + ri * 0.05}
                className="mb-8"
              >
                <div
                  id={`reg-${reg.id}`}
                  className={`bg-white border-2 ${reg.borderColor} rounded-xl overflow-hidden scroll-mt-24`}
                >
                  {/* Cabecera de regulación */}
                  <div className={`${reg.bgColor} p-6 border-b ${reg.borderColor}`}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{reg.icono}</span>
                          <div>
                            <h2
                              className={`text-xl font-bold ${reg.color}`}
                            >
                              {reg.nombre}
                            </h2>
                            <p className="text-sm text-alico-gray">
                              {reg.subtitulo}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mt-3">
                          {reg.descripcion}
                        </p>
                      </div>
                      <div className="flex flex-col items-center min-w-[100px]">
                        <span
                          className={`text-2xl font-bold ${sc.text}`}
                        >
                          {stats.pct}%
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc.light} ${sc.text}`}
                        >
                          {getStatusLabel(stats.pct)}
                        </span>
                        <span className="text-[10px] text-alico-gray mt-1">
                          {stats.done} de {stats.total}
                        </span>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="w-full bg-white/50 rounded-full h-2 mt-4">
                      <div
                        className={`${sc.bg} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${stats.pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Dominios afectados */}
                    <div className="mb-5">
                      <h3 className="text-sm font-bold text-alico-dark mb-2">
                        Dominios de datos afectados
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {reg.dominiosAfectados.map((dom) => (
                          <span
                            key={dom}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${reg.badgeColor}`}
                          >
                            {dom}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requisitos clave */}
                    <div className="mb-5">
                      <h3 className="text-sm font-bold text-alico-dark mb-2">
                        Requisitos clave
                      </h3>
                      <div className="space-y-2">
                        {reg.requisitos.map((req, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-alico-teal font-bold mt-0.5 flex-shrink-0">
                              {i + 1}.
                            </span>
                            <p className="text-gray-700">{req}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Elementos de gobernanza */}
                    <div className="mb-5">
                      <h3 className="text-sm font-bold text-alico-dark mb-2">
                        Elementos del modelo de gobernanza que lo abordan
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {reg.elementosGobernanza.map((elem, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2 text-xs p-2 rounded-lg ${reg.bgColor}`}
                          >
                            <svg
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${reg.color}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{elem}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Checklist interactiva */}
                    <div>
                      <h3 className="text-sm font-bold text-alico-dark mb-3 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-alico-teal"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Checklist de cumplimiento
                      </h3>
                      <div className="space-y-2">
                        {reg.checklist.map((item) => (
                          <label
                            key={item.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              checks[item.id]
                                ? `${reg.bgColor} ${reg.borderColor}`
                                : "bg-gray-50 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!checks[item.id]}
                              onChange={() => toggleCheck(item.id)}
                              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-alico-teal focus:ring-alico-teal cursor-pointer accent-[#2c7a7b]"
                            />
                            <span
                              className={`text-sm ${
                                checks[item.id]
                                  ? "text-gray-500 line-through"
                                  : "text-gray-700"
                              }`}
                            >
                              {item.texto}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* Nota al pie */}
          <AnimatedSection delay={0.5}>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 mb-8">
              <h3 className="text-sm font-bold text-alico-dark mb-2">
                Nota importante
              </h3>
              <p className="text-xs text-alico-gray leading-relaxed">
                Esta herramienta es una guía de autoevaluación para orientar los
                esfuerzos de cumplimiento regulatorio de Alico desde la perspectiva
                de gobernanza de datos. No constituye asesoría legal ni reemplaza la
                revisión por parte de expertos en cada regulación. Las checklists
                deben complementarse con análisis jurídico, auditorías internas y
                consulta con las autoridades competentes cuando corresponda. Su
                progreso se guarda localmente en este navegador.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <footer className="bg-alico-dark text-gray-400 text-center py-6 text-sm">
        <p>
          Alico Empaques S.A.S BIC &mdash; Plataforma de Gobernanza de Datos e
          IA
        </p>
        <p className="mt-1 text-gray-500">
          ISO/IEC 38505 + DAMA-DMBOK2 + NIST AI RMF
        </p>
      </footer>
    </>
  );
}
