/**
 * Plantillas de contenido pre-redactado para las 6 políticas de gobernanza de datos.
 * Escritas para Alico Empaques S.A.S BIC (empaques flexibles, termoformado, 43+ años).
 * Marcos de referencia: ISO/IEC 38505, DAMA-DMBOK2, NIST AI RMF.
 */

export const PLANTILLAS_CONTENIDO: Record<string, string> = {
  "Política General de Gobernanza de Datos": `1. PRINCIPIOS GENERALES

1.1. Los datos son un activo estratégico de Alico Empaques S.A.S BIC. Su gestión adecuada es responsabilidad de toda la organización, no solo del área de Gestión Tecnológica.

1.2. Toda decisión sobre la creación, modificación, acceso o eliminación de datos debe estar alineada con los principios de esta política y los marcos de referencia adoptados (ISO/IEC 38505, DAMA-DMBOK2).

1.3. La calidad de los datos es un requisito operativo fundamental. Los datos inexactos, incompletos o desactualizados representan un riesgo para la toma de decisiones, la eficiencia operativa y la competitividad de la compañía.

1.4. La gobernanza de datos es un habilitador del negocio, no una barrera burocrática. Toda directriz debe equilibrar el control con la agilidad operativa requerida por las líneas de empaques flexibles y termoformado.

2. ESTRUCTURA DE GOBIERNO

2.1. El Consejo de Gobernanza de Datos es el órgano máximo de decisión en materia de datos. Se reúne trimestralmente para evaluar el estado de la gobernanza, aprobar políticas, resolver conflictos escalados y priorizar iniciativas.

2.2. El Comité Ejecutivo de Datos opera como instancia táctica. Se reúne mensualmente e integra a los Data Owners de los seis dominios y al responsable de Gestión Tecnológica.

2.3. Cada dominio de datos tiene un Propietario de Datos (Data Owner) formalmente designado, responsable de:
   a) Definir las reglas de calidad y las métricas de su dominio.
   b) Aprobar accesos y cambios en datos maestros.
   c) Reportar trimestralmente al Consejo sobre el estado de su dominio.

2.4. Cada dominio crítico cuenta con al menos un Custodio de Datos (Data Steward) que ejecuta las actividades diarias de gestión, monitoreo de calidad y soporte a usuarios.

3. GESTIÓN DE DATOS MAESTROS

3.1. Se reconocen los siguientes dominios de datos maestros: Cliente, Producto, Proveedor, Financiero, Producción y Cadena de Suministro.

3.2. Toda creación o modificación de registros maestros requiere la aprobación del Data Owner correspondiente o su delegado autorizado, siguiendo el flujo definido en la Política de Gestión de Datos Maestros.

3.3. Se prohíbe la duplicación intencional de registros maestros. Los procesos de deduplicación se ejecutarán mensualmente sobre el ERP y sistemas conectados.

3.4. Los datos maestros del ERP constituyen la fuente única de verdad (golden record) para toda la organización.

4. CALIDAD DE DATOS

4.1. Se establecen cinco dimensiones de calidad: Completitud, Exactitud, Consistencia, Oportunidad y Validez, medidas según los estándares de DAMA-DMBOK2.

4.2. El Data Steward de cada dominio monitorea las métricas de calidad con frecuencia mensual y reporta al Comité Ejecutivo de Datos.

4.3. Los incidentes de calidad de datos se registran, clasifican por severidad (crítico, alto, medio, bajo) y resuelven dentro de los plazos establecidos en los acuerdos de nivel de servicio internos.

5. SEGURIDAD Y PRIVACIDAD

5.1. El acceso a los datos se rige por el principio de mínimo privilegio. Solo se otorga acceso a los datos estrictamente necesarios para el desempeño de las funciones del colaborador.

5.2. Los datos personales se gestionan conforme a la Ley 1581 de 2012 y su Decreto Reglamentario 1377 de 2013. El Oficial de Protección de Datos coordina el cumplimiento con el área Jurídica.

5.3. Los datos clasificados como confidenciales o restringidos requieren autorización explícita del Data Owner para su acceso, según la matriz de clasificación vigente.

6. CICLO DE VIDA Y RETENCIÓN

6.1. Los datos tienen un ciclo de vida definido: creación, uso activo, archivo y disposición final. Cada fase tiene reglas específicas documentadas por dominio.

6.2. Los períodos de retención se alinean con los requisitos legales colombianos (código de comercio, normativa tributaria DIAN, requisitos OEA) y las necesidades operativas del negocio.

6.3. La destrucción de datos se realiza de forma segura y documentada, con aprobación del Data Owner y registro en la bitácora de gobernanza.

7. CUMPLIMIENTO Y MONITOREO

7.1. El Comité Ejecutivo de Datos realiza auditorías semestrales de cumplimiento de esta política y las políticas subordinadas.

7.2. Los resultados se reportan al Consejo de Gobernanza y se incorporan al tablero de indicadores de gobernanza (scorecard).

7.3. El incumplimiento reiterado o intencional se gestiona mediante el proceso disciplinario interno de Alico Empaques, en coordinación con Gestión Humana.

7.4. Esta política se revisa anualmente o cuando cambios regulatorios, tecnológicos o de negocio lo requieran. Toda modificación debe ser aprobada por el Consejo de Gobernanza.`,

  "Política de Calidad de Datos": `1. PROPÓSITO Y MARCO DE REFERENCIA

1.1. Esta política establece los estándares, métricas y procesos para asegurar que los datos de Alico Empaques cumplan con los niveles de calidad requeridos por el negocio, alineada con las prácticas de DAMA-DMBOK2 capítulo de Calidad de Datos.

1.2. La calidad de datos es un factor crítico para la eficiencia de las líneas de producción de empaques flexibles y termoformado, la precisión de los costos, el cumplimiento regulatorio (OEA, DIAN) y la satisfacción del cliente.

1.3. Toda área generadora o consumidora de datos es corresponsable de la calidad de los mismos. La calidad no es responsabilidad exclusiva de TI.

2. DIMENSIONES DE CALIDAD

2.1. Se adoptan las siguientes dimensiones de calidad para todos los dominios de datos:
   a) Completitud: todos los campos obligatorios están diligenciados.
   b) Exactitud: los valores reflejan correctamente la realidad del negocio.
   c) Consistencia: los mismos datos tienen valores coherentes entre sistemas (ERP, CRM, hojas de cálculo).
   d) Oportunidad: los datos están disponibles en el momento que se necesitan para la toma de decisiones.
   e) Validez: los datos cumplen con los formatos, rangos y reglas de negocio definidas.

2.2. Cada dominio define umbrales mínimos aceptables para cada dimensión. El umbral general inicial es del 90% para completitud y exactitud, y 95% para validez.

3. REGLAS DE CALIDAD POR DOMINIO

3.1. Dominio Cliente: NIT/cédula válido y sin duplicados, razón social completa, dirección verificable, datos de contacto actualizados al menos anualmente.

3.2. Dominio Producto: código SKU único, descripción estandarizada según nomenclatura interna, unidad de medida consistente, ficha técnica asociada obligatoria para productos activos.

3.3. Dominio Proveedor: RUT vigente, datos bancarios verificados por Tesorería, clasificación de riesgo OEA asignada, evaluación de desempeño actualizada semestralmente.

3.4. Dominio Financiero: cuentas contables alineadas con el PUC y las NIIF, centros de costo válidos, conciliación mensual entre módulos del ERP.

3.5. Dominio Producción: órdenes de producción con BOM (lista de materiales) completa, tiempos de máquina registrados por turno, mermas documentadas por lote.

3.6. Dominio Cadena de Suministro: inventarios conciliados semanalmente, documentos de comercio exterior completos según requisitos OEA, trazabilidad de lote desde materia prima hasta producto terminado.

4. MEDICIÓN Y PERFILAMIENTO

4.1. El Data Steward de cada dominio ejecuta perfilamiento de datos (data profiling) mensualmente para identificar anomalías, valores nulos, duplicados y desviaciones de las reglas de calidad.

4.2. Los resultados del perfilamiento se consolidan en un reporte mensual de calidad de datos que se presenta al Comité Ejecutivo de Datos.

4.3. Se mantiene un tablero de indicadores de calidad (Quality Scorecard) con métricas por dominio, tendencias y alertas automáticas cuando un indicador cae por debajo del umbral definido.

4.4. Trimestralmente se realiza un análisis de impacto de negocio para cuantificar el costo de la mala calidad de datos (reprocesos, errores en facturación, demoras en despachos).

5. REMEDIACIÓN Y MEJORA CONTINUA

5.1. Los incidentes de calidad se clasifican por severidad:
   a) Crítico: impacta facturación, producción o cumplimiento regulatorio. Resolución máxima: 24 horas.
   b) Alto: afecta reportes gerenciales o decisiones operativas. Resolución máxima: 72 horas.
   c) Medio: inconsistencias que no bloquean operación. Resolución máxima: 5 días hábiles.
   d) Bajo: mejoras estéticas o de estandarización. Resolución según plan trimestral.

5.2. Todo incidente de calidad se registra en la bitácora de gobernanza con: descripción, dominio afectado, causa raíz, acción correctiva y fecha de cierre.

5.3. Cuando un dominio presenta indicadores por debajo del umbral durante dos meses consecutivos, el Data Owner debe presentar un plan de acción correctiva al Comité Ejecutivo.

6. ROLES Y RESPONSABILIDADES

6.1. El Data Owner define y aprueba las reglas de calidad de su dominio, prioriza la remediación y rinde cuentas al Comité Ejecutivo.

6.2. El Data Steward ejecuta el perfilamiento, monitorea indicadores, coordina la corrección de datos y capacita a los usuarios del dominio.

6.3. Los usuarios finales son responsables de ingresar datos completos y exactos en el punto de captura original, siguiendo las guías de diligenciamiento vigentes.

6.4. Gestión Tecnológica provee las herramientas técnicas para perfilamiento, monitoreo y reportería de calidad de datos.

7. PREVENCIÓN EN EL ORIGEN

7.1. Se priorizan los controles preventivos sobre los correctivos. Las validaciones en el punto de entrada de datos (formularios del ERP, interfaces de captura) son obligatorias.

7.2. Toda nueva funcionalidad o módulo del ERP debe incluir reglas de validación de datos aprobadas por el Data Owner antes de su paso a producción.

7.3. Se realizan capacitaciones semestrales a usuarios clave sobre estándares de calidad de datos y buenas prácticas de captura de información.`,

  "Política de Seguridad y Privacidad de Datos": `1. MARCO NORMATIVO Y REGULATORIO

1.1. Esta política se fundamenta en la Ley Estatutaria 1581 de 2012 de Protección de Datos Personales, su Decreto Reglamentario 1377 de 2013, y las directrices de la Superintendencia de Industria y Comercio (SIC).

1.2. Se alinea con los requisitos de seguridad del Operador Económico Autorizado (OEA) de la DIAN, aplicables a las operaciones de comercio exterior de Alico Empaques.

1.3. Adopta los principios de seguridad de la información de la ISO/IEC 27001 y las recomendaciones del capítulo de Seguridad de Datos de DAMA-DMBOK2.

1.4. Toda persona vinculada a Alico Empaques (empleados, contratistas, proveedores con acceso a sistemas) está obligada a cumplir esta política.

2. CLASIFICACIÓN DE DATOS

2.1. Se establecen cuatro niveles de clasificación:
   a) Público: información publicable sin restricción (catálogos, información general corporativa).
   b) Interno: información de uso organizacional que no debe divulgarse externamente sin autorización (procedimientos, organigramas, reportes operativos).
   c) Confidencial: información sensible cuya divulgación podría causar daño al negocio (fórmulas de costos, estrategias comerciales, datos financieros detallados, datos personales de empleados y clientes).
   d) Restringido: información de máxima sensibilidad con acceso limitado a roles específicos (datos de nómina, información OEA clasificada, secretos industriales de formulación de empaques, datos de seguridad física).

2.2. Todo conjunto de datos debe ser clasificado por su Data Owner. Los datos no clasificados se tratan como Confidenciales hasta su clasificación formal.

2.3. La clasificación se revisa anualmente o cuando cambian las condiciones del dato.

3. CONTROLES DE ACCESO

3.1. El acceso a los datos se otorga según el principio de mínimo privilegio y la necesidad de conocer (need-to-know).

3.2. Los permisos de acceso al ERP y sistemas de información se asignan por perfil de rol, aprobados por el Data Owner del dominio correspondiente y configurados por Gestión Tecnológica.

3.3. Las cuentas de usuario son personales e intransferibles. Se prohíbe compartir credenciales de acceso bajo cualquier circunstancia.

3.4. Los accesos privilegiados (administradores de sistema, acceso a bases de datos) requieren aprobación del Director de Gestión Tecnológica y se revisan trimestralmente.

3.5. Al momento de desvinculación o cambio de rol de un colaborador, los accesos se revocan o ajustan dentro de las 24 horas siguientes, en coordinación con Gestión Humana.

4. PROTECCIÓN DE DATOS PERSONALES

4.1. Alico Empaques, como Responsable del Tratamiento, garantiza el ejercicio de los derechos de los titulares: conocer, actualizar, rectificar y suprimir sus datos personales.

4.2. Todo tratamiento de datos personales requiere autorización previa, expresa e informada del titular, excepto en los casos expresamente exceptuados por la ley.

4.3. Se mantiene actualizado el Registro Nacional de Bases de Datos ante la SIC, con la información de todas las bases de datos que contienen datos personales.

4.4. El Oficial de Protección de Datos, en coordinación con el área Jurídica, atiende las consultas y reclamos de titulares dentro de los plazos legales (10 y 15 días hábiles respectivamente).

4.5. Los datos sensibles (salud, biométricos, afiliación sindical) reciben protección reforzada y solo se tratan cuando existe autorización explícita y finalidad legítima.

5. SEGURIDAD TÉCNICA

5.1. Los datos clasificados como Confidenciales o Restringidos deben cifrarse en tránsito (TLS 1.2 o superior) y en reposo cuando se almacenan fuera de las instalaciones de Alico Empaques.

5.2. Las copias de respaldo (backups) se realizan diariamente para datos críticos y semanalmente para datos operativos. Se verifican mediante pruebas de restauración trimestrales.

5.3. Los dispositivos móviles y portátiles que acceden a datos corporativos deben contar con cifrado de disco, contraseña de acceso y la posibilidad de borrado remoto.

5.4. Se prohíbe el almacenamiento de datos Confidenciales o Restringidos en dispositivos personales, servicios de nube no autorizados o medios removibles sin cifrado.

6. GESTIÓN DE INCIDENTES DE SEGURIDAD

6.1. Todo incidente de seguridad de datos (acceso no autorizado, pérdida, fuga o alteración) debe reportarse inmediatamente al área de Gestión Tecnológica.

6.2. El equipo de respuesta a incidentes evalúa el impacto, contiene la amenaza, recopila evidencia y ejecuta las acciones de remediación.

6.3. Los incidentes que involucren datos personales se reportan a la SIC dentro de los 15 días hábiles siguientes a su detección, conforme a la normativa vigente.

6.4. Todos los incidentes se documentan con análisis de causa raíz y lecciones aprendidas, que alimentan la mejora continua de los controles de seguridad.

7. REQUISITOS OEA

7.1. La información relacionada con operaciones de comercio exterior se protege según los estándares del programa OEA de la DIAN.

7.2. Los accesos a datos de importación, exportación, manifiestos y documentos aduaneros se restringen exclusivamente al personal autorizado del área de Comercio Exterior y la Gerencia General.

7.3. Se mantienen registros de auditoría de todos los accesos y modificaciones a datos de comercio exterior por un período mínimo de cinco años.

8. CAPACITACIÓN Y CONCIENCIACIÓN

8.1. Todo colaborador nuevo recibe inducción en seguridad de la información y protección de datos personales durante su primer mes de vinculación.

8.2. Se realizan campañas de concienciación semestrales sobre phishing, ingeniería social y buenas prácticas de manejo de información.

8.3. El personal con acceso a datos Restringidos recibe capacitación especializada anual sobre los controles específicos aplicables a su rol.`,

  "Política de Acceso y Uso de Datos": `1. PRINCIPIOS DE ACCESO

1.1. El acceso a los datos de Alico Empaques se rige por tres principios fundamentales:
   a) Mínimo privilegio: cada usuario accede únicamente a los datos necesarios para desempeñar sus funciones.
   b) Necesidad de conocer: el acceso se justifica por una necesidad legítima de negocio, no por jerarquía o antigüedad.
   c) Segregación de funciones: las funciones de creación, aprobación y auditoría de datos no recaen en la misma persona.

1.2. Ningún colaborador tiene derecho inherente a acceder a datos por el solo hecho de pertenecer a un área o tener un cargo directivo. Todo acceso requiere justificación y aprobación formal.

2. PROCESO DE SOLICITUD DE ACCESO

2.1. El colaborador que requiera acceso a datos o sistemas diligencia la solicitud formal indicando: datos o sistema requerido, justificación de negocio, tipo de acceso (lectura, escritura, administración) y duración estimada.

2.2. El jefe inmediato del solicitante valida la pertinencia de la solicitud y la remite al Data Owner del dominio correspondiente.

2.3. El Data Owner aprueba o rechaza la solicitud en un plazo máximo de tres días hábiles. En caso de rechazo, debe indicar la razón.

2.4. Gestión Tecnológica configura los permisos aprobados dentro de las 24 horas siguientes a la aprobación del Data Owner.

2.5. Todo acceso aprobado queda registrado en la matriz de accesos del dominio, con fecha de otorgamiento, aprobador y vigencia.

3. PERFILES Y ROLES DE ACCESO

3.1. Los accesos se asignan mediante perfiles de rol predefinidos en el ERP y sistemas de información. Cada perfil agrupa los permisos necesarios para una función de negocio específica.

3.2. Los perfiles de rol son definidos conjuntamente por el Data Owner y Gestión Tecnológica, y se revisan semestralmente para verificar su vigencia.

3.3. Se definen los siguientes niveles de acceso:
   a) Consulta: visualización de datos sin posibilidad de modificación.
   b) Operación: captura y modificación de datos transaccionales dentro de su ámbito.
   c) Administración de datos maestros: creación, modificación y desactivación de registros maestros, previa aprobación del Data Owner.
   d) Administración de sistema: gestión técnica de la plataforma, reservada al equipo de Gestión Tecnológica.

3.4. Los accesos temporales para proyectos específicos tienen fecha de expiración automática y no se renuevan sin nueva solicitud.

4. USO ACEPTABLE DE DATOS

4.1. Los datos de Alico Empaques solo pueden utilizarse para fines legítimos de negocio, alineados con las funciones del colaborador y los objetivos de la organización.

4.2. Se prohíbe expresamente:
   a) Extraer datos masivamente sin autorización del Data Owner.
   b) Compartir datos Confidenciales o Restringidos por canales no seguros (correo personal, WhatsApp, USB sin cifrado).
   c) Utilizar datos de la empresa para fines personales o de terceros no autorizados.
   d) Modificar datos para ocultar errores, fraudes o irregularidades.
   e) Acceder a datos de otros dominios sin autorización, incluso si técnicamente es posible.

4.3. El uso de datos para análisis, reportes o proyectos que excedan el alcance habitual del rol requiere autorización previa del Data Owner.

5. COMPARTICIÓN DE DATOS CON TERCEROS

5.1. La compartición de datos con terceros (clientes, proveedores, auditores, entidades gubernamentales) requiere aprobación del Data Owner y, para datos personales, verificación del cumplimiento de la Ley 1581 por parte del área Jurídica.

5.2. Todo tercero que acceda a datos de Alico Empaques debe firmar un acuerdo de confidencialidad y tratamiento de datos que incluya: finalidad, alcance, medidas de seguridad, vigencia y obligación de eliminación al término de la relación.

5.3. Los datos compartidos con clientes de gran superficie o exportación se limitan estrictamente a lo requerido por el contrato comercial o la regulación aplicable (OEA, normas sanitarias INVIMA).

5.4. Los auditores externos acceden a datos en modo consulta y en ambientes controlados. No se permite la extracción masiva sin supervisión.

6. TRAZABILIDAD Y AUDITORÍA

6.1. Todos los accesos a datos Confidenciales y Restringidos generan registros de auditoría (logs) que incluyen: usuario, fecha/hora, acción realizada y datos accedidos o modificados.

6.2. Los registros de auditoría se conservan por un período mínimo de tres años y no pueden ser modificados ni eliminados por los usuarios.

6.3. El Comité Ejecutivo de Datos revisa trimestralmente los reportes de acceso para identificar patrones anómalos, accesos inusuales o posibles violaciones a esta política.

6.4. Gestión Tecnológica implementa alertas automáticas para accesos fuera de horario, descargas masivas, intentos de acceso no autorizado y otros eventos de seguridad relevantes.

7. REVISIÓN Y REVOCACIÓN DE ACCESOS

7.1. Los Data Owners revisan semestralmente la matriz de accesos de su dominio y revocan aquellos que ya no se justifican.

7.2. Al momento de desvinculación de un colaborador, Gestión Humana notifica a Gestión Tecnológica para la revocación inmediata de todos los accesos (máximo 24 horas).

7.3. Los cambios de cargo o área generan una revisión de accesos dentro de los cinco días hábiles siguientes. Los accesos del rol anterior se revocan y se otorgan los del nuevo rol.

7.4. Las cuentas inactivas por más de 90 días se suspenden automáticamente. Su reactivación requiere nueva solicitud del jefe inmediato.`,

  "Política de Gestión de Datos Maestros": `1. DEFINICIÓN Y ALCANCE

1.1. Los datos maestros son las entidades de negocio fundamentales que se comparten entre múltiples procesos y sistemas de Alico Empaques. Constituyen la fuente única de verdad para la toma de decisiones.

1.2. Se reconocen los siguientes dominios de datos maestros:
   a) Cliente: razón social, NIT, contactos, direcciones de entrega, condiciones comerciales, clasificación de canal.
   b) Producto: código SKU, descripción técnica, ficha técnica, BOM (lista de materiales), especificaciones de empaque.
   c) Proveedor: razón social, RUT, datos bancarios, clasificación de riesgo OEA, evaluación de desempeño.
   d) Financiero: plan de cuentas (PUC/NIIF), centros de costo, tipos de documento contable.
   e) Producción: centros de trabajo, máquinas, turnos, tasas estándar, parámetros de proceso.
   f) Cadena de Suministro: bodegas, ubicaciones de almacenamiento, rutas logísticas, incoterms.

1.3. El ERP es el sistema maestro (system of record) para todos los dominios. Cualquier otro sistema que consuma datos maestros debe sincronizarse desde el ERP.

2. CONCEPTO DE GOLDEN RECORD

2.1. El Golden Record es la versión única, completa, validada y autoritativa de cada registro maestro. Reside en el ERP y es la referencia para toda la organización.

2.2. No se permiten versiones paralelas de datos maestros en hojas de cálculo, bases locales o sistemas no integrados. Toda excepción temporal debe ser aprobada por el Data Owner y documentada con fecha de expiración.

2.3. Cuando existen discrepancias entre sistemas, prevalece el dato registrado en el ERP. El Data Steward investiga y corrige la fuente de la inconsistencia.

3. CICLO DE VIDA DE DATOS MAESTROS

3.1. Creación:
   a) La solicitud de creación de un nuevo registro maestro se formaliza ante el Data Steward del dominio, con la documentación soporte requerida (RUT, cédula, ficha técnica, según aplique).
   b) El Data Steward verifica que no exista un registro duplicado, valida la completitud de los datos y solicita la aprobación del Data Owner.
   c) El Data Owner aprueba la creación. Solo entonces el Data Steward o el usuario autorizado registra el dato en el ERP.

3.2. Modificación:
   a) Las modificaciones a campos críticos (NIT, razón social, condiciones de pago, fórmulas de producto) requieren aprobación del Data Owner.
   b) Las modificaciones a campos no críticos (teléfono de contacto, correo electrónico) pueden ser realizadas por el Data Steward o usuario autorizado, con registro de auditoría.
   c) Toda modificación debe incluir justificación y documentación soporte cuando aplique.

3.3. Fusión (Merge):
   a) Cuando se detectan registros duplicados, el Data Steward propone la fusión al Data Owner, indicando cuál registro se mantiene como sobreviviente y cuáles se absorben.
   b) El proceso de fusión reasigna las transacciones históricas al registro sobreviviente y desactiva los registros absorbidos.
   c) La fusión se ejecuta en ambiente de pruebas antes de aplicarse en producción.

3.4. Archivo e Inactivación:
   a) Los registros maestros que no registran actividad en los últimos 24 meses se marcan como candidatos a inactivación.
   b) El Data Owner revisa y aprueba la inactivación. Los registros inactivados no se eliminan del sistema pero no aparecen en listas de selección ni en reportes activos.
   c) Un registro inactivado puede ser reactivado por solicitud del Data Owner cuando se justifique.

3.5. Eliminación:
   a) La eliminación física de registros maestros es una acción excepcional, reservada para datos creados por error que no tienen transacciones asociadas.
   b) Requiere aprobación conjunta del Data Owner y del Director de Gestión Tecnológica.
   c) Toda eliminación queda documentada en la bitácora de gobernanza.

4. DEDUPLICACIÓN

4.1. El Data Steward de cada dominio ejecuta mensualmente un proceso de identificación de posibles duplicados, usando reglas de coincidencia definidas (fuzzy matching sobre razón social, NIT, dirección).

4.2. Los candidatos a duplicados se presentan al Data Owner para confirmación antes de ejecutar cualquier fusión.

4.3. Se implementan controles preventivos en el punto de creación: antes de crear un nuevo registro, el sistema verifica posibles coincidencias y alerta al usuario.

4.4. Se mantiene un indicador mensual de tasa de duplicados por dominio. El objetivo es mantenerla por debajo del 2%.

5. INTEGRACIÓN Y DISTRIBUCIÓN

5.1. Toda integración de datos maestros entre el ERP y sistemas satélite se realiza mediante interfaces formales aprobadas por Gestión Tecnológica, nunca mediante carga manual o archivos ad hoc.

5.2. Las interfaces de datos maestros se ejecutan en tiempo real o en lotes programados, según las necesidades del proceso. El Data Owner define la frecuencia requerida.

5.3. Se mantiene un catálogo de integraciones activas que documenta: sistemas origen y destino, campos transmitidos, frecuencia, responsable técnico y reglas de transformación.

5.4. Todo nuevo proyecto o sistema que requiera consumir datos maestros debe pasar por la aprobación del Data Owner y el diseño de la interfaz por parte de Gestión Tecnológica.

6. ESTÁNDARES DE DATOS MAESTROS

6.1. Cada dominio tiene un diccionario de datos maestros que define: campos obligatorios, formatos, valores permitidos, valores por defecto y reglas de validación.

6.2. La nomenclatura de productos sigue el estándar interno de Alico Empaques: [Línea]-[Tipo]-[Material]-[Consecutivo] (ej: FLEX-BOL-PEBD-00123).

6.3. Las direcciones se capturan en formato estandarizado según la nomenclatura vial colombiana, incluyendo departamento, municipio y código postal.

6.4. Los valores monetarios se registran en pesos colombianos (COP) como moneda base. Las operaciones en moneda extranjera incluyen la tasa de cambio de referencia.

7. GOBERNANZA Y MEJORA CONTINUA

7.1. Los Data Owners se reúnen mensualmente en el Comité Ejecutivo de Datos para revisar indicadores de datos maestros: tasa de duplicados, completitud, tiempo de creación, incidentes reportados.

7.2. Los hallazgos de las auditorías de datos maestros alimentan el plan de mejora continua, que se prioriza trimestralmente.

7.3. Todo cambio a las reglas de datos maestros (nuevos campos obligatorios, cambios de nomenclatura) se comunica a los usuarios afectados con al menos 15 días de anticipación y se acompaña de capacitación.`,

  "Política de IA y Analítica": `1. PROPÓSITO Y ALINEACIÓN ESTRATÉGICA

1.1. Esta política establece el marco para el diseño, desarrollo, despliegue y monitoreo de soluciones de inteligencia artificial (IA) y analítica avanzada en Alico Empaques, asegurando su uso ético, transparente y seguro.

1.2. Se alinea con el NIST AI Risk Management Framework (AI RMF), adoptando sus funciones centrales: Gobernar, Mapear, Medir y Gestionar los riesgos asociados a sistemas de IA.

1.3. Las iniciativas de IA y analítica deben generar valor demostrable para el negocio: optimización de procesos productivos, mejora en la calidad de empaques, reducción de mermas, mejor servicio al cliente o cumplimiento regulatorio.

1.4. Todo proyecto de IA requiere un caso de negocio aprobado por el Comité Ejecutivo de Datos antes de iniciar su desarrollo.

2. GOBERNANZA DE MODELOS

2.1. Cada modelo de IA o analítica desplegado en producción debe tener un Propietario de Modelo (Model Owner) formalmente asignado, que es responsable de su desempeño, pertinencia y cumplimiento.

2.2. Se mantiene un inventario de modelos que documenta para cada uno: nombre, propósito, datos de entrada, algoritmo, métricas de desempeño, fecha de despliegue, fecha de última validación y Model Owner.

2.3. Los modelos se clasifican según su nivel de riesgo:
   a) Bajo: analítica descriptiva, reportes automatizados, dashboards.
   b) Medio: modelos predictivos que informan decisiones (pronósticos de demanda, predicción de mermas, scoring de proveedores).
   c) Alto: modelos que automatizan decisiones con impacto significativo (aprobación automática de pedidos, ajuste automático de parámetros de producción, modelos que afectan personas).

2.4. Los modelos de riesgo alto requieren revisión y aprobación del Comité Ejecutivo de Datos antes de su despliegue en producción.

3. CALIDAD DE DATOS PARA IA

3.1. Los datos utilizados para entrenar, validar y alimentar modelos de IA deben cumplir con los estándares de la Política de Calidad de Datos.

3.2. Antes de iniciar el desarrollo de un modelo, el equipo debe documentar: fuentes de datos, transformaciones aplicadas, período de datos utilizado, criterios de exclusión y validación de calidad.

3.3. Se prohíbe el uso de datos personales para entrenamiento de modelos sin el consentimiento informado del titular y sin anonimización o pseudonimización previa cuando sea factible.

3.4. Los conjuntos de datos de entrenamiento se versionan y almacenan de forma que sean reproducibles. Se documenta la procedencia (data lineage) de cada conjunto.

4. EVALUACIÓN DE SESGO Y EQUIDAD

4.1. Todo modelo de riesgo medio o alto debe incluir una evaluación de sesgo antes de su despliegue, analizando si los resultados del modelo discriminan injustamente por género, edad, origen étnico, ubicación geográfica u otras características protegidas.

4.2. Cuando se identifica sesgo significativo, el equipo de desarrollo debe documentar las causas, implementar medidas de mitigación y obtener aprobación del Model Owner antes de proceder con el despliegue.

4.3. La evaluación de sesgo se repite al menos anualmente o cuando cambian significativamente los datos de entrada o el contexto de uso del modelo.

5. TRANSPARENCIA Y EXPLICABILIDAD

5.1. Todo modelo desplegado en producción debe contar con documentación que explique en lenguaje comprensible para usuarios de negocio: qué hace el modelo, qué datos utiliza, cómo genera sus resultados y cuáles son sus limitaciones conocidas.

5.2. Para modelos de riesgo medio y alto, se requiere capacidad de explicabilidad: poder justificar por qué el modelo generó un resultado específico para un caso particular.

5.3. Los usuarios finales que interactúan con sistemas asistidos por IA deben ser informados de que están recibiendo recomendaciones o decisiones generadas por un modelo automatizado.

5.4. Se prohíbe el uso de modelos de "caja negra" para decisiones de riesgo alto sin mecanismos de explicabilidad complementarios.

6. SUPERVISIÓN HUMANA

6.1. Los modelos de riesgo alto operan bajo el principio de "humano en el ciclo" (human-in-the-loop): un operador humano calificado revisa y aprueba las decisiones del modelo antes de su ejecución.

6.2. Los modelos de riesgo medio operan bajo el principio de "humano sobre el ciclo" (human-on-the-loop): el modelo puede ejecutar decisiones automáticamente, pero un supervisor humano monitorea los resultados y puede intervenir.

6.3. Todo modelo debe tener un mecanismo de desactivación de emergencia que permita revertir a un proceso manual cuando el modelo presenta comportamiento anómalo.

6.4. Las decisiones automatizadas que afecten derechos de personas (empleados, clientes, proveedores) siempre pueden ser revisadas por un ser humano a solicitud del afectado.

7. MONITOREO Y CICLO DE VIDA

7.1. Los modelos en producción se monitorean continuamente para detectar degradación del desempeño (model drift), cambios en la distribución de los datos de entrada (data drift) o resultados anómalos.

7.2. El Model Owner revisa trimestralmente las métricas de desempeño del modelo contra los umbrales establecidos al momento de su despliegue.

7.3. Cuando un modelo degrada su desempeño por debajo de los umbrales aceptables, se inicia un proceso de reentrenamiento o reemplazo. El modelo degradado se retira de producción si no puede corregirse en un plazo razonable.

7.4. Los modelos retirados se documentan en el inventario con la fecha de retiro, la razón y el modelo sucesor (si existe).

8. USO ÉTICO Y RESPONSABLE

8.1. Alico Empaques se compromete con el uso responsable de la IA, priorizando el bienestar de las personas, la equidad y la sostenibilidad por encima de la eficiencia técnica.

8.2. Se prohíbe el uso de IA para: vigilancia invasiva de empleados más allá de lo establecido en el reglamento interno de trabajo, manipulación de precios de forma desleal, o cualquier fin que contravenga la ley colombiana o los valores corporativos de Alico Empaques.

8.3. Las herramientas de IA generativa (chatbots, generadores de contenido) utilizadas por colaboradores deben estar aprobadas por Gestión Tecnológica. Se prohíbe ingresar datos Confidenciales o Restringidos en herramientas de IA externas no autorizadas.

8.4. El Comité Ejecutivo de Datos revisa anualmente esta política a la luz de la evolución tecnológica y regulatoria en materia de IA, tanto a nivel nacional como internacional.`,
};
