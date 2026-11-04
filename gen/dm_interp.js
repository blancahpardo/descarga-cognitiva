// Datos Masivos: la actividad pasa de «programar» a «interpretar resultados ya calculados» (U2: calidad y limpieza; U3: exploración descriptiva).
// Las salidas son reales: se generaron ejecutando el código mostrado sobre los datos de las prácticas (ver gen/casos_dm.json).
const C = require('./casos_dm.json');
const li = a => '<ol>' + a.map(x => '<li>' + x + '</li>').join('') + '</ol>';
const escH = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pre = c => '<pre class="cx">' + escH(c) + '</pre>';
const RULES_AI = ['Usa solo Microsoft Copilot, con el modelo que viene por defecto y entrando con tu cuenta de la universidad.'];

const CTX1 = 'Se ha construido, como en el cuaderno de la Unidad 2, un dataframe con 100 tuits en español a partir de un volcado JSON, y se han revisado su estructura, sus valores ausentes y sus duplicados antes de decidir cómo prepararlo.';
const CTX2 = 'Se ha explorado, como en el cuaderno de la Unidad 3, el CSV preparado con esos mismos 100 tuits: resumen estadístico de las variables numéricas, tabla por fuente de publicación y matriz de correlación.';

const mk = t => ({
  name: t.name, qs: t.qs,
  left: '<h3>El caso</h3><p>' + t.ctx + '</p><h3>Código</h3>' + pre(t.code) + '<h3>Resultado</h3>' + pre(t.out) +
    '<p style="font-size:12.5px;color:#5a6b72">Puedes seleccionar y copiar el código y el resultado.</p>',
  manualIntro: '<p>' + t.ctx + ' El código y su resultado aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' + li([
    'No tienes que ejecutar ningún código: el resultado ya está calculado y aparecerá junto al código.',
    'Interpreta el resultado y responde a las 4 preguntas con tus propias palabras (2-4 líneas cada una), apoyándote en cifras concretas del resultado.',
    'Sin IA ni buscar información en internet: solo lo que has visto en la asignatura.']),
  aiIntro: '<p>' + t.ctx + ' Esta vez te ayudarás de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El código y su resultado aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' + li([
    'No tienes que ejecutar ningún código: el resultado ya está calculado y aparecerá junto al código.',
    'Usa Copilot para ayudarte a interpretar el resultado y a responder a las 4 preguntas. Decide tú qué le pasas y cómo se lo preguntas.',
    'Copilot puede equivocarse o dejarse cosas: contrasta lo que diga con el resultado y con lo que has visto en clase.',
    'Registra en la página toda la conversación (cada mensaje tuyo y cada respuesta de Copilot), escribe tus respuestas finales y anota qué corregiste o añadiste a lo que dijo la IA.']),
  promptAI: ''
});

const TASKS = {
  taskX: mk({ name: 'Caso 1 · ¿Está limpio este volcado? (Unidad 2)', ctx: CTX1, code: C.code1, out: C.out1, qs: C.q1 }),
  taskY: mk({ name: 'Caso 2 · Primera lectura de un dataset (Unidad 3)', ctx: CTX2, code: C.code2, out: C.out2, qs: C.q2 }),
  manualRules: ['Sin IA ni buscar información en internet. No hay que ejecutar ningún código. En esta tarea los cuadros no permiten pegar texto.'],
  aiRules: RULES_AI.concat(['Registrar la conversación completa con Copilot es una parte esencial de la actividad.']),
  rec: {
    intro: 'Responde de memoria sobre cada uno de los dos casos. No tienes los resultados, tus respuestas ni la IA disponibles.',
    blocks: [
      { title: 'Revisión de calidad de un volcado de tuits', qs: [
        'Recuerda qué cifras de duplicados salían por identificador y por texto, y qué significaba cada una.',
        '¿Qué columna tenía muchos valores ausentes y qué opciones había para tratarlos? ¿Cuál elegiste y por qué?',
        'Recuerda qué otras características del dataset (idioma, retuits…) limitaban su utilidad para un análisis posterior.'] },
      { title: 'Primera lectura exploratoria del dataset', qs: [
        '¿Qué te indicaba la diferencia entre la media y la mediana de la longitud de los mensajes, y por qué había tantos valores iguales?',
        '¿Qué pasaba con el número de hashtags (media, mediana y máximo)? ¿Qué decidiste hacer con el valor extremo y por qué?',
        '¿Qué se podía concluir, y qué no, de la tabla por fuente y de la correlación entre longitud y URL?'] }
    ],
    extra: []
  }
};

