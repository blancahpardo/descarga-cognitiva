// Define, para cada asignatura nueva (TJ, TM, PLN, DM), las dos tareas como CONTENIDO (x, y) separado de la CONDICIÓN
// (manual / con IA), para poder contrabalancear: según la paridad del último dígito del identificador,
// la Tarea A (manual) usa el contenido x o el y, y la Tarea B (con IA) el otro.
const { SUBJECTS } = require('./subjects');
const li = a => '<ol>' + a.map(x => '<li>' + x + '</li>').join('') + '</ol>';
const by = d => SUBJECTS.find(s => s.dir === d);

const RULES_AI = ['Usa solo Microsoft Copilot, con el modelo que viene por defecto y entrando con tu cuenta de la universidad.'];
const CODE_PASTE = 'Sin IA ni buscar la solución en internet. Puedes escribir y probar tu código en tu entorno habitual de Python y pegarlo aquí; en este cuadro sí se permite pegar.';

// ----- Traducción (TJ, TM) -----
function translation(dir, o) {
  const s = by(dir);
  const frag = [s.retro.tabs[0].fr, s.retro.tabs[1].fr];
  const manualInstr = t => li([
    `Lee ${o.doc} completo para situar el fragmento resaltado (${t.art}) en su contexto.`, o.manual2, o.manual3]);
  const aiInstr = t => li([
    `Lee ${o.doc} completo para situar el fragmento resaltado (${t.art}) en su contexto.`,
    'Genera un primer borrador de la traducción del fragmento resaltado con <b>Microsoft Copilot</b> (con tu cuenta de la universidad).',
    `Poséditalo: revisa y corrige el borrador prestando especial atención a ${o.ai3}${t.aiHint ? ' ' + t.aiHint : ''}.`,
    'Señala los 3-4 puntos en los que corregiste o matizaste la propuesta de la IA, y por qué.']);
  const mk = (i, t) => ({
    name: t.name, img: t.img,
    manualIntro: t.ctx + '<h3>Instrucciones</h3>' + manualInstr(t),
    aiIntro: t.ctx + '<h3>Instrucciones</h3>' + aiInstr(t),
    promptAI: t.promptHead + ':\n\n' + frag[i]
  });
  return {
    taskX: mk(0, o.tasks[0]), taskY: mk(1, o.tasks[1]),
    manualRules: [o.manualRule], aiRules: RULES_AI.concat(['La traducción automática es solo un borrador: revisa y justifica lo que cambias.']),
    rec: { intro: o.recIntro, blocks: o.tasks.map(t => ({ title: t.recTitle, qs: o.recQs })), extra: [] }
  };
}

