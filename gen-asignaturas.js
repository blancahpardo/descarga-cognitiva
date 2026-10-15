// Genera las páginas de actividad de TJ, TM, PLN y DM con el mismo patrón y diseño que TEE:
//   <dir>/index.html (menú de 3 opciones), <dir>/principal, <dir>/retro, <dir>/posterior y <dir>/config.json (solo si no existe).
// NO toca tee/. El CSS y el texto de consentimiento se leen de tee/principal para que el diseño sea idéntico.
// Uso: node gen-asignaturas.js
const fs = require('fs');
const path = require('path');
const { ACCESS, PRINCIPAL, POSTERIOR, DIF_CSS } = require('./gen/engine');
const { SUBJECTS: BASE } = require('./gen/subjects');
const SUBJECTS = require('./gen/tasks').apply(BASE);

const ROOT = __dirname;
const rd = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonForScript = o => JSON.stringify(o).replace(/</g, '\\u003c').split(String.fromCharCode(0x2028)).join('\\u2028').split(String.fromCharCode(0x2029)).join('\\u2029');

// ---- piezas tomadas de TEE ----
const teePrincipal = rd('tee/principal/index.html');
const CSS_BASE = teePrincipal.slice(teePrincipal.indexOf('<style>') + 7, teePrincipal.indexOf('</style>'));
const cStart = teePrincipal.indexOf(`'<div class="consent-text">'`);
const cEnd = teePrincipal.indexOf(`'<p style="font-size:13px;color:#5a6b72">`);
if (cStart < 0 || cEnd < 0) throw new Error('No se encontró el bloque de consentimiento en tee/principal');
const CONSENT = teePrincipal.slice(cStart, cEnd).replace(/\s+$/, '');

const CSS_EXTRA = `
textarea.code{ font-family:Menlo,Consolas,"Courier New",monospace; font-size:14px; white-space:pre; overflow:auto; tab-size:4; }
textarea.tall{ min-height:260px; }
textarea.big.code{ min-height:200px; } textarea.big.code.tall{ min-height:320px; }
.explain h3{ margin:14px 0 6px; color:var(--azul); font-size:16px; } .explain h3:first-child{ margin-top:0; }
.explain p, .explain li{ font-size:14px; line-height:1.55; } .explain ol{ padding-left:20px; margin:6px 0; }
code{ background:#EEF3F6; padding:1px 5px; border-radius:4px; font-size:.92em; font-family:Menlo,Consolas,"Courier New",monospace; }
`+DIF_CSS;

