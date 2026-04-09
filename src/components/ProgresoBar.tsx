"use client";

import { motion } from "framer-motion";
import { PASOS, FASES } from "@/lib/pasos";

interface Props {
  pasoActual: number;
  completados: number[];
}

export default function ProgresoBar({ pasoActual, completados }: Props) {
  const porcentaje = Math.round((completados.length / PASOS.length) * 100);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b no-print">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-alico-dark">
            Progreso general
          </span>
          <span className="text-sm text-alico-gray">
            {completados.length} de {PASOS.length} pasos completados ({porcentaje}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-alico-teal to-alico-green h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${porcentaje}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="flex gap-1.5 mt-3">
          {FASES.map((fase) => (
            <div key={fase.nombre} className="flex-1">
              <div className="text-[10px] text-alico-gray truncate mb-1 font-medium">
                {fase.nombre}
              </div>
              <div className="flex gap-0.5">
                {fase.pasos.map((pid) => (
                  <motion.div
                    key={pid}
                    className={`h-2 flex-1 rounded-full ${
                      completados.includes(pid)
                        ? "bg-alico-teal"
                        : pid === pasoActual
                          ? "bg-alico-amber"
                          : "bg-gray-200"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: pid * 0.05 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
