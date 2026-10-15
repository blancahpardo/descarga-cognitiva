// Genera index.html (portada), config.json (solo si no existe) y las páginas provisionales de las
// asignaturas que aún no tienen actividad. NO toca tee/index.html: esa página se edita a mano.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const REPO = 'blancahpardo/descarga-cognitiva';
const TEACHER_PASSWORD = 'profe_27';
const STUDENT_PASSWORD = 'medusa';

const sha256 = t => crypto.createHash('sha256').update(t, 'utf8').digest('hex');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// exists: la página de la actividad está construida. La visibilidad real vive en config.json.
const ASIGNATURAS = [
  { dir: 'tee', label: 'TEE', title: 'Técnicas y estrategias de expresión escrita', exists: true },
  { dir: 'pln', label: 'PLN', title: 'Programación para PLN', exists: false },
  { dir: 'dm',  label: 'DM',  title: 'Datos Masivos', exists: false },
  { dir: 'tj',  label: 'TJ',  title: 'Traducción Jurídica FR-ES', exists: false },
  { dir: 'tm',  label: 'TM',  title: 'Traducción Médica EN-ES', exists: false },
];

const CSS = `
:root{ --azul:#003B5C; --azul-d:#00283F; --amar:#F4C542; --gris:#34484F; --claro:#F3F3F4; --humo:#9FB1BA; --verde:#2E7D32; --rojo:#B00020; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:Arial,Helvetica,sans-serif; color:var(--gris); background:var(--azul); min-height:100vh; display:flex; flex-direction:column; }
#gate{ position:fixed; inset:0; background:var(--azul); display:flex; align-items:center; justify-content:center; padding:24px; z-index:999; }
#gate .box{ max-width:380px; width:100%; text-align:center; }
.kicker{ color:var(--amar); font-size:12px; font-weight:bold; letter-spacing:2.5px; text-transform:uppercase; margin-bottom:10px; }
#gate h1{ color:#fff; font-size:26px; margin:0 0 10px; }
#gate p{ color:var(--humo); font-size:14px; margin:0 0 26px; }
#gate input{ width:100%; padding:13px 16px; border-radius:8px; border:none; font-size:15px; font-family:inherit; margin-bottom:14px; outline:2px solid transparent; }
#gate input:focus{ outline:2px solid var(--amar); }
#gate button.submit{ width:100%; padding:13px 16px; border-radius:8px; border:none; background:var(--amar); color:var(--azul-d); font-size:15px; font-weight:bold; font-family:inherit; cursor:pointer; }
#gate .error{ color:#FFB3B3; font-size:13px; margin-top:12px; min-height:18px; }
#page{ display:none; flex:1; flex-direction:column; }
header{ padding:60px 6vw 20px; text-align:center; }
header h1{ color:#fff; font-size:clamp(26px,4.2vw,40px); margin:0 0 6px; }
header .author{ color:var(--amar); font-size:14px; font-weight:bold; margin:0 0 12px; }
header p{ color:var(--humo); font-size:14px; margin:0; }
main{ flex:1; max-width:1000px; width:100%; margin:0 auto; padding:40px 6vw 60px; display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:22px; align-content:start; }
.tema-btn{ position:relative; display:flex; flex-direction:column; align-items:flex-start; gap:8px; background:#fff; border-radius:14px; padding:28px 24px; text-decoration:none; box-shadow:0 4px 16px rgba(0,0,0,.18); transition:transform .15s ease; }
.tema-btn:hover{ transform:translateY(-3px); }
.tema-num{ font-size:13px; font-weight:bold; color:var(--amar); background:var(--azul); padding:4px 12px; border-radius:20px; letter-spacing:1px; }
.tema-title{ font-size:19px; font-weight:bold; color:var(--azul); margin-top:4px; }
.teacher-hint{ position:absolute; top:12px; right:14px; font-size:10px; font-weight:bold; padding:2px 8px; border-radius:10px; }
.teacher-hint.on{ background:#DFF3E0; color:var(--verde); } .teacher-hint.off{ background:#FBEAEC; color:var(--rojo); }
.empty{ grid-column:1/-1; text-align:center; color:var(--humo); font-size:15px; padding:30px 0; }
footer{ text-align:center; padding:20px 6vw 34px; font-size:11px; color:var(--humo); font-style:italic; }
.teacher-link{ display:block; margin:0 auto 18px; background:none; border:none; color:var(--humo); font-size:12px; cursor:pointer; font-family:inherit; text-decoration:underline; }
.teacher-link:hover{ color:#fff; }
.teacher-wrap{ max-width:1000px; width:100%; margin:0 auto; padding:0 6vw; }
.teacher-banner{ background:var(--azul-d); color:#fff; border-radius:12px; padding:18px 22px; margin:0 0 10px; }
.teacher-banner strong{ color:var(--amar); } .teacher-banner p{ font-size:13px; margin:6px 0 0; color:var(--humo); }
.teacher-token-row{ display:flex; gap:10px; margin-top:14px; flex-wrap:wrap; }
.teacher-token-row input{ flex:1; min-width:220px; padding:9px 12px; border-radius:8px; border:none; font-size:13px; font-family:inherit; }
.teacher-token-row button{ background:var(--amar); color:var(--azul-d); border:none; border-radius:8px; padding:9px 16px; font-size:13px; font-weight:bold; cursor:pointer; font-family:inherit; }
.teacher-status{ font-size:12px; margin-top:10px; min-height:16px; }
.teacher-toggle-list{ list-style:none; padding:0; margin:16px 0 0; display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:10px; }
.teacher-toggle-list li{ background:rgba(255,255,255,.08); border-radius:8px; padding:10px 14px; display:flex; align-items:center; gap:10px; font-size:13px; }
.teacher-toggle-list input{ width:18px; height:18px; }
`;