const TJ_T = translation('tj', {
  doc: 'el contrato',
  manual2: 'Traduce al español el fragmento resaltado utilizando exclusivamente diccionarios especializados, corpus paralelos o tus propios glosarios. No emplees ningún asistente de IA ni traductor automático.',
  manual3: 'Señala los 3-4 términos u opciones de traducción que te hayan planteado más dudas y justifica brevemente la solución elegida.',
  ai3: 'la precisión terminológica y al efecto jurídico de cada cláusula',
  manualRule: 'Sin IA ni traductor automático: solo diccionarios especializados, corpus paralelos o tus propios glosarios. En esta tarea los cuadros no permiten pegar texto.',
  recIntro: 'Responde de memoria sobre cada una de las dos cláusulas. No tienes los contratos, tus traducciones ni la IA disponibles.',
  recQs: [
    'Explica en tus propias palabras, en español, qué obligación o efecto jurídico establecía la cláusula.',
    '¿Qué excepciones o límites contemplaba la cláusula (si los había)? Descríbelos de memoria.',
    'Escribe de memoria la traducción al español de 3 términos clave del fragmento (indica el término en francés y tu propuesta).'
  ],
  tasks: [
    { name: 'Contrato de servicios de traducción · Artículo 5 — Confidencialidad', art: 'Artículo 5 — Confidencialidad', img: 'img/texto-a.png',
      recTitle: 'Cláusula de confidencialidad (contrato de servicios de traducción)',
      aiHint: '(alcance de la obligación, plazo, excepciones)',
      ctx: '<p>Este fragmento pertenece a un contrato de prestación de servicios de traducción, relectura y revisión de documentos, redactado en francés jurídico estándar entre un prestador de servicios lingüísticos y un cliente. Lee primero el contrato completo para situar el fragmento en su contexto (tipo de cláusulas que lo rodean, terminología del sector, estructura habitual de este tipo de contrato). El fragmento que debes traducir al español está resaltado (<b>Artículo 5 — Confidencialidad</b>).</p>',
      promptHead: 'Traduce al español este fragmento de un contrato de prestación de servicios de traducción, relectura y revisión de documentos, redactado en francés' },
    { name: 'Contrato de interpretación · Artículo 5 — Responsabilidad', art: 'Artículo 5 — Responsabilidad', img: 'img/texto-b.png',
      recTitle: 'Cláusula de responsabilidad (contrato de interpretación)',
      aiHint: '(límites de responsabilidad, exclusiones, daños indirectos)',
      ctx: '<p>Este fragmento pertenece a un contrato de prestación de servicios de interpretación de conferencia, redactado en francés jurídico estándar entre un prestador de servicios lingüísticos y un cliente. Lee primero el contrato completo para situar el fragmento en su contexto. El fragmento que debes traducir al español está resaltado (<b>Artículo 5 — Responsabilidad</b>).</p>',
      promptHead: 'Traduce al español este fragmento de un contrato de prestación de servicios de interpretación de conferencia, redactado en francés' }
  ]
});

const TM_T = translation('tm', {
  doc: 'el texto',
  manual2: 'Traduce al español el fragmento resaltado utilizando exclusivamente diccionarios especializados, glosarios o fuentes de referencia médica fiables. No emplees ningún asistente de IA ni traductor automático.',
  manual3: 'Señala los 3-4 términos u opciones de traducción que te hayan planteado más dudas (por ejemplo, términos médicos en inglés sin equivalente directo y evidente en español) y justifica brevemente la solución elegida.',
  ai3: 'la precisión terminológica médica y a la adecuación del registro divulgativo (ni demasiado técnico ni impreciso)',
  manualRule: 'Sin IA ni traductor automático: solo diccionarios especializados, glosarios o fuentes de referencia médica fiables. En esta tarea los cuadros no permiten pegar texto.',
  recIntro: 'Responde de memoria sobre cada uno de los dos fragmentos. No tienes los textos, tus traducciones ni la IA disponibles.',
  recQs: [
    'Explica en tus propias palabras, en español, la idea principal del fragmento que tradujiste.',
    '¿Qué dato, mecanismo o matiz médico concreto recuerdas del fragmento? Descríbelo de memoria.',
    'Escribe de memoria la traducción al español de 3 términos médicos clave del fragmento (indica el término en inglés y tu propuesta).'
  ],
  tasks: [
    { name: 'Artículo divulgativo · Párkinson', art: 'el párrafo central', img: 'img/texto-a.png', recTitle: 'Fragmento sobre el párkinson',
      ctx: '<p>Este fragmento pertenece a un artículo divulgativo sobre una enfermedad neurodegenerativa (el párkinson), escrito en inglés divulgativo dirigido a un público general con interés en temas de salud (por ejemplo, una revista de divulgación científica o la sección de salud de un medio digital). Lee primero el texto completo para situar el fragmento en su contexto antes de traducirlo. El fragmento que debes traducir al español está resaltado.</p>',
      promptHead: 'Traduce al español este fragmento de un artículo divulgativo sobre una enfermedad neurodegenerativa (el párkinson), escrito en inglés' },
    { name: 'Artículo divulgativo · Sensores de glucosa', art: 'el párrafo central', img: 'img/texto-b.png', recTitle: 'Fragmento sobre los sensores de glucosa',
      ctx: '<p>Este fragmento pertenece a un artículo divulgativo sobre un dispositivo médico wearable (sensor de glucosa), escrito en inglés divulgativo dirigido a un público general con interés en temas de salud. Lee primero el texto completo para situar el fragmento en su contexto antes de traducirlo. El fragmento que debes traducir al español está resaltado.</p>',
      promptHead: 'Traduce al español este fragmento de un artículo divulgativo sobre un dispositivo médico wearable (sensor de glucosa), escrito en inglés' }
  ]
});

