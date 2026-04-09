export interface PreguntaDiagnostico {
  id: string;
  dominio: string;
  pregunta: string;
  ayuda: string;
}

export const NIVELES_MADUREZ = [
  { valor: 1, etiqueta: "Inicial", descripcion: "No hay procesos definidos. Se maneja de forma ad-hoc." },
  { valor: 2, etiqueta: "Repetible", descripcion: "Algunos procesos existen pero no estan documentados." },
  { valor: 3, etiqueta: "Definido", descripcion: "Procesos documentados y estandarizados." },
  { valor: 4, etiqueta: "Gestionado", descripcion: "Se miden y controlan los procesos con metricas." },
  { valor: 5, etiqueta: "Optimizado", descripcion: "Mejora continua basada en datos y retroalimentacion." },
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
    pregunta: "Existe una fuente unica y confiable (master data) para la informacion de clientes?",
    ayuda: "Considere si hay duplicados, datos incompletos o multiples sistemas con datos de clientes diferentes.",
  },
  {
    id: "cli-2",
    dominio: "Cliente",
    pregunta: "Se tiene claridad sobre quien es responsable de la calidad de los datos de clientes?",
    ayuda: "Hay un dueno de datos designado? Se sabe a quien acudir cuando hay un problema?",
  },
  {
    id: "cli-3",
    dominio: "Cliente",
    pregunta: "Los datos de clientes se actualizan de forma oportuna y sistematica?",
    ayuda: "Cuando un cliente cambia de direccion, contacto o condiciones comerciales, se refleja rapido en el sistema?",
  },
  {
    id: "cli-4",
    dominio: "Cliente",
    pregunta: "Existen politicas de privacidad y proteccion de datos personales de clientes?",
    ayuda: "Se cumple con la Ley 1581 de proteccion de datos personales? Hay consentimientos documentados?",
  },
  // Producto
  {
    id: "pro-1",
    dominio: "Producto",
    pregunta: "Las especificaciones tecnicas y BOM (Bill of Materials) estan centralizadas y actualizadas?",
    ayuda: "Hay un sistema unico donde estan todas las fichas tecnicas, o se manejan en archivos dispersos?",
  },
  {
    id: "pro-2",
    dominio: "Producto",
    pregunta: "Los datos de calidad de producto se registran sistematicamente y son trazables?",
    ayuda: "Se puede rastrear un lote desde materia prima hasta producto terminado?",
  },
  {
    id: "pro-3",
    dominio: "Producto",
    pregunta: "Existe un proceso formal para aprobar cambios en especificaciones de producto?",
    ayuda: "Cuando se modifica un producto, hay un flujo de aprobacion documentado?",
  },
  {
    id: "pro-4",
    dominio: "Producto",
    pregunta: "Los datos de innovacion y desarrollo de nuevos productos se gestionan de forma estructurada?",
    ayuda: "Hay un repositorio de pruebas, prototipos y resultados de I+D?",
  },
  // Proveedor
  {
    id: "prv-1",
    dominio: "Proveedor",
    pregunta: "Se tiene un registro centralizado y actualizado de proveedores con evaluaciones de desempeno?",
    ayuda: "Hay un sistema que consolide datos de todos los proveedores, tiempos de entrega, calificaciones?",
  },
  {
    id: "prv-2",
    dominio: "Proveedor",
    pregunta: "Los terminos comerciales y contractuales con proveedores estan digitalizados y accesibles?",
    ayuda: "Se pueden consultar facilmente los acuerdos, precios y condiciones de cada proveedor?",
  },
  {
    id: "prv-3",
    dominio: "Proveedor",
    pregunta: "Existe un proceso de evaluacion y seleccion de proveedores basado en datos?",
    ayuda: "Las decisiones de compra se apoyan en metricas de calidad, costo y cumplimiento?",
  },
  // Financiero
  {
    id: "fin-1",
    dominio: "Financiero",
    pregunta: "Los datos contables y financieros son consistentes entre los diferentes sistemas (ERP, contabilidad)?",
    ayuda: "Hay discrepancias entre lo que muestra el ERP y los reportes financieros?",
  },
  {
    id: "fin-2",
    dominio: "Financiero",
    pregunta: "Los reportes financieros se generan de forma oportuna y con datos verificados?",
    ayuda: "Cuanto tiempo toma cerrar el mes? Los datos requieren mucha depuracion manual?",
  },
  {
    id: "fin-3",
    dominio: "Financiero",
    pregunta: "Existe un proceso claro de validacion y auditoria de datos financieros?",
    ayuda: "Hay controles automatizados o manuales que aseguren la integridad de los datos financieros?",
  },
  // Produccion
  {
    id: "prd-1",
    dominio: "Produccion",
    pregunta: "Los datos de planeacion de produccion y OEE se capturan en tiempo real o cercano?",
    ayuda: "Se registran tiempos de ciclo, paradas, defectos de manera automatica o manual?",
  },
  {
    id: "prd-2",
    dominio: "Produccion",
    pregunta: "Los datos de mantenimiento (preventivo, correctivo) estan integrados con produccion?",
    ayuda: "Se puede correlacionar paradas no planificadas con historiales de mantenimiento?",
  },
  {
    id: "prd-3",
    dominio: "Produccion",
    pregunta: "Los indicadores de eficiencia productiva son confiables y se usan para tomar decisiones?",
    ayuda: "Los gerentes confian en los datos de produccion o sienten que necesitan verificar manualmente?",
  },
  // Cadena de Suministro
  {
    id: "cs-1",
    dominio: "Cadena de Suministro",
    pregunta: "Los datos de inventarios son precisos y se actualizan en tiempo real?",
    ayuda: "Hay diferencias frecuentes entre el inventario fisico y el del sistema?",
  },
  {
    id: "cs-2",
    dominio: "Cadena de Suministro",
    pregunta: "La trazabilidad de import/export cumple con los requisitos OEA y regulatorios?",
    ayuda: "Se puede demostrar la cadena de custodia completa ante una auditoria?",
  },
  {
    id: "cs-3",
    dominio: "Cadena de Suministro",
    pregunta: "Los datos logisticos (despachos, tiempos de entrega) se analizan para optimizar operaciones?",
    ayuda: "Se usan los datos para identificar cuellos de botella y mejorar tiempos?",
  },
  {
    id: "cs-4",
    dominio: "Cadena de Suministro",
    pregunta: "Existe integracion de datos entre las areas de compras, almacen y despachos?",
    ayuda: "La informacion fluye entre estas areas o cada una maneja sus propios registros?",
  },
];
