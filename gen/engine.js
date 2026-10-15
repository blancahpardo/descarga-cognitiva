// Motores (JS de navegador) de las páginas de actividad principal y de recuerdo diferido.
// Replican el patrón de tee/principal y tee/posterior, parametrizados con CFG (ver gen/subjects.js).
// IMPORTANTE: no usar comillas invertidas ni ${...} dentro de estos textos.

const ACCESS = (cfgKey, rel) => String.raw`
(function(){
  var s = ""; try { s = sessionStorage.getItem("dc_unlocked") || ""; } catch(e){}
  if (!s) { location.replace("${rel}index.html"); return; }
  function go(){ document.getElementById("boot").style.display = "none"; document.getElementById("app").style.display = "block"; startApp(); }
  if (s === "teacher") { go(); return; }
  if (s !== CFG.dir) { location.replace("${rel}index.html"); return; }
  fetch("../config.json?t=" + Date.now()).then(function(r){ return r.json(); }).then(function(c){
    if (c.${cfgKey} === true) go(); else location.replace("../index.html");
  }).catch(function(){ document.getElementById("boot").textContent = "No se ha podido comprobar el acceso. Recarga la página."; });
})();
`;

const COMMON = String.raw`
var COPILOT = "https://m365.cloud.microsoft/chat";
var ISCODE = CFG.kind === "code";
var ATTR = 'spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off" translate="no" lang="es" ' +
           'data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" data-lt-active="false" data-ms-editor="false"';
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function toast(msg){ var t = document.getElementById("toast"); t.textContent = msg; t.style.display = "block"; clearTimeout(toast._t); toast._t = setTimeout(function(){ t.style.display = "none"; }, 3500); }
function setPath(p,v){ var ks = p.split("."), last = ks.pop(); var o = ks.reduce(function(o,k){ return o[k]; }, S); o[last] = v; }
function ta(path, val, nopaste, cls, ph){ return '<textarea '+ATTR+' data-path="'+path+'"'+(nopaste?' data-nopaste="1"':'')+(cls?' class="'+cls+'"':'')+(ph?' placeholder="'+esc(ph)+'"':'')+'>'+esc(val)+'</textarea>'; }
function rulesBox(items){ return '<div class="rules"><b>Condiciones de realización</b><ul>' + items.map(function(i){ return '<li>'+i+'</li>'; }).join("") + '</ul></div>'; }
function olist(items){ return '<ol>' + items.map(function(i){ return '<li>'+i+'</li>'; }).join("") + '</ol>'; }
function mkRows(n, keys){ var a = []; for (var i=0;i<n;i++){ var o = {}; keys.forEach(function(k){ o[k]=""; }); a.push(o); } return a; }
var ALERT = '<div class="alert-red">⚠ Esta parte se hace SIN IA de ningún tipo.<small>Tranquilo/a: no te preocupes, no penaliza.</small></div>';
function stepper(){
  document.getElementById("stepper").innerHTML = STEPS.map(function(n,i){
    return '<span class="'+(i<S.step?'done':i===S.step?'now':'')+'">'+(i<S.step?'✓ ':'')+n+'</span>';
  }).join("");
}
function copyText(txt, okMsg){
  function fallback(){ var t = document.createElement("textarea"); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); toast(okMsg); } catch(e){ toast("No se pudo copiar. Selecciona el texto manualmente."); } t.remove(); }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function(){ toast(okMsg); }, fallback); else fallback();
}
var noTab = false;
function commonListeners(){
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape"){ var z = document.querySelector(".zoom"); if (z) z.remove(); noTab = true; return; }
    if (e.key === "Tab" && e.target && e.target.classList && e.target.classList.contains("code")){
      if (noTab){ noTab = false; return; }
      e.preventDefault(); var t = e.target, a = t.selectionStart, b = t.selectionEnd;
      t.value = t.value.slice(0,a) + "    " + t.value.slice(b); t.selectionStart = t.selectionEnd = a + 4;
      t.dispatchEvent(new Event("input", {bubbles:true}));
    } else if (e.key !== "Shift") { noTab = false; }
  });
  var st = document.getElementById("stage");
  st.addEventListener("input", function(e){ var p = e.target.dataset && e.target.dataset.path; if (p){ setPath(p, e.target.value); save(); } });
  st.addEventListener("change", function(e){ var p = e.target.dataset && e.target.dataset.path; if (p){ setPath(p, e.target.value); save(); } });
  ["paste","drop"].forEach(function(ev){
    st.addEventListener(ev, function(e){
      if (e.target.dataset && e.target.dataset.nopaste){ e.preventDefault(); toast("En esta hoja no se puede pegar texto: escribe tu respuesta."); }
    });
  });
}
function wireZoom(st){
  st.querySelectorAll(".casebox.zoomable img").forEach(function(img){ img.onclick = function(){
    var z = document.createElement("div"); z.className = "zoom"; z.innerHTML = '<img src="'+img.getAttribute("src")+'" alt="">';
    z.onclick = function(){ z.remove(); }; document.body.appendChild(z); }; });
}
function dlJson(obj, name){
  var blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast("Archivo " + name + " descargado. Revisa tu carpeta de descargas.");
}
`;

