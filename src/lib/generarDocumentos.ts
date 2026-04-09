"use client";

import { getData } from "./store";
import {
  PREGUNTAS,
  DOMINIOS_DIAGNOSTICO,
  NIVELES_MADUREZ,
} from "./diagnostico-preguntas";

// ─── Utilidades comunes ───

function descargarArchivo(contenido: string, nombre: string, tipo: string) {
  const blob = new Blob([contenido], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(url);
}

function fechaHoy() {
  return new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── 1. INFORME DE DIAGNÓSTICO (HTML → PDF) ───

export function generarInformeDiagnostico() {
  const data = getData();
  const promedios = DOMINIOS_DIAGNOSTICO.map((dom) => {
    const resps = data.diagnostico.filter((r) => r.dominio === dom);
    const prom =
      resps.length > 0
        ? Math.round((resps.reduce((s, r) => s + r.valor, 0) / resps.length) * 10) / 10
        : 0;
    const nivel = NIVELES_MADUREZ.find((n) => n.valor === Math.round(prom));
    return { dominio: dom, promedio: prom, nivel: nivel?.etiqueta || "—", resps };
  });

  const promGeneral =
    data.diagnostico.length > 0
      ? Math.round(
          (data.diagnostico.reduce((s, r) => s + r.valor, 0) / data.diagnostico.length) * 10
        ) / 10
      : 0;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Informe de Diagnóstico de Madurez — Alico Empaques</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;color:#1a202c;line-height:1.7;padding:40px;max-width:900px;margin:0 auto}
h1{color:#1a365d;font-size:26px;margin-bottom:6px;border-bottom:3px solid #2c7a7b;padding-bottom:8px}
h2{color:#1a365d;font-size:18px;margin:28px 0 10px;border-bottom:1px solid #e2e8f0;padding-bottom:4px}
h3{color:#2c7a7b;font-size:15px;margin:16px 0 6px}
p{margin-bottom:8px;font-size:13px}
.header{text-align:center;margin-bottom:40px}
.header h1{border:none;font-size:28px}
.header .sub{color:#2c7a7b;font-size:16px}
.header .date{color:#718096;font-size:12px;margin-top:8px}
.resumen{display:flex;gap:16px;flex-wrap:wrap;margin:20px 0}
.card{background:#f7fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;flex:1;min-width:140px;text-align:center}
.card .val{font-size:32px;font-weight:bold;color:#1a365d}
.card .lbl{font-size:11px;color:#718096;margin-top:2px}
.card.teal{border-color:#2c7a7b;background:#e6fffa}
.barra-container{margin:8px 0}
.barra-bg{background:#e2e8f0;border-radius:8px;height:16px;overflow:hidden}
.barra{height:16px;border-radius:8px}
.rojo{background:#fc8181}.naranja{background:#f6ad55}.verde{background:#68d391}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:12px}
th{background:#1a365d;color:white;padding:8px;text-align:left;font-size:11px}
td{padding:7px 8px;border-bottom:1px solid #e2e8f0}
tr:nth-child(even){background:#f7fafc}
.badge{display:inline-block;padding:1px 8px;border-radius:10px;font-size:10px;font-weight:600}
.badge-r{background:#fed7d7;color:#c53030}.badge-a{background:#fefcbf;color:#d69e2e}.badge-g{background:#c6f6d5;color:#38a169}
.recomendacion{background:#ebf8ff;border-left:4px solid #2c7a7b;padding:12px 16px;margin:12px 0;border-radius:0 8px 8px 0;font-size:12px}
.pagebreak{page-break-before:always}
@media print{body{padding:20px}h1{font-size:22px}}
</style></head><body>

<div class="header">
  <h1>Informe de Diagnóstico de Madurez de Datos</h1>
  <div class="sub">Alico Empaques S.A.S BIC</div>
  <div class="date">${fechaHoy()}</div>
</div>

<h2>1. Resumen Ejecutivo</h2>
<p>Este informe presenta los resultados del autodiagnóstico de madurez en gestión de datos realizado por las áreas de Alico Empaques. Se evaluaron ${data.diagnostico.length} aspectos distribuidos en ${DOMINIOS_DIAGNOSTICO.length} dominios de datos, utilizando una escala de 5 niveles alineada con DAMA-DMBOK2.</p>

<div class="resumen">
  <div class="card teal"><div class="val">${promGeneral}</div><div class="lbl">Promedio General (de 5.0)</div></div>
  <div class="card"><div class="val">${data.diagnostico.length}</div><div class="lbl">Preguntas Respondidas</div></div>
  <div class="card"><div class="val">${promedios.filter((p) => p.promedio > 0 && p.promedio < 3).length}</div><div class="lbl">Dominios en Zona Crítica</div></div>
</div>

<h2>2. Resultados por Dominio</h2>
${promedios
  .filter((p) => p.promedio > 0)
  .sort((a, b) => a.promedio - b.promedio)
  .map(
    (p) => `
<h3>${p.dominio} — ${p.promedio}/5.0 (${p.nivel})</h3>
<div class="barra-container">
  <div class="barra-bg"><div class="barra ${p.promedio <= 2 ? "rojo" : p.promedio <= 3.5 ? "naranja" : "verde"}" style="width:${(p.promedio / 5) * 100}%"></div></div>
</div>
<table>
  <thead><tr><th>#</th><th>Pregunta</th><th>Nivel</th><th>Observaciones</th></tr></thead>
  <tbody>${p.resps
    .map((r, i) => {
      const preg = PREGUNTAS.find((q) => q.id === r.pregunta);
      const niv = NIVELES_MADUREZ.find((n) => n.valor === r.valor);
      return `<tr><td>${i + 1}</td><td>${preg?.pregunta || ""}</td><td><span class="badge ${r.valor <= 2 ? "badge-r" : r.valor <= 3 ? "badge-a" : "badge-g"}">${r.valor} — ${niv?.etiqueta || ""}</span></td><td>${r.comentario || "—"}</td></tr>`;
    })
    .join("")}
  </tbody>
</table>
<div class="recomendacion">
  <strong>Interpretación:</strong> ${
    p.promedio <= 2
      ? "Este dominio se encuentra en zona crítica. Se recomienda priorizar la definición de un Data Owner, documentar los procesos básicos y establecer reglas de calidad mínimas."
      : p.promedio <= 3.5
        ? "Este dominio tiene procesos parcialmente definidos. El siguiente paso es formalizar roles, documentar estándares y comenzar a medir calidad de datos."
        : "Este dominio muestra madurez adecuada. Enfocarse en mejora continua, automatización de controles y preparación para analítica avanzada."
  }
</div>
`
  )
  .join("")}

<div class="pagebreak"></div>
<h2>3. Escala de Madurez Utilizada</h2>
<table>
  <thead><tr><th>Nivel</th><th>Etiqueta</th><th>Descripción</th></tr></thead>
  <tbody>${NIVELES_MADUREZ.map((n) => `<tr><td>${n.valor}</td><td><strong>${n.etiqueta}</strong></td><td>${n.descripcion}</td></tr>`).join("")}</tbody>
</table>

<h2>4. Próximos Pasos Recomendados</h2>
<div class="recomendacion">
  <p><strong>1.</strong> Socializar estos resultados con el Comité Ejecutivo y los gerentes de área.</p>
  <p><strong>2.</strong> Priorizar los dominios con menor madurez y mayor impacto estratégico.</p>
  <p><strong>3.</strong> Asignar Data Owners formales para cada dominio priorizado.</p>
  <p><strong>4.</strong> Definir un piloto en el dominio más crítico para demostrar valor rápido.</p>
  <p><strong>5.</strong> Establecer métricas base (KPIs) para medir el progreso trimestralmente.</p>
</div>

<div style="text-align:center;color:#a0aec0;font-size:10px;margin-top:40px;border-top:1px solid #e2e8f0;padding-top:12px">
  Generado por la Plataforma de Gobernanza de Datos — Alico Empaques S.A.S BIC<br>
  ISO/IEC 38505 · DAMA-DMBOK2 · NIST AI RMF
</div>
</body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

// ─── 2. FICHA DE DOMINIO (individual, HTML → PDF) ───

export function generarFichaDominio(domNombre: string) {
  const data = getData();
  const dom = data.dominios.find((d) => d.nombre === domNombre);
  if (!dom) return;

  const diagResps = data.diagnostico.filter((r) => r.dominio === domNombre);
  const promDiag =
    diagResps.length > 0
      ? Math.round((diagResps.reduce((s, r) => s + r.valor, 0) / diagResps.length) * 10) / 10
      : null;

  const raciRelevantes = data.raci.filter(
    (r) =>
      r.responsable.toLowerCase().includes("owner") ||
      r.responsable.toLowerCase().includes("steward")
  );

  const kpisRelevantes = data.kpis.filter(
    (k) => k.dominio === "Todos" || k.dominio.includes(domNombre)
  );

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Ficha de Dominio: ${dom.nombre} — Alico</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;color:#1a202c;line-height:1.7;padding:40px;max-width:800px;margin:0 auto}
h1{color:#1a365d;font-size:24px;border-bottom:3px solid #2c7a7b;padding-bottom:6px;margin-bottom:20px}
h2{color:#2c7a7b;font-size:16px;margin:20px 0 8px;border-bottom:1px solid #e2e8f0;padding-bottom:4px}
.field{margin:8px 0;font-size:13px}
.field strong{color:#1a365d;display:inline-block;min-width:140px}
.box{background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:12px 0}
.badge{display:inline-block;padding:2px 10px;border-radius:10px;font-size:11px;font-weight:600}
.alta{background:#fed7d7;color:#c53030}.media{background:#fefcbf;color:#d69e2e}.baja{background:#c6f6d5;color:#38a169}
table{width:100%;border-collapse:collapse;margin:10px 0;font-size:12px}
th{background:#1a365d;color:white;padding:6px;text-align:left}
td{padding:6px;border-bottom:1px solid #e2e8f0}
.header{text-align:center;margin-bottom:30px}
.header .sub{color:#718096;font-size:12px}
@media print{body{padding:20px}}
</style></head><body>
<div class="header">
  <h1>Ficha de Dominio de Datos: ${dom.nombre}</h1>
  <div class="sub">Alico Empaques S.A.S BIC — ${fechaHoy()}</div>
</div>

<div class="box">
  <div class="field"><strong>Dominio:</strong> ${dom.nombre}</div>
  <div class="field"><strong>Prioridad:</strong> <span class="badge ${dom.prioridad}">${dom.prioridad.charAt(0).toUpperCase() + dom.prioridad.slice(1)}</span></div>
  <div class="field"><strong>Propietario (Data Owner):</strong> ${dom.propietario || "Por asignar"}</div>
  <div class="field"><strong>Custodio (Data Steward):</strong> ${dom.custodio || "Por asignar"}</div>
  ${promDiag !== null ? `<div class="field"><strong>Madurez Diagnóstico:</strong> ${promDiag}/5.0</div>` : ""}
</div>

<h2>Descripción del Dominio</h2>
<p style="font-size:13px">${dom.descripcion}</p>

<h2>Riesgos Identificados</h2>
<p style="font-size:13px;color:#c53030">${dom.riesgos}</p>

${
  diagResps.length > 0
    ? `<h2>Resultados del Diagnóstico</h2>
<table>
<thead><tr><th>Pregunta</th><th>Nivel</th><th>Observaciones</th></tr></thead>
<tbody>${diagResps
        .map((r) => {
          const preg = PREGUNTAS.find((p) => p.id === r.pregunta);
          return `<tr><td>${preg?.pregunta || ""}</td><td>${r.valor}/5</td><td>${r.comentario || "—"}</td></tr>`;
        })
        .join("")}</tbody>
</table>`
    : ""
}

${
  kpisRelevantes.length > 0
    ? `<h2>KPIs Asociados</h2>
<table>
<thead><tr><th>KPI</th><th>Meta</th><th>Frecuencia</th><th>Responsable</th></tr></thead>
<tbody>${kpisRelevantes.map((k) => `<tr><td>${k.nombre}</td><td>${k.metaInicial}</td><td>${k.frecuencia}</td><td>${k.responsable}</td></tr>`).join("")}</tbody>
</table>`
    : ""
}

<h2>Plan de Acción Sugerido</h2>
<div class="box">
  <p style="font-size:12px"><strong>Corto plazo (1-3 meses):</strong></p>
  <p style="font-size:12px;margin-left:16px">— Formalizar al Data Owner y Data Steward<br>— Documentar las fuentes de datos del dominio<br>— Identificar los 5 problemas de calidad más frecuentes</p>
  <p style="font-size:12px;margin-top:8px"><strong>Mediano plazo (3-6 meses):</strong></p>
  <p style="font-size:12px;margin-left:16px">— Definir reglas de calidad y validación<br>— Implementar monitoreo de indicadores básicos<br>— Capacitar a los usuarios clave del dominio</p>
  <p style="font-size:12px;margin-top:8px"><strong>Largo plazo (6-12 meses):</strong></p>
  <p style="font-size:12px;margin-left:16px">— Automatizar controles de calidad<br>— Integrar con catálogo de datos<br>— Evaluar oportunidades de analítica avanzada / IA</p>
</div>

<div style="text-align:center;color:#a0aec0;font-size:10px;margin-top:30px;border-top:1px solid #e2e8f0;padding-top:8px">
  Plataforma de Gobernanza de Datos — Alico Empaques S.A.S BIC
</div>
</body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

// ─── 3. POLÍTICA INDIVIDUAL (HTML → PDF) ───

export function generarDocumentoPolitica(idx: number) {
  const data = getData();
  const pol = data.politicas[idx];
  if (!pol) return;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>${pol.titulo} — Alico</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;color:#1a202c;line-height:1.8;padding:50px;max-width:800px;margin:0 auto}
h1{color:#1a365d;font-size:22px;text-align:center;margin-bottom:4px}
.subtitle{text-align:center;color:#718096;font-size:12px;margin-bottom:30px}
h2{color:#1a365d;font-size:15px;margin:24px 0 8px;border-bottom:1px solid #2c7a7b;padding-bottom:4px}
p{margin-bottom:10px;font-size:13px;text-align:justify}
.meta{background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0}
.meta-row{display:flex;margin:4px 0;font-size:12px}
.meta-row strong{min-width:120px;color:#1a365d}
.contenido{white-space:pre-wrap;font-size:13px;line-height:1.8}
.firma{margin-top:60px;display:flex;justify-content:space-between}
.firma-box{text-align:center;width:40%}
.firma-linea{border-top:1px solid #1a365d;margin-top:60px;padding-top:4px;font-size:11px;color:#718096}
@media print{body{padding:30px}}
</style></head><body>

<h1>${pol.titulo}</h1>
<div class="subtitle">Alico Empaques S.A.S BIC — ${fechaHoy()}</div>

<div class="meta">
  <div class="meta-row"><strong>Versión:</strong> 1.0 — Borrador</div>
  <div class="meta-row"><strong>Fecha:</strong> ${fechaHoy()}</div>
  <div class="meta-row"><strong>Responsable:</strong> ${pol.responsable || "Por asignar"}</div>
  <div class="meta-row"><strong>Aprobado por:</strong> Consejo de Gobernanza de Datos</div>
  <div class="meta-row"><strong>Próxima revisión:</strong> 12 meses después de aprobación</div>
</div>

<h2>1. Objetivo</h2>
<p>${pol.objetivo}</p>

<h2>2. Alcance</h2>
<p>${pol.alcance}</p>

<h2>3. Directrices y Disposiciones</h2>
${pol.contenido ? `<div class="contenido">${pol.contenido}</div>` : '<p style="color:#c53030"><em>Pendiente de redacción. Use la guía de escritura de la plataforma para completar esta sección.</em></p>'}

<h2>4. Roles y Responsabilidades</h2>
<p>El cumplimiento de esta política es responsabilidad de <strong>${pol.responsable || "[Responsable por definir]"}</strong>. Los Data Owners de cada dominio son responsables de asegurar la adopción dentro de sus áreas. Los Data Stewards ejecutan los controles operativos derivados.</p>

<h2>5. Cumplimiento y Sanciones</h2>
<p>El incumplimiento de esta política será escalado al Consejo de Gobernanza de Datos para evaluación y acción correctiva conforme al reglamento interno de Alico Empaques.</p>

<h2>6. Historial de Cambios</h2>
<table style="width:100%;border-collapse:collapse;font-size:12px">
<thead><tr style="background:#1a365d;color:white"><th style="padding:6px">Versión</th><th style="padding:6px">Fecha</th><th style="padding:6px">Descripción</th><th style="padding:6px">Autor</th></tr></thead>
<tbody><tr><td style="padding:6px;border-bottom:1px solid #e2e8f0">1.0</td><td style="padding:6px;border-bottom:1px solid #e2e8f0">${fechaHoy()}</td><td style="padding:6px;border-bottom:1px solid #e2e8f0">Versión inicial</td><td style="padding:6px;border-bottom:1px solid #e2e8f0">${pol.responsable || "—"}</td></tr></tbody>
</table>

<div class="firma">
  <div class="firma-box"><div class="firma-linea">Elaboró — ${pol.responsable || "Responsable"}</div></div>
  <div class="firma-box"><div class="firma-linea">Aprobó — Consejo de Gobernanza</div></div>
</div>

</body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

// ─── 4. MATRIZ RACI (CSV/Excel) ───

export function generarRACIExcel() {
  const data = getData();
  let csv = "\uFEFF"; // BOM for Excel UTF-8
  csv += "Proceso,Responsable (R),Aprobador (A),Consultado (C),Informado (I)\n";
  data.raci.forEach((r) => {
    csv += `"${r.proceso}","${r.responsable}","${r.aprobador}","${r.consultado}","${r.informado}"\n`;
  });
  descargarArchivo(csv, `raci-alico-${new Date().toISOString().split("T")[0]}.csv`, "text/csv;charset=utf-8");
}

// ─── 5. KPIs (CSV/Excel) ───

export function generarKPIsExcel() {
  const data = getData();
  let csv = "\uFEFF";
  csv += "Nombre,Descripción,Meta Inicial,Frecuencia,Responsable,Dominio\n";
  data.kpis.forEach((k) => {
    csv += `"${k.nombre}","${k.descripcion}","${k.metaInicial}","${k.frecuencia}","${k.responsable}","${k.dominio}"\n`;
  });
  descargarArchivo(csv, `kpis-alico-${new Date().toISOString().split("T")[0]}.csv`, "text/csv;charset=utf-8");
}

// ─── 6. DIAGNÓSTICO (CSV/Excel) ───

export function generarDiagnosticoExcel() {
  const data = getData();
  let csv = "\uFEFF";
  csv += "Dominio,Pregunta,Nivel (1-5),Etiqueta,Comentario\n";
  data.diagnostico.forEach((r) => {
    const preg = PREGUNTAS.find((p) => p.id === r.pregunta);
    const niv = NIVELES_MADUREZ.find((n) => n.valor === r.valor);
    csv += `"${r.dominio}","${(preg?.pregunta || "").replace(/"/g, '""')}",${r.valor},"${niv?.etiqueta || ""}","${(r.comentario || "").replace(/"/g, '""')}"\n`;
  });
  descargarArchivo(csv, `diagnostico-alico-${new Date().toISOString().split("T")[0]}.csv`, "text/csv;charset=utf-8");
}

// ─── 7. HOJA DE RUTA (CSV/Excel) ───

export function generarHojaRutaExcel() {
  const data = getData();
  let csv = "\uFEFF";
  csv += "Fase,Título,Descripción,Meses,Dominios,Estado\n";
  data.hojaDeRuta.forEach((h) => {
    csv += `"${h.fase}","${h.titulo}","${h.descripcion.replace(/"/g, '""')}","${h.meses}","${h.dominios}","${h.estado}"\n`;
  });
  descargarArchivo(csv, `hoja-ruta-alico-${new Date().toISOString().split("T")[0]}.csv`, "text/csv;charset=utf-8");
}

// ─── 8. PLAN DE SOCIALIZACIÓN (CSV/Excel) ───

export function generarSocializacionExcel() {
  const data = getData();
  let csv = "\uFEFF";
  csv += "Audiencia,Mensaje Clave,Formato,Fecha,Responsable\n";
  data.socializacion.forEach((s) => {
    csv += `"${s.audiencia}","${s.mensaje.replace(/"/g, '""')}","${s.formato}","${s.fecha}","${s.responsable}"\n`;
  });
  descargarArchivo(csv, `socializacion-alico-${new Date().toISOString().split("T")[0]}.csv`, "text/csv;charset=utf-8");
}

// ─── 9. ACTA DE CONSEJO (template HTML → PDF) ───

export function generarActaConsejo() {
  const data = getData();

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Acta de Reunión — Consejo de Gobernanza de Datos</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;color:#1a202c;line-height:1.8;padding:50px;max-width:800px;margin:0 auto}
h1{color:#1a365d;font-size:20px;text-align:center;margin-bottom:4px}
.subtitle{text-align:center;color:#718096;font-size:12px;margin-bottom:24px}
h2{color:#2c7a7b;font-size:14px;margin:20px 0 8px}
.campo{border:1px solid #e2e8f0;border-radius:6px;padding:12px;margin:8px 0;min-height:60px;font-size:12px;color:#718096}
.campo.lleno{color:#1a202c}
table{width:100%;border-collapse:collapse;font-size:12px;margin:8px 0}
td,th{padding:8px;border:1px solid #e2e8f0}
th{background:#f7fafc;text-align:left;color:#1a365d}
.meta{font-size:12px;margin:4px 0}
.meta strong{color:#1a365d;min-width:100px;display:inline-block}
.firmas{margin-top:50px}
.firma-linea{border-top:1px solid #1a365d;margin-top:50px;padding-top:4px;font-size:11px;color:#718096;display:inline-block;width:45%;margin-right:5%}
@media print{body{padding:30px}}
</style></head><body>

<h1>Acta de Reunión — Consejo de Gobernanza de Datos</h1>
<div class="subtitle">Alico Empaques S.A.S BIC</div>

<div class="meta"><strong>Fecha:</strong> ____________________</div>
<div class="meta"><strong>Lugar:</strong> ____________________</div>
<div class="meta"><strong>Convocado por:</strong> ____________________</div>
<div class="meta"><strong>Acta N°:</strong> ____________________</div>

<h2>Asistentes</h2>
<table>
<thead><tr><th>Nombre</th><th>Cargo / Rol</th><th>Firma</th></tr></thead>
<tbody>
${Array.from({ length: 8 }, () => "<tr><td>&nbsp;</td><td></td><td></td></tr>").join("")}
</tbody></table>

<h2>Orden del Día</h2>
<div class="campo">
1. <br>2. <br>3. <br>4. <br>5.
</div>

<h2>Desarrollo de la Sesión</h2>
<div class="campo" style="min-height:150px"></div>

<h2>Decisiones y Acuerdos</h2>
<table>
<thead><tr><th>#</th><th>Decisión / Acuerdo</th><th>Responsable</th><th>Fecha Límite</th></tr></thead>
<tbody>
${Array.from({ length: 5 }, (_, i) => `<tr><td>${i + 1}</td><td></td><td></td><td></td></tr>`).join("")}
</tbody></table>

<h2>Indicadores Revisados</h2>
<table>
<thead><tr><th>KPI</th><th>Valor Actual</th><th>Meta</th><th>Tendencia</th></tr></thead>
<tbody>
${data.kpis.slice(0, 5).map((k) => `<tr><td>${k.nombre}</td><td></td><td>${k.metaInicial}</td><td></td></tr>`).join("")}
${data.kpis.length === 0 ? Array.from({ length: 4 }, () => "<tr><td></td><td></td><td></td><td></td></tr>").join("") : ""}
</tbody></table>

<h2>Próxima Reunión</h2>
<div class="meta"><strong>Fecha:</strong> ____________________</div>
<div class="meta"><strong>Temas pendientes:</strong> ____________________</div>

<div class="firmas">
  <div class="firma-linea">Elaboró</div>
  <div class="firma-linea">Presidente del Consejo</div>
</div>

</body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

// ─── 10. DOCUMENTO COMPLETO (todo consolidado) ───

export { exportarPDF } from "./exportPdf";