const FOOT = `© Dra. Blanca Hernández Pardo · Descarga cognitiva e IA · Estudio docente 2026-27<br>Queda prohibida la difusión, distribución o reproducción total o parcial de este material sin autorización expresa de la autora.`;

function indexHtml() {
  const cards = ASIGNATURAS.map(a => `<a class="tema-btn" data-tema="${a.dir}" href="${a.dir}/index.html" style="display:none">
    <span class="teacher-hint" data-hint="${a.dir}"></span>
    <span class="tema-num">${esc(a.label)}</span>
    <span class="tema-title">${esc(a.title)}</span>
  </a>`).join('\n  ');
  const toggles = ASIGNATURAS.map(a =>
    `<li><input type="checkbox" id="chk-${a.dir}" data-tema="${a.dir}"><label for="chk-${a.dir}">${esc(a.label)} · ${esc(a.title)}${a.exists ? '' : ' (actividad aún sin construir)'}</label></li>`).join('\n      ');
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow"><title>Descarga cognitiva</title><style>${CSS}</style></head>
<body>
<div id="gate"><div class="box">
  <div class="kicker">Estudio docente 2026-27</div><h1>Descarga cognitiva</h1>
  <p>Contenido protegido. Introduce la contraseña facilitada en clase.</p>
  <input type="password" id="pw" placeholder="Contraseña" autofocus>
  <button class="submit" id="enter">Acceder</button><div class="error" id="err"></div>
</div></div>
<div id="page">
<header><div class="kicker">Estudio docente 2026-27</div><h1>Descarga cognitiva e IA</h1>
  <p class="author">Dra. Blanca Hernández Pardo</p><p>Elige tu asignatura</p></header>
<div class="teacher-wrap"><div id="teacher-panel" class="teacher-banner" hidden>
  <strong>⚙ Modo profesora</strong>
  <p>Pega aquí tu token de GitHub (solo para esta sesión de navegador; se pierde al cerrar la pestaña) y marca qué asignaturas ve el alumnado. Los cambios se publican en 1-2 minutos.</p>
  <div class="teacher-token-row"><input type="password" id="gh-token" placeholder="Token de GitHub (github_pat_...)"><button id="gh-token-save">Guardar token de esta sesión</button></div>
  <div class="teacher-status" id="teacher-status"></div>
  <ul class="teacher-toggle-list">
      ${toggles}
  </ul></div></div>
<main id="cards">
  ${cards}
  <div class="empty" id="empty" hidden>De momento no hay ninguna actividad abierta. Tu profesora la abrirá cuando corresponda.</div>
</main>
<button class="teacher-link" id="teacher-toggle-link">⚙ Modo profesora</button>
<footer>${FOOT}</footer>
</div>
<script>
(function(){
  var HASH="${sha256(STUDENT_PASSWORD)}", TEACHER_HASH="${sha256(TEACHER_PASSWORD)}", SESSION_KEY="dc_unlocked", REPO="${REPO}", PATH="config.json";
  var sha=null, isTeacher=false;
  function sha256Hex(t){ return crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)).then(function(b){ return Array.prototype.map.call(new Uint8Array(b),function(x){return x.toString(16).padStart(2,"0");}).join(""); }); }
  function fetchConfig(){ return fetch("config.json?t="+Date.now()).then(function(r){ return r.json(); }); }
  function hdr(t){ return {"Authorization":"Bearer "+t,"Accept":"application/vnd.github+json"}; }
  function ghGet(t){ return fetch("https://api.github.com/repos/"+REPO+"/contents/"+PATH,{headers:hdr(t)}).then(function(r){ if(!r.ok) throw new Error("No se pudo leer el fichero ("+r.status+")"); return r.json(); }).then(function(d){ sha=d.sha; return JSON.parse(decodeURIComponent(escape(atob(d.content.replace(/\\n/g,""))))); }); }
  function ghPut(t,obj){ return fetch("https://api.github.com/repos/"+REPO+"/contents/"+PATH,{method:"PUT",headers:Object.assign({"Content-Type":"application/json"},hdr(t)),body:JSON.stringify({message:"Modo profesora: actualizar visibilidad de asignaturas (config.json)",content:btoa(unescape(encodeURIComponent(JSON.stringify(obj,null,2)+"\\n"))),sha:sha})}).then(function(r){ if(!r.ok) return r.text().then(function(x){ throw new Error("Error al guardar ("+r.status+"): "+x); }); return r.json(); }).then(function(d){ sha=d.content.sha; }); }
  function tok(){ try{ return sessionStorage.getItem("gh_pat")||""; }catch(e){ return ""; } }
  function status(m,err){ var e=document.getElementById("teacher-status"); e.textContent=m; e.style.color=err?"#FFB3B3":"#9FE6A0"; }
  function apply(c){
    var any=false;
    document.querySelectorAll(".tema-btn[data-tema]").forEach(function(b){ var on=c[b.dataset.tema]===true; b.style.display=(isTeacher||on)?"":"none"; if(isTeacher||on) any=true; });
    document.getElementById("empty").hidden = any;
  }
  function hints(c){
    document.querySelectorAll(".teacher-hint[data-hint]").forEach(function(s){ var on=c[s.dataset.hint]===true; s.textContent=on?"visible":"oculto"; s.className="teacher-hint "+(on?"on":"off"); });
    document.querySelectorAll("#teacher-panel input[data-tema]").forEach(function(k){ k.checked=c[k.dataset.tema]===true; });
  }
  function initTeacher(){
    document.getElementById("teacher-panel").hidden=false;
    var inp=document.getElementById("gh-token"); inp.value=tok();
    function refresh(){ var t=tok(); if(!t){ fetchConfig().then(function(c){ apply(c); hints(c); }); return; } status("Cargando estado actual..."); ghGet(t).then(function(c){ apply(c); hints(c); status("Conectado. Puedes abrir o cerrar asignaturas."); }).catch(function(e){ status(e.message,true); fetchConfig().then(function(c){ apply(c); hints(c); }); }); }
    document.getElementById("gh-token-save").onclick=function(){ try{ sessionStorage.setItem("gh_pat",inp.value.trim()); }catch(e){} status(inp.value.trim()?"Token guardado para esta sesión.":"Token borrado."); refresh(); };
    document.querySelectorAll("#teacher-panel input[data-tema]").forEach(function(k){ k.addEventListener("change",function(){
      var t=tok(); if(!t){ status("Pega primero tu token de GitHub.",true); k.checked=!k.checked; return; }
      status("Guardando...");
      ghGet(t).then(function(c){ c[k.dataset.tema]=k.checked; return ghPut(t,c).then(function(){ return c; }); }).then(function(c){ hints(c); apply(c); status("Guardado ✓ — el alumnado lo verá en 1-2 minutos."); }).catch(function(e){ k.checked=!k.checked; status(e.message,true); });
    }); });
    refresh();
  }
  function reveal(teacher){
    isTeacher=teacher; document.getElementById("gate").style.display="none"; document.getElementById("page").style.display="flex";
    if(teacher) initTeacher(); else fetchConfig().then(apply).catch(function(){});
    try{ sessionStorage.setItem(SESSION_KEY, teacher?"teacher":"1"); }catch(e){}
  }
  function tryUnlock(){ sha256Hex(document.getElementById("pw").value).then(function(h){ if(h===TEACHER_HASH) reveal(true); else if(h===HASH) reveal(false); else document.getElementById("err").textContent="Contraseña incorrecta."; }); }
  document.getElementById("enter").onclick=tryUnlock;
  document.getElementById("pw").addEventListener("keydown",function(e){ if(e.key==="Enter") tryUnlock(); });
  document.getElementById("teacher-toggle-link").onclick=function(){ var v=prompt("Contraseña de profesora:"); if(v===null) return; sha256Hex(v).then(function(h){ if(h===TEACHER_HASH) reveal(true); else alert("Contraseña incorrecta."); }); };
  try{ var s=sessionStorage.getItem(SESSION_KEY); if(s==="teacher") reveal(true); else if(s==="1") reveal(false); }catch(e){}
})();
</script></body></html>`;
}

function placeholderHtml(a) {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, nofollow">
<title>${esc(a.title)} · Descarga cognitiva</title>
<style>body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#003B5C;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px}
.k{color:#F4C542;font-size:12px;font-weight:bold;letter-spacing:2.5px;text-transform:uppercase}h1{margin:10px 0}p{color:#9FB1BA}a{color:#F4C542}</style></head>
<body><div id="b" style="visibility:hidden"><div class="k">Descarga cognitiva e IA</div><h1>${esc(a.title)}</h1>
<p>Esta actividad todavía no está disponible.</p><p><a href="../index.html">← Volver</a></p></div>
<script>(function(){var s="";try{s=sessionStorage.getItem("dc_unlocked")||"";}catch(e){}
if(!s){location.replace("../index.html");return;}
function show(){document.getElementById("b").style.visibility="visible";}
if(s==="teacher"){show();return;}
fetch("../config.json?t="+Date.now()).then(function(r){return r.json();}).then(function(c){if(c["${a.dir}"]===true)show();else location.replace("../index.html");}).catch(function(){});})();</script></body></html>`;
}

fs.writeFileSync(path.join(ROOT, 'index.html'), indexHtml(), 'utf8');
for (const a of ASIGNATURAS) {
  fs.mkdirSync(path.join(ROOT, a.dir), { recursive: true });
  if (!a.exists) fs.writeFileSync(path.join(ROOT, a.dir, 'index.html'), placeholderHtml(a), 'utf8');
}
const cfgPath = path.join(ROOT, 'config.json');
if (!fs.existsSync(cfgPath)) {
  const seed = {}; ASIGNATURAS.forEach(a => { seed[a.dir] = false; });
  fs.writeFileSync(cfgPath, JSON.stringify(seed, null, 2) + '\n', 'utf8');
}
console.log('Construido: index.html + páginas provisionales. config.json:', fs.readFileSync(cfgPath, 'utf8').replace(/\s+/g, ' '));