// Se inserta el bloque de consentimiento literal de tee/principal (lo lee gen-asignaturas.js)
const PRINCIPAL = (consentFragment) => String.raw`
function startApp(){
var KEY = "dc_" + CFG.dir + "_v1";
${COMMON}
var STEPS = ["Inicio","Tarea A","Tarea B","Pausa","Recuerdo","Autoevaluación","Entrega"];
var PROMPT_B = CFG.promptB;
function fresh(){
  var a = ISCODE ? { codigo:"", pruebas:"" } : { trad:"", rows:mkRows(4,["termino","solucion"]) };
  var b = ISCODE ? { codigo:"", pruebas:"", correcciones:"", conversacion:"" } : { borrador:"", trad:"", rows:mkRows(4,["ia","correccion","porque"]), conversacion:"" };
  return { v:1, step:0, id:"", consent:[false,false,false], inicio:null, fin:null, tiempos:{}, a:a, b:b,
           r:{ tarea:"", resp:CFG.recQs.map(function(){ return ""; }) }, auto:CFG.likert.map(function(){ return ""; }) };
}
var S;
try { S = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch(e){ S = null; }
if (!S || S.v !== 1) S = fresh();
function save(){ try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
var COMMON_RULES = [
  'Trabaja de forma individual, en este ordenador y sin ayuda externa (apuntes, buscadores, compañeros/as), salvo la que la tarea permita expresamente.',
  'Los cuadros de respuesta de esta página no subrayan errores ni corrigen automáticamente lo que escribes. Si ves algún subrayado o cambio automático, avisa a la profesora.',
  'Tu trabajo se guarda en esta pestaña mientras no la cierres. Al final descargarás un archivo con tus respuestas.'
];
function timerBar(key, minutes, label){
  var t = S.tiempos[key]; if (!t || !t.start) return "";
  return '<div class="timer" id="timer" data-start="'+t.start+'" data-min="'+minutes+'"><span>'+(label||('Tiempo disponible: '+minutes+' minutos'))+' (orientativo; la profesora marca el ritmo)</span><b id="timerval">--:--</b></div>';
}
function tick(){
  var el = document.getElementById("timer"); if (!el) return;
  var left = Math.round(+el.dataset.min*60 - (Date.now()-(+el.dataset.start))/1000);
  var neg = left < 0, a = Math.abs(left);
  document.getElementById("timerval").textContent = (neg?"+":"") + String(Math.floor(a/60)).padStart(2,"0") + ":" + String(a%60).padStart(2,"0");
  el.classList.toggle("warn", left <= 300);
}
setInterval(tick, 1000);

function viewInicio(){
  return '<div class="card"><h2>Consentimiento informado para participar en una actividad docente de investigación</h2>' +
  '<p>Antes de comenzar la actividad, lee atentamente la siguiente información.</p>' +
${consentFragment}
  '<p style="font-size:13px;color:#5a6b72">No es necesaria firma manuscrita: marcar las casillas y entregar tu archivo al final equivale a la aceptación. Si no autorizas el uso de tus datos, haces la actividad igualmente y tus respuestas no entran en el estudio.</p>' +
  '<h3>Tu identificador</h3><p>Los tres últimos dígitos de tu clave académica. No escribas tu nombre en ningún sitio.</p>' +
  '<div class="idrow"><input type="text" inputmode="numeric" maxlength="3" pattern="[0-9]{3}" autocomplete="off" spellcheck="false" placeholder="000" id="idfield" value="'+esc(S.id)+'"></div>' +
  '</div>' +
  '<div class="card"><h2>Objetivo y cómo funciona</h2>' + CFG.objetivo.map(function(p){ return '<p>'+p+'</p>'; }).join("") +
  rulesBox(COMMON_RULES) +
  '<div class="btnrow"><button class="btn amar" id="go0">Empezar →</button></div></div>';
}

function leftPane(which){
  var img = which === "a" ? CFG.aImg : CFG.bImg, html = which === "a" ? CFG.aLeft : CFG.bLeft, title = which === "a" ? "Tarea A — Condición MANUAL (sin IA)" : "Tarea B — Condición CON IA";
  if (img) return '<h2>'+title+'</h2><div class="casebox zoomable" style="margin-bottom:0"><img src="../'+img+'" alt="Texto-caso (imagen)"></div><p class="hintzoom">Pulsa sobre el texto para verlo más grande.</p>';
  return '<h2>'+title+'</h2><div class="explain">'+html+'</div>';
}

function viewA(){
  var t = S.tiempos.a || {};
  if (!t.start) return '<div class="card"><h2>Tarea A — Condición MANUAL (sin IA)</h2>' + CFG.aIntro +
    rulesBox(CFG.aRules) +
    '<p><b>Tiempo disponible: '+CFG.minA+' minutos.</b> El material aparecerá cuando pulses el botón; empieza cuando la profesora lo indique.</p>' +
    '<div class="btnrow"><button class="btn amar" data-start="a">Empezar la Tarea A</button></div></div>';
  var right;
  if (ISCODE){
    right = '<h3>Tu función</h3><p>Escribe tu código en Python, con un comentario breve que explique la lógica de cada bloque.</p>' + ta('a.codigo',S.a.codigo,false,'big code tall') +
      '<h3>Tus pruebas</h3><p>Anota con qué ejemplos has probado tu función y qué ha devuelto en cada caso.</p>' + ta('a.pruebas',S.a.pruebas,false,'big code');
  } else {
    var rows = S.a.rows.map(function(r,i){ return '<tr><td class="n">'+(i+1)+'</td><td>'+ta('a.rows.'+i+'.termino',r.termino,true)+'</td><td>'+ta('a.rows.'+i+'.solucion',r.solucion,true)+'</td></tr>'; }).join("");
    right = '<h3>Tu traducción</h3><p>Escribe aquí tu traducción al español del fragmento resaltado.</p>' + ta('a.trad',S.a.trad,true,'big tall') +
      '<h3>Términos u opciones de traducción que te han planteado más dudas (3-4)</h3><p>Anota cada término y justifica brevemente la solución que has elegido.</p>' +
      '<table class="resp"><thead><tr><th></th><th>Término u opción dudosa</th><th>Solución elegida y justificación</th></tr></thead><tbody>'+rows+'</tbody></table>';
  }
  return timerBar('a',CFG.minA) +
    '<div class="split"><div class="left"><div class="card">' + leftPane("a") + '</div></div>' +
    '<div class="right"><div class="card">' + right +
    '<div class="btnrow"><span style="flex:1"></span><button class="btn amar" data-finish="a">Terminar la Tarea A y continuar →</button></div></div></div></div>';
}

function viewB(){
  var t = S.tiempos.b || {};
  if (!t.start) return '<div class="card"><h2>Tarea B — Condición CON IA</h2>' + CFG.bIntro +
    rulesBox(CFG.bRules) +
    '<p><b>Tiempo disponible: '+CFG.minB+' minutos.</b></p><div class="btnrow"><button class="btn amar" data-start="b">Empezar la Tarea B</button></div></div>';
  var right;
  if (ISCODE){
    right = '<h3>Tu código final</h3><p>Pega o escribe aquí la versión final de la función, después de revisarla y depurarla. Añade tus propios comentarios (no copiados de la explicación de la IA).</p>' + ta('b.codigo',S.b.codigo,false,'big code tall') +
      '<h3>Tus pruebas</h3><p>Anota con qué ejemplos has probado la función y qué ha devuelto en cada caso.</p>' + ta('b.pruebas',S.b.pruebas,false,'big code') +
      '<h3>¿Qué tuviste que corregir o pedir de nuevo a la IA para llegar a la versión final?</h3>' + ta('b.correcciones',S.b.correcciones,false,'big');
  } else {
    var rows = S.b.rows.map(function(r,i){ return '<div class="brow"><div class="n">'+(i+1)+'</div>' +
      '<div class="bf">'+ta('b.rows.'+i+'.ia',r.ia,false,null,'Qué proponía la IA')+'</div>' +
      '<div class="bj">'+ta('b.rows.'+i+'.correccion',r.correccion,false,null,'Qué corregiste o matizaste tú')+'</div>' +
      '<div class="bj">'+ta('b.rows.'+i+'.porque',r.porque,false,null,'Por qué')+'</div></div>'; }).join("");
    right = '<h3>Borrador de la IA</h3><p>Pega aquí la traducción que te ha dado Copilot.</p>' + ta('b.borrador',S.b.borrador,false,'big') +
      '<h3>Tu traducción final (posedición)</h3><p>Escribe aquí tu versión revisada y corregida.</p>' + ta('b.trad',S.b.trad,false,'big tall') +
      '<h3>Los 3-4 puntos en los que corregiste o matizaste la propuesta de la IA, y por qué</h3>' + rows;
  }
  right += '<h3>Pega aquí tu conversación completa con Copilot</h3><p style="font-size:13px">Se usa para el estudio (cómo revisas lo que propone la IA). Selecciona toda la conversación en Copilot, cópiala y pégala.</p>' + ta('b.conversacion',S.b.conversacion,false,'big');
  return timerBar('b',CFG.minB) +
    '<div class="split"><div class="left"><div class="card">' + leftPane("b") +
    '<div class="btnrow"><button class="btn" id="copyprompt">① Copiar el mensaje para Copilot</button>' +
    '<a class="btn alt" href="'+COPILOT+'" target="_blank" rel="noopener noreferrer">② Abrir Microsoft Copilot</a></div></div></div>' +
    '<div class="right"><div class="card">' +
    '<p style="font-size:14px;margin-top:0">Copia el mensaje, abre Copilot con tu cuenta de la universidad, pégalo (<b>Ctrl+V</b>) y envíalo. Después revisa con criterio lo que te proponga.</p>' +
    right +
    '<div class="btnrow"><span style="flex:1"></span><button class="btn amar" data-finish="b">Terminar la Tarea B y continuar →</button></div></div></div></div>';
}

function viewPausa(){
  return '<div class="card"><h2>Pausa</h2><p>Si has llegado hasta aquí, espera a las nuevas indicaciones de la profesora, no pases todavía a la siguiente pantalla. Ella te avisará cuando puedas continuar.</p>' +
    '<div class="btnrow"><button class="btn amar" data-finish="pausa">Pulsa aquí cuando la profesora os avise de que ya podéis continuar</button></div></div>';
}

function recBody(){
  var sel = '<div class="idrow" style="margin:6px 0 14px"><label for="tareasel"><b>Tarea sobre la que respondes:</b></label><select id="tareasel" data-path="r.tarea" style="max-width:300px"><option value="">Elige…</option>' +
    ['A — manual (sin IA)','B — con IA'].map(function(o){ return '<option'+(o===S.r.tarea?' selected':'')+'>'+o+'</option>'; }).join("") + '</select></div>';
  var qs = CFG.recQs.map(function(q,i){
    var img = (CFG.recImg && CFG.recImg.q === i) ? '<div class="casebox" style="margin:6px 0 10px"><img src="../'+CFG.recImg.src+'" alt="Pseudocódigo (imagen)"></div>' : '';
    return '<div class="recrow"><h3 style="margin-top:0">'+(i+1)+'. '+q+'</h3>' + img + ta('r.resp.'+i,S.r.resp[i],true,'big') + '</div>'; }).join("");
  return sel + qs;
}
function viewRecuerdo(){
  var t = S.tiempos.r || {};
  if (!t.start) return '<div class="card"><div class="headsplit"><div><h2>Hoja de recuerdo inmediato</h2></div>' + ALERT + '</div>' +
    '<p>'+CFG.recIntro+'</p>' +
    rulesBox(['Responde de memoria, sin ninguna ayuda (apuntes, buscadores, compañeros/as ni IA). En esta hoja los cuadros no permiten pegar texto.']) +
    '<p><b>Tiempo disponible: 10 minutos</b> para esta hoja y el cuestionario de autoevaluación que viene a continuación.</p>' +
    '<div class="btnrow"><button class="btn amar" data-start="r">Empezar</button></div></div>';
  return timerBar('r',10,'Recuerdo inmediato + autoevaluación: 10 minutos') + '<div class="card"><div class="headsplit"><div><h2>Hoja de recuerdo inmediato</h2><p>Responde de memoria a cada pregunta.</p></div>' + ALERT + '</div>' + recBody() +
    '<div class="btnrow"><span style="flex:1"></span><button class="btn amar" data-finish="r">Terminar y continuar →</button></div></div>';
}

function viewAuto(){
  var rows = CFG.likert.map(function(q,i){
    return '<tr><td class="s">'+q+'</td>' + [1,2,3,4,5].map(function(v){ return '<td><input type="radio" name="lk'+i+'" value="'+v+'" data-path="auto.'+i+'"'+(String(S.auto[i])===String(v)?' checked':'')+' aria-label="'+v+'"></td>'; }).join("") + '</tr>'; }).join("");
  return timerBar('r',10,'Recuerdo inmediato + autoevaluación: 10 minutos') + '<div class="card"><h2>Cuestionario de autoevaluación</h2>' +
    '<p>Responde antes de conocer tu resultado en la hoja de recuerdo. Valora de 1 a 5 (1 = totalmente en desacuerdo · 5 = totalmente de acuerdo).</p>' +
    '<table class="likert"><thead><tr><th>Afirmación</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody>'+rows+'</tbody></table>' +
    '<div class="btnrow"><span style="flex:1"></span><button class="btn amar" data-finish="auto">Terminar →</button></div></div>';
}

function viewEntrega(){
  var nR = S.r.resp.filter(function(x){ return String(x).trim(); }).length;
  var main = ISCODE ? (S.a.codigo.trim()?'código entregado':'sin código') : (S.a.trad.trim()?'traducción entregada':'sin traducción');
  var mainB = ISCODE ? (S.b.codigo.trim()?'código entregado':'sin código') : (S.b.trad.trim()?'traducción entregada':'sin traducción');
  return '<div class="card"><h2>¡Has terminado! Descarga y entrega tus respuestas</h2>' +
    '<p class="ok">Tarea A: '+main+' · Tarea B: '+mainB+' · Recuerdo inmediato: '+nR+' de '+CFG.recQs.length+' preguntas</p>' +
    '<ol><li>Pulsa <b>Descargar mis respuestas</b>: se guardará un archivo con tus tres dígitos como nombre (por ejemplo, <b>'+esc(S.id||'274')+'.json</b>).</li>' +
    '<li>Entrega este archivo .json que has descargado en el aula de Moodlerooms de la asignatura: sección «Descarga cognitiva» → tarea «Descarga cognitiva».</li></ol>' +
    '<div class="btnrow"><button class="btn amar" id="dl">⬇ Descargar mis respuestas</button></div></div>';
}

function render(){
  stepper();
  var views = [viewInicio, viewA, viewB, viewPausa, viewRecuerdo, viewAuto, viewEntrega];
  var started = function(k){ return S.tiempos[k] && S.tiempos[k].start; };
  document.getElementById("stage").classList.toggle("wide", (S.step === 1 && !!started("a")) || (S.step === 2 && !!started("b")));
  document.getElementById("stage").innerHTML = views[S.step]();
  window.scrollTo(0,0); tick(); wire();
}

function finish(which){
  if (which === "a"){
    var empty = ISCODE ? !S.a.codigo.trim() : !S.a.trad.trim();
    if (!confirm(empty ? "Todavía no has escrito nada en el cuadro principal. ¿Terminar la Tarea A de todas formas? Después no podrás volver a ella." : "¿Terminar la Tarea A? Después no podrás volver a ella.")) return;
    S.tiempos.a.end = Date.now(); S.step = 2;
  } else if (which === "b"){
    if (!confirm("¿Terminar la Tarea B? Después no podrás volver a ella.")) return;
    S.tiempos.b.end = Date.now(); S.step = 3;
  } else if (which === "pausa"){ S.step = 4; }
  else if (which === "r"){
    var m = S.r.resp.filter(function(x){ return String(x).trim(); }).length;
    if (!S.r.tarea && !confirm("No has indicado sobre qué tarea (A o B) respondes. ¿Terminar de todas formas?")) return;
    if (!confirm(m < CFG.recQs.length ? "Has respondido "+m+" de "+CFG.recQs.length+" preguntas. ¿Terminar de todas formas?" : "¿Terminar la hoja de recuerdo?")) return;
    S.tiempos.r.end = Date.now(); S.step = 5;
  } else if (which === "auto"){
    if (S.auto.some(function(x){ return x === ""; }) && !confirm("Faltan afirmaciones por valorar. ¿Terminar de todas formas?")) return;
    S.fin = Date.now(); S.step = 6;
  }
  save(); render();
}

function download(){
  function dur(k){ var t = S.tiempos[k]; return t && t.start && t.end ? Math.round((t.end - t.start)/1000) : null; }
  var out = {
    actividad: CFG.actividadJson,
    version_web: 1, codigo_alumno: S.id, inicio: S.inicio, fin: S.fin,
    inicio_legible: S.inicio ? new Date(S.inicio).toISOString() : null, fin_legible: S.fin ? new Date(S.fin).toISOString() : null,
    duracion_segundos: { tarea_a: dur("a"), tarea_b: dur("b"), recuerdo_inmediato: dur("r") },
    consentimiento: { leido_entendido: S.consent[0], voluntario: S.consent[1], autoriza_uso_investigacion: S.consent[2] },
    herramienta_ia: "Microsoft Copilot (" + COPILOT + ")",
    tiempos_ms: S.tiempos,
    tarea_a_manual: S.a,
    tarea_b_con_ia: S.b,
    recuerdo_inmediato: { tarea_sobre_la_que_responde: S.r.tarea, respuestas: CFG.recQs.map(function(q,i){ return { pregunta: i+1, respuesta: S.r.resp[i] }; }) },
    autoevaluacion_1_a_5: CFG.likert.map(function(q,i){ return { afirmacion: q, valor: S.auto[i] }; })
  };
  dlJson(out, S.id + ".json");
}

function wire(){
  var st = document.getElementById("stage");
  var go0 = document.getElementById("go0");
  if (go0) go0.onclick = function(){
    var id = document.getElementById("idfield").value.trim();
    if (!/^\d{3}$/.test(id)){ alert("Escribe los tres últimos dígitos de tu clave académica (solo tres números)."); return; }
    S.id = id; if (!S.inicio) S.inicio = Date.now(); S.step = 1; save(); render();
  };
  var idf = document.getElementById("idfield");
  if (idf) idf.addEventListener("input", function(){ S.id = idf.value.replace(/\D/g,"").slice(0,3); idf.value = S.id; save(); });
  st.querySelectorAll("[data-consent]").forEach(function(c){ c.onchange = function(){ S.consent[+c.dataset.consent] = c.checked; save(); }; });
  st.querySelectorAll("[data-start]").forEach(function(b){ b.onclick = function(){ S.tiempos[b.dataset.start] = { start: Date.now() }; save(); render(); }; });
  st.querySelectorAll("[data-finish]").forEach(function(b){ b.onclick = function(){ finish(b.dataset.finish); }; });
  var cp = document.getElementById("copyprompt"); if (cp) cp.onclick = function(){ copyText(PROMPT_B, "Mensaje copiado. Pégalo en Copilot con Ctrl+V."); };
  var dl = document.getElementById("dl"); if (dl) dl.onclick = download;
  wireZoom(st);
}
commonListeners();
render();
}
`;

