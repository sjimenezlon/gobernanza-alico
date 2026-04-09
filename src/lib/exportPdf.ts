"use client";

import { getData } from "./store";
import { PREGUNTAS, DOMINIOS_DIAGNOSTICO, NIVELES_MADUREZ } from "./diagnostico-preguntas";

export function exportarPDF() {
  const data = getData();

  // Build a complete HTML document for printing
  const html = buildReportHTML(data);

  // Open in new window for printing
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.print();
}

export function exportarJSON() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gobernanza-alico-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportarCSV() {
  const data = getData();
  // Export diagnóstico as CSV
  let csv = "Dominio,Pregunta,Valor,Comentario\n";
  data.diagnostico.forEach((r) => {
    const preg = PREGUNTAS.find((p) => p.id === r.pregunta);
    const pregText = (preg?.pregunta || r.pregunta).replace(/"/g, '""');
    const comentario = (r.comentario || "").replace(/"/g, '""');
    csv += `"${r.dominio}","${pregText}",${r.valor},"${comentario}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `diagnostico-alico-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function buildReportHTML(data: ReturnType<typeof getData>): string {
  // Calculate diagnóstico averages
  const dominioPromedios = DOMINIOS_DIAGNOSTICO.map((dom) => {
    const resps = data.diagnostico.filter((r) => r.dominio === dom);
    const promedio =
      resps.length > 0
        ? resps.reduce((s, r) => s + r.valor, 0) / resps.length
        : 0;
    return { dominio: dom, promedio: Math.round(promedio * 10) / 10 };
  });

  const promedioGeneral =
    data.diagnostico.length > 0
      ? Math.round(
          (data.diagnostico.reduce((s, r) => s + r.valor, 0) /
            data.diagnostico.length) *
            10
        ) / 10
      : 0;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Modelo de Gobernanza de Datos — Alico Empaques S.A.S BIC</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a202c; line-height: 1.6; }
    .page { page-break-after: always; padding: 40px; min-height: 100vh; }
    .page:last-child { page-break-after: auto; }
    h1 { color: #1a365d; font-size: 28px; margin-bottom: 8px; }
    h2 { color: #1a365d; font-size: 22px; margin: 24px 0 12px; border-bottom: 2px solid #2c7a7b; padding-bottom: 4px; }
    h3 { color: #2c7a7b; font-size: 16px; margin: 16px 0 8px; }
    p { margin-bottom: 8px; font-size: 14px; }
    .cover { text-align: center; padding-top: 200px; }
    .cover h1 { font-size: 36px; color: #1a365d; }
    .cover .subtitle { font-size: 20px; color: #2c7a7b; margin-top: 8px; }
    .cover .date { margin-top: 40px; color: #718096; }
    .cover .frameworks { margin-top: 20px; color: #718096; font-size: 12px; }
    .cover .company-info { margin-top: 60px; color: #a0aec0; font-size: 11px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
    th { background: #1a365d; color: white; padding: 8px; text-align: left; }
    td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) { background: #f7fafc; }
    .metrics-grid { display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0; }
    .metric { display: inline-block; background: #e6fffa; border: 1px solid #2c7a7b; border-radius: 8px; padding: 12px 20px; text-align: center; min-width: 120px; }
    .metric .value { font-size: 28px; font-weight: bold; color: #1a365d; }
    .metric .label { font-size: 11px; color: #718096; margin-top: 2px; }
    .metric-general { background: #1a365d; border-color: #1a365d; }
    .metric-general .value { color: #e6fffa; }
    .metric-general .label { color: #a0aec0; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .badge-red { background: #fed7d7; color: #c53030; }
    .badge-amber { background: #fefcbf; color: #d69e2e; }
    .badge-green { background: #c6f6d5; color: #38a169; }
    .section { margin-bottom: 20px; }
    .section-card { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
    .footer-note { text-align: center; color: #a0aec0; font-size: 10px; margin-top: 40px; padding-top: 12px; border-top: 1px solid #e2e8f0; }
    @media print {
      .page { padding: 20px; }
      body { font-size: 12px; }
    }
  </style>
</head>
<body>
  <!-- Portada -->
  <div class="page cover">
    <h1>Modelo de Gobernanza de Datos e IA</h1>
    <div class="subtitle">Alico Empaques S.A.S BIC</div>
    <div class="date">Generado el ${new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}</div>
    <div class="frameworks">ISO/IEC 38505 &bull; DAMA-DMBOK2 &bull; NIST AI RMF</div>
    <div class="company-info">
      Medellín, Colombia
    </div>
  </div>

  <!-- Diagnóstico de Madurez -->
  <div class="page">
    <h1>Resultados del Diagnóstico de Madurez</h1>
    <p>Evaluación del estado actual de la gestión de datos en cada dominio organizacional.</p>

    <div class="metrics-grid">
      <div class="metric metric-general">
        <div class="value">${promedioGeneral}</div>
        <div class="label">Promedio General</div>
      </div>
      ${dominioPromedios
        .filter((d) => d.promedio > 0)
        .map(
          (d) => `
        <div class="metric">
          <div class="value">${d.promedio}</div>
          <div class="label">${d.dominio}</div>
        </div>
      `
        )
        .join("")}
    </div>

    <h2>Escala de Madurez</h2>
    <table>
      <thead><tr><th>Nivel</th><th>Etiqueta</th><th>Descripción</th></tr></thead>
      <tbody>
        ${NIVELES_MADUREZ.map(
          (n) =>
            `<tr><td>${n.valor}</td><td><strong>${n.etiqueta}</strong></td><td>${n.descripcion}</td></tr>`
        ).join("")}
      </tbody>
    </table>

    ${
      data.diagnostico.length > 0
        ? `
    <h2>Detalle por Pregunta</h2>
    <table>
      <thead><tr><th>Dominio</th><th>Pregunta</th><th>Nivel</th><th>Comentario</th></tr></thead>
      <tbody>
        ${data.diagnostico
          .map((r) => {
            const preg = PREGUNTAS.find((p) => p.id === r.pregunta);
            const nivel = NIVELES_MADUREZ.find((n) => n.valor === r.valor);
            return `<tr><td>${r.dominio}</td><td>${preg?.pregunta || r.pregunta}</td><td><span class="badge ${r.valor <= 2 ? "badge-red" : r.valor === 3 ? "badge-amber" : "badge-green"}">${r.valor} - ${nivel?.etiqueta || ""}</span></td><td>${r.comentario || "-"}</td></tr>`;
          })
          .join("")}
      </tbody>
    </table>
    `
        : "<p><em>Sin datos de diagnóstico registrados.</em></p>"
    }
  </div>

  <!-- Dominios de Datos -->
  <div class="page">
    <h1>Dominios de Datos</h1>
    <p>Identificación y priorización de los dominios críticos de datos de la organización.</p>
    ${
      data.dominios.length > 0
        ? data.dominios
            .map(
              (d) => `
      <div class="section-card">
        <h3>${d.nombre} <span class="badge ${d.prioridad === "alta" ? "badge-red" : d.prioridad === "media" ? "badge-amber" : "badge-green"}">Prioridad ${d.prioridad}</span></h3>
        <p>${d.descripcion}</p>
        <p><strong>Propietario:</strong> ${d.propietario} | <strong>Custodio:</strong> ${d.custodio || "Por asignar"}</p>
        <p><strong>Riesgos:</strong> ${d.riesgos}</p>
      </div>
    `
            )
            .join("")
        : "<p><em>Sin dominios configurados.</em></p>"
    }
  </div>

  <!-- Estructura de Gobierno -->
  <div class="page">
    <h1>Estructura de Gobierno</h1>
    <p>Definición de la estructura organizacional para la toma de decisiones sobre datos.</p>
    ${data.estructuraGobierno.consejo ? `<div class="section-card"><h3>Consejo de Gobernanza</h3><p>${data.estructuraGobierno.consejo}</p></div>` : ""}
    ${data.estructuraGobierno.comiteEjecutivo ? `<div class="section-card"><h3>Comité Ejecutivo</h3><p>${data.estructuraGobierno.comiteEjecutivo}</p></div>` : ""}
    ${data.estructuraGobierno.dataOwners ? `<div class="section-card"><h3>Data Owners (Propietarios de Datos)</h3><p>${data.estructuraGobierno.dataOwners}</p></div>` : ""}
    ${data.estructuraGobierno.dataStewards ? `<div class="section-card"><h3>Data Stewards (Custodios de Datos)</h3><p>${data.estructuraGobierno.dataStewards}</p></div>` : ""}
    ${data.estructuraGobierno.notas ? `<div class="section-card"><h3>Notas Adicionales</h3><p>${data.estructuraGobierno.notas}</p></div>` : ""}
    ${!data.estructuraGobierno.consejo && !data.estructuraGobierno.comiteEjecutivo && !data.estructuraGobierno.dataOwners && !data.estructuraGobierno.dataStewards ? "<p><em>Sin estructura de gobierno definida.</em></p>" : ""}
  </div>

  <!-- Matriz RACI -->
  <div class="page">
    <h1>Matriz RACI</h1>
    <p>Asignación de responsabilidades para cada proceso clave de gestión de datos.</p>
    ${
      data.raci.length > 0
        ? `
    <table>
      <thead><tr><th>Proceso</th><th>Responsable (R)</th><th>Aprobador (A)</th><th>Consultado (C)</th><th>Informado (I)</th></tr></thead>
      <tbody>
        ${data.raci.map((r) => `<tr><td>${r.proceso}</td><td>${r.responsable}</td><td>${r.aprobador}</td><td>${r.consultado}</td><td>${r.informado}</td></tr>`).join("")}
      </tbody>
    </table>
    `
        : "<p><em>Sin matriz RACI definida.</em></p>"
    }
  </div>

  <!-- Políticas de Gobernanza -->
  <div class="page">
    <h1>Políticas de Gobernanza</h1>
    <p>Políticas marco que rigen la gestión, calidad, seguridad y privacidad de los datos.</p>
    ${
      data.politicas.length > 0
        ? data.politicas
            .map(
              (p) => `
      <div class="section-card">
        <h3>${p.titulo}</h3>
        <p><strong>Objetivo:</strong> ${p.objetivo}</p>
        <p><strong>Alcance:</strong> ${p.alcance}</p>
        ${p.contenido ? `<p><strong>Contenido:</strong></p><p>${p.contenido.replace(/\n/g, "<br>")}</p>` : ""}
        <p><strong>Responsable:</strong> ${p.responsable}</p>
      </div>
    `
            )
            .join("")
        : "<p><em>Sin políticas definidas.</em></p>"
    }
  </div>

  <!-- Métricas y KPIs -->
  <div class="page">
    <h1>Métricas y KPIs</h1>
    <p>Indicadores clave de rendimiento para monitorear la efectividad del modelo de gobernanza.</p>
    ${
      data.kpis.length > 0
        ? `
    <table>
      <thead><tr><th>KPI</th><th>Meta Inicial</th><th>Frecuencia</th><th>Responsable</th><th>Dominio</th></tr></thead>
      <tbody>
        ${data.kpis.map((k) => `<tr><td><strong>${k.nombre}</strong><br><small>${k.descripcion}</small></td><td>${k.metaInicial}</td><td>${k.frecuencia}</td><td>${k.responsable}</td><td>${k.dominio}</td></tr>`).join("")}
      </tbody>
    </table>
    `
        : "<p><em>Sin KPIs definidos.</em></p>"
    }
  </div>

  <!-- Hoja de Ruta -->
  <div class="page">
    <h1>Hoja de Ruta de Implementación</h1>
    <p>Plan de implementación por olas de valor, priorizando dominios de alto impacto.</p>
    ${
      data.hojaDeRuta.length > 0
        ? data.hojaDeRuta
            .map(
              (h) => `
      <div class="section-card">
        <h3>${h.titulo} <span class="badge ${h.estado === "completado" ? "badge-green" : h.estado === "en_curso" ? "badge-amber" : "badge-red"}">${h.estado === "en_curso" ? "En Curso" : h.estado === "completado" ? "Completado" : "Pendiente"}</span></h3>
        <p><strong>Fase:</strong> ${h.fase} | <strong>Meses:</strong> ${h.meses} | <strong>Dominios:</strong> ${h.dominios}</p>
        <p>${h.descripcion}</p>
      </div>
    `
            )
            .join("")
        : "<p><em>Sin hoja de ruta definida.</em></p>"
    }
  </div>

  <!-- Plan de Socialización -->
  <div class="page">
    <h1>Plan de Socialización</h1>
    <p>Estrategia de comunicación, capacitación y gestión del cambio organizacional.</p>
    ${
      data.socializacion.length > 0
        ? `
    <table>
      <thead><tr><th>Audiencia</th><th>Mensaje Clave</th><th>Formato</th><th>Responsable</th></tr></thead>
      <tbody>
        ${data.socializacion.map((s) => `<tr><td>${s.audiencia}</td><td>${s.mensaje}</td><td>${s.formato}</td><td>${s.responsable}</td></tr>`).join("")}
      </tbody>
    </table>
    `
        : "<p><em>Sin plan de socialización definido.</em></p>"
    }

    <div class="footer-note">
      <p>Documento generado automáticamente por la Plataforma de Gobernanza de Datos e IA — Alico Empaques S.A.S BIC</p>
      <p>Marcos de referencia: ISO/IEC 38505 &bull; DAMA-DMBOK2 &bull; NIST AI RMF</p>
    </div>
  </div>
</body>
</html>`;
}
