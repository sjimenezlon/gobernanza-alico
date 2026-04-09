export interface PreguntaDiagnostico {
  id: string;
  dominio: string;
  pregunta: string;
  ayuda: string;
}

export const NIVELES_MADUREZ = [
  { valor: 1, etiqueta: "Inicial", descripcion: "No hay procesos definidos. Se maneja de forma ad-hoc." },
  { valor: 2, etiqueta: "Repetible", descripcion: "Algunos procesos existen pero no están documentados." },
  { valor: 3, etiqueta: "Definido", descripcion: "Procesos documentados y estandarizados." },
  { valor: 4, etiqueta: "Gestionado", descripcion: "Se miden y controlan los procesos con métricas." },
  { valor: 5, etiqueta: "Optimizado", descripcion: "Mejora continua basada en datos y retroalimentación." },
];

export const DOMINIOS_DIAGNOSTICO = [
  "Cliente",
  "Producto",
  "Proveedor",
  "Financiero",
  "Produccion",
  "Cadena de Suministro",
];

export const PREGUNTAS: PreguntaDiagnostico[] = [
  // Cliente
  {
    id: "cli-1",
    dominio: "Cliente",
    pregunta: "¿Existe una fuente única y confiable (master data) para la información de clientes?",
    ayuda: "Considere si hay duplicados, datos incompletos o múltiples sistemas con datos de clientes diferentes.",
  },
  {
    id: "cli-2",
    dominio: "Cliente",
    pregunta: "¿Se tiene claridad sobre quién es responsable de la calidad de los datos de clientes?",
    ayuda: "¿Hay un dueño de datos designado? ¿Se sabe a quién acudir cuando hay un problema?",
  },
  {
    id: "cli-3",
    dominio: "Cliente",
    pregunta: "¿Los datos de clientes se actualizan de forma oportuna y sistemática?",
    ayuda: "Cuando un cliente cambia de dirección, contacto o condiciones comerciales, ¿se refleja rápido en el sistema?",
  },
  {
    id: "cli-4",
    dominio: "Cliente",
    pregunta: "¿Existen políticas de privacidad y protección de datos personales de clientes?",
    ayuda: "¿Se cumple con la Ley 1581 de protección de datos personales? ¿Hay consentimientos documentados?",
  },
  {
    id: "cli-5",
    dominio: "Cliente",
    pregunta: "¿Se realizan análisis periódicos de segmentación y comportamiento de clientes basados en datos?",
    ayuda: "¿Existen reportes regulares de patrones de compra, rentabilidad por cliente, o churn?",
  },
  // Producto
  {
    id: "pro-1",
    dominio: "Producto",
    pregunta: "¿Las especificaciones técnicas y BOM (Bill of Materials) están centralizadas y actualizadas?",
    ayuda: "¿Hay un sistema único donde están todas las fichas técnicas, o se manejan en archivos dispersos?",
  },
  {
    id: "pro-2",
    dominio: "Producto",
    pregunta: "¿Los datos de calidad de producto se registran sistemáticamente y son trazables?",
    ayuda: "¿Se puede rastrear un lote desde materia prima hasta producto terminado?",
  },
  {
    id: "pro-3",
    dominio: "Producto",
    pregunta: "¿Existe un proceso formal para aprobar cambios en especificaciones de producto?",
    ayuda: "Cuando se modifica un producto, ¿hay un flujo de aprobación documentado?",
  },
  {
    id: "pro-4",
    dominio: "Producto",
    pregunta: "¿Los datos de innovación y desarrollo de nuevos productos se gestionan de forma estructurada?",
    ayuda: "¿Hay un repositorio de pruebas, prototipos y resultados de I+D?",
  },
  {
    id: "pro-5",
    dominio: "Producto",
    pregunta: "¿Los datos de sostenibilidad del producto (huella de carbono, material reciclado) se registran y son trazables?",
    ayuda: "¿Puede Alico responder a un cliente que pide datos de huella de carbono de un producto específico?",
  },
  // Proveedor
  {
    id: "prv-1",
    dominio: "Proveedor",
    pregunta: "¿Se tiene un registro centralizado y actualizado de proveedores con evaluaciones de desempeño?",
    ayuda: "¿Hay un sistema que consolide datos de todos los proveedores, tiempos de entrega, calificaciones?",
  },
  {
    id: "prv-2",
    dominio: "Proveedor",
    pregunta: "¿Los términos comerciales y contractuales con proveedores están digitalizados y accesibles?",
    ayuda: "¿Se pueden consultar fácilmente los acuerdos, precios y condiciones de cada proveedor?",
  },
  {
    id: "prv-3",
    dominio: "Proveedor",
    pregunta: "¿Existe un proceso de evaluación y selección de proveedores basado en datos?",
    ayuda: "¿Las decisiones de compra se apoyan en métricas de calidad, costo y cumplimiento?",
  },
  {
    id: "prv-4",
    dominio: "Proveedor",
    pregunta: "¿Se monitorean indicadores de riesgo de proveedores críticos de forma proactiva?",
    ayuda: "¿Hay alertas cuando un proveedor clave tiene problemas de calidad, tiempos o financieros?",
  },
  // Financiero
  {
    id: "fin-1",
    dominio: "Financiero",
    pregunta: "¿Los datos contables y financieros son consistentes entre los diferentes sistemas (ERP, contabilidad)?",
    ayuda: "¿Hay discrepancias entre lo que muestra el ERP y los reportes financieros?",
  },
  {
    id: "fin-2",
    dominio: "Financiero",
    pregunta: "¿Los reportes financieros se generan de forma oportuna y con datos verificados?",
    ayuda: "¿Cuánto tiempo toma cerrar el mes? ¿Los datos requieren mucha depuración manual?",
  },
  {
    id: "fin-3",
    dominio: "Financiero",
    pregunta: "¿Existe un proceso claro de validación y auditoría de datos financieros?",
    ayuda: "¿Hay controles automatizados o manuales que aseguren la integridad de los datos financieros?",
  },
  {
    id: "fin-4",
    dominio: "Financiero",
    pregunta: "¿Los datos de costos de producción están integrados con los sistemas de planeación financiera?",
    ayuda: "¿Se puede calcular el costo real por producto en tiempo cercano al real?",
  },
  // Producción
  {
    id: "prd-1",
    dominio: "Produccion",
    pregunta: "¿Los datos de planeación de producción y OEE se capturan en tiempo real o cercano?",
    ayuda: "¿Se registran tiempos de ciclo, paradas, defectos de manera automática o manual?",
  },
  {
    id: "prd-2",
    dominio: "Produccion",
    pregunta: "¿Los datos de mantenimiento (preventivo, correctivo) están integrados con producción?",
    ayuda: "¿Se puede correlacionar paradas no planificadas con historiales de mantenimiento?",
  },
  {
    id: "prd-3",
    dominio: "Produccion",
    pregunta: "¿Los indicadores de eficiencia productiva son confiables y se usan para tomar decisiones?",
    ayuda: "¿Los gerentes confían en los datos de producción o sienten que necesitan verificar manualmente?",
  },
  {
    id: "prd-4",
    dominio: "Produccion",
    pregunta: "¿Los datos de calidad en línea (inspección visual, cromatografía) se integran con los registros de producción?",
    ayuda: "¿Se correlacionan automáticamente los resultados de inspección con lotes y órdenes de producción?",
  },
  {
    id: "prd-5",
    dominio: "Produccion",
    pregunta: "¿Existen datos históricos suficientes para implementar mantenimiento predictivo?",
    ayuda: "¿Se tienen registros de al menos 12 meses de fallas, intervenciones y condiciones operativas?",
  },
  // Cadena de Suministro
  {
    id: "cs-1",
    dominio: "Cadena de Suministro",
    pregunta: "¿Los datos de inventarios son precisos y se actualizan en tiempo real?",
    ayuda: "¿Hay diferencias frecuentes entre el inventario físico y el del sistema?",
  },
  {
    id: "cs-2",
    dominio: "Cadena de Suministro",
    pregunta: "¿La trazabilidad de import/export cumple con los requisitos OEA y regulatorios?",
    ayuda: "¿Se puede demostrar la cadena de custodia completa ante una auditoría?",
  },
  {
    id: "cs-3",
    dominio: "Cadena de Suministro",
    pregunta: "¿Los datos logísticos (despachos, tiempos de entrega) se analizan para optimizar operaciones?",
    ayuda: "¿Se usan los datos para identificar cuellos de botella y mejorar tiempos?",
  },
  {
    id: "cs-4",
    dominio: "Cadena de Suministro",
    pregunta: "¿Existe integración de datos entre las áreas de compras, almacén y despachos?",
    ayuda: "¿La información fluye entre estas áreas o cada una maneja sus propios registros?",
  },
  {
    id: "cs-5",
    dominio: "Cadena de Suministro",
    pregunta: "¿Los datos de demanda y pronóstico se comparten entre las áreas de ventas, planeación y producción?",
    ayuda: "¿Hay un proceso formal S&OP (Sales & Operations Planning) basado en datos integrados?",
  },
  {
    id: "cs-6",
    dominio: "Cadena de Suministro",
    pregunta: "¿Se miden y analizan los costos logísticos por ruta, cliente o tipo de despacho?",
    ayuda: "¿Los datos logísticos permiten optimizar rutas y reducir costos de distribución?",
  },
];
