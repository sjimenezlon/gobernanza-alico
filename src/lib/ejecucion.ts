// Plan de ejecución accionable por paso — para que el equipo Alico lo ejecute

export interface ItemEjecucion {
  id: string;
  titulo: string;
  descripcion: string;
  responsable: string;
  entregable: string;
  plantilla?: {
    nombre: string;
    contenido: string; // texto plano/markdown que se descarga
  };
  duracion: string;
}

export const EJECUCION_POR_PASO: Record<number, ItemEjecucion[]> = {
  0: [
    {
      id: "0.1",
      titulo: "Carta de patrocinio ejecutivo",
      descripcion:
        "Documento firmado por Gerencia General que establece el mandato, alcance, presupuesto y autoridad del programa de gobernanza.",
      responsable: "Gerencia General + Junta Directiva",
      entregable: "Carta firmada (1 página) publicada en intranet Alico",
      duracion: "1 semana",
      plantilla: {
        nombre: "carta_patrocinio_alico.md",
        contenido: `# Carta de Patrocinio — Programa de Gobernanza de Datos e IA
**Alico Empaques S.A.S BIC**
Fecha: _______________

## Mandato
La Gerencia General de Alico Empaques S.A.S BIC establece por medio de la presente el **Programa de Gobernanza de Datos e Inteligencia Artificial**, como capacidad organizacional estratégica alineada con los pilares de Transformación Digital, Innovación, Desarrollo Sostenible, Experiencia Superior, Gestión del Desempeño y Cumplimiento Normativo.

## Alcance
El programa cubre los 6 dominios de datos críticos: Cliente, Producto, Proveedor, Financiero, Producción y Cadena de Suministro. Aplica a todas las áreas funcionales y a todos los sistemas que gestionen datos corporativos.

## Marcos de referencia
- ISO/IEC 38505 — Gobernanza de datos corporativa
- DAMA-DMBOK2 — Gestión de datos
- NIST AI RMF — Gestión de riesgos de IA

## Autoridad y presupuesto
- Se delega autoridad ejecutiva al **Líder de Gobernanza de Datos** para convocar, decidir y escalar a Gerencia.
- Se asigna presupuesto inicial de _______________ COP para el año _______________.
- Se aprueba la dedicación parcial del personal descrito en el Paso 5 (Estructura de Gobierno).

## Compromisos de la Gerencia
1. Participar activamente en el Consejo de Gobernanza (mínimo trimestral).
2. Validar y firmar las políticas marco al cierre de la Fase 3.
3. Comunicar el mandato a toda la organización.

## Firmas

___________________________
Gerente General

___________________________
Presidente de la Junta
`,
      },
    },
    {
      id: "0.2",
      titulo: "Nombramiento del Líder de Gobernanza de Datos",
      descripcion:
        "Memorando de nombramiento del CDO/Líder. Debe tener peso de negocio + credibilidad técnica. Perfiles candidatos: Innovación, TI o PMO.",
      responsable: "Gerencia General",
      entregable: "Memorando de nombramiento + actualización de funciones en GH",
      duracion: "1 semana",
      plantilla: {
        nombre: "memorando_lider_gobernanza.md",
        contenido: `# Memorando de Nombramiento
**De:** Gerencia General — Alico Empaques S.A.S BIC
**Para:** _______________
**Fecha:** _______________
**Asunto:** Nombramiento como Líder de Gobernanza de Datos e IA

## Designación
Se designa a **_______________** como **Líder de Gobernanza de Datos e IA** de Alico Empaques S.A.S BIC, con efecto a partir del _______________.

## Responsabilidades
1. Presidir el Consejo de Gobernanza de Datos.
2. Coordinar el diseño e implementación del modelo según ISO/IEC 38505, DAMA-DMBOK2 y NIST AI RMF.
3. Articular a Data Owners (gerentes de área) y Data Stewards operativos.
4. Reportar trimestralmente a Gerencia y Junta sobre madurez, KPIs y riesgos.
5. Aprobar estándares de calidad, seguridad y privacidad de datos.

## Autoridad delegada
- Convocatoria vinculante a gerentes de área para temas de datos.
- Escalamiento directo a Gerencia General.
- Firma de políticas operativas (las marco quedan en Gerencia).

## Dedicación estimada
- Primeros 4 meses: 40% del tiempo laboral.
- Régimen estable: 20-25% del tiempo laboral.

___________________________
Gerente General
`,
      },
    },
    {
      id: "0.3",
      titulo: "Convocatoria del Consejo de Gobernanza",
      descripcion:
        "Identificar representantes por área y enviar convocatoria formal al Consejo. Áreas mínimas: Innovación, TI, PMO, GH, Jurídica, Gerencia General.",
      responsable: "Líder de Gobernanza",
      entregable: "Lista nominal del Consejo + convocatoria aceptada por todos",
      duracion: "1 semana",
      plantilla: {
        nombre: "convocatoria_consejo.md",
        contenido: `# Convocatoria — Consejo de Gobernanza de Datos e IA
**Alico Empaques S.A.S BIC**

## Miembros designados
| Área | Representante | Rol en Consejo |
|------|---------------|----------------|
| Gerencia General | _______________ | Sponsor |
| Innovación | _______________ | Miembro |
| TI | _______________ | Miembro |
| PMO | _______________ | Secretario Técnico |
| Gestión Humana | _______________ | Miembro |
| Jurídica | _______________ | Miembro |
| Líder Gobernanza | _______________ | Presidente |

## Reglas de funcionamiento
- **Frecuencia:** mensual los primeros 6 meses, luego trimestral.
- **Duración:** 90 minutos máx.
- **Quórum:** 5 de 7 miembros.
- **Decisiones:** por consenso; si no, Gerencia desempata.
- **Agenda:** publicada 72h antes; actas firmadas antes de 5 días hábiles.

## Primera sesión (Kickoff)
Fecha propuesta: _______________
Lugar / canal: _______________

Agenda:
1. Lectura de la Carta de Patrocinio (10')
2. Presentación del modelo (marcos + 10 pasos) (20')
3. Validación de los 6 dominios de datos (20')
4. Asignación preliminar de Data Owners (20')
5. Cronograma Sprint 4 semanas (15')
6. Compromisos y cierre (5')
`,
      },
    },
    {
      id: "0.4",
      titulo: "Acta de constitución + reunión de kickoff",
      descripcion:
        "Ejecutar la primera reunión formal del Consejo, firmar acta de constitución, validar dominios y fijar cronograma del Sprint.",
      responsable: "Líder de Gobernanza + Consejo",
      entregable: "Acta firmada + cronograma Sprint 4 semanas aprobado",
      duracion: "2 semanas",
      plantilla: {
        nombre: "acta_constitucion_consejo.md",
        contenido: `# Acta de Constitución — Consejo de Gobernanza de Datos e IA
**Alico Empaques S.A.S BIC**
Fecha: _______________ | Hora: _______________
Lugar: _______________

## Asistentes
- _______________ (Gerencia General / Sponsor)
- _______________ (Líder de Gobernanza / Presidente)
- _______________ (Innovación)
- _______________ (TI)
- _______________ (PMO / Secretario)
- _______________ (Gestión Humana)
- _______________ (Jurídica)

## Agenda desarrollada
1. Lectura de la Carta de Patrocinio
2. Presentación del modelo integrado (ISO 38505 + DAMA + NIST AI RMF)
3. Validación de los 6 dominios de datos
4. Asignación preliminar de Data Owners
5. Cronograma Sprint 4 semanas
6. Compromisos

## Decisiones tomadas
| # | Decisión | Responsable | Fecha |
|---|----------|-------------|-------|
| 1 | Se aprueba la constitución del Consejo | Todos | Hoy |
| 2 | Data Owners designados por dominio | Ver tabla | Semana 1 |
| 3 | Próxima sesión | Secretario | _______________ |

## Data Owners designados (preliminar)
| Dominio | Data Owner |
|---------|------------|
| Cliente | Gte. Mercadeo y Ventas |
| Producto | Gte. Gestión Tecnológica |
| Proveedor | Gte. Abastecimiento |
| Financiero | Director Financiero |
| Producción | Gte. Manufactura |
| Cadena de Suministro | Gte. Abastecimiento |

## Cronograma Sprint 4 semanas
- **S1:** Cerrar diagnóstico (encuesta + taller dominios)
- **S2:** Estructura de gobierno + roles + RACI
- **S3:** Políticas + procesos + KPIs
- **S4:** Validación directiva + socialización + entrega

## Compromisos y próximos pasos
1. _______________ (responsable _______________ · fecha _______________)
2. _______________ (responsable _______________ · fecha _______________)
3. _______________ (responsable _______________ · fecha _______________)

## Firmas

___________________________        ___________________________
Presidente del Consejo             Sponsor (Gerencia General)

___________________________
Secretario Técnico (PMO)
`,
      },
    },
  ],
  1: [
    {
      id: "1.1",
      titulo: "Socializar contexto con líderes clave",
      descripcion:
        "Reunión 1:1 o pequeño grupo con cada gerente de área para explicar el programa y el por qué ahora.",
      responsable: "Líder de Gobernanza",
      entregable: "Bitácora de reuniones con 6 gerentes de dominio",
      duracion: "1 semana",
    },
    {
      id: "1.2",
      titulo: "Validar los 6 dominios de datos propuestos",
      descripcion:
        "Confirmar con Consejo si los dominios Cliente/Producto/Proveedor/Financiero/Producción/Cadena aplican sin modificación.",
      responsable: "Consejo de Gobernanza",
      entregable: "Acta con dominios aprobados",
      duracion: "1 sesión",
    },
  ],
  2: [
    {
      id: "2.1",
      titulo: "Aplicar autodiagnóstico por dominio",
      descripcion:
        "Cada Data Owner responde las preguntas de madurez para su dominio usando la herramienta.",
      responsable: "Data Owners",
      entregable: "Respuestas guardadas en la plataforma (6 dominios)",
      duracion: "1 semana",
    },
    {
      id: "2.2",
      titulo: "Taller de triangulación",
      descripcion:
        "Sesión de 2h para contrastar percepciones entre áreas y alinear criterios de puntuación.",
      responsable: "Líder de Gobernanza",
      entregable: "Memoria del taller + puntuaciones consolidadas",
      duracion: "2 horas",
    },
  ],
  3: [
    {
      id: "3.1",
      titulo: "Presentar resultados al Consejo",
      descripcion:
        "Revisar dashboard, identificar dominios en rojo y definir prioridades de intervención.",
      responsable: "Líder de Gobernanza",
      entregable: "Presentación ejecutiva + acta con priorización",
      duracion: "1 sesión",
    },
  ],
  4: [
    {
      id: "4.1",
      titulo: "Completar ficha de cada dominio",
      descripcion:
        "Propietario, custodio, criticidad, sistemas fuente, riesgos y volumen estimado.",
      responsable: "Data Owners + Líder",
      entregable: "6 fichas de dominio completas en la plataforma",
      duracion: "2 semanas",
    },
  ],
  5: [
    {
      id: "5.1",
      titulo: "Formalizar la estructura de gobierno",
      descripcion:
        "Documento con Consejo + Comité Ejecutivo + Data Owners + Data Stewards. Aprobado por Gerencia.",
      responsable: "Líder de Gobernanza + Gerencia",
      entregable: "Documento de estructura aprobado y publicado",
      duracion: "1 semana",
    },
    {
      id: "5.2",
      titulo: "Designar Data Stewards operativos",
      descripcion:
        "1-2 Stewards por dominio. Perfiles: quienes hoy mantienen los datos en el día a día.",
      responsable: "Data Owners",
      entregable: "Lista nominal de Stewards + memorandos GH",
      duracion: "1 semana",
    },
  ],
  6: [
    {
      id: "6.1",
      titulo: "Construir RACI para procesos clave",
      descripcion:
        "Procesos mínimos: alta de cliente, cambio de BOM, onboarding de proveedor, cierre contable, liberación de lote.",
      responsable: "Líder + Data Stewards",
      entregable: "Matriz RACI aprobada por Consejo",
      duracion: "2 semanas",
    },
  ],
  7: [
    {
      id: "7.1",
      titulo: "Redactar políticas marco",
      descripcion:
        "Política general, calidad de datos, seguridad, privacidad (Ley 1581), uso ético de IA (NIST AI RMF).",
      responsable: "Líder + Jurídica",
      entregable: "5 políticas marco firmadas por Gerencia",
      duracion: "3 semanas",
    },
  ],
  8: [
    {
      id: "8.1",
      titulo: "Definir KPIs baseline por dominio",
      descripcion:
        "% completitud, % consistencia, tiempo de resolución de issues, cobertura de RACI, cumplimiento de política.",
      responsable: "Data Owners + Líder",
      entregable: "Tablero de KPIs con mediciones iniciales",
      duracion: "2 semanas",
    },
  ],
  9: [
    {
      id: "9.1",
      titulo: "Plan por olas de valor (6-12-18 meses)",
      descripcion:
        "Priorizar dominios por impacto vs esfuerzo. Ola 1: 1-2 dominios críticos. Ola 2-3: expandir.",
      responsable: "Líder + Consejo",
      entregable: "Hoja de ruta aprobada con presupuesto estimado",
      duracion: "2 semanas",
    },
  ],
  10: [
    {
      id: "10.1",
      titulo: "Campaña interna de lanzamiento",
      descripcion:
        "Comunicación Gerencia + jornada masiva + capacitación asincrónica en Universidad Corporativa Alico.",
      responsable: "Líder + Comunicaciones + GH",
      entregable: "Plan de comunicación ejecutado + asistencia registrada",
      duracion: "4 semanas",
    },
  ],
};
