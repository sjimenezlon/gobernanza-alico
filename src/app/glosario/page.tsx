"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

interface Termino {
  nombre: string;
  ingles: string;
  definicion: string;
  relevancia: string;
}

interface Categoria {
  nombre: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icono: string;
  terminos: Termino[];
}

const CATEGORIAS: Categoria[] = [
  {
    nombre: "Marcos de Referencia",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icono: "📐",
    terminos: [
      {
        nombre: "ISO/IEC 38505",
        ingles: "Governance of Data",
        definicion:
          "Norma internacional que establece principios para la gobernanza de datos a nivel de la alta dirección. Define tres acciones fundamentales: Evaluar, Dirigir y Monitorizar (Evaluate, Direct, Monitor). Proporciona un marco para que juntas directivas y gerentes generales asuman la responsabilidad sobre los datos como activo estratégico.",
        relevancia:
          "Es el pilar principal del modelo de gobernanza de Alico. Define la responsabilidad desde la Gerencia General hacia abajo, asegurando que los datos de empaques, clientes y producción sean tratados como activos corporativos estratégicos.",
      },
      {
        nombre: "DAMA-DMBOK2",
        ingles: "Data Management Body of Knowledge, 2nd Edition",
        definicion:
          "Guía de referencia publicada por DAMA International que define 11 áreas de conocimiento para la gestión de datos: gobernanza, arquitectura, modelado, almacenamiento, seguridad, integración, calidad, metadatos, datos maestros y de referencia, documentos y contenido, y data warehousing/BI. Es el estándar de facto para profesionales de gestión de datos.",
        relevancia:
          "Proporciona la estructura operativa del modelo de Alico: define los roles (Data Owner, Data Steward), los procesos de calidad y las áreas de conocimiento que se deben desarrollar progresivamente en cada dominio de datos.",
      },
      {
        nombre: "NIST AI RMF",
        ingles: "NIST Artificial Intelligence Risk Management Framework",
        definicion:
          "Marco de gestión de riesgos de IA publicado por el Instituto Nacional de Estándares y Tecnología de EE.UU. Organizado en cuatro funciones: Gobernar (Govern), Mapear (Map), Medir (Measure) y Gestionar (Manage). Promueve la confiabilidad, transparencia y equidad en sistemas de IA.",
        relevancia:
          "Prepara a Alico para adoptar IA de manera responsable. A medida que se implementen modelos predictivos para demanda, calidad o logística, este marco guiará la evaluación de riesgos y sesgos algorítmicos.",
      },
      {
        nombre: "COBIT",
        ingles: "Control Objectives for Information and Related Technologies",
        definicion:
          "Marco de gobierno y gestión de TI desarrollado por ISACA. Define principios, procesos y estructuras organizativas para asegurar que la tecnología de información apoye los objetivos del negocio. Su versión más reciente (COBIT 2019) incluye factores de diseño y áreas de enfoque para personalizar la gobernanza.",
        relevancia:
          "Complementa el modelo de gobernanza de datos al proporcionar controles de TI necesarios para la seguridad, disponibilidad y rendimiento de los sistemas donde residen los datos de Alico (ERP, CRM, sistemas de producción).",
      },
    ],
  },
  {
    nombre: "Roles de Gobernanza",
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    icono: "👥",
    terminos: [
      {
        nombre: "Data Owner",
        ingles: "Propietario de Datos",
        definicion:
          "Rol ejecutivo responsable de un dominio de datos específico. Tiene autoridad para tomar decisiones sobre la definición, calidad y uso de los datos de su dominio. Típicamente es un gerente o director de área que entiende el contexto de negocio de los datos. No gestiona los datos directamente, sino que establece las reglas y rinde cuentas por su calidad.",
        relevancia:
          "En Alico, cada dominio (Cliente, Producto, Proveedor, Financiero, Producción, Cadena de Suministro) tiene un Data Owner asignado. Por ejemplo, el gerente comercial es Data Owner del dominio Cliente y el gerente de planta del dominio Producción.",
      },
      {
        nombre: "Data Steward",
        ingles: "Custodio de Datos",
        definicion:
          "Rol operativo que implementa las políticas y estándares definidos por el Data Owner. Es el guardián diario de la calidad de los datos: valida, corrige, documenta y monitoriza. Conoce en detalle las reglas de negocio, los flujos de datos y los sistemas involucrados. Actúa como puente entre el negocio y TI.",
        relevancia:
          "En Alico, los Data Stewards son los profesionales que trabajan directamente con los datos en cada área: analistas de ventas, coordinadores de producción, asistentes de compras. Son quienes detectan y escalan problemas de calidad.",
      },
      {
        nombre: "Chief Data Officer",
        ingles: "Director de Datos",
        definicion:
          "Ejecutivo de nivel C responsable de la estrategia global de datos de la organización. Lidera la oficina de gobernanza, define la visión y el roadmap de datos, y asegura la alineación entre la estrategia de datos y la estrategia de negocio. En organizaciones medianas, este rol puede combinarse con el de CIO o CTO.",
        relevancia:
          "En Alico, dada su estructura organizacional, este rol puede ser asumido por el líder de TI o Innovación, con reporte directo a la Gerencia General. Es quien coordina transversalmente la gobernanza entre todas las áreas.",
      },
      {
        nombre: "Consejo de Gobernanza",
        ingles: "Data Governance Council",
        definicion:
          "Órgano colegiado de alto nivel que define la dirección estratégica de la gobernanza de datos. Compuesto por representantes de la alta dirección, los Data Owners principales y el líder de datos. Aprueba políticas, prioriza iniciativas, resuelve conflictos entre dominios y monitoriza el cumplimiento de metas.",
        relevancia:
          "En Alico, el Consejo incluye representantes de Gerencia General, TI, Innovación, PMO, Gestión Humana y Jurídica. Se reúne trimestralmente para revisar KPIs de gobernanza y aprobar cambios en políticas.",
      },
      {
        nombre: "Comité Ejecutivo de Datos",
        ingles: "Data Executive Committee",
        definicion:
          "Grupo operativo que se reúne con mayor frecuencia que el Consejo (mensual o quincenal) para dar seguimiento a las iniciativas de gobernanza en curso. Conformado por los Data Owners y Stewards de los dominios prioritarios. Reporta avances y escalaciones al Consejo de Gobernanza.",
        relevancia:
          "En Alico, este comité es clave para la ejecución del día a día: revisa avances en limpieza de datos maestros, estado de migración de sistemas y cumplimiento de estándares de calidad en cada dominio.",
      },
    ],
  },
  {
    nombre: "Conceptos de Gestión de Datos",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icono: "🗄️",
    terminos: [
      {
        nombre: "Gobernanza de Datos",
        ingles: "Data Governance",
        definicion:
          "Ejercicio de autoridad, control y toma de decisiones compartida sobre la gestión de los activos de datos. Incluye la definición de políticas, estándares, roles, procesos y métricas para asegurar que los datos sean tratados como un activo valioso y gestionados con calidad, seguridad y cumplimiento normativo a lo largo de todo su ciclo de vida.",
        relevancia:
          "Es el objetivo central de esta consultoría: establecer en Alico un modelo formal de gobernanza que transforme los datos dispersos en un activo estratégico que impulse la innovación, eficiencia y competitividad.",
      },
      {
        nombre: "Calidad de Datos",
        ingles: "Data Quality",
        definicion:
          "Grado en que los datos cumplen con las expectativas de los usuarios y con los requisitos definidos para su uso previsto. Se mide a través de dimensiones como completitud, exactitud, consistencia, oportunidad, validez y unicidad. Un programa de calidad incluye perfilado, limpieza, monitoreo continuo y reglas de negocio.",
        relevancia:
          "En Alico, la calidad de datos impacta directamente la eficiencia de producción, la precisión de inventarios, la satisfacción del cliente y la capacidad de cumplir con certificaciones como OEA.",
      },
      {
        nombre: "Datos Maestros",
        ingles: "Master Data",
        definicion:
          "Datos de las entidades fundamentales del negocio que son compartidos y reutilizados por múltiples procesos y sistemas. Incluyen datos de clientes, productos, proveedores, empleados, materiales y ubicaciones. Son relativamente estables (cambian con poca frecuencia) y requieren gestión centralizada para evitar duplicados e inconsistencias.",
        relevancia:
          "Para Alico, los datos maestros de Producto (especificaciones de empaques), Cliente (empresas compradoras) y Proveedor (proveedores de materias primas) son críticos. Su calidad determina la eficiencia de toda la cadena de valor.",
      },
      {
        nombre: "Metadatos",
        ingles: "Metadata",
        definicion:
          "Datos que describen otros datos. Incluyen información sobre el significado (metadatos de negocio: definiciones, reglas), la estructura (metadatos técnicos: tipos, formatos, esquemas) y el uso (metadatos operativos: quién accede, cuándo se actualizó, de dónde vino). Son esenciales para la comprensión, descubrimiento y gobierno de los datos.",
        relevancia:
          "Alico necesita documentar los metadatos de sus sistemas clave (ERP, archivos Excel, bases de datos) para que cualquier colaborador pueda entender qué significa cada campo, de dónde viene y quién es responsable.",
      },
      {
        nombre: "Linaje de Datos",
        ingles: "Data Lineage",
        definicion:
          "Registro del origen, transformaciones y destino de un dato a lo largo de su ciclo de vida. Responde a preguntas como: ¿de dónde viene este dato?, ¿qué procesos lo transformaron?, ¿quién lo modificó? Es fundamental para la auditoría, resolución de problemas de calidad y cumplimiento normativo.",
        relevancia:
          "Crítico para que Alico pueda rastrear un dato de producción desde su captura en planta hasta su aparición en un reporte financiero o un certificado de calidad enviado al cliente.",
      },
      {
        nombre: "Catálogo de Datos",
        ingles: "Data Catalog",
        definicion:
          "Inventario organizado y buscable de todos los activos de datos de la organización. Permite a los usuarios descubrir qué datos existen, dónde están, quién es responsable y cómo se pueden usar. Incluye descripciones de negocio, metadatos técnicos, clasificación de sensibilidad y enlaces a políticas aplicables.",
        relevancia:
          "Un catálogo permite a los equipos de Alico encontrar rápidamente los datos que necesitan sin depender de conocimiento tribal. Evita la duplicación de esfuerzos y mejora la productividad de las áreas.",
      },
      {
        nombre: "Diccionario de Datos",
        ingles: "Data Dictionary",
        definicion:
          "Documento o repositorio que define formalmente cada elemento de datos: nombre, descripción de negocio, tipo de dato, formato, valores válidos, reglas de validación, fuente autorizada y responsable. Es más granular que el catálogo y se centra en la definición precisa de cada campo o atributo.",
        relevancia:
          "Esencial para que todas las áreas de Alico hablen el mismo idioma sobre los datos. Por ejemplo, asegurar que \"código de producto\" signifique lo mismo en ventas, producción y logística.",
      },
      {
        nombre: "Dato Estructurado",
        ingles: "Structured Data",
        definicion:
          "Datos organizados en un formato predefinido con campos, tipos y relaciones claras. Típicamente almacenados en bases de datos relacionales o tablas. Son fácilmente buscables, filtrables y analizables. Ejemplos: registros de clientes en CRM, transacciones en ERP, inventarios en hojas de cálculo con formato definido.",
        relevancia:
          "La mayoría de los datos operativos de Alico son estructurados: pedidos, inventarios, fichas técnicas de producto, registros contables. Su gobernanza es más directa pero requiere estándares de calidad rigurosos.",
      },
      {
        nombre: "Dato No Estructurado",
        ingles: "Unstructured Data",
        definicion:
          "Datos sin un esquema predefinido que no se ajustan a tablas o campos fijos. Incluyen documentos de texto, correos electrónicos, imágenes, videos, PDFs, presentaciones y archivos multimedia. Representan aproximadamente el 80% de los datos empresariales y requieren técnicas especiales para su gestión y análisis.",
        relevancia:
          "En Alico, incluyen correos con especificaciones de clientes, fotos de defectos en producción, contratos en PDF, manuales técnicos y certificados de calidad. Su gestión ordenada es un reto que la gobernanza debe abordar.",
      },
    ],
  },
  {
    nombre: "Dimensiones de Calidad",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icono: "✅",
    terminos: [
      {
        nombre: "Completitud",
        ingles: "Completeness",
        definicion:
          "Grado en que todos los valores requeridos de un conjunto de datos están presentes. Un registro está completo cuando no faltan campos obligatorios. Se mide como el porcentaje de campos con valor sobre el total de campos esperados. La incompletitud genera errores en reportes, decisiones incorrectas y reprocesos.",
        relevancia:
          "En Alico, la completitud es crítica en fichas técnicas de producto (un campo faltante puede generar un empaque defectuoso) y en datos de cliente (direcciones incompletas retrasan entregas).",
      },
      {
        nombre: "Exactitud",
        ingles: "Accuracy",
        definicion:
          "Grado en que los datos representan correctamente la realidad que describen. Un dato es exacto cuando coincide con el valor verdadero en el mundo real. Se valida comparando con fuentes autoritativas o mediante verificación directa. Es la dimensión más intuitiva de calidad.",
        relevancia:
          "Los precios, pesos, dimensiones y especificaciones de empaques de Alico deben ser exactos. Un error en la especificación de un material puede generar un lote completo defectuoso.",
      },
      {
        nombre: "Consistencia",
        ingles: "Consistency",
        definicion:
          "Grado en que los datos son uniformes y no se contradicen entre diferentes fuentes, sistemas o registros. Incluye consistencia de formato (mismo formato de fecha en todos los sistemas), de referencia (mismo código de producto en ERP y CRM) y semántica (mismo significado de un campo en diferentes contextos).",
        relevancia:
          "Es un desafío clave en Alico donde los datos fluyen entre múltiples sistemas. Por ejemplo, asegurar que el código de cliente sea consistente entre el ERP, las hojas de pedido y el sistema de facturación.",
      },
      {
        nombre: "Oportunidad",
        ingles: "Timeliness",
        definicion:
          "Grado en que los datos están disponibles en el momento en que se necesitan para la toma de decisiones. Incluye la latencia (tiempo entre el evento real y su registro) y la vigencia (si el dato sigue siendo actual y válido). Datos desactualizados pueden ser tan perjudiciales como datos inexactos.",
        relevancia:
          "En Alico, la oportunidad es vital para datos de producción en tiempo real, niveles de inventario para planificación y datos de despacho para cumplimiento de entregas a tiempo.",
      },
      {
        nombre: "Validez",
        ingles: "Validity",
        definicion:
          "Grado en que los datos se ajustan a las reglas de negocio, formatos y rangos definidos. Un dato es válido si cumple con las restricciones establecidas: formato de correo electrónico, rango de temperatura, valores permitidos en un campo de estado, etc. Se verifica mediante reglas de validación automatizadas.",
        relevancia:
          "En Alico, las reglas de validez incluyen rangos aceptables para dimensiones de empaques, formatos de NIT para clientes, códigos de material según la nomenclatura interna y límites de tolerancia en producción.",
      },
      {
        nombre: "Unicidad",
        ingles: "Uniqueness",
        definicion:
          "Grado en que cada entidad del mundo real se representa una sola vez en el conjunto de datos. La ausencia de unicidad genera duplicados: múltiples registros para el mismo cliente, producto o proveedor. Los duplicados inflan métricas, generan comunicaciones repetidas y dificultan la visión consolidada.",
        relevancia:
          "En Alico, la duplicación de registros de clientes o proveedores genera comunicaciones repetidas, errores en facturación y una visión fragmentada. La deduplicación es una de las primeras victorias rápidas del programa.",
      },
    ],
  },
  {
    nombre: "Términos de Procesos",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icono: "⚙️",
    terminos: [
      {
        nombre: "Matriz RACI",
        ingles: "RACI Matrix",
        definicion:
          "Herramienta de asignación de responsabilidades que define para cada actividad o decisión cuatro roles: Responsable (R, quien ejecuta), Aprobador (A, quien rinde cuentas y tiene autoridad de decisión), Consultado (C, quien aporta conocimiento experto antes de la acción) e Informado (I, quien debe ser notificado después). Evita ambigüedades y vacíos de responsabilidad.",
        relevancia:
          "El Paso 6 del modelo de Alico construye una Matriz RACI para cada proceso de gobernanza, asegurando que sea claro quién hace qué en la gestión de datos de cada dominio.",
      },
      {
        nombre: "KPI",
        ingles: "Key Performance Indicator",
        definicion:
          "Indicador clave de rendimiento que mide el progreso hacia un objetivo específico. En gobernanza de datos, los KPIs miden aspectos como: porcentaje de completitud de datos maestros, tiempo de resolución de incidentes de calidad, número de duplicados detectados, porcentaje de campos documentados en el diccionario de datos, entre otros.",
        relevancia:
          "El Paso 8 define los KPIs de gobernanza de Alico. Permiten al Consejo de Gobernanza monitorizar objetivamente si el programa está generando resultados tangibles y dónde se requiere intervención.",
      },
      {
        nombre: "Data Profiling",
        ingles: "Perfilado de Datos",
        definicion:
          "Proceso de análisis y examen de los datos existentes para entender su estructura, contenido, calidad y relaciones. Incluye el análisis estadístico de valores (distribución, nulos, formatos), detección de patrones, identificación de anomalías y evaluación contra reglas de negocio. Es el primer paso antes de cualquier iniciativa de limpieza o migración.",
        relevancia:
          "Es fundamental como actividad inicial del programa de Alico: antes de limpiar o transformar datos, se debe entender el estado actual de cada fuente de datos para priorizar esfuerzos.",
      },
      {
        nombre: "Data Cleansing",
        ingles: "Limpieza de Datos",
        definicion:
          "Proceso de detección y corrección (o eliminación) de registros corruptos, inexactos, incompletos o irrelevantes de un conjunto de datos. Incluye estandarización de formatos, corrección de errores tipográficos, completitud de campos faltantes, eliminación de duplicados y validación contra fuentes autoritativas. Puede ser manual, semiautomática o automatizada.",
        relevancia:
          "En Alico, la limpieza de datos maestros de clientes y productos será una de las primeras actividades operativas del programa de gobernanza, generando beneficios rápidos y visibles.",
      },
      {
        nombre: "Deduplicación",
        ingles: "Deduplication",
        definicion:
          "Proceso específico de identificación y consolidación de registros duplicados en una base de datos. Utiliza técnicas de coincidencia aproximada (fuzzy matching) para detectar registros que representan la misma entidad del mundo real aunque tengan variaciones en la escritura. El resultado es un registro único y completo (Golden Record).",
        relevancia:
          "En Alico, es especialmente relevante para datos maestros de clientes (variaciones en nombres de empresa) y proveedores (diferentes razones sociales o NIT). Mejora reportes comerciales y reduce errores en facturación.",
      },
      {
        nombre: "ETL",
        ingles: "Extract, Transform, Load",
        definicion:
          "Proceso técnico de integración de datos que consiste en tres fases: Extracción (obtener datos de sistemas fuente), Transformación (limpiar, estandarizar, enriquecer y aplicar reglas de negocio) y Carga (insertar los datos procesados en el sistema destino). Es el mecanismo fundamental para mover datos entre sistemas de manera controlada y auditada.",
        relevancia:
          "Alico requiere procesos ETL para integrar datos entre su ERP, sistemas de producción, hojas de cálculo y potenciales nuevas herramientas analíticas. La gobernanza define los estándares que estos procesos deben cumplir.",
      },
      {
        nombre: "Golden Record",
        ingles: "Registro Dorado",
        definicion:
          "El registro único, autorizado y completo que representa la versión más precisa y actual de una entidad de datos maestros. Se construye consolidando información de múltiples fuentes duplicadas, seleccionando los mejores valores de cada una según reglas de prioridad definidas. Es el resultado final de un proceso de MDM exitoso.",
        relevancia:
          "El objetivo para Alico es tener un Golden Record para cada cliente, producto y proveedor, eliminando la confusión de tener versiones diferentes en distintos sistemas.",
      },
      {
        nombre: "MDM",
        ingles: "Master Data Management",
        definicion:
          "Disciplina de gestión que proporciona procesos, gobernanza y tecnología para asegurar que los datos maestros sean precisos, consistentes y controlados a lo largo de toda la organización. Incluye la definición de la fuente autorizada, reglas de creación y modificación, workflows de aprobación y sincronización entre sistemas.",
        relevancia:
          "MDM es el programa que Alico debe implementar progresivamente para sus dominios prioritarios. Comienza con procesos manuales y reglas claras, y puede evolucionar hacia herramientas tecnológicas especializadas.",
      },
    ],
  },
  {
    nombre: "Seguridad y Cumplimiento",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icono: "🔒",
    terminos: [
      {
        nombre: "Ley 1581 de 2012",
        ingles: "Colombian Personal Data Protection Law",
        definicion:
          "Ley colombiana de protección de datos personales que regula la recolección, almacenamiento, uso, circulación y supresión de datos personales. Establece principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad. Obliga a las organizaciones a obtener autorización expresa, implementar medidas de seguridad y respetar los derechos de los titulares.",
        relevancia:
          "Afecta directamente al dominio de datos de Cliente y Gestión Humana de Alico. La gobernanza debe incluir políticas de consentimiento, procedimientos para atender peticiones de titulares (ARCO) y medidas de seguridad para bases de datos con información personal.",
      },
      {
        nombre: "OEA",
        ingles: "Operador Económico Autorizado / Authorized Economic Operator",
        definicion:
          "Certificación otorgada por la DIAN (Colombia) que acredita a una empresa como operador de confianza en la cadena de suministro internacional. Requiere demostrar gestión de riesgos, trazabilidad documental, control de accesos, seguridad de la información y cumplimiento aduanero. Facilita procedimientos simplificados en comercio exterior.",
        relevancia:
          "La certificación OEA de Alico depende de la capacidad de demostrar trazabilidad completa de la cadena de suministro, control de proveedores y seguridad de la información. La gobernanza de datos es un habilitador directo de estos requisitos.",
      },
      {
        nombre: "NIIF",
        ingles: "Normas Internacionales de Información Financiera / IFRS",
        definicion:
          "Estándares contables internacionales que regulan la preparación y presentación de estados financieros. Requieren datos financieros precisos, completos, oportunos y auditables. Exigen controles sobre la integridad de la información, pistas de auditoría y consistencia en la aplicación de políticas contables.",
        relevancia:
          "El dominio financiero de Alico debe cumplir con NIIF. La gobernanza de datos asegura que los datos que alimentan los estados financieros sean precisos, tengan pistas de auditoría y sean consistentes entre sistemas contables.",
      },
      {
        nombre: "Habeas Data",
        ingles: "Habeas Data",
        definicion:
          "Derecho fundamental reconocido en la Constitución colombiana (Art. 15) y regulado por la Ley 1266 de 2008, que permite a toda persona conocer, actualizar y rectificar la información que sobre ella se haya recogido en bases de datos o archivos. Aplica especialmente a datos financieros, crediticios y comerciales.",
        relevancia:
          "Alico debe garantizar que cualquier empleado, cliente o proveedor pueda ejercer su derecho de habeas data. La gobernanza define los procedimientos para atender estas solicitudes de manera oportuna y documentada.",
      },
      {
        nombre: "Clasificación de Datos",
        ingles: "Data Classification",
        definicion:
          "Proceso de organizar los datos según su nivel de sensibilidad, valor para el negocio y requisitos de protección. Típicamente incluye niveles como: público, interno, confidencial y restringido. Cada nivel tiene controles de acceso, almacenamiento, transmisión y retención específicos. Es la base para aplicar medidas de seguridad proporcionales.",
        relevancia:
          "Alico debe clasificar sus datos para aplicar controles apropiados: los datos personales de clientes requieren máxima protección, mientras que catálogos de productos pueden ser públicos. Esto optimiza recursos de seguridad.",
      },
      {
        nombre: "Mínimo Privilegio",
        ingles: "Least Privilege / Principle of Least Privilege",
        definicion:
          "Principio de seguridad que establece que cada usuario, proceso o sistema debe tener únicamente los permisos mínimos necesarios para realizar su función. Reduce la superficie de ataque, limita el daño potencial de errores o acciones maliciosas y facilita la auditoría de accesos. Se implementa mediante control de acceso basado en roles (RBAC).",
        relevancia:
          "En Alico, este principio se aplica para que cada colaborador solo acceda a los datos que necesita: un vendedor ve datos de sus clientes pero no información financiera confidencial; un operario de planta accede a datos de producción pero no a nómina.",
      },
    ],
  },
  {
    nombre: "IA y Analítica",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    icono: "🤖",
    terminos: [
      {
        nombre: "IA Responsable",
        ingles: "Responsible AI",
        definicion:
          "Enfoque para el diseño, desarrollo y despliegue de sistemas de inteligencia artificial que prioriza la ética, la equidad, la transparencia, la rendición de cuentas y la seguridad. Incluye la evaluación de impactos sociales, la mitigación de sesgos, la protección de la privacidad y la garantía de que los sistemas de IA beneficien a las personas y no les causen daño.",
        relevancia:
          "A medida que Alico adopte herramientas de IA para optimización de producción, predicción de demanda o servicio al cliente, debe hacerlo de manera responsable, evaluando riesgos y asegurando que los resultados sean justos y explicables.",
      },
      {
        nombre: "Sesgo Algorítmico",
        ingles: "Algorithmic Bias",
        definicion:
          "Error sistemático en un sistema de IA que produce resultados injustos o discriminatorios hacia ciertos grupos. Puede originarse en datos de entrenamiento sesgados (sesgo de datos), en decisiones de diseño del modelo (sesgo de modelo) o en la interpretación de resultados (sesgo de confirmación). Es uno de los principales riesgos de la adopción de IA.",
        relevancia:
          "Si Alico implementa modelos de scoring de clientes o priorización de proveedores, debe verificar que no existan sesgos que discriminen injustamente. La gobernanza establece los controles para detectar y mitigar estos sesgos.",
      },
      {
        nombre: "Transparencia",
        ingles: "Transparency",
        definicion:
          "Principio que exige que las decisiones tomadas por sistemas de IA sean comprensibles y explicables para los usuarios y las partes afectadas. Incluye la documentación de los datos de entrenamiento, la lógica del modelo, las métricas de rendimiento y las limitaciones conocidas. Permite la supervisión humana efectiva y la rendición de cuentas.",
        relevancia:
          "Cualquier modelo de IA desplegado en Alico debe poder explicar sus recomendaciones. Si un modelo sugiere rechazar un pedido o cambiar un proveedor, los usuarios deben entender por qué.",
      },
      {
        nombre: "Trazabilidad de Modelos",
        ingles: "Model Traceability",
        definicion:
          "Capacidad de rastrear y documentar todo el ciclo de vida de un modelo de IA: datos de entrenamiento utilizados, decisiones de diseño, versiones del modelo, métricas de rendimiento, pruebas realizadas, aprobaciones obtenidas y resultados en producción. Es el equivalente del linaje de datos pero aplicado a modelos de machine learning.",
        relevancia:
          "Cuando Alico implemente modelos predictivos, la trazabilidad permite auditar cualquier decisión automatizada, cumplir con requisitos regulatorios futuros y mejorar continuamente los modelos.",
      },
      {
        nombre: "MLOps",
        ingles: "Machine Learning Operations",
        definicion:
          "Conjunto de prácticas que combina Machine Learning, DevOps e Ingeniería de Datos para desplegar y mantener modelos de ML en producción de manera confiable y eficiente. Incluye versionamiento de datos y modelos, pipelines automatizados de entrenamiento, monitoreo de rendimiento en producción, detección de drift y re-entrenamiento automatizado.",
        relevancia:
          "A futuro, cuando Alico tenga modelos de IA en producción, MLOps asegurará que estos modelos se mantengan actualizados, se monitoricen continuamente y se actualicen cuando los datos cambien. La gobernanza define las políticas que MLOps debe cumplir.",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

export default function GlosarioPage() {
  const [busqueda, setBusqueda] = useState("");

  const categoriasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return CATEGORIAS;
    const q = busqueda.toLowerCase();
    return CATEGORIAS.map((cat) => ({
      ...cat,
      terminos: cat.terminos.filter(
        (t) =>
          t.nombre.toLowerCase().includes(q) ||
          t.ingles.toLowerCase().includes(q) ||
          t.definicion.toLowerCase().includes(q) ||
          t.relevancia.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.terminos.length > 0);
  }, [busqueda]);

  const totalTerminos = CATEGORIAS.reduce(
    (sum, c) => sum + c.terminos.length,
    0
  );
  const terminosFiltrados = categoriasFiltradas.reduce(
    (sum, c) => sum + c.terminos.length,
    0
  );

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Encabezado */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-alico-dark mb-2">
              Glosario de Gobernanza de Datos
            </h1>
            <p className="text-alico-gray mb-6">
              Referencia completa de{" "}
              <strong className="text-alico-dark">{totalTerminos} términos</strong>{" "}
              organizados en {CATEGORIAS.length} categorías. Cada término incluye
              su definición y relevancia específica para Alico.
            </p>
          </motion.div>

          {/* Barra de búsqueda */}
          <AnimatedSection delay={0.1}>
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-alico-gray"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar término, definición o concepto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-alico-teal focus:ring-2 focus:ring-alico-teal/20 transition-all bg-white"
              />
              {busqueda && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    onClick={() => setBusqueda("")}
                    className="text-alico-gray hover:text-alico-dark transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Contador de resultados */}
          {busqueda && (
            <motion.p
              className="text-sm text-alico-gray mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Mostrando{" "}
              <strong className="text-alico-dark">{terminosFiltrados}</strong> de{" "}
              {totalTerminos} términos
            </motion.p>
          )}

          {/* Índice de categorías */}
          {!busqueda && (
            <AnimatedSection delay={0.15}>
              <div className="flex flex-wrap gap-2 mb-8">
                {CATEGORIAS.map((cat) => (
                  <a
                    key={cat.nombre}
                    href={`#cat-${cat.nombre.replace(/\s+/g, "-").toLowerCase()}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${cat.borderColor} ${cat.bgColor} ${cat.color} hover:shadow-md transition-all`}
                  >
                    <span>{cat.icono}</span>
                    {cat.nombre}
                    <span className="text-[10px] opacity-70">
                      ({cat.terminos.length})
                    </span>
                  </a>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Categorías y términos */}
          {categoriasFiltradas.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-alico-gray text-lg mb-2">
                No se encontraron términos para &ldquo;{busqueda}&rdquo;
              </p>
              <button
                onClick={() => setBusqueda("")}
                className="text-alico-teal hover:underline text-sm"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            categoriasFiltradas.map((cat, ci) => (
              <AnimatedSection
                key={cat.nombre}
                delay={0.1 + ci * 0.05}
                className="mb-10"
              >
                <div
                  id={`cat-${cat.nombre.replace(/\s+/g, "-").toLowerCase()}`}
                  className="scroll-mt-24"
                >
                  <div
                    className={`flex items-center gap-3 mb-4 pb-2 border-b-2 ${cat.borderColor}`}
                  >
                    <span className="text-2xl">{cat.icono}</span>
                    <h2 className={`text-xl font-bold ${cat.color}`}>
                      {cat.nombre}
                    </h2>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.color}`}
                    >
                      {cat.terminos.length} términos
                    </span>
                  </div>

                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                  >
                    {cat.terminos.map((termino) => (
                      <motion.div
                        key={termino.nombre}
                        variants={fadeUp}
                        className={`bg-white border-2 ${cat.borderColor} rounded-xl p-5 hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex flex-wrap items-baseline gap-2 mb-2">
                          <h3 className="text-lg font-bold text-alico-dark">
                            {termino.nombre}
                          </h3>
                          <span className="text-sm text-alico-gray italic">
                            ({termino.ingles})
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                          {termino.definicion}
                        </p>

                        <div
                          className={`${cat.bgColor} rounded-lg p-3 border ${cat.borderColor}`}
                        >
                          <p className="text-xs font-bold text-alico-dark mb-1 flex items-center gap-1.5">
                            <svg
                              className="w-3.5 h-3.5 text-alico-teal"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                            </svg>
                            Relevancia para Alico
                          </p>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {termino.relevancia}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>
      </main>

      <footer className="bg-alico-dark text-gray-400 text-center py-6 text-sm">
        <p>
          Alico Empaques S.A.S BIC &mdash; Plataforma de Gobernanza de Datos e
          IA
        </p>
        <p className="mt-1 text-gray-500">
          ISO/IEC 38505 + DAMA-DMBOK2 + NIST AI RMF
        </p>
      </footer>
    </>
  );
}
