// PLN: la actividad pasa de «programar» a «interpretar resultados ya calculados» (Tema 5: métricas de traducción; Tema 6: sesgo léxico).
// Las salidas son reales: se generaron ejecutando el código mostrado (ver gen/casos_pln.json).
const C = require('./casos_pln.json');
const li = a => '<ol>' + a.map(x => '<li>' + x + '</li>').join('') + '</ol>';
const escH = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pre = c => '<pre class="cx">' + escH(c) + '</pre>';

const RULES_AI = ['Usa solo Microsoft Copilot, con el modelo que viene por defecto y entrando con tu cuenta de la universidad.'];

const CTX1 = 'Una frase de referencia (traducción humana) y tres traducciones automáticas, TA1, TA2 y TA3, se han evaluado con las métricas del Tema 5: precision, recall, F1, Jaccard, BLEU, chrF y METEOR.';
const CTX2 = 'Se ha analizado, con el pipeline del Tema 6, un subcorpus de tuits reales en español (800 por clase: positivos, negativos y neutros) sobre el tema «trabajo»: recuento por clase, concordancias (KWIC) y coocurrencias.';

const mk = t => ({
  name: t.name, qs: t.qs,
  left: '<h3>El caso</h3><p>' + t.ctx + '</p><h3>Código</h3>' + pre(t.code) + '<h3>Resultado</h3>' + pre(t.out) +
    '<p style="font-size:12.5px;color:#5a6b72">Puedes seleccionar y copiar el código y el resultado.</p>',
  manualIntro: '<p>' + t.ctx + ' El código y su resultado aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' + li([
    'No tienes que ejecutar ningún código: el resultado ya está calculado y aparecerá junto al código.',
    'Interpreta el resultado y responde a las 4 preguntas con tus propias palabras (2-4 líneas cada una), apoyándote en valores y ejemplos concretos del resultado.',
    'Sin IA ni buscar información en internet: solo lo que has visto en la asignatura.']),
  aiIntro: '<p>' + t.ctx + ' Esta vez te ayudarás de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El código y su resultado aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' + li([
    'No tienes que ejecutar ningún código: el resultado ya está calculado y aparecerá junto al código.',
    'Usa Copilot para ayudarte a interpretar el resultado y a responder a las 4 preguntas. Decide tú qué le pasas y cómo se lo preguntas.',
    'Copilot puede equivocarse o dejarse cosas: contrasta lo que diga con el resultado y con lo que has visto en clase.',
    'Registra en la página toda la conversación (cada mensaje tuyo y cada respuesta de Copilot), escribe tus respuestas finales y anota qué corregiste o añadiste a lo que dijo la IA.']),
  promptAI: ''
});

const TASKS = {
  taskX: mk({ name: 'Caso 1 · Evaluación de tres traducciones (Tema 5)', ctx: CTX1, code: C.code1, out: C.out1, qs: C.q1 }),
  taskY: mk({ name: 'Caso 2 · Tuits sobre «trabajo» (Tema 6)', ctx: CTX2, code: C.code2, out: C.out2, qs: C.q2 }),
  manualRules: ['Sin IA ni buscar información en internet. No hay que ejecutar ningún código. En esta tarea los cuadros no permiten pegar texto.'],
  aiRules: RULES_AI.concat(['Registrar la conversación completa con Copilot es una parte esencial de la actividad.']),
  rec: {
    intro: 'Responde de memoria sobre cada uno de los dos casos. No tienes los resultados, tus respuestas ni la IA disponibles.',
    blocks: [
      { title: 'Evaluación de tres traducciones (TA1, TA2, TA3)', qs: [
        'Describe, de memoria, en qué se diferenciaba cada una de las tres traducciones (TA1, TA2 y TA3) de la frase de referencia.',
        '¿Qué métricas puntuaban alto y cuáles bajo en cada traducción? Explica por qué ocurría.',
        '¿Qué limitación de las métricas automáticas ilustraba este caso? Pon un ejemplo concreto de lo que viste.'] },
      { title: 'Tuits sobre «trabajo»', qs: [
        '¿Qué resultado obtuvo el recuento de tuits por clase (positivos, negativos y neutros) y qué conclusión se podía, o no, sacar de él?',
        'Recuerda al menos dos usos de «trabajo» o de «horas» en los tuits que no se referían al mundo laboral.',
        'Recuerda al menos tres palabras de la tabla de coocurrencias e indica cuáles eran relevantes para el tema y cuáles eran ruido.'] }
    ],
    extra: []
  }
};

