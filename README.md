# Descarga cognitiva e IA — web de actividades

Web estática (GitHub Pages) con las actividades del estudio docente «Descarga cognitiva e IA 26-27».
Portada con contraseña y un botón por asignatura; la visibilidad de cada asignatura se controla desde
el «Modo profesora» (contraseña de profesora + token de GitHub) y se guarda en `config.json`.

- `build.js` genera `index.html` (portada), las páginas provisionales de las asignaturas sin actividad
  y `config.json` (solo si no existe). Ejecutar: `node build.js`.
- `tee/index.html` es la actividad de TEE y **se edita a mano** (build.js no la toca).
- Las respuestas del alumnado no se envían a ningún servidor: se guardan en la pestaña (sessionStorage)
  y el alumnado descarga un archivo `NNN.json` (tres últimos dígitos de su clave) que entrega por Moodle.

## Añadir otra asignatura
1. Construir su actividad en `<dir>/index.html` (copiar la estructura de `tee/index.html`) y poner `exists: true` en `ASIGNATURAS` de `build.js`.
2. `node build.js` y subir. Ya aparece en el modo profesora para abrirla/cerrarla.

## Avisos
- Todo lo que se sube es técnicamente accesible desde el código fuente de la página (la contraseña es solo una barrera ligera).
  No subir solucionarios. La hoja de recuerdo diferido (sesión 8) debe subirse solo ese día.