// ----- Código (PLN, DM) -----
function code(dir, o) {
  const s = by(dir);
  const mk = (t, left) => ({
    name: t.name, left,
    manualIntro: t.ctx + '<h3>Instrucciones</h3>' + li(['Programa la función completamente por tu cuenta, sin usar ningún asistente de IA ni buscar la solución ya hecha en internet.', t.manualTest, 'Añade un comentario breve explicando la lógica de cada bloque de código.']),
    aiIntro: t.ctxAI + '<h3>Instrucciones</h3>' + li(['Usa un asistente de IA (<b>Microsoft Copilot</b>, con tu cuenta de la universidad) para generar un primer borrador de la función.', t.aiTest, 'Añade un comentario breve explicando la lógica de cada bloque de código, escrito por ti (no copiado de la explicación de la IA).', 'Anota brevemente qué tuviste que corregir o pedir de nuevo a la IA para llegar a la versión final.']),
    promptAI: t.prompt
  });
  return {
    taskX: mk(o.tasks[0], s.aLeft), taskY: mk(o.tasks[1], s.bLeft),
    manualRules: [CODE_PASTE], aiRules: RULES_AI.concat(['Debes poder explicar cada línea del código como si la hubieras escrito tú.']),
    rec: { intro: o.recIntro, blocks: o.tasks.map(t => ({ title: t.recTitle, qs: o.recQs })), extra: [o.extra] }
  };
}

const PLN_T = code('pln', {
  recIntro: 'Responde de memoria sobre cada uno de los dos algoritmos. No tienes tu código, la explicación ni la IA disponibles.',
  recQs: ['Explica por escrito, paso a paso, la lógica del algoritmo que implementaste (sin ver tu código).', '¿Qué caso especial o límite del algoritmo recuerdas que fuera más complicado de resolver?'],
  extra: { q: 'Detecta el error en este fragmento de pseudocódigo relacionado con la lógica del tokenizador. Escribe qué está mal y cómo lo corregirías.', img: 'img/pseudocodigo.png' },
  tasks: [
    { name: 'tokenizar(texto)', recTitle: 'Tokenizador basado en reglas · tokenizar(texto)',
      ctx: '<p>Vas a implementar en Python una función de tokenización basada en reglas. El enunciado y la explicación del algoritmo aparecerán cuando pulses el botón.</p>',
      ctxAI: '<p>Vas a implementar una función de tokenización basada en reglas, esta vez con ayuda de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El enunciado y la explicación del algoritmo aparecerán cuando pulses el botón.</p>',
      manualTest: 'Prueba tu función con al menos 3 frases de ejemplo, incluyendo alguna con el caso especial elegido.',
      aiTest: 'Revisa y depura el código: pruébalo con al menos 3 frases de ejemplo, incluyendo alguna con un caso especial (por ejemplo, un número decimal), y corrige cualquier error o comportamiento inesperado.',
      prompt: 'Escribe en Python una función tokenizar(texto) que reciba una cadena de texto y devuelva una lista de tokens, separando correctamente palabras y signos de puntuación, y tratando al menos un caso especial (por ejemplo, números decimales).' },
    { name: 'extraer_fechas(texto)', recTitle: 'Extracción de fechas con expresiones regulares · extraer_fechas(texto)',
      ctx: '<p>Vas a implementar una función de extracción de fechas con expresiones regulares. El enunciado y la explicación aparecerán cuando pulses el botón.</p>',
      ctxAI: '<p>Vas a implementar una función de extracción de fechas con expresiones regulares, esta vez con ayuda de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El enunciado y la explicación aparecerán cuando pulses el botón.</p>',
      manualTest: 'Prueba tu función con al menos 3 frases de ejemplo.',
      aiTest: 'Revisa y depura el código: pruébalo con al menos 3 frases de ejemplo y corrige cualquier error o comportamiento inesperado.',
      prompt: 'Escribe en Python una función extraer_fechas(texto) que reciba una cadena de texto y devuelva una lista con todas las fechas en formato dd/mm/aaaa que encuentre, usando expresiones regulares.' }
  ]
});