const PLN = {
  dir: 'pln', kind: 'interp',
  asig: 'Programación orientada al PLN', asigLarga: 'Programación orientada al PLN',
  titulo: 'Con copiloto o a pelo',
  subtitulo: 'Interpretar resultados de PLN con y sin IA — un experimento sobre lo que de verdad se te queda',
  desc1: 'Con copiloto o a pelo: interpretar resultados de PLN con y sin IA.',
  actividadJson: 'Descarga cognitiva e IA — Programación orientada al PLN, Práctica 1 (Con copiloto o a pelo · interpretación de resultados)',
  minA: 30, minB: 30, minPost: 15,
  objetivo: [
    'Vas a interpretar los resultados ya calculados de dos casos de PLN, de dificultad equivalente: uno trabajándolo tú solo/a, sin ningún asistente de IA, y otro con ayuda de un asistente de IA. El objetivo no es qué respuesta queda mejor, sino observar qué diferencia produce cada forma de trabajar en lo que realmente comprendes y recuerdas.',
    '<b>Importante:</b> en la condición con IA, tu criterio para aceptar lo que te diga sigue siendo el mismo que en cualquier revisión profesional: debes poder explicar y justificar cada afirmación como si la hubieras escrito tú.'
  ],
  likert: [
    'Estoy seguro/a de que podré explicar estas conclusiones dentro de una semana.',
    'Entiendo en profundidad por qué los resultados salen como salen, no solo qué dicen.',
    'El esfuerzo mental que me ha exigido la tarea ha sido alto.',
    'Podría interpretar otra salida parecida sin volver a consultar esta.'
  ],
  post: {
    min: 15,
    q1: { title: 'Lo que concluiste en cada caso', prompt: 'Explica de nuevo, de memoria, qué concluiste en cada uno de los dos casos que interpretaste hace una semana.' },
    q2: { title: 'Transferencia',
      html: '<p>Sin usar IA, interpreta este resultado nuevo. Se han evaluado dos traducciones de una misma frase de referencia con el mismo código del Caso 1 (precision, recall, F1, Jaccard, BLEU, chrF y METEOR):</p>' + pre(C.code3 + '\n\n' + C.out3) +
        li(['¿Qué traducción puntúa mejor en todas las métricas? ¿Por qué TB1 queda por debajo si no tiene faltas de ortografía?', 'Según tu criterio como traductor/a, ¿qué traducción es mejor? ¿Coincide con lo que dicen las métricas? Justifícalo con lo que sabes de lo que mide cada una.']),
      prompt: 'Interpreta a mano este resultado nuevo, sin ayuda de IA.',
      answerHint: 'Responde a las dos preguntas con tus palabras (2-4 líneas cada una).' },
    q3: { title: 'Qué te ha servido', prompt: '¿Qué has aprendido en los dos casos de hace una semana que te haya resultado útil para interpretar este resultado nuevo?' }
  },
  footer: 'Programación orientada al PLN · Descarga cognitiva e IA',
  retro: {
    tabs: [
      { key: 'a', kind: 'interp', tab: 'Caso 1 · Métricas', title: 'Caso 1 · Evaluación de tres traducciones (Tema 5)',
        intro: 'Este caso lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Tu redacción no tiene por qué coincidir con las respuestas de referencia: lo importante es que cada afirmación se apoye en los valores de la tabla y en lo que mide cada métrica.',
        code: C.code1, out: C.out1,
        qas: [
          { q: C.q1[0], a: 'No. Precision, Recall, F1 y Jaccard solo comprueban qué palabras aparecen (Jaccard compara conjuntos), así que no ven el orden: TA1 tiene las mismas palabras y saca 1.00. BLEU compara secuencias de palabras (n-gramas) y el cambio de orden rompe varias coincidencias, por eso baja a 0.83. METEOR también penaliza que las coincidencias queden fragmentadas (0.83). TA1 dice lo mismo, pero con otra estructura: no es idéntica.' },
          { q: C.q1[1], a: 'chrF (87.9), porque compara secuencias de caracteres: «medica» y «médica» (y «despues» y «después») comparten casi todos los caracteres. Las métricas que comparan palabras completas cuentan cada palabra sin tilde como una palabra distinta que no coincide (Jaccard 0.67, BLEU 0.63).' },
          { q: C.q1[2], a: 'Estas métricas miden coincidencia formal con la referencia, no significado. «Enfermo/paciente», «obtuvo/recibió», «clínica/médica», «tras/después de», «siete días/una semana» y «terapia/tratamiento» no coinciden como palabras ni como secuencias, así que todas las métricas bajan (BLEU 0.04, chrF 22.3). Revela que penalizan paráfrasis y sinónimos válidos. METEOR (0.27) tampoco la rescata: la versión de <code>nltk</code> que usamos se apoya en recursos en inglés, como vimos en el cuaderno de METEOR.' },
          { q: C.q1[3], a: 'Según las métricas: TA1 &gt; TA2 &gt; TA3. Según un criterio de traductor/a: TA1 es correcta; TA3 es una paráfrasis aceptable (con matices: «clínica» no es exactamente «médica»); TA2 tiene dos faltas de ortografía que en un texto final sí son errores. Lo normal es que los dos órdenes no coincidan: TA3 sale penalizada por reformular y TA2 sale favorecida pese a las faltas. Lo importante es argumentarlo.' }
        ],
        errs: [
          'Dar TA1 por perfecta porque Precision, Recall, F1 y Jaccard valen 1.00, sin explicar que esas métricas ignoran el orden.',
          'Decir que chrF o METEOR «reconocen sinónimos» y que por eso TA3 debería puntuar más.',
          'Concluir que TA3 es una mala traducción porque su puntuación es muy baja.',
          'Usar métricas o conceptos que no se han visto en la asignatura (por ejemplo, BERTScore o COMET) en vez de apoyarse en la tabla.'] },
      { key: 'b', kind: 'interp', tab: 'Caso 2 · Tuits', title: 'Caso 2 · Tuits sobre «trabajo» (Tema 6)',
        intro: 'Este caso lo trabajaste en la Tarea A o en la Tarea B, según tu versión de la actividad. Es el mismo tipo de razonamiento que la práctica y el evaluable del Tema 6: apoyarse en cifras, tuits y palabras concretas del resultado, y distinguir presencia temática de actitud.',
        code: C.code2, out: C.out2,
        qas: [
          { q: C.q2[0], a: 'Presencia temática. Hay 42 tuits de 2400 (7 positivos, 16 negativos y 19 neutros): que haya más negativos no indica una actitud negativa hacia el trabajo, solo que más tuits etiquetados como negativos contienen alguna palabra de la lista. Además, <code>n_objetivo_medio</code> es casi igual en las tres clases (1.00-1.06), la muestra es muy pequeña y la etiqueta es un dato del corpus, no un resultado del análisis. Limitaciones: palabras clave aisladas, polisemia y tamaño de muestra.' },
          { q: C.q2[1], a: 'En «trabajo»: «hacer un trabajo con un compañero» (tarea académica) y «qué trabajo les cuesta a los maestros…» (esfuerzo); «admira tu trabajo» se acerca más a obra. En «horas»: «diferencia de horas entre dos países», «horas de los Simpson», «solo he dormido horas»… casi ninguna se refiere al empleo. El recuento cuenta cualquier aparición como tema laboral, así que mete tuits que no hablan de trabajo (ruido) y distorsiona las cifras.' },
          { q: C.q2[2], a: 'Respuesta posible. «Triste» y «dios» vienen de «oh dios qué trabajo tan triste»: valoración relacionada con el tema (aunque con solo 2 apariciones). «Dormir», «dormido», «últimas» y «países» vienen sobre todo de la palabra «horas» (dormir horas, diferencia de horas entre países): no hablan del trabajo, son ruido. «Baja» y «emppleo» vienen de «baja el paro, seguimos creando empleo»: relevantes, aunque con una errata. Lo importante es justificar cada palabra con las líneas KWIC en vez de suponer.' },
          { q: C.q2[3], a: 'Se pueden añadir como stopwords de Twitter: <code>usuario</code>/menciones, <code>via</code>, <code>amp</code>, risas como <code>jaja</code>, abreviaturas (<code>xq</code>, <code>q</code>, <code>pa</code>) y hashtags que se repiten (como <code>mtvhottest</code>). Si limpias demasiado pierdes señales útiles: risas e intensificadores que marcan ironía o actitud, variantes y erratas (<code>emppleo</code>) que muestran cómo se escribe de verdad, y hashtags que identifican comunidades.' }
        ],
        errs: [
          'Concluir que los tuits negativos reflejan una actitud negativa hacia el trabajo.',
          'Tratar «horas», «dormir» o «mañana» como parte del tema laboral sin comprobar de dónde vienen en las líneas KWIC.',
          'No mencionar que las etiquetas pos/neg/neu vienen del corpus (no del análisis) ni que la muestra es muy pequeña (42 tuits).',
          'Proponer listas largas de stopwords sin tener en cuenta lo que se pierde al limpiar.'] },
      { key: 'r', kind: 'qa', tab: 'Recuerdo inmediato', title: 'Hoja de recuerdo inmediato',
        intro: 'La hoja de recuerdo inmediato te pedía recordar, de memoria, lo que concluiste en cada uno de los dos casos. Compara con estas ideas clave.',
        qas: [
          { q: 'Caso 1 · Evaluación de tres traducciones', a: '<b>TA1</b>: mismas palabras, otro orden. <b>TA2</b>: dos palabras sin tilde. <b>TA3</b>: paráfrasis con sinónimos. Precision, Recall, F1 y Jaccard no ven el orden (TA1 = 1.00); BLEU y METEOR sí lo notan; chrF tolera las tildes (TA2 alta) porque compara caracteres; todas castigan mucho a TA3. Limitación: miden coincidencia formal con la referencia, no significado ni calidad.' },
          { q: 'Caso 2 · Tuits sobre «trabajo»', a: '42 tuits de 2400 (7 positivos, 16 negativos, 19 neutros); <code>n_objetivo_medio</code> casi igual en las tres clases: se mide presencia temática, no actitud. Usos no laborales: «hacer un trabajo con un compañero», «qué trabajo les cuesta…», «horas» de dormir o diferencias horarias. Coocurrencias: «triste», «baja» y «emppleo» relevantes; «dormir», «dormido» y «países» ruido que viene de «horas».' }
        ] },
      { key: 'd', kind: 'qa', tab: 'Hoja diferida', title: 'Transferencia · interpretar un resultado nuevo',
        intro: 'La hoja diferida te pedía interpretar, sin ayuda, un resultado nuevo con el mismo tipo de razonamiento del Caso 1.',
        pre: C.code3 + '\n\n' + C.out3,
        qas: [
          { q: 'TB1 y TB2: ¿qué traducción puntúa mejor en todas las métricas? ¿Por qué TB1 queda por debajo si no tiene faltas de ortografía?', a: 'TB2 puntúa mejor en todas (BLEU 0.88, chrF 93.6): solo le falta una tilde en «científica». TB1 cambia la estructura («se publicaron» por «fueron publicados») y añade una palabra, así que coinciden menos palabras y secuencias con la referencia, y chrF también baja (83.8).' },
          { q: 'Según tu criterio como traductor/a, ¿qué traducción es mejor? ¿Coincide con las métricas?', a: 'TB1 es correcta (voz pasiva, sin faltas); TB2 tiene una falta de ortografía. Para un criterio profesional, TB1 es igual o mejor, y las métricas dicen lo contrario porque miden cercanía formal con la referencia, no calidad. Es el mismo fenómeno que con TA2 y TA3.' }
        ],
        note: 'Idea clave que había que transferir: las métricas basadas en coincidencia formal favorecen la cercanía a la referencia, aunque no sea la mejor traducción.' }
    ]
  }
};

module.exports = { PLN, TASKS };
