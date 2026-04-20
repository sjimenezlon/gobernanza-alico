"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function Paso0Arranque() {
  return (
    <div className="space-y-8">
      <AnimatedSection delay={0.1}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            ¿Por qué este es realmente el primer paso?
          </h2>
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <p className="text-alico-gray mb-4">
              La mayoría de programas de gobernanza de datos fracasan no por
              falta de marco técnico — fracasan porque arrancan diagnosticando
              antes de tener <strong>mandato</strong>. Sin patrocinio
              ejecutivo, el diagnóstico termina en un cajón, el Consejo nunca
              se reúne, y el programa muere a la primera rotación gerencial.
            </p>
            <p className="text-alico-gray">
              La norma <strong>ISO/IEC 38505</strong> es explícita: la
              gobernanza de datos es una{" "}
              <strong>
                responsabilidad indelegable de la Junta Directiva y la Gerencia
                General
              </strong>
              . Por eso, antes del Paso 1 (contexto) y el Paso 2 (diagnóstico),
              Alico debe cerrar cuatro acciones formales que instalan el
              mandato en la organización.
            </p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            Las 4 acciones de arranque
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                num: "01",
                titulo: "Carta de patrocinio",
                quien: "Gerencia General + Junta",
                que: "Documento firmado que establece mandato, alcance, presupuesto y autoridad.",
                color: "border-rose-300 bg-rose-50",
              },
              {
                num: "02",
                titulo: "Nombramiento del Líder",
                quien: "Gerencia General",
                que: "Memorando designando al Líder de Gobernanza (CDO) con responsabilidades y autoridad.",
                color: "border-blue-300 bg-blue-50",
              },
              {
                num: "03",
                titulo: "Convocatoria del Consejo",
                quien: "Líder de Gobernanza",
                que: "Representantes formales de Innovación, TI, PMO, GH, Jurídica y Gerencia.",
                color: "border-teal-300 bg-teal-50",
              },
              {
                num: "04",
                titulo: "Acta de constitución + kickoff",
                quien: "Líder + Consejo",
                que: "Primera reunión formal con acta firmada, dominios validados y Sprint aprobado.",
                color: "border-amber-300 bg-amber-50",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                className={`border-2 rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 ${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl font-bold text-alico-dark/30">
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-alico-dark mb-1">
                      {item.titulo}
                    </h3>
                    <p className="text-xs text-alico-teal font-medium mb-2 uppercase tracking-wide">
                      {item.quien}
                    </p>
                    <p className="text-sm text-alico-gray">{item.que}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section>
          <h2 className="text-xl font-bold text-alico-dark mb-4">
            Criterios de salida de este paso
          </h2>
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <p className="text-alico-gray mb-4">
              Alico puede avanzar al Paso 1 <strong>solo cuando</strong>:
            </p>
            <ul className="space-y-3">
              {[
                "La Carta de Patrocinio está firmada por Gerencia General y publicada internamente.",
                "El Líder de Gobernanza de Datos tiene memorando de nombramiento formal y dedicación asignada.",
                "Los 7 miembros del Consejo de Gobernanza están nominados y aceptaron la convocatoria.",
                "Se realizó la reunión de kickoff con acta firmada y Sprint 4 semanas aprobado.",
              ].map((criterio) => (
                <li key={criterio} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-alico-teal/15 text-alico-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-alico-gray">{criterio}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
          <p className="text-sm text-rose-900">
            <strong>Abajo</strong> encontrarás el plan de ejecución con las 4
            acciones, responsables, plantillas descargables y control de
            estado. Descarga las plantillas, personalízalas con los datos de
            Alico y súbelas firmadas a tu repositorio documental.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
