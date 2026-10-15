# Descarga cognitiva e IA — web de actividades

Web estática (GitHub Pages). La portada pide una contraseña y **cada contraseña de alumnado abre solo la
portada de su asignatura** (el mapa contraseña→asignatura está en `build.js`, `STUDENT_PASSWORDS`; en la web solo viaja el hash).
La contraseña de profesora (`TEACHER_PASSWORD`) muestra todas las asignaturas.

- `build.js` genera `index.html` (portada) y las páginas provisionales de las asignaturas sin actividad. `node build.js`.
- `tee/index.html` es el menú de TEE (3 opciones); `tee/principal`, `tee/retro` y `tee/posterior` se editan a mano.
- `tee/config.json` controla qué opciones de TEE ve el alumnado (`principal`, `retro`, `posterior`); se cambia desde el
  menú de TEE con la contraseña de profesora + token de GitHub (Modo profesora).
- Las respuestas del alumnado no se envían a ningún servidor: se guardan en la pestaña (sessionStorage) y el alumnado
  descarga un archivo `NNN.json` (o `NNN_diferido.json`) que entrega por Moodle.

## Asignaturas TJ, TM, PLN y DM
Se generan con `node gen-asignaturas.js` (datos en `gen/subjects.js`, motor en `gen/engine.js`); copian el patrón de TEE
(el CSS y el consentimiento se leen de `tee/principal`). Cada una tiene `index.html` (menú), `principal`, `retro` (retroalimentación
completa: tarea A, tarea B, recuerdo inmediato y hoja diferida) y `posterior`, más su `config.json`
(`principal`/`retro`/`posterior`; el generador solo lo crea si no existe). **No editar a mano esas páginas: editar el generador y volver a generar.**
`tee/` sigue editándose a mano. Entrega en Moodlerooms: sección «Descarga cognitiva» → tarea «Descarga cognitiva» (parte principal) y
«Descarga cognitiva - segunda parte» (hoja diferida).

## Avisos
Todo lo que se sube es técnicamente accesible desde el código fuente (la contraseña es solo una barrera ligera).
No subir solucionarios que no deban verse; la retroalimentación y la hoja diferida están ocultas por configuración, no cifradas.
