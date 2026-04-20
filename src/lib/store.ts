"use client";

// localStorage wrapper for persisting governance data

export interface DiagnosticoRespuesta {
  dominio: string;
  pregunta: string;
  valor: number; // 1-5
  comentario?: string;
}

export interface DominioConfig {
  nombre: string;
  propietario: string;
  custodio: string;
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
  riesgos: string;
}

export interface RACIEntry {
  proceso: string;
  responsable: string;
  aprobador: string;
  consultado: string;
  informado: string;
}

export interface Politica {
  titulo: string;
  objetivo: string;
  alcance: string;
  contenido: string;
  responsable: string;
}

export interface KPI {
  nombre: string;
  descripcion: string;
  metaInicial: string;
  frecuencia: string;
  responsable: string;
  dominio: string;
}

export interface HitoRuta {
  fase: string;
  titulo: string;
  descripcion: string;
  meses: string;
  dominios: string;
  estado: "pendiente" | "en_curso" | "completado";
}

export interface Socializacion {
  audiencia: string;
  mensaje: string;
  formato: string;
  fecha: string;
  responsable: string;
}

export interface EjecucionEstado {
  // clave: itemId (ej. "0.1"), valor: datos de ejecución
  estado: "pendiente" | "en_curso" | "completado";
  responsableAsignado?: string;
  fechaObjetivo?: string;
  notas?: string;
}

export interface GobernanzaData {
  diagnostico: DiagnosticoRespuesta[];
  dominios: DominioConfig[];
  estructuraGobierno: {
    consejo: string;
    comiteEjecutivo: string;
    dataOwners: string;
    dataStewards: string;
    notas: string;
  };
  raci: RACIEntry[];
  politicas: Politica[];
  kpis: KPI[];
  hojaDeRuta: HitoRuta[];
  socializacion: Socializacion[];
  ejecucion: Record<string, EjecucionEstado>;
  pasoActual: number;
  ultimaActualizacion: string;
}

const STORAGE_KEY = "gobernanza-alico-data";

const defaultData: GobernanzaData = {
  diagnostico: [],
  dominios: [],
  estructuraGobierno: {
    consejo: "",
    comiteEjecutivo: "",
    dataOwners: "",
    dataStewards: "",
    notas: "",
  },
  raci: [],
  politicas: [],
  kpis: [],
  hojaDeRuta: [],
  socializacion: [],
  ejecucion: {},
  pasoActual: 0,
  ultimaActualizacion: new Date().toISOString(),
};

export function getData(): GobernanzaData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return defaultData;
  }
}

export function saveData(data: Partial<GobernanzaData>) {
  if (typeof window === "undefined") return;
  const current = getData();
  const updated = {
    ...current,
    ...data,
    ultimaActualizacion: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function resetData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