const DM_T = code('dm', {
  recIntro: 'Responde de memoria sobre cada una de las dos funciones. No tienes tu código, la explicación ni la IA disponibles.',
  recQs: ['Explica por escrito, paso a paso, la lógica del algoritmo que implementaste (sin ver tu código).', '¿Qué caso especial o límite del algoritmo recuerdas que fuera más complicado de resolver?'],
  extra: { q: 'Detecta el error en este fragmento de pseudocódigo relacionado con la detección de valores atípicos. Escribe qué está mal y cómo lo corregirías.', img: 'img/pseudocodigo.png' },
  tasks: [
    { name: 'limpiar_columna(df, columna)', recTitle: 'Limpieza de una columna · limpiar_columna(df, columna)',
      ctx: '<p>Vas a implementar en Python, con Pandas, una función de limpieza de una columna de texto. El enunciado y la explicación del proceso aparecerán cuando pulses el botón.</p>',
      ctxAI: '<p>Vas a implementar con Pandas una función de limpieza de una columna de texto, esta vez con ayuda de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El enunciado y la explicación del proceso aparecerán cuando pulses el botón.</p>',
      manualTest: 'Pruébala con un DataFrame de ejemplo de al menos 6 filas que incluya espacios sobrantes, mayúsculas inconsistentes, al menos un valor vacío/«NA» y una fila duplicada.',
      aiTest: 'Revisa y depura el código: pruébalo con un DataFrame de ejemplo de al menos 6 filas que incluya espacios sobrantes, mayúsculas inconsistentes, al menos un valor vacío/«NA» y una fila duplicada, y corrige cualquier error o comportamiento inesperado.',
      prompt: 'Escribe en Python, con Pandas, una función limpiar_columna(df, columna) que reciba un DataFrame y el nombre de una columna de texto, y devuelva un nuevo DataFrame con esa columna limpia (sin espacios sobrantes, en minúsculas, con los valores vacíos o «NA» convertidos a NaN) y sin filas duplicadas.' },
    { name: 'detectar_atipicos(df, columna)', recTitle: 'Valores atípicos con IQR · detectar_atipicos(df, columna)',
      ctx: '<p>Vas a implementar con Pandas una función de detección de valores atípicos con el método IQR. El enunciado y la explicación aparecerán cuando pulses el botón.</p>',
      ctxAI: '<p>Vas a implementar con Pandas una función de detección de valores atípicos con el método IQR, esta vez con ayuda de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El enunciado y la explicación aparecerán cuando pulses el botón.</p>',
      manualTest: 'Pruébala con un DataFrame de ejemplo de al menos 8 filas que incluya al menos 2 valores claramente atípicos.',
      aiTest: 'Revisa y depura el código: pruébalo con un DataFrame de ejemplo de al menos 8 filas que incluya al menos 2 valores claramente atípicos, y corrige cualquier error o comportamiento inesperado.',
      prompt: 'Escribe en Python, con Pandas, una función detectar_atipicos(df, columna) que reciba un DataFrame y el nombre de una columna numérica, y devuelva un DataFrame solo con las filas cuyo valor en esa columna se considere atípico según el método del rango intercuartílico (IQR).' }
  ]
});

// ----- Diferido: recuerdo por tarea -----
const POST_Q1 = {
  tj: { prompt: 'Explica de nuevo, de memoria, el efecto jurídico de cada una de las dos cláusulas que tradujiste hace una semana.' },
  tm: { prompt: 'Explica de nuevo, de memoria, la idea principal de cada uno de los dos fragmentos que tradujiste hace una semana.' },
  pln: { prompt: 'Explica de nuevo, de memoria, la lógica de cada uno de los dos algoritmos que implementaste hace una semana.' },
  dm: { prompt: 'Explica de nuevo, de memoria, la lógica de cada una de las dos funciones que implementaste hace una semana.' }
};

