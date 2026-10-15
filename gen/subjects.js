// Contenido de cada asignatura. Procede de los materiales de
// «12. Investigación y publicación/2027 Descarga cognitiva IA 26-27/<asignatura>/Materiales».
// Los textos-caso van como imagen (igual que en TEE); los textos para copiar a Copilot viven aquí.

const li = a => '<ol>' + a.map(x => '<li>' + x + '</li>').join('') + '</ol>';
const TXT_LIKERT_END = ' (sin volver a consultar la tarea)';

// ---------- Traducción Jurídica FR-ES ----------
const TJ_FRAG_B = "Le Prestataire ne pourra être tenu responsable des conséquences dommageables résultant d'une interprétation erronée que dans la mesure où celle-ci procéderait d'une faute lourde ou intentionnelle imputable à l'interprète. En tout état de cause, la responsabilité du Prestataire, toutes causes confondues, sera limitée au montant des honoraires perçus au titre de la mission concernée. Le Prestataire ne pourra en aucun cas être tenu responsable des dommages indirects, tels que la perte d'image, de clientèle ou de chiffre d'affaires, subis par le Client du fait de l'exécution du présent contrat.";

const TJ = {
  dir: 'tj', kind: 'translation',
  asig: 'Traducción Jurídica FR-ES', asigLarga: 'Traducción Jurídica Francés-Español',
  titulo: 'El contrato con la IA',
  subtitulo: 'Traducir cláusulas jurídicas con y sin inteligencia artificial — un experimento sobre lo que de verdad se te queda',
  desc1: 'El contrato con la IA: traducción de cláusulas jurídicas con y sin IA.',
  actividadJson: 'Descarga cognitiva e IA — Traducción Jurídica FR-ES, Práctica 1 (El contrato con la IA)',
  minA: 30, minB: 30, minPost: 15,
  objetivo: [
    'Vas a traducir del francés al español dos cláusulas contractuales de dificultad equivalente, cada una enmarcada en un contrato de prestación de servicios lingüísticos (traducción en un caso, interpretación en el otro). Una la traducirás sin ningún apoyo de IA, usando solo diccionarios especializados, corpus paralelos o glosarios propios; la otra, con apoyo de traducción automática y posedición.',
    'A diferencia de un ejercicio de traducción de frases sueltas, aquí tienes el contrato completo como contexto: tipo de servicio, partes implicadas y las cláusulas que rodean el fragmento. Ese contexto debería ayudarte a entender mejor el efecto jurídico del fragmento resaltado antes de traducirlo.',
    '<b>Importante:</b> en la condición con IA, la traducción automática es solo un borrador: sigue siendo tu responsabilidad revisar la precisión terminológica y el efecto jurídico de cada cláusula.'
  ],
  aImg: 'img/texto-a.png', bImg: 'img/texto-b.png',
  aIntro: '<p>Este fragmento pertenece a un contrato de prestación de servicios de traducción, relectura y revisión de documentos, redactado en francés jurídico estándar entre un prestador de servicios lingüísticos y un cliente. Lee primero el contrato completo para situar el fragmento en su contexto (tipo de cláusulas que lo rodean, terminología del sector, estructura habitual de este tipo de contrato). El fragmento que debes traducir al español está resaltado (<b>Artículo 5 — Confidencialidad</b>).</p><h3>Instrucciones</h3>' +
    li(['Lee el contrato completo para situar el fragmento resaltado en su contexto.', 'Traduce al español el fragmento resaltado utilizando exclusivamente diccionarios especializados, corpus paralelos o tus propios glosarios. No emplees ningún asistente de IA ni traductor automático.', 'Señala los 3-4 términos u opciones de traducción que te hayan planteado más dudas y justifica brevemente la solución elegida.']),
  aRules: ['Sin IA ni traductor automático: solo diccionarios especializados, corpus paralelos o tus propios glosarios. En esta tarea los cuadros no permiten pegar texto.'],
  bIntro: '<p>Este fragmento pertenece a un contrato de prestación de servicios de interpretación de conferencia, redactado en francés jurídico estándar entre un prestador de servicios lingüísticos y un cliente. Lee primero el contrato completo para situar el fragmento en su contexto. El fragmento que debes traducir al español está resaltado (<b>Artículo 5 — Responsabilidad</b>).</p><h3>Instrucciones</h3>' +
    li(['Lee el contrato completo para situar el fragmento resaltado en su contexto.', 'Genera un primer borrador de la traducción del fragmento resaltado con <b>Microsoft Copilot</b> (con tu cuenta de la universidad).', 'Poséditalo: revisa y corrige el borrador prestando especial atención a la precisión terminológica y al efecto jurídico de cada cláusula (límites de responsabilidad, exclusiones, daños indirectos).', 'Señala los 3-4 puntos en los que corregiste o matizaste la propuesta de la IA, y por qué.']),
  bRules: ['Usa solo Microsoft Copilot, con el modelo que viene por defecto y entrando con tu cuenta de la universidad.', 'La traducción automática es solo un borrador: revisa y justifica lo que cambias.'],
  promptB: "Traduce al español este fragmento de un contrato de prestación de servicios de interpretación de conferencia, redactado en francés:\n\n" + TJ_FRAG_B,
  recIntro: 'Responde de memoria. No tienes el contrato, tu traducción ni la IA disponibles.',
  recQs: [
    'Explica en tus propias palabras, en español, qué obligación o efecto jurídico establecía la cláusula que tradujiste.',
    '¿Qué excepciones o límites contemplaba la cláusula (si los había)? Descríbelos de memoria.',
    'Escribe de memoria la traducción al español de 3 términos clave del fragmento (indica el término en francés y tu propuesta).'
  ],
  likert: [
    'Estoy seguro/a de que recordaré con precisión la terminología dentro de una semana.',
    'Entiendo en profundidad el efecto jurídico de la cláusula, no solo su traducción literal.',
    'El esfuerzo mental que me ha exigido la tarea ha sido alto.',
    'Podría traducir una cláusula similar sin apoyo, sin volver a consultar esta.'
  ],
  post: {
    min: 15,
    q1: { title: 'Efecto jurídico de la cláusula', prompt: 'Explica de nuevo, de memoria, el efecto jurídico de la cláusula que tradujiste hace una semana.' },
    q2: { title: 'Transferencia', img: 'img/transferencia.png',
      prompt: 'Traduce al español esta nueva cláusula, terminológicamente emparentada con las que trabajaste (pertenece también a un contrato de prestación de servicios lingüísticos), sin ayuda de IA ni diccionarios.',
      answerHint: 'Escribe aquí tu traducción de la cláusula.' },
    q3: { title: 'Términos', prompt: 'Señala qué términos de la cláusula nueva reconoces por haberlos trabajado antes, y cuáles te han costado más.' }
  },
  footer: 'Traducción Jurídica Francés-Español · Descarga cognitiva e IA',
  // ----- retroalimentación -----
  retro: {
    tabs: [
      { key: 'a', tab: 'Tarea A (sin IA)', title: 'Contrato de servicios de traducción · Artículo 5 — Confidencialidad', img: '../img/texto-a.png',
        intro: 'En la Tarea A traducías, sin IA, el <b>Artículo 5 — Confidencialidad</b>. Tu traducción no tiene por qué coincidir palabra por palabra con la de referencia: hay varias soluciones válidas. Compara sobre todo la <b>terminología</b> y el <b>efecto jurídico</b>.',
        fr: "Le Prestataire s'engage à garder strictement confidentielle toute information, de quelque nature que ce soit, contenue dans les documents qui lui sont confiés par le Client aux fins de traduction, ainsi que toute information dont il pourrait avoir connaissance à l'occasion de l'exécution du présent contrat. Cette obligation de confidentialité s'applique également aux traducteurs, relecteurs et collaborateurs auxquels le Prestataire ferait appel, qui devront être liés par un engagement de confidentialité équivalent. L'obligation de confidentialité prévue au présent article demeurera en vigueur pendant une durée de cinq (5) ans à compter de la fin de la mission, sauf si les informations concernées sont ou deviennent publiques sans faute du Prestataire.",
        ref: 'El Prestador se compromete a mantener estrictamente confidencial toda información, de cualquier naturaleza que sea, contenida en los documentos que le confíe el Cliente a efectos de traducción, así como cualquier información de la que pudiera tener conocimiento con motivo de la ejecución del presente contrato. Esta obligación de confidencialidad se aplicará igualmente a los traductores, revisores y colaboradores a los que recurra el Prestador, quienes deberán quedar vinculados por un compromiso de confidencialidad equivalente. La obligación de confidencialidad prevista en el presente artículo permanecerá en vigor durante un plazo de cinco (5) años a contar desde el fin del encargo, salvo que la información en cuestión sea o llegue a ser pública sin culpa del Prestador.',
        termsTitle: 'Términos que suelen plantear dudas',
        terms: [
          ['Prestataire', 'Prestador', 'Mantén la coherencia con «Client» → «Cliente», con mayúscula inicial: son partes definidas del contrato.'],
          ['aux fins de traduction', 'a efectos de traducción', 'Registro más jurídico que «con fines de traducción».'],
          ['engagement de confidentialité équivalent', 'compromiso de confidencialidad equivalente', ''],
          ['sans faute du Prestataire', 'sin culpa del Prestador', 'Término jurídico «culpa»; no «fallo» ni «error».'],
          ['de quelque nature que ce soit', 'de cualquier naturaleza que sea', 'También vale «sea cual sea su naturaleza».']
        ] },
      { key: 'b', tab: 'Tarea B (con IA)', title: 'Contrato de interpretación · Artículo 5 — Responsabilidad', img: '../img/texto-b.png',
        intro: 'En la Tarea B posditabas el borrador de Copilot del <b>Artículo 5 — Responsabilidad</b>. Fíjate en tres cosas al comparar con tu revisión: qué errores de la traducción automática detectaste, cuáles <b>no</b> detectaste y si cambiaste algo que no hacía falta cambiar.',
        fr: TJ_FRAG_B,
        ref: 'El Prestador únicamente podrá ser considerado responsable de las consecuencias perjudiciales derivadas de una interpretación errónea en la medida en que esta resulte de una falta grave o intencionada imputable al intérprete. En cualquier caso, la responsabilidad del Prestador, por cualquier causa que sea, quedará limitada al importe de los honorarios percibidos por el encargo de que se trate. El Prestador no podrá en ningún caso ser considerado responsable de los daños indirectos, tales como la pérdida de imagen, de clientela o de facturación, sufridos por el Cliente como consecuencia de la ejecución del presente contrato.',
        termsTitle: 'Errores frecuentes de la traducción automática',
        terms: [
          ['faute lourde', 'falta grave', 'La traducción automática puede dar «falta pesada», que no es el término jurídico.'],
          ['toutes causes confondues', 'por cualquier causa que sea', 'También «sea cual sea la causa». El calco literal («todas las causas confundidas») resulta confuso.'],
          ['dommages indirects', 'daños indirectos', 'Hay que conservar la distinción jurídica con los daños directos al simplificar la frase.'],
          ['chiffre d\'affaires', 'cifra de negocios / facturación', 'Ambas son válidas; evita calcos como «cifra de asuntos».']
        ] },
      { key: 'r', tab: 'Recuerdo inmediato', kind: 'recall',
        intro: 'La hoja de recuerdo inmediato te pedía explicar el efecto jurídico de la cláusula, sus límites y tres términos clave. Revisa lo que corresponde a la tarea que hiciste.',
        blocks: [
          { h: 'Si respondiste sobre la Tarea A (Confidencialidad)', p: [
            '<b>Efecto jurídico:</b> el Prestador debe mantener estrictamente confidencial toda la información de los documentos del cliente y la que conozca con motivo del contrato; la obligación alcanza también a traductores, revisores y colaboradores, que deben firmar un compromiso equivalente, y dura cinco años desde el fin del encargo.',
            '<b>Excepción:</b> la información que sea o llegue a ser pública sin culpa del Prestador.'],
            terms: [['Prestataire','Prestador'],['confidentialité','confidencialidad'],['aux fins de traduction','a efectos de traducción']] },
          { h: 'Si respondiste sobre la Tarea B (Responsabilidad)', p: [
            '<b>Efecto jurídico:</b> el Prestador solo responde de una interpretación errónea si hay falta grave o intencionada imputable al intérprete; su responsabilidad total queda limitada a los honorarios percibidos por esa misión.',
            '<b>Exclusión:</b> los daños indirectos (pérdida de imagen, de clientela o de facturación) no se indemnizan en ningún caso.'],
            terms: [['responsabilité','responsabilidad'],['faute lourde','falta grave'],['dommages indirects','daños indirectos']] }
        ] },
      { key: 'd', tab: 'Hoja diferida', title: 'Cláusula nueva · Artículo 8 — Non-sollicitation', img: '../posterior/img/transferencia.png',
        intro: 'La hoja diferida te pedía traducir, sin ayuda, una cláusula nueva emparentada con las que habías trabajado. Compara sobre todo qué términos reconociste.',
        fr: "Pendant la durée du présent contrat et pendant une période de douze (12) mois suivant sa cessation, le Prestataire s'engage à ne pas solliciter directement les clients finaux du Client dont il aurait eu connaissance à l'occasion de l'exécution de sa mission, sauf accord préalable et écrit du Client.",
        ref: 'Durante la vigencia del presente contrato y durante un período de doce (12) meses siguientes a su finalización, el Prestador se compromete a no captar directamente a los clientes finales del Cliente de los que hubiera tenido conocimiento con motivo de la ejecución de su encargo, salvo acuerdo previo y por escrito del Cliente.',
        termsTitle: 'Términos clave de esta cláusula',
        terms: [
          ['non-sollicitation', 'no captación (de clientes)', 'Cláusula de «no captación de clientes».'],
          ['clients finaux', 'clientes finales', ''],
          ['cessation', 'finalización / extinción (del contrato)', ''],
          ['s\'engage à…', 'se compromete a…', 'Ya aparecía en las tareas A y B.'],
          ['sauf accord préalable et écrit', 'salvo acuerdo previo y por escrito', '']
        ],
        note: 'Términos que deberías reconocer de las tareas A y B: «Prestataire» → «Prestador», «Client» → «Cliente» y la estructura «s\'engage à…» → «se compromete a…».' }
    ]
  }
};

