"use client";

import { useState, useEffect } from "react";
import {
  PREGUNTAS,
  NIVELES_MADUREZ,
  DOMINIOS_DIAGNOSTICO,
} from "@/lib/diagnostico-preguntas";
import { getData, saveData, type DiagnosticoRespuesta } from "@/lib/store";

export default function Paso2Diagnostico() {
  const [respuestas, setRespuestas] = useState<DiagnosticoRespuesta[]>([]);
  const [dominioActivo, setDominioActivo] = useState(DOMINIOS_DIAGNOSTICO[0]);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const data = getData();
    if (data.diagnostico.length > 0) {
      setRespuestas(data.diagnostico);
    }
  }, []);

  const preguntasDominio = PREGUNTAS.filter((p) => p.dominio === dominioActivo);

  const getRespuesta = (preguntaId: string) =>
    respuestas.find(
      (r) => r.dominio === dominioActivo && r.pregunta === preguntaId
    );

  const setValor = (preguntaId: string, valor: number) => {
    setGuardado(false);
    setRespuestas((prev) => {
      const filtered = prev.filter(
        (r) => !(r.dominio === dominioActivo && r.pregunta === preguntaId)
      );
      return [
        ...filtered,
        { dominio: dominioActivo, pregunta: preguntaId, valor },
      ];
    });
  };

  const setComentario = (preguntaId: string, comentario: string) => {
    setRespuestas((prev) =>
      prev.map((r) =>
        r.dominio === dominioActivo && r.pregunta === preguntaId
          ? { ...r, comentario }
          : r
      )
    );
  };

  const guardar = () => {
    saveData({ diagnostico: respuestas });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const respuestasDominio = (dom: string) =>
    respuestas.filter((r) => r.dominio === dom).length;

  const preguntasTotalDominio = (dom: string) =>
    PREGUNTAS.filter((p) => p.dominio === dom).length;

  return (
    <div className="space-y-6">
      {/* Instrucciones */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-bold text-alico-dark mb-2">
          Como completar el diagnostico
        </h2>
        <p className="text-sm text-alico-gray mb-4">
          Para cada pregunta, seleccione el nivel de madurez que mejor describe
          la situacion actual en la organizacion. Sea honesto — el objetivo es
          identificar oportunidades de mejora, no obtener una calificacion alta.
        </p>
        <div className="grid grid-cols-5 gap-2">
          {NIVELES_MADUREZ.map((n) => (
            <div key={n.valor} className="text-center p-2 bg-gray-50 rounded">
              <div className="font-bold text-alico-dark">{n.valor}</div>
              <div className="text-xs font-medium text-alico-teal">
                {n.etiqueta}
              </div>
              <div className="text-[10px] text-alico-gray mt-1">
                {n.descripcion}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selector de dominio */}
      <div className="flex flex-wrap gap-2">
        {DOMINIOS_DIAGNOSTICO.map((dom) => {
          const resp = respuestasDominio(dom);
          const total = preguntasTotalDominio(dom);
          const completo = resp === total;
          return (
            <button
              key={dom}
              onClick={() => setDominioActivo(dom)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                dominioActivo === dom
                  ? "bg-alico-dark text-white"
                  : completo
                    ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
                    : "bg-white border text-alico-gray hover:border-alico-teal"
              }`}
            >
              {dom}
              <span className="ml-2 text-xs opacity-70">
                {resp}/{total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Preguntas */}
      <div className="space-y-4">
        {preguntasDominio.map((preg, idx) => {
          const resp = getRespuesta(preg.id);
          return (
            <div key={preg.id} className="bg-white border rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-alico-dark text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-alico-dark">{preg.pregunta}</p>
                  <p className="text-xs text-alico-gray mt-1">{preg.ayuda}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-9 mb-3">
                {NIVELES_MADUREZ.map((n) => (
                  <button
                    key={n.valor}
                    onClick={() => setValor(preg.id, n.valor)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      resp?.valor === n.valor
                        ? n.valor <= 2
                          ? "bg-red-100 text-red-700 ring-2 ring-red-300"
                          : n.valor === 3
                            ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300"
                            : "bg-green-100 text-green-700 ring-2 ring-green-300"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                    title={n.descripcion}
                  >
                    {n.valor}
                    <span className="hidden sm:inline ml-1 text-xs">
                      {n.etiqueta}
                    </span>
                  </button>
                ))}
              </div>
              {resp && (
                <div className="ml-9">
                  <textarea
                    className="w-full border rounded-lg p-2 text-sm text-alico-gray placeholder:text-gray-300 focus:border-alico-teal focus:outline-none"
                    rows={2}
                    placeholder="Comentario opcional: contexto adicional, ejemplos, observaciones..."
                    value={resp.comentario || ""}
                    onChange={(e) => setComentario(preg.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Guardar */}
      <div className="flex items-center justify-between bg-white border rounded-xl p-4">
        <div className="text-sm text-alico-gray">
          {respuestas.length} de {PREGUNTAS.length} preguntas respondidas
        </div>
        <button
          onClick={guardar}
          className="bg-alico-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          {guardado ? "Guardado!" : "Guardar Respuestas"}
        </button>
      </div>
    </div>
  );
}