const CSS_RETRO = `
:root{ --azul:#003B5C; --azul-d:#00283F; --amar:#F4C542; --gris:#34484F; --claro:#F3F3F4; --humo:#9FB1BA; --verde:#2E7D32; --rojo:#B00020; --cian:#0E7C86; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:Arial,Helvetica,sans-serif; color:var(--gris); background:#EEF3F6; }
#boot{ padding:40px 16px; text-align:center; color:var(--humo); font-size:14px; }
#app{ display:none; min-height:100vh; }
header.top{ background:linear-gradient(115deg,var(--azul-d),var(--azul) 55%,var(--cian)); color:#fff; padding:16px 4vw 0; }
header.top .kicker{ color:var(--amar); font-size:12px; font-weight:bold; letter-spacing:2.5px; text-transform:uppercase; }
header.top h1{ margin:4px 0 2px; font-size:clamp(20px,3vw,28px); }
header.top p{ margin:0 0 12px; font-size:13px; color:#C9D6DD; }
header.top a{ color:#C9D6DD; font-size:12px; }
.tabs{ display:flex; gap:6px; flex-wrap:wrap; }
.tabs button{ border:none; font-family:inherit; font-size:14px; font-weight:bold; padding:10px 20px; border-radius:10px 10px 0 0; background:rgba(255,255,255,.14); color:#E3ECF0; cursor:pointer; }
.tabs button.on{ background:#EEF3F6; color:var(--azul); }
main{ padding:16px 1.5vw 50px; }
.pane{ display:none; } .pane.on{ display:block; }
.intro{ background:#FFF8E1; border-left:6px solid var(--amar); border-radius:10px; padding:12px 16px; margin-bottom:14px; font-size:14px; line-height:1.5; }
.split{ display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:start; }
.split .left{ position:sticky; top:10px; }
.card{ background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 4px 18px rgba(0,40,63,.08); margin-bottom:14px; }
.card h2{ margin:0 0 10px; color:var(--azul); font-size:19px; }
.card h3{ margin:16px 0 6px; color:var(--azul); font-size:15px; }
.card p, .card li{ font-size:14px; line-height:1.55; }
.casebox{ border:2px solid #D0D8DD; border-radius:12px; overflow:hidden; background:#fff; cursor:zoom-in; }
.casebox img{ display:block; width:100%; height:auto; }
.hintzoom{ font-size:12px; color:#6b7c84; margin:6px 0 0; }
.ref{ border:1px solid #D8DEE1; border-left:6px solid var(--verde); border-radius:10px; padding:10px 14px; background:#F6FBF6; font-size:14px; line-height:1.55; }
.src{ border:1px solid #D8DEE1; border-left:6px solid var(--humo); border-radius:10px; padding:10px 14px; background:#FAFCFD; font-size:13px; line-height:1.5; color:#4a5b62; font-style:italic; }
table.terms{ width:100%; border-collapse:collapse; margin:8px 0; }
table.terms th{ background:var(--azul); color:#fff; font-size:12px; text-align:left; padding:7px 9px; }
table.terms td{ border:1px solid #D8DEE1; padding:7px 9px; vertical-align:top; font-size:13.5px; line-height:1.45; background:#fff; }
table.terms td.o{ font-weight:bold; color:var(--azul); } table.terms td.d{ color:var(--verde); font-weight:bold; } table.terms td.n{ color:#5a6b72; }
pre.code{ background:#0E2A3A; color:#EAF2F6; padding:14px 16px; border-radius:10px; overflow:auto; font-size:13px; line-height:1.5; margin:8px 0; }
pre.code.bad{ background:#3A1A1A; }
code{ background:#EEF3F6; padding:1px 5px; border-radius:4px; font-size:.92em; font-family:Menlo,Consolas,"Courier New",monospace; }
.errs{ border-left:6px solid var(--rojo); background:#FDF5F6; border-radius:10px; padding:8px 14px 8px 14px; margin:8px 0; }
.errs ul{ margin:4px 0; padding-left:20px; }
.rec{ border-top:1px dashed #D0D8DD; padding-top:10px; margin-top:10px; } .rec:first-child{ border-top:none; margin-top:0; padding-top:0; }
footer.copy{ text-align:center; padding:18px 4vw 34px; font-size:11px; color:var(--humo); font-style:italic; }
@media (max-width:900px){ .split{ grid-template-columns:1fr; } .split .left{ position:static; } }
`;

const FOOT_LEGAL = 'Queda prohibida la difusión, distribución o reproducción total o parcial de este material sin autorización expresa de la autora.';

function head(title, css) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<style>${css}</style>
</head>`;
}

function pageEngine(sub, kind) {
  const cfg = Object.assign({}, sub);
  delete cfg.retro;
  const code = kind === 'principal'
    ? ACCESS('principal', '../../') + PRINCIPAL(CONSENT)
    : ACCESS('posterior', '../../') + POSTERIOR;
  return `<script>\nvar CFG = ${jsonForScript(cfg)};\n${code}\n</script>`;
}

function principalPage(s) {
  return `${head(s.titulo + ' · ' + s.asig, CSS_BASE + CSS_EXTRA)}
<body>
<div id="boot">Comprobando acceso…</div>
<div id="app">
  <header class="top">
    <div class="kicker">Descarga cognitiva e IA · ${esc(s.asig)}</div>
    <h1>${esc(s.titulo)}</h1>
    <p>${esc(s.subtitulo)}</p>
    <div class="stepper" id="stepper"></div>
  </header>
  <main id="stage"></main>
  <footer class="copy">© Dra. Blanca Hernández Pardo · ${esc(s.footer)}<br>
  ${FOOT_LEGAL}</footer>
</div>
<div class="toast" id="toast"></div>
${pageEngine(s, 'principal')}
</body>
</html>
`;
}

function posteriorPage(s) {
  return `${head('Actividad posterior · ' + s.asig + ' · Descarga cognitiva', CSS_BASE + CSS_EXTRA)}
<body>
<div id="boot">Comprobando acceso…</div>
<div id="app">
  <header class="top">
    <div class="kicker">Descarga cognitiva e IA · ${esc(s.asig)}</div>
    <h1>Hoja de seguimiento</h1>
    <p>Actividad posterior a «${esc(s.titulo)}»</p>
    <div class="stepper" id="stepper"></div>
  </header>
  <main id="stage"></main>
  <footer class="copy">© Dra. Blanca Hernández Pardo · ${esc(s.footer)}<br>
  ${FOOT_LEGAL}</footer>
