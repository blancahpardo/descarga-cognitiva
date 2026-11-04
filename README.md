# Descarga cognitiva e IA — web de actividades

Web estática (GitHub Pages). La portada pide una contraseña y **cada contraseña de alumnado abre solo la
portada de su asignatura** (el mapa contraseña→asignatura está en `build.js`, `STUDENT_PASSWORDS`; en la web solo viaja el hash).
La contraseña de profesora (`TEACHER_PASSWORD`) muestra todas las asignaturas.

- `build.js` genera `index.html` (portada) y las páginas provisionales de las asignaturas sin actividad. `node build.js`.
- `tee/index.html` es el menú de TEE (3 opciones: 1 principal, 2 actividad posterior, 3 retroalimentación final asíncrono); `tee/principal`, `tee/retro` y `tee/posterior` se editan a mano.
- `tee/config.json` controla qué opciones de TEE ve el alumnado (`principal`, `retro`, `posterior`); se cambia desde el
  menú de TEE con la contraseña de profesora + token de GitHub (Modo profesora).
- Las respuestas del alumnado no se envían a ningún servidor: se guardan en la pestaña (sessionStorage) y el alumnado
  descarga un archivo `NNN-1.json` (principal) o `NNN-2.json` (diferido; con letra de asignatura, p. ej. `J789-2.json`) que entrega por Moodle.

## Asignaturas TJ, TM, PLN y DM
Se generan con `node gen-asignaturas.js` (datos en `gen/subjects.js` y `gen/tasks.js`, motor en `gen/engine.js`); copian el patrón de TEE
(el CSS y el consentimiento se leen de `tee/principal`). Cada una tiene `index.html` (menú), `principal`, `retro` (retroalimentación
completa: tarea A, tarea B, recuerdo inmediato y hoja diferida) y `posterior`, más su `config.json`
(`principal`/`retro`/`posterior`; el generador solo lo crea si no existe). **No editar a mano esas páginas: editar el generador y volver a generar.**
PLN y DM usan el tipo `interp` (interpretar resultados ya calculados): su contenido está en `gen/pln_interp.js` + `gen/casos_pln.json` y `gen/dm_interp.js` + `gen/casos_dm.json` (salidas reales; en DM, el intervalo hasta la hoja diferida es de dos semanas y se declara con `lapso`). `tee/` sigue editándose a mano. Entrega en Moodlerooms: sección «Descarga cognitiva» → tarea «Descarga cognitiva» (parte principal) y
«Descarga cognitiva - segunda parte» (hoja diferida).

### Diseño de datos (TJ, TM, PLN, DM)
- **Identificador con letra**: el alumnado escribe 3 dígitos; la web antepone la letra de la asignatura (T, J, P, D, M) en `codigo_alumno` y en el nombre del
  fichero (`J274-1.json` parte principal, `J274-2.json` hoja diferida). TEE: el diferido ya usa `T274-2.json`; la parte principal de TEE ya genera `T274-1.json` (`version_web: 3`); los ficheros del curso 2026-27, hechos antes del cambio (`274.json`, sin letra), se renombraron a mano.
- **Contrabalanceo** (solo TJ, TM, PLN, DM; TEE no lo tiene porque su parte principal ya se hizo): la versión se deduce del último dígito del identificador
  (par = N: Tarea A manual con el contenido 1 y Tarea B con IA con el contenido 2; impar = S: al revés). El JSON guarda `version_diseno`, el contenido de cada
  tarea y la condición (`manual` / `con_IA`) de cada bloque de recuerdo.
- **Recuerdo por tarea**: la hoja de recuerdo inmediato pregunta por los dos contenidos, y el diferido también (cada bloque con su condición y su confianza 0-100).
- **Cuestionario final del diferido** (todas las asignaturas, TEE incluida): repaso e IA entre sesiones, si sabían de la hoja, % recordado sin IA / con IA,
  esfuerzo (1-9), 6 ítems de opinión (1-5) y comentario opcional; más recuento de pegados bloqueados y salidas de pestaña (`eventos`).

## Avisos
Todo lo que se sube es técnicamente accesible desde el código fuente (la contraseña es solo una barrera ligera).
No subir solucionarios que no deban verse; la retroalimentación y la hoja diferida están ocultas por configuración, no cifradas.

- **Vista profesora** (clave maestra): en `principal` y `posterior` de todas las asignaturas, la barra de pasos es clicable para saltar a cualquier paso
  sin enviar nada, y aparece un selector de versión N/S (en TJ, TM, PLN y DM) para ver el contenido que verá cada código. Usa otra clave de
  `sessionStorage` (`..._prof`), así que no toca nada guardado de un alumno. Con clave de alumno todo sigue bloqueado como antes.

- **PLN (tipo `interp`)**: la actividad de PLN no es programar sino **interpretar resultados ya calculados**: Caso 1 (Tema 5, métricas de traducción: precision, recall, F1,
  Jaccard, BLEU, chrF, METEOR) y Caso 2 (Tema 6, tuits sobre «trabajo»). El contenido y las salidas reales están en `gen/pln_interp.js` y `gen/casos_pln.json`
  (se generaron ejecutando el código mostrado). En la tarea con IA el alumno **escribe sus propios mensajes** y registra turno a turno su mensaje y la
  respuesta de Copilot (el botón «Copiar» de Copilot solo copia la respuesta); el JSON guarda `conversacion_con_copilot`, `n_mensajes_declarado`,
  `respuestas_finales` y `correcciones_a_la_ia`. Contrabalanceo igual que en las demás: par = Caso 1 manual y Caso 2 con IA; impar, al revés.