const POSTERIOR = String.raw`
function startApp(){
var KEY = "dc_" + CFG.dir + "_post_v1";
var MIN = CFG.post.min;
var STEPS = ["Inicio","1 · Recuerdo","2 · Transferencia","3 · Reflexión","Entrega"];
function fresh(){ return { v:1, step:0, id:"", inicio:null, fin:null, tiempos:{}, tarea:"", q1:"", q2:"", q3:"", q4:"" }; }
var S; try { S = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch(e){ S = null; }
if (!S || S.v !== 1) S = fresh();
function save(){ try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
${COMMON}
function timerBar(){ if (!S.tiempos.start) return ""; return '<div class="timer" id="timer" data-start="'+S.tiempos.start+'" data-min="'+MIN+'"><span>Tiempo disponible: '+MIN+' minutos (orientativo; la profesora marca el ritmo)</span><b id="timerval">--:--</b></div>'; }
function tick(){ var el = document.getElementById("timer"); if (!el) return; var left = Math.round(+el.dataset.min*60 - (Date.now()-(+el.dataset.start))/1000); var a = Math.abs(left);
  document.getElementById("timerval").textContent = (left<0?"+":"") + String(Math.floor(a/60)).padStart(2,"0") + ":" + String(a%60).padStart(2,"0"); el.classList.toggle("warn", left <= 180); }
setInterval(tick, 1000);

function viewInicio(){
  return '<div class="card"><div class="headsplit"><div><h2>Hoja de seguimiento</h2><p>Esta hoja forma parte del mismo estudio docente en el que participaste en la actividad principal. Si no autorizaste el uso de tus datos, la haces igualmente y tus respuestas no entran en el estudio.</p></div>' + ALERT + '</div>' +
    '<div class="rules"><b>Condiciones de realización</b><ul><li>Trabaja de forma individual, en este ordenador, de memoria y sin ninguna ayuda (apuntes, buscadores, compañeros/as, diccionarios ni IA).</li>' +
    '<li>Los cuadros de respuesta no subrayan errores ni corrigen automáticamente lo que escribes, y no permiten pegar texto.</li>' +
    '<li>Tu trabajo se guarda en esta pestaña mientras no la cierres. Al final descargarás un archivo con tus respuestas.</li></ul></div>' +
    '<h3>Tu identificador</h3><p>Los mismos tres últimos dígitos de tu clave académica que usaste en la actividad principal. No escribas tu nombre en ningún sitio.</p>' +
    '<div class="idrow"><input type="text" inputmode="numeric" maxlength="3" pattern="[0-9]{3}" autocomplete="off" spellcheck="false" placeholder="000" id="idfield" value="'+esc(S.id)+'"></div>' +
    '<p><b>Tiempo disponible: '+MIN+' minutos.</b> Empieza cuando la profesora lo indique.</p>' +
    '<div class="btnrow"><button class="btn amar" id="go0">Empezar →</button></div></div>';
}
function viewQ1(){
  var sel = '<div class="idrow" style="margin:6px 0 14px"><label for="tareasel"><b>Tarea sobre la que respondes:</b></label><select id="tareasel" data-path="tarea" style="max-width:300px"><option value="">Elige…</option>' +
    ['A — manual (sin IA)','B — con IA'].map(function(o){ return '<option'+(o===S.tarea?' selected':'')+'>'+o+'</option>'; }).join("") + '</select></div>';
  return timerBar() + '<div class="card"><div class="headsplit"><div><h2>1. '+CFG.post.q1.title+'</h2></div>' + ALERT + '</div>' + sel +
    '<p>'+CFG.post.q1.prompt+'</p>' + ta('q1',S.q1,true,'big') +
    '<div class="btnrow"><span style="flex:1"></span><button class="btn amar" data-finish="q1">Terminar esta parte y continuar →</button></div></div>';
}
function viewQ2(){
  var q = CFG.post.q2;
  var left = q.img ? '<div class="casebox zoomable" style="margin-bottom:0"><img src="'+q.img+'" alt="Texto de transferencia (imagen)"></div><p class="hintzoom">Pulsa sobre el texto para verlo más grande.</p>' : '<div class="explain">'+q.html+'</div>';
  return timerBar() + '<div class="split"><div class="left"><div class="card"><h2>2. '+q.title+'</h2><p style="margin-top:0">'+q.prompt+'</p>' + left + '</div></div>' +
    '<div class="right"><div class="card">' + ALERT + '<h3>Tu respuesta</h3><p>'+q.answerHint+'</p>' + ta('q2',S.q2,true,'big tall'+(ISCODE?' code':'')) +
    '<div class="btnrow"><span style="flex:1"></span><button class="btn amar" data-finish="q2">Terminar esta parte y continuar →</button></div></div></div></div>';
}
function viewQ3(){
  return timerBar() + '<div class="card"><h2>3. '+CFG.post.q3.title+'</h2><p>'+CFG.post.q3.prompt+'</p>' + ta('q3',S.q3,true,'big') +
    '<h2 style="margin-top:22px">4. Tu confianza de aquel día</h2><p>Vuelve a valorar tu confianza de aquel día: en retrospectiva, ¿tu predicción de la semana pasada fue acertada?</p>' + ta('q4',S.q4,true,'big') +
    '<div class="btnrow"><span style="flex:1"></span><button class="btn amar" data-finish="q3">Terminar →</button></div></div>';
}
function viewEntrega(){
  var n = [S.q1,S.q2,S.q3,S.q4].filter(function(x){ return x.trim(); }).length;
  return '<div class="card"><h2>¡Has terminado! Descarga y entrega tus respuestas</h2><p class="ok">Respondidas: '+n+' de 4 preguntas</p>' +
    '<ol><li>Pulsa <b>Descargar mis respuestas</b>: se guardará un archivo con tus tres dígitos como nombre (por ejemplo, <b>'+esc(S.id||'274')+'_diferido.json</b>).</li>' +
    '<li>Entrega este archivo .json que has descargado en la tarea «Descarga cognitiva - segunda parte» del aula de Moodlerooms (sección «Descarga cognitiva»).</li></ol>' +
    '<div class="btnrow"><button class="btn amar" id="dl">⬇ Descargar mis respuestas</button></div></div>';
}
function render(){
  stepper();
  var views = [viewInicio, viewQ1, viewQ2, viewQ3, viewEntrega];
  document.getElementById("stage").classList.toggle("wide", S.step === 2);
  document.getElementById("stage").innerHTML = views[S.step]();
  window.scrollTo(0,0); tick(); wire();
}
function finish(which){
  if (which === "q1"){ if (!S.tarea && !confirm("No has indicado sobre qué tarea (A o B) respondes. ¿Continuar de todas formas?")) return;
    if (!confirm("¿Terminar esta parte? Después no podrás volver a ella.")) return; S.step = 2; }
  else if (which === "q2"){ if (!confirm("¿Terminar esta parte? Después no podrás volver a ella.")) return; S.step = 3; }
  else if (which === "q3"){ if (!confirm("¿Terminar la hoja? Después no podrás volver a ella.")) return; S.fin = Date.now(); S.tiempos.end = S.fin; S.step = 4; }
  save(); render();
}
function download(){
  var out = {
    actividad: CFG.actividadJson + " — hoja de recuerdo diferido",
    version_web: 1, codigo_alumno: S.id, inicio: S.inicio, fin: S.fin,
    inicio_legible: S.inicio ? new Date(S.inicio).toISOString() : null, fin_legible: S.fin ? new Date(S.fin).toISOString() : null,
    duracion_segundos: S.tiempos.start && S.tiempos.end ? Math.round((S.tiempos.end - S.tiempos.start)/1000) : null,
    tarea_sobre_la_que_responde: S.tarea,
    recuerdo_diferido: S.q1,
    transferencia: S.q2,
    reconocimiento_o_logica_util: S.q3,
    confianza_retrospectiva: S.q4
  };
  dlJson(out, S.id + "_diferido.json");
}
function wire(){
  var st = document.getElementById("stage");
  var go0 = document.getElementById("go0");
  if (go0) go0.onclick = function(){
    var id = document.getElementById("idfield").value.trim();
    if (!/^\d{3}$/.test(id)){ alert("Escribe los tres últimos dígitos de tu clave académica (solo tres números)."); return; }
    S.id = id; if (!S.inicio) S.inicio = Date.now(); S.tiempos.start = Date.now(); S.step = 1; save(); render();
  };
  var idf = document.getElementById("idfield");
  if (idf) idf.addEventListener("input", function(){ S.id = idf.value.replace(/\D/g,"").slice(0,3); idf.value = S.id; save(); });
  st.querySelectorAll("[data-finish]").forEach(function(b){ b.onclick = function(){ finish(b.dataset.finish); }; });
  var dl = document.getElementById("dl"); if (dl) dl.onclick = download;
  wireZoom(st);
}
commonListeners();
render();
}
`;

module.exports = { ACCESS, PRINCIPAL, POSTERIOR };