</div>
<div class="toast" id="toast"></div>
${pageEngine(s, 'posterior')}
</body>
</html>
`;
}

// ---------- Retroalimentación (HTML estático generado aquí) ----------
const caseImg = (src, alt) => `<div class="casebox zoomable"><img src="${src}" alt="${esc(alt)}"></div><p class="hintzoom">Pulsa sobre el texto para verlo más grande.</p>`;
const termsTable = (rows, head3) => `<table class="terms"><thead><tr><th>${head3[0]}</th><th>${head3[1]}</th>${head3[2] ? `<th>${head3[2]}</th>` : ''}</tr></thead><tbody>` +
  rows.map(r => `<tr><td class="o">${esc(r[0])}</td><td class="d">${esc(r[1])}</td>${head3[2] ? `<td class="n">${esc(r[2] || '')}</td>` : ''}</tr>`).join('') + '</tbody></table>';
const preCode = (c, cls) => `<pre class="code${cls ? ' ' + cls : ''}">${esc(c)}</pre>`;

function retroPane(s, t) {
  if (s.kind === 'translation') {
    if (t.kind === 'recall') {
      return `<div class="intro">${t.intro}</div><div class="card">` +
        t.blocks.map(b => `<div class="rec"><h3>${b.h}</h3>${b.p.map(x => `<p>${x}</p>`).join('')}${termsTable(b.terms, ['Término original', 'Propuesta de referencia'])}</div>`).join('') + '</div>';
    }
    return `<div class="intro">${t.intro}</div><div class="split"><div class="left"><div class="card"><h2>${esc(t.title)}</h2>${caseImg(t.img, t.title)}</div></div>` +
      `<div class="right"><div class="card"><h2>Traducción de referencia</h2><div class="ref">${esc(t.ref)}</div>` +
      `<h3>Texto original del fragmento</h3><div class="src" lang="${s.dir === 'tj' ? 'fr' : 'en'}">${esc(t.fr)}</div>` +
      `<h3>${esc(t.termsTitle)}</h3>${termsTable(t.terms, ['Original', 'Propuesta', 'Matiz'])}${t.note ? `<p>${esc(t.note)}</p>` : ''}</div></div></div>`;
  }
  // kind code
  if (t.kind === 'pseudo') {
    return `<div class="intro">${t.intro}</div><div class="split"><div class="left"><div class="card"><h2>${esc(t.title)}</h2>${caseImg(t.img, t.title)}</div></div>` +
      `<div class="right"><div class="card">${t.why}<h3>Pseudocódigo corregido</h3>${preCode(t.fixed)}${t.limit}</div></div></div>`;
  }
  if (t.kind === 'transfer') {
    return `<div class="intro">${t.intro}</div><div class="split"><div class="left"><div class="card"><h2>${esc(t.title)}</h2><p><b>Enunciado.</b> ${esc(t.enun)}</p></div></div>` +
      `<div class="right"><div class="card"><h2>Solución de referencia</h2>${preCode(t.code)}<p>${t.idea}</p></div></div></div>`;
  }
  return `<div class="intro">${t.intro}</div><div class="split"><div class="left"><div class="card"><h2>${esc(t.title)}</h2>${t.queda}</div></div>` +
    `<div class="right"><div class="card"><h2>Solución de referencia</h2>${preCode(t.code)}${t.codeNote ? `<p>${esc(t.codeNote)}</p>` : ''}` +
    `<h3>Errores frecuentes</h3><div class="errs"><ul>${t.errs.map(e => `<li>${e}</li>`).join('')}</ul></div></div></div></div>`;
}

function retroPage(s) {
  const tabs = s.retro.tabs;
  const panes = tabs.map((t, i) => `<section class="pane${i === 0 ? ' on' : ''}" data-k="${t.key}">${retroPane(s, t)}</section>`).join('\n');
  const btns = tabs.map((t, i) => `<button class="${i === 0 ? 'on' : ''}" data-k="${t.key}">${esc(t.tab)}</button>`).join('');
  return `${head('Retroalimentación · ' + s.asig + ' · Descarga cognitiva', CSS_RETRO)}
<body>
<div id="boot">Comprobando acceso…</div>
<div id="app">
  <header class="top">
    <a href="../index.html">← Volver a ${esc(s.asig)}</a>
    <div class="kicker">Descarga cognitiva e IA · ${esc(s.asig)}</div>
    <h1>Retroalimentación de «${esc(s.titulo)}»</h1>
    <p>Revisa con calma, a tu ritmo, la corrección de cada parte de la actividad.</p>
    <div class="tabs" id="tabs">${btns}</div>
  </header>
  <main id="stage">
${panes}
  </main>
  <footer class="copy">© Dra. Blanca Hernández Pardo · ${esc(s.footer)}<br>
  ${FOOT_LEGAL}</footer>
