export interface Paso {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  icon: string;
  fase: string;
}

export const PASOS: Paso[] = [
  {
    id: 1,
    titulo: "Contexto y Punto de Partida",
    subtitulo: "Entender por que la gobernanza de datos es critica para Alico",
    descripcion: "Revision del contexto competitivo, regulatorio y operativo que hace urgente gestionar los datos como un activo estrategico.",
    icon: "🏭",
    fase: "Fase 1: Caracterizacion",
  },
  {
    id: 2,
    titulo: "Diagnostico de Madurez",
    subtitulo: "Evaluar el estado actual de la gestion de datos",
    descripcion: "Autodiagnostico por dominio de datos para identificar brechas, riesgos y oportunidades en la organizacion.",
    icon: "📊",
    fase: "Fase 1: Caracterizacion",
  },
  {
    id: 3,
    titulo: "Resultados del Diagnostico",
    subtitulo: "Visualizar y analizar los hallazgos",
    descripcion: "Dashboard interactivo con los resultados del autodiagnostico, mostrando niveles de madurez por dominio y areas prioritarias.",
    icon: "📈",
    fase: "Fase 1: Caracterizacion",
  },
  {
    id: 4,
    titulo: "Dominios de Datos",
    subtitulo: "Mapear y priorizar los dominios criticos",
    descripcion: "Identificar los dominios de datos de la organizacion, sus propietarios potenciales y los riesgos asociados.",
    icon: "🗂️",
    fase: "Fase 2: Dialogo",
  },
  {
    id: 5,
    titulo: "Estructura de Gobierno",
    subtitulo: "Disenar la estructura organizacional",
    descripcion: "Definir el Consejo de Gobernanza, roles de Data Owners y Data Stewards, y la estructura de toma de decisiones.",
    icon: "🏛️",
    fase: "Fase 2: Dialogo",
  },
  {
    id: 6,
    titulo: "Matriz RACI",
    subtitulo: "Asignar responsabilidades claras",
    descripcion: "Construir la matriz de responsabilidades para cada proceso clave de gestion de datos.",
    icon: "👥",
    fase: "Fase 3: Consolidacion",
  },
  {
    id: 7,
    titulo: "Politicas y Procesos",
    subtitulo: "Redactar las politicas de gobernanza",
    descripcion: "Escribir las politicas marco, estandares de calidad, seguridad y privacidad de datos.",
    icon: "📝",
    fase: "Fase 3: Consolidacion",
  },
  {
    id: 8,
    titulo: "Metricas y KPIs",
    subtitulo: "Definir como medir el exito",
    descripcion: "Establecer indicadores clave de rendimiento para monitorear la efectividad del modelo de gobernanza.",
    icon: "🎯",
    fase: "Fase 3: Consolidacion",
  },
  {
    id: 9,
    titulo: "Hoja de Ruta",
    subtitulo: "Planificar la implementacion",
    descripcion: "Crear el plan de implementacion por olas de valor, priorizando dominios de alto impacto.",
    icon: "🗺️",
    fase: "Fase 4: Socializacion",
  },
  {
    id: 10,
    titulo: "Socializacion",
    subtitulo: "Preparar la comunicacion y capacitacion",
    descripcion: "Generar materiales de socializacion, plan de capacitacion y estrategia de gestion del cambio.",
    icon: "🎓",
    fase: "Fase 4: Socializacion",
  },
];

export const FASES = [
  { nombre: "Fase 1: Caracterizacion", color: "bg-blue-600", pasos: [1, 2, 3] },
  { nombre: "Fase 2: Dialogo", color: "bg-teal-600", pasos: [4, 5] },
  { nombre: "Fase 3: Consolidacion", color: "bg-amber-600", pasos: [6, 7, 8] },
  { nombre: "Fase 4: Socializacion", color: "bg-emerald-600", pasos: [9, 10] },
];
