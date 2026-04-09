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
    subtitulo: "Entender por qué la gobernanza de datos es crítica para Alico",
    descripcion: "Revisión del contexto competitivo, regulatorio y operativo que hace urgente gestionar los datos como un activo estratégico.",
    icon: "🏭",
    fase: "Fase 1: Caracterización",
  },
  {
    id: 2,
    titulo: "Diagnóstico de Madurez",
    subtitulo: "Evaluar el estado actual de la gestión de datos",
    descripcion: "Autodiagnóstico por dominio de datos para identificar brechas, riesgos y oportunidades en la organización.",
    icon: "📊",
    fase: "Fase 1: Caracterización",
  },
  {
    id: 3,
    titulo: "Resultados del Diagnóstico",
    subtitulo: "Visualizar y analizar los hallazgos",
    descripcion: "Dashboard interactivo con los resultados del autodiagnóstico, mostrando niveles de madurez por dominio y áreas prioritarias.",
    icon: "📈",
    fase: "Fase 1: Caracterización",
  },
  {
    id: 4,
    titulo: "Dominios de Datos",
    subtitulo: "Mapear y priorizar los dominios críticos",
    descripcion: "Identificar los dominios de datos de la organización, sus propietarios potenciales y los riesgos asociados.",
    icon: "🗂️",
    fase: "Fase 2: Diálogo",
  },
  {
    id: 5,
    titulo: "Estructura de Gobierno",
    subtitulo: "Diseñar la estructura organizacional",
    descripcion: "Definir el Consejo de Gobernanza, roles de Data Owners y Data Stewards, y la estructura de toma de decisiones.",
    icon: "🏛️",
    fase: "Fase 2: Diálogo",
  },
  {
    id: 6,
    titulo: "Matriz RACI",
    subtitulo: "Asignar responsabilidades claras",
    descripcion: "Construir la matriz de responsabilidades para cada proceso clave de gestión de datos.",
    icon: "👥",
    fase: "Fase 3: Consolidación",
  },
  {
    id: 7,
    titulo: "Políticas y Procesos",
    subtitulo: "Redactar las políticas de gobernanza",
    descripcion: "Escribir las políticas marco, estándares de calidad, seguridad y privacidad de datos.",
    icon: "📝",
    fase: "Fase 3: Consolidación",
  },
  {
    id: 8,
    titulo: "Métricas y KPIs",
    subtitulo: "Definir cómo medir el éxito",
    descripcion: "Establecer indicadores clave de rendimiento para monitorear la efectividad del modelo de gobernanza.",
    icon: "🎯",
    fase: "Fase 3: Consolidación",
  },
  {
    id: 9,
    titulo: "Hoja de Ruta",
    subtitulo: "Planificar la implementación",
    descripcion: "Crear el plan de implementación por olas de valor, priorizando dominios de alto impacto.",
    icon: "🗺️",
    fase: "Fase 4: Socialización",
  },
  {
    id: 10,
    titulo: "Socialización",
    subtitulo: "Preparar la comunicación y capacitación",
    descripcion: "Generar materiales de socialización, plan de capacitación y estrategia de gestión del cambio.",
    icon: "🎓",
    fase: "Fase 4: Socialización",
  },
];

export const FASES = [
  { nombre: "Fase 1: Caracterización", color: "bg-blue-600", pasos: [1, 2, 3] },
  { nombre: "Fase 2: Diálogo", color: "bg-teal-600", pasos: [4, 5] },
  { nombre: "Fase 3: Consolidación", color: "bg-amber-600", pasos: [6, 7, 8] },
  { nombre: "Fase 4: Socialización", color: "bg-emerald-600", pasos: [9, 10] },
];