// ---------- Traducción Médica EN-ES ----------
const TM_FRAG_B = "One of the main advantages of continuous glucose monitoring is its ability to reveal patterns that a single finger-prick test would miss entirely, such as overnight drops in glucose or sharp spikes after specific meals. Many devices now include customisable alerts that warn users before their glucose levels become dangerously high or low, which can be particularly valuable for people who experience hypoglycaemia unawareness, a condition in which the usual warning symptoms of low blood sugar fail to appear. Clinical studies have associated the use of these sensors with improved glycaemic control and a reduction in severe hypoglycaemic episodes, although outcomes vary depending on how consistently the device is used.";

const TM = {
  dir: 'tm', kind: 'translation',
  asig: 'Traducción Médica EN-ES', asigLarga: 'Traducción Médica Inglés-Español',
  titulo: 'Con segunda opinión (de IA)',
  subtitulo: 'Traducción médica con y sin IA — un experimento sobre lo que de verdad se te queda',
  desc1: 'Con segunda opinión (de IA): traducción médica divulgativa con y sin IA.',
  actividadJson: 'Descarga cognitiva e IA — Traducción Médica EN-ES, Práctica 1 (Con segunda opinión (de IA))',
  minA: 30, minB: 30, minPost: 15,
  objetivo: [
    'Vas a traducir del inglés al español dos fragmentos de textos divulgativos sobre salud, de dificultad equivalente (uno sobre una enfermedad, otro sobre un dispositivo médico). Uno lo traducirás sin ningún apoyo de IA, usando solo diccionarios especializados y fuentes de referencia; el otro, con apoyo de traducción automática y posedición.',
    'Tienes el texto completo como contexto, no solo la frase aislada: género textual, público al que se dirige y el desarrollo del tema alrededor del fragmento resaltado. Ese contexto debería ayudarte a decidir el registro y la terminología antes de traducir.',
    '<b>Importante:</b> en la condición con IA, la traducción automática es solo un borrador: sigue siendo tu responsabilidad revisar la precisión terminológica, especialmente en los términos médicos.'
  ],
  aImg: 'img/texto-a.png', bImg: 'img/texto-b.png',
  aIntro: '<p>Este fragmento pertenece a un artículo divulgativo sobre una enfermedad neurodegenerativa (el párkinson), escrito en inglés divulgativo dirigido a un público general con interés en temas de salud (por ejemplo, una revista de divulgación científica o la sección de salud de un medio digital). Lee primero el texto completo para situar el fragmento en su contexto antes de traducirlo. El fragmento que debes traducir al español está resaltado.</p><h3>Instrucciones</h3>' +
    li(['Lee el texto completo para situar el fragmento resaltado en su contexto.', 'Traduce al español el fragmento resaltado utilizando exclusivamente diccionarios especializados, glosarios o fuentes de referencia médica fiables. No emplees ningún asistente de IA ni traductor automático.', 'Señala los 3-4 términos u opciones de traducción que te hayan planteado más dudas (por ejemplo, términos médicos en inglés sin equivalente directo y evidente en español) y justifica brevemente la solución elegida.']),
  aRules: ['Sin IA ni traductor automático: solo diccionarios especializados, glosarios o fuentes de referencia médica fiables. En esta tarea los cuadros no permiten pegar texto.'],
  bIntro: '<p>Este fragmento pertenece a un artículo divulgativo sobre un dispositivo médico wearable (sensor de glucosa), escrito en inglés divulgativo dirigido a un público general con interés en temas de salud. Lee primero el texto completo para situar el fragmento en su contexto antes de traducirlo. El fragmento que debes traducir al español está resaltado.</p><h3>Instrucciones</h3>' +
    li(['Lee el texto completo para situar el fragmento resaltado en su contexto.', 'Genera un primer borrador de la traducción del fragmento resaltado con <b>Microsoft Copilot</b> (con tu cuenta de la universidad).', 'Poséditalo: revisa y corrige el borrador prestando especial atención a la precisión terminológica médica y a la adecuación del registro divulgativo (ni demasiado técnico ni impreciso).', 'Señala los 3-4 puntos en los que corregiste o matizaste la propuesta de la IA, y por qué.']),
  bRules: ['Usa solo Microsoft Copilot, con el modelo que viene por defecto y entrando con tu cuenta de la universidad.', 'La traducción automática es solo un borrador: revisa y justifica lo que cambias.'],
  promptB: "Traduce al español este fragmento de un artículo divulgativo sobre salud, escrito en inglés:\n\n" + TM_FRAG_B,
  recIntro: 'Responde de memoria. No tienes el texto, tu traducción ni la IA disponibles.',
  recQs: [
    'Explica en tus propias palabras, en español, la idea principal del fragmento que tradujiste.',
    '¿Qué dato, mecanismo o matiz médico concreto recuerdas del fragmento? Descríbelo de memoria.',
    'Escribe de memoria la traducción al español de 3 términos médicos clave del fragmento (indica el término en inglés y tu propuesta).'
  ],
  likert: [
    'Estoy seguro/a de que recordaré con precisión la terminología médica dentro de una semana.',
    'Entiendo en profundidad el contenido del fragmento, no solo su traducción literal.',
    'El esfuerzo mental que me ha exigido la tarea ha sido alto.',
    'Podría traducir un fragmento similar sin apoyo, sin volver a consultar este.'
  ],
  post: {
    min: 15,
    q1: { title: 'Idea principal', prompt: 'Explica de nuevo, de memoria, la idea principal del fragmento que tradujiste hace una semana.' },
    q2: { title: 'Transferencia', img: 'img/transferencia.png',
      prompt: 'Traduce al español este nuevo fragmento, temáticamente emparentado con los que trabajaste (también es un texto divulgativo sobre salud), sin ayuda de IA ni diccionarios.',
      answerHint: 'Escribe aquí tu traducción del fragmento.' },
    q3: { title: 'Términos', prompt: 'Señala qué términos del fragmento nuevo reconoces por haberlos trabajado antes (o por su parecido), y cuáles te han costado más.' }
  },
  footer: 'Traducción Médica Inglés-Español · Descarga cognitiva e IA',
  retro: {
    tabs: [
      { key: 'a', tab: 'Tarea A (sin IA)', title: 'Artículo sobre el párkinson', img: '../img/texto-a.png',
        intro: 'En la Tarea A traducías, sin IA, el fragmento resaltado del artículo sobre la enfermedad de Parkinson. Tu traducción no tiene por qué coincidir palabra por palabra con la de referencia: hay varias soluciones válidas. Compara sobre todo la <b>terminología médica</b> y el <b>registro divulgativo</b>.',
        fr: "Although Parkinson's disease is most commonly associated with motor symptoms, researchers increasingly recognise that non-motor symptoms can be just as disabling. These include sleep disturbances, depression, anxiety, constipation and, in later stages, cognitive decline. Because these symptoms often precede the classic motor signs by several years, some specialists now consider Parkinson's disease a whole-body disorder rather than a purely motor condition. This shift in understanding has important implications for early diagnosis: a combination of subtle non-motor symptoms, rather than tremor alone, may eventually help clinicians identify the disease at an earlier, more treatable stage.",
        ref: 'Aunque la enfermedad de Parkinson se asocia principalmente con síntomas motores, los investigadores reconocen cada vez más que los síntomas no motores pueden ser igual de incapacitantes. Entre ellos se incluyen los trastornos del sueño, la depresión, la ansiedad, el estreñimiento y, en fases más avanzadas, el deterioro cognitivo. Dado que estos síntomas suelen preceder a los signos motores clásicos en varios años, algunos especialistas consideran hoy la enfermedad de Parkinson un trastorno de todo el organismo y no una afección puramente motora. Este cambio de perspectiva tiene implicaciones importantes para el diagnóstico precoz: una combinación de síntomas no motores sutiles, más que el temblor por sí solo, podría ayudar en el futuro a los clínicos a identificar la enfermedad en una fase más temprana y con más posibilidades de tratamiento.',
        termsTitle: 'Términos que suelen plantear dudas',
        terms: [
          ['non-motor symptoms', 'síntomas no motores', 'Sin guion.'],
          ['disabling', 'incapacitante', 'Cuidado con el falso amigo «deshabilitante».'],
          ['whole-body disorder', 'trastorno de todo el organismo', 'También «trastorno sistémico».'],
          ['tremor', 'temblor', ''],
          ['clinicians', 'clínicos', '']
        ] },
      { key: 'b', tab: 'Tarea B (con IA)', title: 'Artículo sobre sensores de glucosa', img: '../img/texto-b.png',
        intro: 'En la Tarea B posditabas el borrador de Copilot del fragmento sobre sensores de glucosa. Fíjate en tres cosas al comparar con tu revisión: qué errores de la traducción automática detectaste, cuáles <b>no</b> detectaste y si cambiaste algo que no hacía falta cambiar.',
        fr: TM_FRAG_B,
        ref: 'Una de las principales ventajas de la monitorización continua de glucosa es su capacidad para revelar patrones que una única prueba de punción digital pasaría completamente por alto, como caídas nocturnas de la glucosa o picos pronunciados tras determinadas comidas. Muchos dispositivos incluyen ahora alertas personalizables que avisan al usuario antes de que sus niveles de glucosa alcancen valores peligrosamente altos o bajos, lo que puede resultar especialmente valioso para las personas que experimentan hipoglucemia asintomática (o inadvertida), una afección en la que los síntomas de alerta habituales de la glucemia baja no llegan a manifestarse. Los estudios clínicos han asociado el uso de estos sensores con un mejor control glucémico y una reducción de los episodios de hipoglucemia grave, aunque los resultados varían en función de la constancia con la que se utilice el dispositivo.',
        termsTitle: 'Errores frecuentes de la traducción automática',
        terms: [
          ['finger-prick test', 'prueba de punción digital', 'Evita versiones demasiado literales o coloquiales como «prueba de pinchazo en el dedo».'],
          ['hypoglycaemia unawareness', 'hipoglucemia asintomática / inadvertida', 'Es un concepto clínico establecido; no «desconocimiento de la hipoglucemia».'],
          ['glycaemic control', 'control glucémico', ''],
          ['customisable alerts', 'alertas personalizables', 'No pierdas el matiz de personalización.']
        ] },
      { key: 'r', tab: 'Recuerdo inmediato', kind: 'recall',
        intro: 'La hoja de recuerdo inmediato te pedía la idea principal del fragmento, un dato médico concreto y tres términos clave. Revisa lo que corresponde a la tarea que hiciste.',
        blocks: [
          { h: 'Si respondiste sobre la Tarea A (Párkinson)', p: [
            '<b>Idea principal:</b> los síntomas no motores (trastornos del sueño, depresión, ansiedad, estreñimiento y, más tarde, deterioro cognitivo) pueden ser tan incapacitantes como los motores y suelen aparecer años antes; por eso algunos especialistas consideran el párkinson un trastorno de todo el organismo.',
            '<b>Matiz clave:</b> esto tiene implicaciones para el diagnóstico precoz: una combinación de síntomas no motores sutiles, y no solo el temblor, podría ayudar a identificar la enfermedad antes.'],
            terms: [['non-motor symptoms','síntomas no motores'],['disabling','incapacitante'],['whole-body disorder','trastorno de todo el organismo']] },
          { h: 'Si respondiste sobre la Tarea B (sensores de glucosa)', p: [
            '<b>Idea principal:</b> la monitorización continua de glucosa revela patrones que una única punción digital no ve (caídas nocturnas, picos tras las comidas) y permite alertas personalizables antes de que la glucosa llegue a valores peligrosos.',
            '<b>Matiz clave:</b> es especialmente valiosa en la hipoglucemia asintomática; los estudios la asocian con mejor control glucémico y menos hipoglucemias graves, aunque el resultado depende de la constancia de uso.'],
            terms: [['finger-prick test','prueba de punción digital'],['hypoglycaemia unawareness','hipoglucemia asintomática / inadvertida'],['glycaemic control','control glucémico']] }
        ] },
      { key: 'd', tab: 'Hoja diferida', title: 'Fragmento nuevo · Análisis de sangre para el Alzheimer', img: '../posterior/img/transferencia.png',
        intro: 'La hoja diferida te pedía traducir, sin ayuda, un fragmento nuevo emparentado con los anteriores. Compara sobre todo qué términos reconociste.',
        fr: "New blood test may help detect Alzheimer's disease earlier. Researchers have developed a blood test that measures specific proteins associated with amyloid plaques, one of the hallmark features of Alzheimer's disease. Unlike traditional diagnostic methods, which often rely on expensive brain scans or invasive lumbar punctures, this blood-based approach could make early screening more accessible in primary care settings. Early validation studies suggest the test can identify patients at higher risk of cognitive decline several years before clinical symptoms become apparent, although further research is needed to confirm its accuracy across diverse populations.",
        ref: 'Un nuevo análisis de sangre podría ayudar a detectar antes la enfermedad de Alzheimer. Los investigadores han desarrollado un análisis de sangre que mide proteínas específicas asociadas a las placas amiloides, uno de los rasgos característicos de la enfermedad de Alzheimer. A diferencia de los métodos diagnósticos tradicionales, que a menudo recurren a costosas pruebas de neuroimagen o a punciones lumbares invasivas, este enfoque basado en sangre podría hacer que el cribado precoz fuera más accesible en atención primaria. Los estudios de validación preliminares sugieren que la prueba puede identificar a pacientes con mayor riesgo de deterioro cognitivo varios años antes de que aparezcan síntomas clínicos, aunque son necesarias más investigaciones para confirmar su precisión en poblaciones diversas.',
        termsTitle: 'Términos clave de este fragmento',
        terms: [
          ['amyloid plaques', 'placas amiloides', ''],
          ['hallmark features', 'rasgos característicos / distintivos', ''],
          ['lumbar punctures', 'punciones lumbares', ''],
          ['primary care', 'atención primaria', ''],
          ['cognitive decline', 'deterioro cognitivo', 'Ya aparecía en el texto sobre el párkinson.']
        ] }
    ]
  }
};

