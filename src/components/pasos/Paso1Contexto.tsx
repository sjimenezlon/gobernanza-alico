"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function Paso1Contexto() {
  return (
    <div className="space-y-8">
      {/* Por qué ahora */}
      <AnimatedSection delay={0.1}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            El Diagnóstico: ¿Por qué ahora?
          </h2>
          <p className="text-alico-gray mb-6">
            La complejidad operativa, el entorno competitivo y el marco regulatorio
            exigen una gestión de datos proactiva y estratégica. En la industria de
            empaques flexibles y termoformado, los datos ya no son un subproducto de
            las operaciones: son un activo estratégico que define la capacidad de
            innovar, cumplir y competir.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              {
                titulo: "Complejidad Operativa",
                items: [
                  "Múltiples líneas de producción",
                  "Especificaciones técnicas complejas (BOM, cromatografía)",
                  "Cadenas de suministro con import/export",
                  "Requisitos de trazabilidad OEA",
                ],
              },
              {
                titulo: "Entorno Competitivo",
                items: [
                  "Competidores con capacidades digitales avanzadas",
                  "Clientes exigiendo datos de sostenibilidad",
                  "Presión por reducir tiempos de desarrollo",
                  "Necesidad de diferenciación por servicio",
                ],
              },
              {
                titulo: "Marco Regulatorio",
                items: [
                  "Protección de datos personales (Ley 1581)",
                  "Cumplimiento OEA para comercio exterior",
                  "Normas de calidad y seguridad alimentaria",
                  "Reportes de sostenibilidad y huella de carbono",
                ],
              },
            ].map((col) => (
              <motion.div
                key={col.titulo}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-bold text-alico-dark mb-3">{col.titulo}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-alico-gray flex items-start gap-2">
                      <span className="text-alico-teal mt-1">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Qué es Gobernanza de Datos */}
      <AnimatedSection delay={0.2}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            ¿Qué es la Gobernanza de Datos?
          </h2>
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <p className="text-alico-gray mb-4">
              La gobernanza de datos es el <strong>ejercicio de autoridad, control y toma
              de decisiones</strong> sobre la gestión de datos como activos de la
              organización. No es un proyecto de TI — es una capacidad organizacional
              que involucra a todas las áreas.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <motion.div
                className="bg-blue-50 rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h4 className="font-bold text-blue-800 mb-2">Evaluar</h4>
                <p className="text-sm text-blue-700">
                  Comprender el estado actual, las necesidades y los riesgos
                  relacionados con los datos.
                </p>
              </motion.div>
              <motion.div
                className="bg-teal-50 rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h4 className="font-bold text-teal-800 mb-2">Dirigir</h4>
                <p className="text-sm text-teal-700">
                  Establecer políticas, roles y procesos para la gestión adecuada
                  de los datos.
                </p>
              </motion.div>
              <motion.div
                className="bg-amber-50 rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h4 className="font-bold text-amber-800 mb-2">Monitorear</h4>
                <p className="text-sm text-amber-700">
                  Medir el cumplimiento, la calidad y el valor generado por la
                  gestión de datos.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Marcos de Referencia */}
      <AnimatedSection delay={0.3}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            El Triángulo de la Gobernanza: Marcos de Referencia
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-700 font-bold text-xs">ISO</span>
              </div>
              <h3 className="font-bold text-alico-dark mb-2">ISO/IEC 38505</h3>
              <p className="text-sm text-alico-gray mb-3">
                <strong>La Responsabilidad.</strong> Establece el mandato y la rendición
                de cuentas desde la Junta Directiva y la Gerencia General.
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 rounded p-2">
                Asegura que la gobernanza sea una responsabilidad corporativa
                fundamental, no solo una iniciativa de TI.
              </div>
            </motion.div>
            <motion.div
              className="bg-white border-2 border-teal-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-700 font-bold text-xs">DAMA</span>
              </div>
              <h3 className="font-bold text-alico-dark mb-2">DAMA-DMBOK2</h3>
              <p className="text-sm text-alico-gray mb-3">
                <strong>La Estructura.</strong> Proporciona el plano detallado para
                construir la &quot;casa&quot; de la gestión de datos.
              </p>
              <div className="text-xs text-teal-600 bg-teal-50 rounded p-2">
                Define las áreas de conocimiento, roles (Propietarios, Custodios)
                y procesos del día a día.
              </div>
            </motion.div>
            <motion.div
              className="bg-white border-2 border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-amber-700 font-bold text-xs">NIST</span>
              </div>
              <h3 className="font-bold text-alico-dark mb-2">NIST AI RMF</h3>
              <p className="text-sm text-alico-gray mb-3">
                <strong>El Futuro.</strong> Actúa como el sistema de seguridad para
                la innovación con IA.
              </p>
              <div className="text-xs text-amber-600 bg-amber-50 rounded p-2">
                Guía el diseño y despliegue de soluciones de IA de manera ética,
                segura y confiable, gestionando sus riesgos únicos.
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Dominios de Datos */}
      <AnimatedSection delay={0.4}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            Dominios de Datos Identificados
          </h2>
          <p className="text-alico-gray mb-4">
            Los datos son un activo transversal que impacta toda la organización.
            Estos son los 6 dominios críticos identificados:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                nombre: "Cliente",
                desc: "Datos maestros y transaccionales de clientes. Crítico para el pilar de Experiencia Superior.",
                propietario: "Gte. Mercadeo y Ventas",
                riesgo: "Pérdida de oportunidades, mala experiencia del cliente.",
                color: "border-blue-300 bg-blue-50",
              },
              {
                nombre: "Producto",
                desc: "Especificaciones técnicas, BOM, datos de calidad. Esencial para la Innovación.",
                propietario: "Gte. Gestión Tecnológica",
                riesgo: "Retrasos en desarrollo, problemas de calidad.",
                color: "border-teal-300 bg-teal-50",
              },
              {
                nombre: "Proveedor",
                desc: "Datos de proveedores, evaluaciones, términos de compra. Clave para la eficiencia de costos.",
                propietario: "Gte. Abastecimiento",
                riesgo: "Interrupciones en cadena de suministro.",
                color: "border-amber-300 bg-amber-50",
              },
              {
                nombre: "Financiero",
                desc: "Datos contables, costos, presupuestos. Fundamental para la rentabilidad.",
                propietario: "Director Financiero",
                riesgo: "Decisiones incorrectas, riesgos de auditoría.",
                color: "border-green-300 bg-green-50",
              },
              {
                nombre: "Producción",
                desc: "Datos de planeación, OEE, mantenimiento. Clave para la eficiencia operativa.",
                propietario: "Gte. Manufactura",
                riesgo: "Baja eficiencia, paradas no planificadas.",
                color: "border-purple-300 bg-purple-50",
              },
              {
                nombre: "Cadena de Suministro",
                desc: "Datos de logística, inventarios, import/export. Crítico para cumplimiento OEA.",
                propietario: "Gte. Abastecimiento",
                riesgo: "Retrasos, incumplimiento normativo.",
                color: "border-red-300 bg-red-50",
              },
            ].map((d) => (
              <motion.div
                key={d.nombre}
                className={`border-2 rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 ${d.color}`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-bold text-alico-dark mb-2">{d.nombre}</h3>
                <p className="text-sm text-alico-gray mb-3">{d.desc}</p>
                <p className="text-xs">
                  <strong>Propietario Potencial:</strong> {d.propietario}
                </p>
                <p className="text-xs text-alico-red mt-1">
                  <strong>Riesgo:</strong> {d.riesgo}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-800">
            <strong>Siguiente paso:</strong> Con este contexto claro, avance al Paso 2
            para realizar el diagnóstico de madurez y evaluar el estado actual de cada
            dominio de datos.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