const DM = {
  dir: 'dm', kind: 'interp',
  asig: 'Datos Masivos (Big Data)', asigLarga: 'Datos Masivos',
  titulo: 'Dato limpio, dato sospechoso',
  subtitulo: 'Interpretar resultados de limpieza y exploración de datos con y sin IA — un experimento sobre lo que de verdad se te queda',
  desc1: 'Dato limpio, dato sospechoso: interpretar resultados de limpieza y exploración de datos, con y sin IA.',
  actividadJson: 'Descarga cognitiva e IA — Datos Masivos, Práctica 1 (Dato limpio, dato sospechoso · interpretación de resultados)',
  minA: 25, minB: 25, minPost: 15, lapso: 'dos semanas',
  objetivo: [
    'Vas a interpretar los resultados ya calculados de dos casos de análisis de datos con Pandas, de dificultad equivalente: uno trabajándolo tú solo/a, sin ningún asistente de IA, y otro con ayuda de un asistente de IA. El objetivo no es qué respuesta queda mejor, sino observar qué diferencia produce cada forma de trabajar en lo que realmente comprendes y recuerdas.',
    '<b>Importante:</b> en la condición con IA, tu criterio para aceptar lo que te diga sigue siendo el mismo que en cualquier revisión profesional: debes poder explicar y justificar cada afirmación como si la hubieras escrito tú.'
  ],
  likert: [
    'Estoy seguro/a de que podré explicar estas conclusiones dentro de dos semanas.',
    'Entiendo en profundidad por qué los resultados salen como salen, no solo qué dicen.',
    'El esfuerzo mental que me ha exigido la tarea ha sido alto.',
    'Podría interpretar otra salida parecida sin volver a consultar esta.'
  ],
  post: {
    min: 15,
    q1: { title: 'Lo que concluiste en cada caso', prompt: 'Explica de nuevo, de memoria, qué concluiste en cada uno de los dos casos que interpretaste hace dos semanas.' },
    q2: { title: 'Transferencia',
      html: '<p>Sin usar IA, interpreta este resultado nuevo. Se ha agrupado el mismo dataset de 100 tuits por la marca de retuit, con el mismo tipo de código del Caso 2:</p>' + pre(C.code3 + '\n\n' + C.out3) +
        li(C.tb),
      prompt: 'Interpreta a mano este resultado nuevo, sin ayuda de IA.',
      answerHint: 'Responde a las dos preguntas con tus palabras (2-4 líneas cada una).' },
    q3: { title: 'Qué te ha servido', prompt: '¿Qué has aprendido en los dos casos de hace dos semanas que te haya resultado útil para interpretar este resultado nuevo?' }
  },
  footer: 'Datos Masivos · Descarga cognitiva e IA',
  retro: {
    tabs: [
      { key: 'a', kind: 'interp', tab: 'Caso 1 · Calidad', title: 'Caso 1 · ¿Está limpio este volcado? (Unidad 2)',
        intro: 'Este caso lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Tu redacción no tiene por qué coincidir con las respuestas de referencia: lo importante es que cada afirmación se apoye en cifras del resultado y que la decisión quede justificada.',
        code: C.code1, out: C.out1,
        qas: [
          { q: C.q1[0], a: 'Por <code>id_str</code> hay 0 duplicados: no hay dos registros con el mismo identificador. Por <code>texto</code> hay 27: mensajes con el mismo texto pero con identificador distinto, que aquí son sobre todo retuits del mismo mensaje (83 de los 100 lo son). No son registros repetidos por error, sino publicaciones distintas. Eliminarlos o no depende del objetivo: para estudiar contenidos distintos puede interesar quitar los repetidos; para medir difusión, conservarlos. Lo importante es no borrarlos a ciegas y documentar la decisión. En el cuaderno de la unidad se eliminan duplicados por identificador.' },
          { q: C.q1[1], a: '<b>Eliminar filas:</b> deja el dataset más completo en esa columna, pero se pierde el 45 % de los tuits (45 de 100). <b>Rellenar con una etiqueta</b> (como «sin_ubicacion» en el cuaderno): conserva todas las filas y hace explícita la ausencia, aunque esa etiqueta no es una ubicación real y no debe contarse como tal. <b>Dejar el valor ausente:</b> es lo más fiel a los datos, pero algunas operaciones lo ignoran o lo tratan distinto. Una opción razonable es etiquetar, como en el cuaderno, y dejarlo documentado.' },
          { q: C.q1[2], a: 'La columna <code>idioma</code> vale «es» en los 100 tuits: no distingue nada y no aporta para filtrar o comparar (aunque confirma que el volcado está en un solo idioma). Que 83 de 100 sean retuits significa que el dataset está dominado por mensajes que no son originales y que muchos textos se repiten (27 repetidos por texto). Además, 100 tuits es una muestra muy pequeña. Un análisis posterior de contenido no debería tratar cada retuit como una voz independiente ni leerlo como opinión pública.' },
          { q: C.q1[3], a: 'Respuestas posibles: etiquetar los ausentes de <code>ubicacion_usuario</code> (45); decidir y documentar qué hacer con los 27 textos repetidos (conservarlos o deduplicar, según el objetivo); conservar la marca <code>es_retuit</code> para poder separar retuits de mensajes originales (83 y 17); no usar <code>idioma</code> como variable de análisis porque es constante. Lo importante es que cada decisión se justifique con una cifra del resultado.' }
        ],
        errs: [
          'Concluir que no hay duplicados porque <code>id_str</code> da 0, sin mirar los 27 de <code>texto</code>.',
          'Eliminar las 45 filas sin ubicación sin comentar que se pierde casi la mitad de los datos.',
          'Tratar la etiqueta «sin_ubicacion» como si fuera un lugar real.',
          'Dar el dataset por listo sin mencionar la proporción de retuits ni el tamaño de la muestra.',
          'Proponer técnicas que no se han visto en la asignatura en lugar de apoyarse en las cifras del resultado.'] },
      { key: 'b', kind: 'interp', tab: 'Caso 2 · Exploración', title: 'Caso 2 · Primera lectura de un dataset (Unidad 3)',
        intro: 'Este caso lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Es el mismo tipo de razonamiento que la práctica de la Unidad 3: describir con cifras, no eliminar valores extremos solo porque aparezcan y hacer una lectura prudente de lo que no se puede concluir.',
        code: C.code2, out: C.out2,
        qas: [
          { q: C.q2[0], a: 'La media (133.42) es menor que la mediana (140) porque unos pocos mensajes cortos (mínimo 70) tiran de la media hacia abajo mientras la mayoría se acumula en el valor máximo: el primer cuartil ya es 139 y la mediana, el tercer cuartil y el máximo valen 140. Que tantos mensajes midan exactamente 140 indica un tope en los datos (un límite de longitud o un texto cortado), no un comportamiento de los usuarios. Conviene mirar los textos antes de interpretarlo.' },
          { q: C.q2[1], a: 'El 75 % de los mensajes no tiene hashtags (mediana 0 y tercer cuartil 0) y un único valor de 12 eleva la media a 0.32 y la desviación a 1.37. Es un valor extremo, no necesariamente un error: no se elimina solo porque sea extremo. Se revisa ese registro y, si se decide excluirlo del análisis, se hace de forma explícita y documentada. Para describir esta variable, la mediana y los cuartiles representan mejor a la mayoría que la media.' },
          { q: C.q2[2], a: 'Android reúne 61 de los 100 mensajes y iPhone y Web App 18 y 16; Instagram, Sprout Social y TweetDeck tienen 1 mensaje cada una e iPad 2, así que sus medias no son comparables ni fiables. Las diferencias entre las tres fuentes grandes (por ejemplo, 0.56 URL de media en Web frente a 0.15 en Android) merecen una mirada, pero con 16 mensajes hay que ser prudente. No se puede concluir nada sobre los usuarios, sus preferencias de dispositivo ni la opinión pública: la fuente es la aplicación de publicación y la muestra es pequeña y mayoritariamente de retuits.' },
          { q: C.q2[3], a: 'Una correlación de −0.21 es débil (más cerca de 0 que de −1) y, con 100 mensajes, poco estable. Además, <code>num_urls</code> solo toma los valores 0 y 1 y la longitud se acumula en 140, así que hay poca variación en ambas variables. Correlación no implica causalidad: no se puede afirmar que incluir una URL acorte los mensajes. Como mucho, es una relación débil que habría que comprobar con más datos y mirando los textos.' }
        ],
        errs: [
          'Interpretar la media sin compararla con la mediana (y los cuartiles).',
          'Eliminar el valor de 12 hashtags solo porque es extremo, sin revisarlo ni documentarlo.',
          'Sacar conclusiones de fuentes con 1 o 2 mensajes.',
          'Leer una correlación de −0.21 como una relación causal o como una relación fuerte.',
          'Concluir algo sobre los usuarios o sobre la opinión pública a partir de estas tablas.'] },
      { key: 'r', kind: 'qa', tab: 'Recuerdo inmediato', title: 'Hoja de recuerdo inmediato',
        intro: 'La hoja de recuerdo inmediato te pedía recordar, de memoria, lo que concluiste en cada uno de los dos casos. Compara con estas ideas clave.',
        qas: [
          { q: 'Caso 1 · ¿Está limpio este volcado?', a: '0 duplicados por <code>id_str</code> y 27 por <code>texto</code> (retuits distintos del mismo mensaje: no se borran a ciegas). 45 de 100 sin ubicación: eliminar pierde casi la mitad; etiquetar conserva las filas. <code>idioma</code> constante («es») y 83 retuits de 100: dataset pequeño y dominado por mensajes no originales.' },
          { q: 'Caso 2 · Primera lectura de un dataset', a: 'Longitud: media 133.42 &lt; mediana 140, con acumulación en 140 (tope en los datos). Hashtags: mediana 0, máximo 12; el extremo no se elimina sin revisarlo. Tabla por fuente: solo Android (61), iPhone y Web son comparables; las demás tienen 1-2 mensajes. Correlación longitud-URL de −0.21: débil y no causal.' }
        ] },
      { key: 'd', kind: 'qa', tab: 'Hoja diferida', title: 'Transferencia · interpretar un resultado nuevo',
        intro: 'La hoja diferida te pedía interpretar, sin ayuda, un resultado nuevo con el mismo tipo de razonamiento del Caso 2.',
        pre: C.code3 + '\n\n' + C.out3,
        qas: [
          { q: C.tb[0], a: 'Los no retuits (17 mensajes) tienen más URL de media (0.71 frente a 0.14) y más hashtags (0.59 frente a 0.27), y una longitud media algo menor (128.53 frente a 134.42). Con solo 17 mensajes en un grupo y 83 en el otro, las medias del grupo pequeño son poco estables. Además, la media de hashtags de los retuits (0.27) incluye el valor extremo de 12: ese único mensaje aporta casi la mitad de esa media (12/83 ≈ 0.14), así que no es una diferencia fiable. La diferencia en URL es la más marcada, pero sigue siendo prudente por el tamaño del grupo.' },
          { q: C.tb[1], a: 'Comprobaría el tamaño de cada grupo (17 y 83) y cuántos mensajes tienen URL en cada uno (como <code>num_urls</code> es 0 o 1, la media es una proporción), miraría la mediana y la distribución además de la media para ver el efecto de valores extremos, y recordaría que es una muestra pequeña de un único tema, por lo que no se generaliza. Solo después diría que los mensajes originales llevan más URL, y con cautela.' }
        ],
        note: 'Idea clave que había que transferir: ante una tabla de medias por grupo, comprobar primero el tamaño de los grupos y el efecto de los valores extremos, y hacer una lectura prudente.' }
    ]
  }
};

module.exports = { DM, TASKS };