// ----- Etiquetas e introducciones de la retroalimentación (independientes de la versión A/B del alumno) -----
const AI_NOTE_T = ' Si lo hiciste con Copilot, fíjate además en qué errores de la traducción automática detectaste, cuáles <b>no</b> detectaste y si cambiaste algo que no hacía falta cambiar.';
const AI_NOTE_C = ' Si usaste Copilot, fíjate además en qué errores de la IA detectaste, cuáles <b>no</b> detectaste y si cambiaste algo que no hacía falta cambiar.';
const RETRO = {
  tj: { a: { tab: 'Confidencialidad', intro: 'Este fragmento (<b>Artículo 5 — Confidencialidad</b>) lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Tu traducción no tiene por qué coincidir palabra por palabra con la de referencia: hay varias soluciones válidas. Compara sobre todo la <b>terminología</b> y el <b>efecto jurídico</b>.' + AI_NOTE_T },
        b: { tab: 'Responsabilidad', intro: 'Este fragmento (<b>Artículo 5 — Responsabilidad</b>) lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Hay varias soluciones válidas: compara sobre todo la <b>terminología</b> y el <b>efecto jurídico</b>.' + AI_NOTE_T } },
  tm: { a: { tab: 'Párkinson', intro: 'Este fragmento (artículo sobre la enfermedad de Parkinson) lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Tu traducción no tiene por qué coincidir palabra por palabra con la de referencia: hay varias soluciones válidas. Compara sobre todo la <b>terminología médica</b> y el <b>registro divulgativo</b>.' + AI_NOTE_T },
        b: { tab: 'Sensores de glucosa', intro: 'Este fragmento (artículo sobre sensores de glucosa) lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Hay varias soluciones válidas: compara sobre todo la <b>terminología médica</b> y el <b>registro divulgativo</b>.' + AI_NOTE_T } },
  pln: { a: { tab: 'tokenizar()', intro: 'Esta función la implementaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Hay varias implementaciones válidas: lo importante es que tu función trate los signos de puntuación como tokens independientes y cubra al menos un caso especial (como los números decimales).' + AI_NOTE_C },
         b: { tab: 'extraer_fechas()', intro: 'Esta función la implementaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Hay varias implementaciones válidas: lo importante es que devuelva todas las fechas con formato dd/mm/aaaa y solo esas.' + AI_NOTE_C } },
  dm: { a: { tab: 'limpiar_columna()', intro: 'Esta función la implementaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Hay varias implementaciones válidas; fíjate sobre todo en el <b>orden</b> de las operaciones.' + AI_NOTE_C },
        b: { tab: 'detectar_atipicos()', intro: 'Esta función la implementaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Hay varias implementaciones válidas; fíjate sobre todo en el cálculo del IQR y en la máscara.' + AI_NOTE_C } }
};
const PREFIX = { tj: 'J', tm: 'M', pln: 'P', dm: 'D' };
const MIN_REC = 15, MIN_POST = 20;

function apply(subs) {
  const T = { tj: TJ_T, tm: TM_T, pln: PLN_T, dm: DM_T };
  for (const s of subs) {
    Object.assign(s, T[s.dir]);
    for (const k of ['aImg', 'bImg', 'aIntro', 'bIntro', 'aRules', 'bRules', 'aLeft', 'bLeft', 'promptB', 'recIntro', 'recQs', 'recImg']) delete s[k];
    s.prefix = PREFIX[s.dir]; s.minR = MIN_REC;
    s.post.min = MIN_POST;
    s.post.q1.items = s.rec.blocks.map(b => b.title);
    s.post.q1.prompt = POST_Q1[s.dir].prompt;
    for (const t of s.retro.tabs) {
      const r = RETRO[s.dir][t.key]; if (r) { t.tab = r.tab; t.intro = r.intro; }
      if (t.kind === 'recall') {
        t.intro = 'La hoja de recuerdo inmediato te pedía explicar, de memoria, lo trabajado en cada una de las dos tareas. Revisa cada bloque.';
        t.blocks[0].h = s.rec.blocks[0].title; t.blocks[1].h = s.rec.blocks[1].title;
      }
    }
  }
  return subs;
}
module.exports = { apply };
