"use client";

import { PASOS, FASES } from "@/lib/pasos";

interface Props {
  pasoActual: number;
  completados: number[];
}

export default function ProgresoBar({ pasoActual, completados }: Props) {
  const porcentaje = Math.round((completados.length / PASOS.length) * 100);

  return (
    <div className="bg-white border-b no-print">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-alico-dark">
            Progreso General
          </span>
          <span className="text-sm text-alico-gray">
            {completados.length} de {PASOS.length} pasos completados ({porcentaje}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-alico-teal h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {FASES.map((fase) => (
            <div key={fase.nombre} className="flex-1">
              <div className="text-[10px] text-alico-gray truncate mb-1">
                {fase.nombre}
              </div>
              <div className="flex gap-0.5">
                {fase.pasos.map((pid) => (
                  <div
                    key={pid}
                    className={`h-1.5 flex-1 rounded-full ${
                      completados.includes(pid)
                        ? "bg-alico-teal"
                        : pid === pasoActual
                          ? "bg-alico-amber"
                          : "bg-gray-200"
                    }`}
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
