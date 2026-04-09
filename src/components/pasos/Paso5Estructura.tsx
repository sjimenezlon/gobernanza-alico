"use client";

import { useState, useEffect } from "react";
import { getData, saveData, DominioConfig } from "@/lib/store";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

interface EstructuraGobierno {
  consejo: string;
  comiteEjecutivo: string;
  dataOwners: string;
  dataStewards: string;
  notas: string;
}

const ROLES_INFO = [
  {
    key: "consejo" as const,
    titulo: "Consejo de Gobernanza de Datos",
    nivel: "Nivel Estratégico",
    color: "border-blue-300 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
    descripcion:
      "Órgano máximo de decisión sobre gobernanza de datos. Según ISO/IEC 38505, este consejo es responsable de evaluar, dirigir y monitorear el uso de datos como activo estratégico. Define la visión, aprueba políticas y asigna recursos.",
    sugerencia:
      "Típicamente compuesto por: Gerente General, Director Financiero, Gerentes de área clave. Reuniones trimestrales recomendadas.",
    placeholder:
      "Indique quiénes conforman el Consejo, con qué frecuencia se reúnen y cuáles son sus principales funciones...",
  },
  {
    key: "comiteEjecutivo" as const,
    titulo: "Comité Ejecutivo de Datos",
    nivel: "Nivel Táctico",
    color: "border-teal-300 bg-teal-50",
    badgeColor: "bg-teal-100 text-teal-700",
    descripcion:
      "Traduce la estrategia en planes de acción. Según DAMA-DMBOK2, este comité coordina las iniciativas de gestión de datos entre los diferentes dominios, resuelve conflictos y hace seguimiento a los indicadores de calidad.",
    sugerencia:
      "Típicamente compuesto por: Chief Data Officer (o equivalente), líderes de TI y de procesos clave. Reuniones mensuales recomendadas.",
    placeholder:
      "Indique quiénes conforman el Comité Ejecutivo, su líder, frecuencia de reunión y alcance de sus decisiones...",
  },
  {
    key: "dataOwners" as const,
    titulo: "Propietarios de Datos (Data Owners)",
    nivel: "Nivel Operativo - Autoridad",
    color: "border-amber-300 bg-amber-50",
    badgeColor: "bg-amber-100 text-amber-700",
    descripcion:
      "Según DAMA-DMBOK2, el Data Owner es el líder de negocio responsable de un dominio de datos. Define las reglas de calidad, aprueba el acceso y es responsable ante el Consejo del estado de sus datos. No es un rol de TI.",
    sugerencia:
      "Típicamente: los gerentes de área que ya fueron asignados como propietarios en el Paso 4 (Gte. Mercadeo, Gte. Manufactura, etc.).",
    placeholder:
      "Describa cómo se asignarán los Data Owners, cuáles son sus responsabilidades principales y cómo rendirán cuentas...",
  },
  {
    key: "dataStewards" as const,
    titulo: "Custodios de Datos (Data Stewards)",
    nivel: "Nivel Operativo - Ejecución",
    color: "border-purple-300 bg-purple-50",
    badgeColor: "bg-purple-100 text-purple-700",
    descripcion:
      "Según DAMA-DMBOK2, el Data Steward ejecuta las políticas definidas por el Data Owner en el día a día. Monitorea la calidad, gestiona los metadatos, documenta las reglas de negocio y reporta incidentes de datos.",
    sugerencia:
      "Típicamente: analistas de datos, coordinadores de proceso o personal de TI con conocimiento del negocio. Al menos uno por dominio crítico.",
    placeholder:
      "Describa cómo se seleccionarán los Data Stewards, su perfil requerido, actividades diarias y herramientas de apoyo...",
  },
];