</div>
<script>
(function(){
  var DIR = ${JSON.stringify(s.dir)};
  var s = ""; try { s = sessionStorage.getItem("dc_unlocked") || ""; } catch(e){}
  if (!s) { location.replace("../../index.html"); return; }
  function go(){ document.getElementById("boot").style.display = "none"; document.getElementById("app").style.display = "block"; start(); }
  if (s === "teacher") { go(); return; }
  if (s !== DIR) { location.replace("../../index.html"); return; }
  fetch("../config.json?t=" + Date.now()).then(function(r){ return r.json(); }).then(function(c){
    if (c.retro === true) go(); else location.replace("../index.html");
  }).catch(function(){ document.getElementById("boot").textContent = "No se ha podido comprobar el acceso. Recarga la página."; });
})();
function start(){
  document.querySelectorAll("#tabs button").forEach(function(b){ b.onclick = function(){
    document.querySelectorAll("#tabs button").forEach(function(x){ x.classList.toggle("on", x === b); });
    document.querySelectorAll(".pane").forEach(function(p){ p.classList.toggle("on", p.dataset.k === b.dataset.k); });
    window.scrollTo(0,0); }; });
  document.querySelectorAll(".casebox.zoomable img").forEach(function(img){ img.onclick = function(){
    var z = document.createElement("div"); z.style.cssText = "position:fixed;inset:0;background:rgba(0,40,63,.92);z-index:60;display:flex;align-items:center;justify-content:center;padding:2vw;cursor:zoom-out";
    z.innerHTML = '<img src="'+img.getAttribute("src")+'" style="max-width:96vw;max-height:94vh;background:#fff;border-radius:8px" alt="">'; z.onclick = function(){ z.remove(); }; document.body.appendChild(z); }; });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape"){ var z = document.querySelector("body > div[style*='z-index:60']"); if (z) z.remove(); } });
}
</script>
</body>
</html>
`;
}

// ---------- Menú de la asignatura (derivado de tee/index.html) ----------
function menuPage(s) {
  let h = rd('tee/index.html');
  const rep = (a, b, n = 1) => {
    const c = h.split(a).length - 1;
    if (c !== n) throw new Error(`menu: "${a}" aparece ${c} veces (esperadas ${n})`);
    h = h.split(a).join(b);
  };
  rep('<title>TEE · Descarga cognitiva</title>', `<title>${esc(s.asig)} · Descarga cognitiva</title>`);
  rep('<h1>Técnicas y estrategias de expresión escrita</h1>', `<h1>${esc(s.asig)}</h1>`);
  rep('marca qué opciones de TEE ve el alumnado', `marca qué opciones de ${esc(s.asig)} ve el alumnado`);
  rep('PATH="tee/config.json"', `PATH="${s.dir}/config.json"`);
  rep('actualizar visibilidad de opciones de TEE (tee/config.json)', `actualizar visibilidad de opciones de ${esc(s.asig)} (${s.dir}/config.json)`);
  rep('if(s!=="tee")', `if(s!==${JSON.stringify(s.dir)})`);
  rep('Con copiloto o sin él: corrección de estilo con y sin IA.', esc(s.desc1));
  rep('Revisa con calma la corrección de cada ejercicio de la actividad principal.', 'Revisa con calma la corrección de toda la actividad: solucionario, errores frecuentes y hoja diferida.');
  rep('© Dra. Blanca Hernández Pardo · Técnicas y estrategias de comunicación escrita en español · Tema 3: La corrección de estilo', `© Dra. Blanca Hernández Pardo · ${esc(s.footer)}`);
  return h;
}

for (const s of SUBJECTS) {
  const d = path.join(ROOT, s.dir);
  for (const sub of ['principal', 'retro', 'posterior']) fs.mkdirSync(path.join(d, sub), { recursive: true });
  fs.writeFileSync(path.join(d, 'index.html'), menuPage(s), 'utf8');
  fs.writeFileSync(path.join(d, 'principal', 'index.html'), principalPage(s), 'utf8');
  fs.writeFileSync(path.join(d, 'retro', 'index.html'), retroPage(s), 'utf8');
  fs.writeFileSync(path.join(d, 'posterior', 'index.html'), posteriorPage(s), 'utf8');
  const cfg = path.join(d, 'config.json');
  if (!fs.existsSync(cfg)) fs.writeFileSync(cfg, JSON.stringify({ principal: true, retro: false, posterior: false }, null, 2) + '\n', 'utf8');
  console.log('Generado:', s.dir);
}
