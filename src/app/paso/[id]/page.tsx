"use client";

import { use } from "react";
import PasoLayout from "@/components/PasoLayout";
import Paso0Arranque from "@/components/pasos/Paso0Arranque";
import Paso1Contexto from "@/components/pasos/Paso1Contexto";
import Paso2Diagnostico from "@/components/pasos/Paso2Diagnostico";
import Paso3Resultados from "@/components/pasos/Paso3Resultados";
import Paso4Dominios from "@/components/pasos/Paso4Dominios";
import Paso5Estructura from "@/components/pasos/Paso5Estructura";
import Paso6RACI from "@/components/pasos/Paso6RACI";
import Paso7Politicas from "@/components/pasos/Paso7Politicas";
import Paso8KPIs from "@/components/pasos/Paso8KPIs";
import Paso9HojaDeRuta from "@/components/pasos/Paso9HojaDeRuta";
import Paso10Socializacion from "@/components/pasos/Paso10Socializacion";

const COMPONENTES: Record<number, React.ComponentType> = {
  0: Paso0Arranque,
  1: Paso1Contexto,
  2: Paso2Diagnostico,
  3: Paso3Resultados,
  4: Paso4Dominios,
  5: Paso5Estructura,
  6: Paso6RACI,
  7: Paso7Politicas,
  8: Paso8KPIs,
  9: Paso9HojaDeRuta,
  10: Paso10Socializacion,
};

export default function PasoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pasoId = parseInt(id, 10);
  const Componente = COMPONENTES[pasoId];

  if (!Componente) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-alico-gray">Paso no encontrado</p>
      </div>
    );
  }

  return (
    <PasoLayout pasoId={pasoId}>
      <Componente />
    </PasoLayout>
  );
}