export default function Paso5Estructura() {
  const [estructura, setEstructura] = useState<EstructuraGobierno>({
    consejo: "",
    comiteEjecutivo: "",
    dataOwners: "",
    dataStewards: "",
    notas: "",
  });
  const [guardado, setGuardado] = useState(false);
  const [dominiosData, setDominiosData] = useState<DominioConfig[]>([]);

  useEffect(() => {
    const data = getData();
    if (data.estructuraGobierno) {
      setEstructura(data.estructuraGobierno);
    }
    if (data.dominios) {
      setDominiosData(data.dominios);
    }
  }, []);

  function handleChange(campo: keyof EstructuraGobierno, valor: string) {
    setEstructura((prev) => ({ ...prev, [campo]: valor }));
    setGuardado(false);
  }

  function guardar() {
    saveData({ estructuraGobierno: estructura });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Introducción */}
      <AnimatedSection delay={0.1}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-3">
            Estructura Organizacional de Gobernanza
          </h2>
          <p className="text-alico-gray mb-4">
            La gobernanza de datos efectiva requiere una estructura clara de
            roles y responsabilidades. Basado en ISO/IEC 38505 y DAMA-DMBOK2,
            se propone una jerarquía de cuatro niveles que conecta la estrategia
            corporativa con la ejecución operativa diaria.
          </p>
        </section>
      </AnimatedSection>

      {/* Datos de dominios (del Paso 4) */}
      {dominiosData.length > 0 && (
        <AnimatedSection delay={0.15}>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-blue-800 mb-3">
              Asignaciones actuales desde el Paso 4 (Dominios)
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {dominiosData.map((d) => (
                <div key={d.nombre} className="bg-white rounded-lg p-3 text-xs">
                  <p className="font-bold text-alico-dark">{d.nombre}</p>
                  <p className="text-alico-gray">Owner: {d.propietario || "—"}</p>
                  <p className="text-alico-gray">Steward: {d.custodio || "—"}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-700 mt-2">
              Use esta información para definir la estructura formal a continuación.
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* Jerarquía visual */}
      <AnimatedSection delay={0.2}>
        <section className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-bold text-alico-dark mb-4 text-center">
            Jerarquía de Gobernanza de Datos
          </h3>
          <div className="flex flex-col items-center space-y-2">
            {/* Consejo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-full max-w-md bg-blue-100 border-2 border-blue-300 rounded-lg p-3 text-center"
            >
              <p className="font-bold text-blue-800 text-sm">
                Consejo de Gobernanza de Datos
              </p>
              <p className="text-xs text-blue-600">Evaluar - Dirigir - Monitorear</p>
            </motion.div>
            <svg className="w-4 h-6 text-alico-gray" viewBox="0 0 16 24">
              <path d="M8 0v24M4 18l4 6 4-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            {/* Comité */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="w-full max-w-sm bg-teal-100 border-2 border-teal-300 rounded-lg p-3 text-center"
            >
              <p className="font-bold text-teal-800 text-sm">
                Comité Ejecutivo de Datos
              </p>
              <p className="text-xs text-teal-600">Planificar - Coordinar - Reportar</p>
            </motion.div>
            <svg className="w-4 h-6 text-alico-gray" viewBox="0 0 16 24">
              <path d="M8 0v24M4 18l4 6 4-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            {/* Owners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="w-full max-w-xs bg-amber-100 border-2 border-amber-300 rounded-lg p-3 text-center"
            >
              <p className="font-bold text-amber-800 text-sm">
                Data Owners
              </p>
              <p className="text-xs text-amber-600">Definir - Aprobar - Rendir cuentas</p>
            </motion.div>
            <svg className="w-4 h-6 text-alico-gray" viewBox="0 0 16 24">
              <path d="M8 0v24M4 18l4 6 4-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            {/* Stewards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="w-full max-w-[14rem] bg-purple-100 border-2 border-purple-300 rounded-lg p-3 text-center"
            >
              <p className="font-bold text-purple-800 text-sm">
                Data Stewards
              </p>
              <p className="text-xs text-purple-600">Ejecutar - Monitorear - Documentar</p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Formularios por rol */}
      <AnimatedSection delay={0.3}>
        <section className="space-y-6">
          {ROLES_INFO.map((rol, idx) => (
            <motion.div
              key={rol.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + idx * 0.08 }}
              className={`border-2 rounded-xl p-6 ${rol.color}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-alico-dark">
                  {rol.titulo}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${rol.badgeColor}`}
                >
                  {rol.nivel}
                </span>
              </div>

              <p className="text-sm text-alico-gray mb-3">{rol.descripcion}</p>

              <div className="bg-white/60 border border-gray-200 rounded-lg p-3 mb-4">
                <p className="text-xs text-alico-gray">
                  <strong>Sugerencia para Alico:</strong> {rol.sugerencia}
                </p>
              </div>

              <textarea
                rows={5}
                value={estructura[rol.key]}
                onChange={(e) => handleChange(rol.key, e.target.value)}
                placeholder={rol.placeholder}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
              />
            </motion.div>
          ))}
        </section>
      </AnimatedSection>

      {/* Notas adicionales */}
      <AnimatedSection delay={0.4}>
        <section className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-bold text-alico-dark mb-3">
            Notas y Observaciones Adicionales
          </h3>
          <p className="text-sm text-alico-gray mb-3">
            Registre acuerdos, restricciones organizacionales, consideraciones
            sobre la cultura de datos u otros aspectos relevantes para la
            implementación de esta estructura.
          </p>
          <textarea
            rows={4}
            value={estructura.notas}
            onChange={(e) => handleChange("notas", e.target.value)}
            placeholder="Notas adicionales sobre la estructura de gobernanza..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-alico-dark focus:ring-2 focus:ring-alico-teal focus:border-transparent"
          />
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
            Guardar Estructura
          </button>
          {guardado && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-teal-700 font-medium"
            >
              Datos guardados correctamente.
            </motion.span>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-800">
            <strong>Siguiente paso:</strong> Con la estructura definida,
            avance al Paso 6 para construir la Matriz RACI y asignar
            responsabilidades específicas para cada proceso de gobernanza.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