// ---------- Programación orientada al PLN ----------
const PLN = {
  dir: 'pln', kind: 'code',
  asig: 'Programación orientada al PLN', asigLarga: 'Programación orientada al PLN',
  titulo: 'Con copiloto o a pelo',
  subtitulo: 'Tokenización y extracción de patrones con y sin IA — un experimento sobre lo que de verdad se te queda',
  desc1: 'Con copiloto o a pelo: programación de módulos de PLN con y sin IA.',
  actividadJson: 'Descarga cognitiva e IA — Programación orientada al PLN, Práctica 1 (Con copiloto o a pelo)',
  minA: 35, minB: 35, minPost: 15,
  objetivo: [
    'Vas a implementar dos módulos sencillos de PLN, de complejidad equivalente: uno programándolo tú desde cero, sin ningún asistente de IA, y otro con ayuda de un asistente de generación de código. El objetivo no es qué código funciona mejor, sino observar qué diferencia produce cada forma de trabajar en tu comprensión real de la lógica del algoritmo.',
    '<b>Importante:</b> en la condición con IA, tu criterio para aceptar el código sigue siendo el mismo que en cualquier revisión profesional: debes poder explicar cada línea como si la hubieras escrito tú.'
  ],
  aLeft: '<h3>Tokenización basada en reglas</h3><p>Antes de que un modelo de PLN pueda procesar un texto, este debe dividirse en unidades más pequeñas llamadas tokens (normalmente palabras y signos de puntuación). Un tokenizador basado en reglas realiza este proceso en varios pasos:</p>' +
    li(['Se recorre el texto carácter a carácter.', 'Se identifican los separadores naturales: espacios en blanco y signos de puntuación (<code>. , ; : ! ?</code>).', 'Cada signo de puntuación se trata como un token independiente, separado de la palabra a la que acompaña (por ejemplo, «casa.» se divide en «casa» y «.»).', 'Los casos especiales (contracciones, abreviaturas, números decimales) requieren reglas adicionales, porque un separador simple los rompería de forma incorrecta (por ejemplo, «3.14» no debe partirse por el punto).', 'El resultado final es una lista ordenada de tokens que conserva el orden original del texto.']) +
    '<h3>Tarea de implementación</h3><p>Implementa en Python una función <code>tokenizar(texto)</code> que reciba una cadena de texto y devuelva una lista de tokens, separando correctamente palabras y signos de puntuación, y tratando al menos un caso especial (por ejemplo, números decimales).</p>',
  aIntro: '<p>Vas a implementar en Python una función de tokenización basada en reglas. El enunciado y la explicación del algoritmo aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' +
    li(['Programa la función completamente por tu cuenta, sin usar ningún asistente de IA ni buscar la solución ya hecha en internet.', 'Prueba tu función con al menos 3 frases de ejemplo, incluyendo alguna con el caso especial elegido.', 'Añade un comentario breve explicando la lógica de cada bloque de código.']),
  aRules: ['Sin IA ni buscar la solución en internet. Puedes escribir y probar tu código en tu entorno habitual de Python y pegarlo aquí; en este cuadro sí se permite pegar.'],
  bLeft: '<h3>Extracción de entidades con expresiones regulares</h3><p>Una forma sencilla de detectar ciertos tipos de entidades (fechas, correos electrónicos, importes) en un texto es mediante expresiones regulares, sin necesidad de un modelo estadístico. El proceso general es el siguiente:</p>' +
    li(['Se define un patrón que describe la forma típica de la entidad que se busca (por ejemplo, una fecha en formato dd/mm/aaaa sigue el patrón: dos dígitos, una barra, dos dígitos, una barra, cuatro dígitos).', 'Se recorre el texto buscando fragmentos que coincidan exactamente con ese patrón.', 'Cada coincidencia se extrae junto con la posición en la que aparece dentro del texto.', 'Este método es rápido y no requiere entrenamiento, pero es frágil: solo detecta las variantes de formato que el patrón contempla explícitamente, y puede fallar con formatos no previstos (por ejemplo, «5 de marzo de 2024» no sería detectado por el patrón numérico anterior).', 'Por eso, en sistemas reales, las expresiones regulares suelen combinarse con otros métodos (diccionarios, modelos entrenados) para cubrir los casos que el patrón por sí solo no cubre.']) +
    '<h3>Tarea de implementación</h3><p>Implementa en Python una función <code>extraer_fechas(texto)</code> que reciba una cadena de texto y devuelva una lista con todas las fechas en formato dd/mm/aaaa que encuentre, usando expresiones regulares.</p>',
  bIntro: '<p>Vas a implementar una función de extracción de fechas con expresiones regulares, esta vez con ayuda de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El enunciado y la explicación aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' +
    li(['Usa un asistente de IA para generar un primer borrador de la función.', 'Revisa y depura el código: pruébalo con al menos 3 frases de ejemplo y corrige cualquier error o comportamiento inesperado.', 'Añade un comentario breve explicando la lógica de cada bloque de código, escrito por ti (no copiado de la explicación de la IA).', 'Anota brevemente qué tuviste que corregir o pedir de nuevo a la IA para llegar a la versión final.']),
  bRules: ['Usa solo Microsoft Copilot, con el modelo que viene por defecto y entrando con tu cuenta de la universidad.', 'Debes poder explicar cada línea del código como si la hubieras escrito tú.'],
  promptB: 'Escribe en Python una función extraer_fechas(texto) que reciba una cadena de texto y devuelva una lista con todas las fechas en formato dd/mm/aaaa que encuentre, usando expresiones regulares.',
  recIntro: 'Responde de memoria. No tienes tu código, la explicación ni la IA disponibles.',
  recQs: [
    'Explica por escrito, paso a paso, la lógica del algoritmo que implementaste (sin ver tu código).',
    'Detecta el error en este fragmento de pseudocódigo relacionado con la misma lógica. Escribe qué está mal y cómo lo corregirías.',
    '¿Qué caso especial o límite del algoritmo recuerdas que fuera más complicado de resolver?'
  ],
  recImg: { q: 1, src: 'img/pseudocodigo.png' },
  likert: [
    'Estoy seguro/a de que podré explicar esta lógica dentro de una semana.',
    'Entiendo en profundidad por qué el código funciona, no solo que funciona.',
    'El esfuerzo mental que me ha exigido la tarea ha sido alto.',
    'Podría escribir una función similar desde cero, sin volver a consultar esta.'
  ],
  post: {
    min: 15,
    q1: { title: 'La lógica del algoritmo', prompt: 'Explica de nuevo, de memoria, la lógica del algoritmo que implementaste hace una semana.' },
    q2: { title: 'Transferencia',
      html: '<p>Sin usar IA, resuelve a mano (en pseudocódigo o Python) este problema nuevo pero análogo:</p><p><b>Escribe la lógica de una función que cuente cuántas palabras de un texto empiezan por mayúscula.</b></p>',
      prompt: 'Resuelve a mano este problema nuevo pero análogo, sin ayuda de IA.',
      answerHint: 'Escribe tu solución en pseudocódigo o en Python.' },
    q3: { title: 'Qué te ha servido', prompt: '¿Qué parte de la lógica de la tarea original te ha resultado útil para resolver este problema nuevo?' }
  },
  footer: 'Programación orientada al PLN · Descarga cognitiva e IA',
  retro: {
    tabs: [
      { key: 'a', tab: 'Tarea A (sin IA)', title: 'Tarea A · tokenizar(texto)',
        intro: 'En la Tarea A implementabas, sin IA, un tokenizador basado en reglas. Hay varias implementaciones válidas: lo importante es que tu función trate los signos de puntuación como tokens independientes y cubra al menos un caso especial (como los números decimales).',
        queda: '<p><b>Qué se pedía.</b> Una función <code>tokenizar(texto)</code> que devuelva una lista de tokens: palabras y signos de puntuación separados, y un caso especial bien tratado.</p>',
        code: 'import re\n\ndef tokenizar(texto):\n    # Palabras (incluye tildes y ñ), números decimales como un solo token\n    # y signos de puntuación sueltos\n    patron = r"\\d+\\.\\d+|[A-Za-zÁÉÍÓÚÑáéíóúñ]+|[.,;:!?]"\n    return re.findall(patron, texto)',
        codeNote: 'También es válida una implementación carácter a carácter con una bandera para detectar si el punto está entre dos dígitos (caso especial de número decimal) antes de tratarlo como separador.',
        errs: ['Separar los números decimales por el punto (p. ej. «3.14» se convierte en «3», «.», «14» en vez de un solo token «3.14»).', 'No tratar los signos de puntuación como tokens independientes (quedan pegados a la palabra anterior).', 'No volcar el último token acumulado al final del bucle si el texto no termina en un separador.', 'No contemplar mayúsculas ni tildes en la clase de caracteres de «letra».'] },
      { key: 'b', tab: 'Tarea B (con IA)', title: 'Tarea B · extraer_fechas(texto)',
        intro: 'En la Tarea B revisabas y depurabas el código de Copilot. Fíjate en qué errores de la IA detectaste, cuáles <b>no</b> detectaste y si cambiaste algo que no hacía falta cambiar.',
        queda: '<p><b>Qué se pedía.</b> Una función <code>extraer_fechas(texto)</code> que devuelva todas las fechas con formato dd/mm/aaaa, usando expresiones regulares.</p>',
        code: 'import re\n\ndef extraer_fechas(texto):\n    patron = r"\\b\\d{2}/\\d{2}/\\d{4}\\b"\n    return re.findall(patron, texto)',
        errs: ['Un patrón demasiado permisivo como <code>\\d+/\\d+/\\d+</code>, que también captura fracciones o números mal formateados (por ejemplo «5/6/78», con menos dígitos de los que pide el enunciado).', 'Olvidar los delimitadores de palabra (<code>\\b</code>), lo que puede capturar fragmentos de una cadena de dígitos más larga.', 'Usar <code>re.search</code> (solo devuelve la primera coincidencia) en vez de <code>re.findall</code> (devuelve todas).', 'No probar el caso de una fecha al principio o al final de la frase.'] },
      { key: 'r', tab: 'Recuerdo inmediato', kind: 'pseudo', title: 'Pseudocódigo con error', img: '../img/pseudocodigo.png',
        intro: 'La hoja de recuerdo inmediato te pedía explicar la lógica, encontrar un error en un pseudocódigo y recordar un caso límite.',
        why: '<p><b>Dónde está el error.</b> La lógica está invertida. Cuando el carácter <b>es</b> un espacio hay que <b>cerrar</b> el token actual (añadirlo a la lista y reiniciarlo); cuando <b>no</b> lo es, hay que <b>seguir acumulando</b> caracteres. Tal como está escrito, el código añade el espacio al token en vez de usarlo como separador, y vuelca el token a la lista cada vez que encuentra una letra normal, lo que trocea las palabras letra a letra en vez de por espacios.</p>',
        fixed: 'PARA cada caracter EN texto:\n  SI caracter ES espacio:\n    SI token_actual NO ES vacío:\n      anadir token_actual a lista_tokens\n      token_actual = ""\n  SI_NO:\n    token_actual = token_actual + caracter',
        limit: '<p><b>Casos especiales y límites</b> que se trabajaron: los números decimales («3.14» no debe partirse por el punto), las contracciones y las abreviaturas, que un separador simple rompería de forma incorrecta; y, en la extracción de fechas, que las expresiones regulares solo detectan los formatos que el patrón contempla (p. ej. «5 de marzo de 2024» no se detecta con un patrón dd/mm/aaaa).</p>' },
      { key: 'd', tab: 'Hoja diferida', kind: 'transfer', title: 'Transferencia · contar palabras que empiezan por mayúscula',
        intro: 'La hoja diferida te pedía resolver, sin ayuda, un problema nuevo pero análogo.',
        enun: 'Escribe la lógica de una función que cuente cuántas palabras de un texto empiezan por mayúscula.',
        code: 'def contar_mayusculas(texto):\n    palabras = texto.split()\n    contador = 0\n    for palabra in palabras:\n        if palabra and palabra[0].isupper():\n            contador += 1\n    return contador',
        idea: 'Idea clave que había que transferir de la tarea original: dividir el texto en unidades (palabras) recorriéndolo y aplicar una condición carácter a carácter o token a token; es el mismo patrón general que en <code>tokenizar()</code>.' }
    ]
  }
};

