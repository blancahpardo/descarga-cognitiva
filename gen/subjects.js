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
const PLN = require('./pln_interp.js').PLN;

// ---------- Datos Masivos ----------
const DM = require('./dm_interp.js').DM;

module.exports = { SUBJECTS: [TJ, TM, PLN, DM] };