// ---------- Datos Masivos ----------
const DM = {
  dir: 'dm', kind: 'code',
  asig: 'Datos Masivos (Big Data)', asigLarga: 'Datos Masivos',
  titulo: 'Dato limpio, dato sospechoso',
  subtitulo: 'Limpieza de datos y detección de valores atípicos con y sin IA — un experimento sobre lo que de verdad se te queda en Pandas',
  desc1: 'Dato limpio, dato sospechoso: limpieza y valores atípicos con Pandas, con y sin IA.',
  actividadJson: 'Descarga cognitiva e IA — Datos Masivos, Práctica 1 (Dato limpio, dato sospechoso)',
  minA: 35, minB: 35, minPost: 15,
  objetivo: [
    'Vas a implementar dos funciones de tratamiento de datos con Pandas, de complejidad equivalente: una programándola tú desde cero, sin ningún asistente de IA, y otra con ayuda de un asistente de generación de código. El objetivo no es qué código funciona mejor, sino observar qué diferencia produce cada forma de trabajar en tu comprensión real de la lógica del proceso.',
    '<b>Importante:</b> en la condición con IA, tu criterio para aceptar el código sigue siendo el mismo que en cualquier revisión profesional: debes poder explicar cada línea como si la hubieras escrito tú.'
  ],
  aLeft: '<h3>Limpieza y normalización de una columna de texto en un DataFrame</h3><p>Antes de analizar datos textuales dentro de un DataFrame, hay que homogeneizar el contenido de cada celda para que valores equivalentes no se traten como distintos. Un proceso de limpieza básico sigue estos pasos:</p>' +
    li(['Se recorren los valores de la columna uno a uno.', 'Se eliminan espacios en blanco sobrantes al principio y al final (<code>strip</code>).', 'Se homogeneiza el uso de mayúsculas/minúsculas (por ejemplo, todo a minúsculas).', 'Se sustituyen los valores vacíos o equivalentes a «nulo» (cadenas vacías, «NA», «n/a»…) por un valor nulo reconocido por Pandas (<code>NaN</code>).', 'Se eliminan las filas duplicadas resultantes tras la limpieza.', 'El resultado es una columna homogénea, lista para el análisis posterior.']) +
    '<h3>Tarea de implementación</h3><p>Implementa en Python una función <code>limpiar_columna(df, columna)</code> que reciba un DataFrame y el nombre de una columna de texto, y devuelva un nuevo DataFrame con esa columna limpia (sin espacios sobrantes, en minúsculas, con los valores vacíos/«NA» convertidos a NaN) y sin filas duplicadas.</p>',
  aIntro: '<p>Vas a implementar en Python, con Pandas, una función de limpieza de una columna de texto. El enunciado y la explicación del proceso aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' +
    li(['Programa la función completamente por tu cuenta, sin usar ningún asistente de IA ni buscar la solución ya hecha en internet.', 'Pruébala con un DataFrame de ejemplo de al menos 6 filas que incluya espacios sobrantes, mayúsculas inconsistentes, al menos un valor vacío/«NA» y una fila duplicada.', 'Añade un comentario breve explicando la lógica de cada bloque de código.']),
  aRules: ['Sin IA ni buscar la solución en internet. Puedes escribir y probar tu código en tu entorno habitual de Python y pegarlo aquí; en este cuadro sí se permite pegar.'],
  bLeft: '<h3>Detección de valores atípicos mediante el rango intercuartílico (IQR)</h3><p>Un valor atípico (<i>outlier</i>) es un dato que se aleja mucho del resto de valores de una columna y puede distorsionar un análisis posterior. Un método sencillo y muy usado para detectarlos es el rango intercuartílico:</p>' +
    li(['Se calculan el primer cuartil (Q1, percentil 25) y el tercer cuartil (Q3, percentil 75) de la columna.', 'Se calcula el rango intercuartílico: <code>IQR = Q3 − Q1</code>.', 'Se definen los límites inferior y superior: <code>límite_inf = Q1 − 1,5·IQR</code>; <code>límite_sup = Q3 + 1,5·IQR</code>.', 'Cualquier valor por debajo del límite inferior o por encima del límite superior se considera atípico.', 'Este método es rápido y no requiere asumir una distribución concreta, pero es sensible al tamaño de la muestra y puede marcar como atípicos valores que en realidad son válidos en columnas con distribuciones muy asimétricas.']) +
    '<h3>Tarea de implementación</h3><p>Implementa en Python una función <code>detectar_atipicos(df, columna)</code> que reciba un DataFrame y el nombre de una columna numérica, y devuelva un DataFrame solo con las filas cuyo valor en esa columna se considere atípico según el método IQR.</p>',
  bIntro: '<p>Vas a implementar una función de detección de valores atípicos con el método IQR, esta vez con ayuda de <b>Microsoft Copilot</b> (con tu cuenta de la universidad). El enunciado y la explicación aparecerán cuando pulses el botón.</p><h3>Instrucciones</h3>' +
    li(['Usa un asistente de IA para generar un primer borrador de la función.', 'Revisa y depura el código: pruébalo con un DataFrame de ejemplo de al menos 8 filas que incluya al menos 2 valores claramente atípicos, y corrige cualquier error o comportamiento inesperado.', 'Añade un comentario breve explicando la lógica de cada bloque de código, escrito por ti (no copiado de la explicación de la IA).', 'Anota brevemente qué tuviste que corregir o pedir de nuevo a la IA para llegar a la versión final.']),
  bRules: ['Usa solo Microsoft Copilot, con el modelo que viene por defecto y entrando con tu cuenta de la universidad.', 'Debes poder explicar cada línea del código como si la hubieras escrito tú.'],
  promptB: 'Escribe en Python, con Pandas, una función detectar_atipicos(df, columna) que reciba un DataFrame y el nombre de una columna numérica, y devuelva un DataFrame solo con las filas cuyo valor en esa columna se considere atípico según el método del rango intercuartílico (IQR).',
  recIntro: 'Responde de memoria. No tienes tu código, la explicación ni la IA disponibles.',
  recQs: [
    'Explica por escrito, paso a paso, la lógica del algoritmo que implementaste (sin ver tu código).',
    'Detecta el error en este fragmento de pseudocódigo relacionado con la misma lógica. Escribe qué está mal y cómo lo corregirías.',
    '¿Qué caso especial o límite del algoritmo recuerdas que fuera más complicado de resolver?'
  ],
  recImg: { q: 1, src: 'img/pseudocodigo.png' },
  likert: [
    'Estoy seguro/a de que podré explicar esta lógica dentro de una semana.',
    'Entiendo en profundidad por qué el código funciona, no solo que funciona.',
    'El esfuerzo mental que me ha exigido la tarea ha sido alto.',
    'Podría escribir una función similar desde cero, sin volver a consultar esta.'
  ],
  post: {
    min: 15,
    q1: { title: 'La lógica del algoritmo', prompt: 'Explica de nuevo, de memoria, la lógica del algoritmo que implementaste hace una semana.' },
    q2: { title: 'Transferencia',
      html: '<p>Sin usar IA, resuelve a mano (en pseudocódigo o Python) este problema nuevo pero análogo:</p><p><b>Escribe la lógica de una función que, dado un DataFrame y una columna de texto, cuente cuántos valores de esa columna tienen más de un número determinado de caracteres.</b></p>',
      prompt: 'Resuelve a mano este problema nuevo pero análogo, sin ayuda de IA.',
      answerHint: 'Escribe tu solución en pseudocódigo o en Python.' },
    q3: { title: 'Qué te ha servido', prompt: '¿Qué parte de la lógica de la tarea original te ha resultado útil para resolver este problema nuevo?' }
  },
  footer: 'Datos Masivos · Descarga cognitiva e IA',
  retro: {
    tabs: [
      { key: 'a', tab: 'Tarea A (sin IA)', title: 'Tarea A · limpiar_columna(df, columna)',
        intro: 'En la Tarea A implementabas, sin IA, la limpieza de una columna de texto. Hay varias implementaciones válidas; fíjate sobre todo en el <b>orden</b> de las operaciones.',
        queda: '<p><b>Qué se pedía.</b> Una función <code>limpiar_columna(df, columna)</code> que devuelva un nuevo DataFrame con la columna sin espacios sobrantes, en minúsculas, con los vacíos/«NA» convertidos a NaN y sin filas duplicadas.</p>',
        code: 'import pandas as pd\n\ndef limpiar_columna(df, columna):\n    df = df.copy()\n    df[columna] = (df[columna]\n                   .astype("string")\n                   .str.strip()               # espacios sobrantes\n                   .str.lower()               # mayúsculas/minúsculas\n                   .replace(["", "na", "n/a"], pd.NA))  # vacíos y «NA» → nulo\n    return df.drop_duplicates()               # duplicados, al final',
        codeNote: 'Se limpia primero y se eliminan los duplicados al final. Como el texto ya está en minúsculas, los valores nulos se buscan en minúsculas («na», «n/a»).',
        errs: ['Aplicar <code>strip()</code> o <code>lower()</code> sin encadenar correctamente el accesor <code>.str</code> de Pandas.', 'Eliminar duplicados antes de limpiar: deja pasar duplicados «disfrazados» por espacios o mayúsculas distintas.', 'No gestionar el caso de que la columna ya contenga NaN reales.'] },
      { key: 'b', tab: 'Tarea B (con IA)', title: 'Tarea B · detectar_atipicos(df, columna)',
        intro: 'En la Tarea B revisabas y depurabas el código de Copilot. Fíjate en qué errores de la IA detectaste, cuáles <b>no</b> detectaste y si cambiaste algo que no hacía falta cambiar.',
        queda: '<p><b>Qué se pedía.</b> Una función <code>detectar_atipicos(df, columna)</code> que devuelva solo las filas cuyo valor en la columna sea atípico según el método IQR.</p>',
        code: 'def detectar_atipicos(df, columna):\n    q1 = df[columna].quantile(0.25)\n    q3 = df[columna].quantile(0.75)\n    iqr = q3 - q1\n    limite_inf = q1 - 1.5 * iqr\n    limite_sup = q3 + 1.5 * iqr\n    mascara = (df[columna] < limite_inf) | (df[columna] > limite_sup)\n    return df[mascara].copy()',
        errs: ['Invertir Q1 y Q3 al calcular el IQR (da un IQR negativo).', 'Usar <code>&amp;</code> en vez de <code>|</code> en la máscara: con <code>&amp;</code> la condición nunca se cumple, porque ningún valor puede ser a la vez menor que el límite inferior y mayor que el superior.', 'No copiar el DataFrame filtrado (<code>SettingWithCopyWarning</code> si se modifica después).'] },
      { key: 'r', tab: 'Recuerdo inmediato', kind: 'pseudo', title: 'Pseudocódigo con error', img: '../img/pseudocodigo.png',
        intro: 'La hoja de recuerdo inmediato te pedía explicar la lógica, encontrar un error en un pseudocódigo y recordar un caso límite.',
        why: '<p><b>Dónde está el error.</b> La línea <code>IQR = Q1 - Q3</code> está invertida: debería ser <code>IQR = Q3 - Q1</code>. Con el orden del enunciado, el IQR sale negativo y los límites quedan invertidos (el «inferior» resulta mayor que el «superior»).</p>',
        fixed: 'Q1 = percentil(columna, 25)\nQ3 = percentil(columna, 75)\nIQR = Q3 - Q1\nlimite_sup = Q3 + 1.5 * IQR\nlimite_inf = Q1 - 1.5 * IQR',
        limit: '<p><b>Casos especiales y límites</b> que se trabajaron: el método IQR es sensible al tamaño de la muestra y puede marcar como atípicos valores que en realidad son válidos en columnas con distribuciones muy asimétricas; y, en la limpieza de texto, los duplicados «disfrazados» por espacios o mayúsculas, y las columnas que ya contienen NaN reales.</p>' },
      { key: 'd', tab: 'Hoja diferida', kind: 'transfer', title: 'Transferencia · contar valores con más de n caracteres',
        intro: 'La hoja diferida te pedía resolver, sin ayuda, un problema nuevo pero análogo.',
        enun: 'Escribe la lógica de una función que, dado un DataFrame y una columna de texto, cuente cuántos valores de esa columna tienen más de un número determinado de caracteres.',
        code: 'def contar_largos(df, columna, n):\n    # .str.len() da la longitud de cada valor (NaN si el valor es nulo)\n    # y la comparación con n da una máscara booleana\n    return int((df[columna].str.len() > n).sum())',
        idea: 'Idea clave que había que transferir de la tarea original: aplicar una operación elemento a elemento sobre la columna con el accesor <code>.str</code> (como en la limpieza) y filtrar o contar con una máscara booleana (como en la detección de atípicos). Los valores nulos no cuentan, porque NaN no supera ningún umbral.' }
    ]
  }
};

module.exports = { SUBJECTS: [TJ, TM, PLN, DM] };
