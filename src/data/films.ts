export interface Film {
  id: number;
  titulo: string;
  direccion: string;
  pais: string;
  disponibilidad: string;
  directora: boolean;
  tComunitaria: boolean;
  cineNoUSA: boolean;
  doblada: boolean;
  hispanohablante: boolean;
  genero: string;
  descripcion: string;
  importancia: string;
}

export const films: Film[] = [
  {
    id: 1, titulo: "20.000 especies de abejas", direccion: "Estibaliz Urresola Solaguren", pais: "España", disponibilidad: "DVD", directora: true, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Drama",
    descripcion: "Coco, una niña de ocho años llamada Lucía, pasa un verano en una casa del pueblo vasco ligada a la apicultura junto a su madre y su tía abuela, mientras emprende un camino de autodescubrimiento sobre su identidad de género. La película retrata cómo la familia y la comunidad reaccionan ante la necesidad de Coco de ser reconocida como quien realmente es. Es una historia íntima sobre feminidad, infancia y aceptación que entrelaza la vida de las mujeres de tres generaciones.",
    importancia: "Es una de las primeras películas españolas en abordar la identidad trans infantil desde una perspectiva sensible y respetuosa. Ganó el Oso de Plata a la mejor actuación para Sofía Otero en el Festival de Berlín (convirtiéndola en la actriz más joven en recibir este premio), así como la Goya a Mejor Película y Mejor Dirección Novel. La ópera prima de Urresola Solaguren marcó un hito en la representación LGTB+ en el cine en español.",
  },
  {
    id: 2, titulo: "4 meses 3 semanas 2 días", direccion: "Cristian Mungiu", pais: "Rumania", disponibilidad: "DVD", directora: false, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama",
    descripcion: "En la Rumania de 1987 bajo el brutal régimen comunista de Ceaușescu, dos estudiantes universitarias, Gabita y Otilia, intentan realizar un aborto clandestino, un delito castigado con prisión. Otilia emprende una odisea implacable para ayudar a su amiga a encontrar al hombre que practicará la intervención. La película se concentra en un corto pero intenso lapso de tiempo para narrar la brutalidad de las circunstancias que las rodean.",
    importancia: "Ganadora de la Palma de Oro en el Festival de Cannes 2007, es considerada una de las películas más importantes del Nuevo Cine Rumano y una obra maestra del cine europeo contemporáneo. Su estilo realista y sobrio, rodado en planos secuencia largos, influyó profundamente en el cine internacional. Fue nominada al Oscar a Mejor Película en Lengua Extranjera y es reconocida como una crítica poderosa al totalitarismo y a la vulneración de los derechos de la mujer.",
  },
  {
    id: 3, titulo: "Agua", direccion: "Deepa Mehta", pais: "India", disponibilidad: "DVD", directora: true, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama",
    descripcion: "Ambientada en la India colonial de 1938, la película sigue a Chuyia, una niña de ocho años enviada a un ashram de viudas tras quedar huérfana tras la muerte de su marido, con quien fue casada siendo apenas una bebé. Allí descubre la opresión y marginación a la que son sometidas las viudas, obligadas a vivir en pobreza extrema y renunciar a toda alegría. A través de su relación con otras viudas y de un hombre idealista seguidor de Gandhi, la película explora las injusticias del sistema de castas y la tradición religiosa.",
    importancia: "Es la tercera y última entrega de la aclamada Trilogía de los Elementos de Deepa Mehta (junto con Fuego y Tierra). Fue nominada al Oscar a Mejor Película en Lengua Extranjera y su rodaje en India generó una gran controversia política y social que obligó a suspender la producción y reubicarla en Sri Lanka. La película es un hito en el cine que denuncia las prácticas discriminatorias contra las mujeres en la sociedad india y el legado del colonialismo.",
  },
  {
    id: 4, titulo: "Ainda Estou Aqui", direccion: "Walter Salles", pais: "Brasil", disponibilidad: "Descarga (con buenos subtitulos)", directora: false, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama político",
    descripcion: "Basada en las memorias de Marcelo Rubens Paiva, la película sigue a Eunice Paiva, una madre de cinco hijos que debe reinventarse como activista tras la desaparición forzada de su marido, Rubens Paiva, por las fuerzas represivas durante la dictadura militar brasileña de 1971. La historia muestra cómo una familia feliz se ve destrozada por la violencia estatal y cómo Eunice enfrenta el duelo y la opresión con determinación. Fernanda Torres interpreta a Eunice, acompañada por Fernanda Montenegro en un papel conmovedor.",
    importancia: "Ganadora del Oscar a Mejor Película en Lengua Extranjera en 2025, es el primer Oscar de la historia para Brasil. Fue además nominada a Mejor Película y Mejor Actriz (Fernanda Torres) en los premios Óscar. Dirigida por Walter Salles, uno de los cineastas latinoamericanos más celebrados, la película obligó a Brasil a confrontar el trauma de su dictadura militar y generó un intenso debate político nacional sobre la memoria histórica y la justicia.",
  },
  {
    id: 5, titulo: "Anatomía de una caída", direccion: "Justine Triet", pais: "Francia", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Thriller dramático",
    descripcion: "Sandra, una escritora alemana interpretada por Sandra Hüller, es acusada del asesinato de su marido tras encontrarlo muerto al pie de su casa en las montañas francesas. El juicio judicial se convierte en una disección minuciosa de su matrimonio, donde se revelan verdades y mentiras sobre la relación de la pareja. La película explora los límites entre la verdad y la ficción, y la imposibilidad de conocer completamente la vida íntima de otra persona.",
    importancia: "Ganadora de la Palma de Oro en el Festival de Cannes 2023 y del Oscar al Mejor Guión Original en 2024. Es la tercera película dirigida por una mujer en ganar la Palma de Oro y una de las más aclamadas del cine francés reciente. La película revitalizó el género del thriller judicial con un enfoque feminista y psicológico profundo, y la actuación de Sandra Hüller fue universalmente elogiada como una de las mejores de la década.",
  },
  {
    id: 6, titulo: "Caras y lugares", direccion: "Agnes Varda", pais: "Francia", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama",
    descripcion: "Cléo, una joven y bella cantante parisina, espera los resultados de un análisis médico durante dos horas de su vida, de las cinco de la tarde a las siete. Mientras recorre las calles de París, pasa del pánico y la superficialidad a una mayor conciencia de sí misma y del mundo que la rodea. Su encuentro con un soldado a punto de marcharse a la guerra de Argelia transforma su perspectiva sobre la vida y la muerte.",
    importancia: "Es una de las obras centrales de la Nouvelle Vague francesa y una de las películas más influyentes de Agnès Varda. Su innovadora estructura en tiempo real y su exploración de la subjetividad femenina la convirtieron en un precedente fundamental del cine moderno. La película fusiona documental y ficción, y es considerada un hito feminista por la forma en que retrata la mirada de una mujer sobre sí misma y sobre la ciudad de París.",
  },
  {
    id: 7, titulo: "Cavalo Dinheiro", direccion: "Pedro Costa", pais: "Portugal", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama experimental / Documental",
    descripcion: "Ventura, un anciano inmigrante caboverdiano que vive en Lisboa, se encuentra aparentemente recluido en una vasta e inquietante sala de hospital psiquiátrico. A través de un presente adormecido y atemporal de estancias hospitalarias, cuestionamientos burocráticos y recuerdos fragmentados, la película traza un viaje por los caminos oscuros de la memoria y la historia de la diáspora caboverdiana. Es una experiencia cinematográfica radical que mezcla ficción, documental y ensayo visual.",
    importancia: "Considerada una de las obras cumbres del cine de autor contemporáneo, es el cuarto film de la saga de Pedro Costa ambientada en el barrio marginal de Fontainhas en Lisboa. Ganó el Premio a Mejor Película en el Festival de Locarno. El estilo visual radical de Costa, con su uso de la luz, el color y el silencio, ha influenciado a toda una generación de cineastas de arte y ensayo a nivel mundial.",
  },
  {
    id: 8, titulo: "Chocolat", direccion: "Claire Denis", pais: "Francia", disponibilidad: "DVD", directora: true, tComunitaria: false, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama / Romance / Fantasía",
    descripcion: "Vianne Rocher y su pequeña hija Anouk llegan a Lansquenet, un pueblo francés tradicional y conservador donde nada ha cambiado en los últimos cien años, y abren una chocolatería durante la Cuaresma. Con cada creación de chocolate, Vianne despierta los deseos reprimidos de los habitantes y desafía las convenciones del pueblo lideradas por el austero alcalde. La llegada de un grupo de gitanos del río y de un apuesto irlandés llamado Roux profundiza los conflictos entre libertad y tradición.",
    importancia: "Basada en la novela de Joanne Harris, fue nominada a cinco premios Oscar, incluyendo Mejor Película, Mejor Actriz (Juliette Binoche) y Mejor Guión Adaptado. La película fue un éxito internacional que popularizó el cine de temática gourmet. Nota: aunque la base de datos la atribuye a Claire Denis, esta película fue dirigida por Lasse Hallström; Claire Denis es la directora de la película homónima de 1988.",
  },
  {
    id: 9, titulo: "Chocolat (1988)", direccion: "Claire Denis", pais: "Francia", disponibilidad: "Descarga (con buenos subtitulos)", directora: true, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama",
    descripcion: "Francia, una joven francesa adulta, regresa al vasto silencio de África Occidental para evocar su infancia en un puesto colonial en Camerún. A través de sus recuerdos, revive las complejas relaciones entre su familia blanca, el africano Protée y los otros trabajadores de la plantación colonial. La película examina de forma sutil e irónica las dinámicas de poder del colonialismo, el racismo latente y la tensión sexual reprimida entre colonizadores y colonizados.",
    importancia: "Es la ópera prima de Claire Denis, una de las directoras más influyentes del cine mundial, y fue la primera película dirigida por una mujer africana (nacida en Camerún) en ser seleccionada para el Festival de Cannes. La película es considerada una obra maestra del cine poscolonial por su tratamiento sutil de las relaciones raciales y el legado del imperialismo francés en África.",
  },
  {
    id: 10, titulo: "Cien niños esperando un tren", direccion: "Ignacio Agüero", pais: "Chile", disponibilidad: "Descarga (con buenos subtitulos)", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Documental",
    descripcion: "En una población marginal de Santiago de Chile, la profesora y educadora Alicia Vega realiza un taller de cine para niños durante veinte sábados, durante los últimos años de la dictadura de Pinochet. Los niños, que nunca antes habían visto una película, descubren un mundo nuevo a través del cine, construyendo juguetes ópticos, aprendiendo sobre la historia del cine y proyectando películas ellos mismos. El documental mezcla infancia, pedagogía y cine como herramientas de transformación social.",
    importancia: "Es uno de los documentales chilenos más importantes e influyentes de la historia del cine latinoamericano. Filmado en plena dictadura de Pinochet, el documental es un acto de resistencia cultural que demuestra el poder del cine como herramienta pedagógica y de liberación. La figura de Alicia Vega se convirtió en un símbolo de la educación popular chilena, y la película sigue siendo un referente fundamental en la enseñanza del cine documental y la pedagogía audiovisual en toda América Latina.",
  },
  {
    id: 11, titulo: "Cuentos de Tokio (1953)", direccion: "Yasujiro Ozu", pais: "Japón", disponibilidad: "Blu ray", directora: false, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama",
    descripcion: "Un matrimonio de ancianos viaja desde su pueblo natal de Onomichi hasta Tokio para visitar a sus hijos adultos, pero encuentran indiferencia, ingratitud y una marcada diferencia generacional. Solo su nuera Noriko, viuda de su hijo muerto en la guerra, les brinda afecto genuino y atención. Tras el viaje, la madre enferma gravemente, poniendo en evidencia las profundas transformaciones sociales del Japón de posguerra.",
    importancia: "Considerada por la encuesta Sight & Sound como una de las mejores películas jamás realizadas (fue elegida la mejor película de todos los tiempos en 2012 por los directores de cine), es la obra maestra absoluta de Yasujiro Ozu. Su estilo formal innovador, con la cámara a la altura del suelo y los planos estáticos contemplativos, revolucionó el lenguaje cinematográfico. La película es una meditación universal sobre la soledad, la familia, el paso del tiempo y la modernización que destruye los lazos tradicionales.",
  },
  {
    id: 12, titulo: "Domingo de carnaval", direccion: "Edgar Neville", pais: "España", disponibilidad: "Blu ray", directora: false, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: true,
    genero: "Cine policíaco / Drama",
    descripcion: "La historia de un crimen se desenvuelve durante los días de carnaval en el Madrid de 1910. Un sereno descubre un cadáver en la madrugada del primer día de carnaval, lo que da inicio a una intriga policial en un ambiente popular y castizo. La película mezcla elementos de sainete madrileño con la narrativa de misterio y crimen, creando una obra de atmósfera inconfundible.",
    importancia: "Es parte del tríptico policial más destacado de Edgar Neville en los años cuarenta, junto con La torre de los siete jorobados y El crimen de la calle de Bordadores. Su verdadero mérito reside en su concepción estética, concebida como un homenaje visual al pintor José Gutiérrez-Solana, gran representante de la llamada España negra. La película es un hito del cine policíaco español por su atmósfera expressionista y su capacidad para retratar el Madrid popular y castizo de la época.",
  },
  {
    id: 13, titulo: "El agente topo", direccion: "Maite Alberdi", pais: "Chile", disponibilidad: "DVD", directora: true, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Documental",
    descripcion: "Cuando una familia se preocupa por el bienestar de su madre en una residencia de ancianos en Chile, contratan a un detective privado que recluta a Sergio, un hombre de 83 años, para infiltrarse como residente encubierto. Lo que comienza como una investigación sobre posibles abusos se transforma en una reflexión conmovedora sobre la soledad, el amor y la vejez. Sergio descubre un mundo lleno de vida y ternura entre los ancianos residentes.",
    importancia: "Fue nominada al Oscar a Mejor Película Documental en los premios de la Academia 2021, siendo el primer documental chileno en recibir esta nominación. Maite Alberdi se convirtió en la primera mujer chilena nominada al Oscar. La película revolucionó el género documental al mezclar elementos de cine negro y espionaje con una profunda empatía humana, demostrando que el cine documental puede ser simultáneamente entretenido, emocionante y socialmente comprometido.",
  },
  {
    id: 14, titulo: "El Ángel Exterminador", direccion: "Luis Buñuel", pais: "México / España", disponibilidad: "Descarga (con buenos subtitulos)", directora: false, tComunitaria: false, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Drama surrealista / Comedia negra",
    descripcion: "Un grupo de invitados de alta sociedad se reúnen para una cena elegante en una mansión y, misteriosamente, se encuentran incapaces de abandonar la sala. A medida que pasan los días, las convenciones sociales se desintegran y estalla el caos entre los atrapados. Luis Buñuel construye una sátira mordaz sobre la burguesía, la religión y la decadencia moral mediante una premisa absurda y fascinante.",
    importancia: "Considerada una obra maestra del cine surrealista, esta película es clave en la filmografía de Buñuel y uno de los pilares del cine de autor. Su exploración de las convenciones sociales ha influido en cineastas de todo el mundo. Fue incluida en la lista de las mejores películas de la historia según Sight & Sound.",
  },
  {
    id: 15, titulo: "El maestro que prometió el mar", direccion: "Patricia Font", pais: "España", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Drama histórico",
    descripcion: "Ariadna descubre que su abuelo lleva años buscando los restos de su padre, desaparecido durante la Guerra Civil Española. Paralelamente, se narra la historia del joven maestro Antoni Benaiges, quien en 1935 llega a un pueblo de Burgos con métodos pedagógicos innovadores que transforman la vida de sus alumnos. La película entrelaza pasado y presente para recuperar la memoria histórica de los represaliados del franquismo.",
    importancia: "Basada en hechos reales sobre el maestro Antoni Benaiges, la película contribuye a la recuperación de la memoria histórica española. Ganó tres Premios Goya en 2024, incluyendo Mejor Película.",
  },
  {
    id: 16, titulo: "Flee", direccion: "Jonas Poher Rasmussen", pais: "Dinamarca", disponibilidad: "Descarga (con buenos subtitulos)", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Documental animado / Drama",
    descripcion: "Amin Nawabi, un refugiado afgano que vive en Dinamarca a punto de casarse, revela por primera vez su historia oculta durante veinte años. A través de animación, la película reconstruye su huida de Afganistán a través de Rusia y Europa. La combinación de animación, archivo familiar y entrevistas crea una experiencia íntima y devastadora sobre identidad, trauma y pertenencia.",
    importancia: "Hizo historia al ser nominada simultáneamente a los Oscar en las categorías de Mejor Película Animada, Mejor Documental y Mejor Película Internacional, algo sin precedentes. Su uso innovador de la animación documental abrió nuevas posibilidades para el género.",
  },
  {
    id: 17, titulo: "Función de noche", direccion: "Josefina Molina", pais: "España", disponibilidad: "Descarga (con buenos subtitulos)", directora: true, tComunitaria: false, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Documental / Drama",
    descripcion: "En un camerino del teatro donde actúan, la actriz Lola Herrera y su exmarido Daniel Dicenta mantienen una larga conversación frente a la cámara. Reviven con honestidad su matrimonio, su separación y las dificultades de compaginar la vida familiar con sus carreras artísticas. La película mezcla realidad y ficción en un ejercicio de introspección que entrelaza elementos documentales con el melodrama teatral.",
    importancia: "Pionera en el cine español por dar voz a la experiencia femenina en la Transición democrática, es una de las primeras películas que aborda los conflictos de la mujer trabajadora y madre. Dirigida por una de las primeras directoras españolas, Josefina Molina, es una obra fundamental del cine de la intimidad.",
  },
  {
    id: 18, titulo: "Ghost in the Shell", direccion: "Mamoru Oshii", pais: "Japón", disponibilidad: "Blu ray", directora: false, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Ciencia ficción / Cyberpunk / Animación",
    descripcion: "En el año 2029, la Major Motoko Kusanagi, una agente cyborg, persigue al Puppet Master, un misterioso hacker que puede hackear los cerebros humanos. A medida que avanza la investigación, Kusanagi cuestiona su propia identidad y lo que la define como ser humana frente a su cuerpo artificial. La película explora la conciencia, la tecnología y la frontera entre humano y máquina.",
    importancia: "Obra fundamental del anime y cyberpunk que influenció directamente a The Matrix de los hermanos Wachowski, quienes mostraron la película a productores para ilustrar su visión. James Cameron la consideró una de las obras más innovadoras del cine. Redefinió las posibilidades narrativas de la animación para adultos en Occidente.",
  },
  {
    id: 19, titulo: "Goodbye Dragon inn", direccion: "Tsai Ming-liang", pais: "Taiwan", disponibilidad: "Blu ray", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama / Cine contemplativo",
    descripcion: "En un viejo cine de Taipéi que proyecta su última película antes de cerrar, un reducido grupo de espectadores asiste a la función en una noche lluviosa. Una mujer coja busca al proyectista del que está enamorada, mientras un turista japonés busca un encuentro en los pasillos. Con largos planos secuencia y mínimo diálogo, es una meditación poética sobre la soledad, la nostalgia y la desaparición de la cultura cinematográfica tradicional.",
    importancia: "Obra cumbre del cine contemplativo y del movimiento de cine lento. Tsai Ming-liang crea un homenaje al cine como espacio de comunidad que está a punto de desaparecer. Fue aclamada en festivales como Venecia y es referencia obligatoria del cine de arte asiático y del cine sobre el cine.",
  },
  {
    id: 20, titulo: "How green was my valley", direccion: "John Ford", pais: "EEUU", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama familiar",
    descripcion: "Narrada desde la perspectiva de Huw Morgan, el menor de una familia de mineros en un valle galés, la película retrata la desintegración de una comunidad unida por las duras condiciones laborales y los cambios sociales de la época industrial. Huw contempla cómo la familia se fragmenta ante el inexorable avance de la modernidad. Ford plasma con maestría la nostalgia por un paraíso perdido.",
    importancia: "Ganó cinco Premios Óscar, incluidos Mejor Película y Mejor Dirección, en una ceremonia histórica donde venció a Ciudadano Kane de Orson Welles. Es una de las obras fundamentales de John Ford y del cine clásico de Hollywood, seleccionada para conservación en el National Film Registry de la Biblioteca del Congreso de EE.UU.",
  },
  {
    id: 21, titulo: "Khane-ye doust kodjast?", direccion: "Abbas Kiarostami", pais: "Irán", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama poético",
    descripcion: "Mohammad, un niño iraní de ocho años, accidentalmente se lleva el cuaderno de su amigo Nematzadeh, amenazado de expulsión si vuelve a olvidarlo. A pesar de la oposición de su familia, Mohammad emprende un largo viaje a pie hasta el pueblo vecino para devolver el cuaderno a tiempo. Lo que parece una simple anécdota infantil se transforma en una hermosa alegoría sobre la amistad, la responsabilidad moral y la bondad humana.",
    importancia: "Primera película de la trilogía de Koker de Kiarostami, es considerada una de las obras maestras del cine iraní y del cine poético contemporáneo. Kiarostami demostró que las historias más simples pueden contener profundidad universal, influyendo a toda una generación de cineastas. Abrió las puertas del cine iraní a los festivales internacionales.",
  },
  {
    id: 22, titulo: "La Ascensión", direccion: "Larisa Shepitko", pais: "URSS", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama bélico",
    descripcion: "Durante el invierno de la Segunda Guerra Mundial, dos partisanos soviéticos separados de su unidad cruzan las heladas tierras de Bielorrusia ocupadas por los nazis en busca de alimento. Sotnikov, débil pero moralmente íntegro, y Rybak, más práctico y ambicioso, enfrentan situaciones extremas que pondrán a prueba su humanidad. La película se eleva hacia una dimensión trascendente y casi religiosa sobre el sacrificio y la redención.",
    importancia: "Ganó el Oso de Oro en el Festival de Berlín de 1977 y es considerada una de las obras maestras absolutas del cine soviético. Shepitko, alumna de Dovzhenko, creó un filme que trasciende el género bélico como meditación sobre la fe y la condición humana. Es la última película completada por la directora antes de su trágica muerte en 1979.",
  },
  {
    id: 23, titulo: "La Lengua de las Mariposas (1999)", direccion: "José Luis Cuerda", pais: "España", disponibilidad: "Blu ray", directora: false, tComunitaria: false, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Drama / Comedia dramática",
    descripcion: "Moncho, un niño de siete años, comienza la escuela en un pueblo de Galicia en 1936 y desarrolla una relación entrañable con su maestro Don Gregorio, un hombre liberal que le enseña a amar la naturaleza, la literatura y la libertad. Pero el estallido de la Guerra Civil truncará este mundo de inocencia cuando el bando franquista tome el pueblo. La película retrata con ternura y dureza cómo la barbarie política destruye los vínculos humanos más preciados.",
    importancia: "Adaptación del relato de Manuel Rivas, es una de las películas españolas más aclamadas sobre la Guerra Civil y la represión franquista. Obtuvo múltiples nominaciones a los Goya y se ha convertido en un clásico del cine español contemporáneo. La figura del maestro Don Gregorio es símbolo de la educación libre y comprometida.",
  },
  {
    id: 24, titulo: "La Quimera", direccion: "Alice Rohrwacher", pais: "Italia", disponibilidad: "Blu ray", directora: true, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Comedia dramática / Drama",
    descripcion: "Arthur, un arqueólogo inglés extraviado en la Italia rural de los años 80, lidera una banda de buscones de tumbas etruscas que saquean necrópolis milenarias en la Toscana. Perdidamente enamorado de Benjamina, una mujer ausente que representa su quimera personal, Arthur se debate entre el mundo de los vivos y el de los muertos, lo sagrado y lo profano. Rohrwacher construye una fábula mágica sobre la memoria, el patrimonio y la búsqueda de lo inalcanzable.",
    importancia: "Seleccionada para competir por la Palma de Oro en Cannes 2023, fue nominada por el National Board of Review como una de las cinco mejores películas internacionales del año. Alice Rohrwacher, una de las voces más singulares del cine europeo, consolida su exploración de la cultura rural italiana y las tensiones entre arte y mercantilismo.",
  },
  {
    id: 25, titulo: "La tercera esposa", direccion: "Ash Mayfair", pais: "Vietnam", disponibilidad: "Blu ray", directora: true, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama / Drama de época",
    descripcion: "En la Vietnam rural del siglo XIX, May, una niña de catorce años, se convierte en la tercera esposa de un rico terrateniente en una familia poligámica. Aislada pero curiosa, May descubre sus propios deseos en un entorno dominado por las convenciones patriarcales, donde las esposas compiten por el favor del marido y la maternidad es el único camino al estatus. La película retrata con delicadeza la sumisión femenina y la falta de agencia en la sociedad tradicional vietnamita.",
    importancia: "Ópera prima de la directora vietnamita Ash Mayfair, ganó múltiples premios en festivales como Toronto (TIFF), San Sebastián y Marrakech. Es una de las películas más aclamadas del nuevo cine vietnamita y un testimonio poderoso sobre la opresión de la mujer en las sociedades tradicionales del sudeste asiático.",
  },
  {
    id: 26, titulo: "Las señoritas de Rochefort", direccion: "Jacques Demy", pais: "Francia", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Musical / Comedia romántica",
    descripcion: "Las gemelas Delphine y Solange, interpretadas por Catherine Deneuve y Françoise Dorléac, enseñan música y danza en Rochefort y sueñan con encontrar el amor en París. Durante un fin de semana con feria ambulante, se cruzan las vidas de diversos personajes en un entramado de encuentros y desencuentros musicales. Cada momento está impregnado de la alegría y el color inconfundibles del universo de Demy.",
    importancia: "Piedra angular del cine musical francés y una de las obras más celebradas de Jacques Demy tras Los paraguas de Cherburgo. Contó con un reparto de lujo (Gene Kelly, Michel Piccoli, George Chakiris) y banda sonora de Michel Legrand. Es un homenaje al musical de Hollywood y fue restaurada por The Criterion Collection, consolidando su estatus como obra maestra mundial.",
  },
  {
    id: 27, titulo: "Lazzaro Feliz", direccion: "Alice Rohrwacher", pais: "Italia", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama / Realismo mágico / Fantasía",
    descripcion: "Lazzaro, un joven campesino de buen corazón, vive feliz como jornalero en una remota Italia rural donde los terratenientes explotan a los campesinos. Cuando entabla una inesperada amistad con Tancredi, el hijo de la marquesa, su vida cambia radicalmente en un viaje que desdibuja las fronteras entre la realidad, la fábula y el paso del tiempo. Alice Rohrwacher entrelaza neorrealismo y realismo mágico para crear una alegoría sobre la explotación laboral y la pérdida de inocencia.",
    importancia: "Ganó el Premio del Jurado en el Festival de Cannes 2018 y fue seleccionada para competir por la Palma de Oro. Es considerada una de las obras más singulares del cine italiano contemporáneo, destacando por su mezcla única de neorrealismo italiano con el realismo mágico latinoamericano para construir una fábula social sobre la desigualdad y la explotación.",
  },
  {
    id: 28, titulo: "Le Havre", direccion: "Aki Kaurismäki", pais: "Finlandia", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Comedia dramática",
    descripcion: "Marcel Marx, un envejecido limpiabotas del puerto francés de Le Havre, acoge en su hogar a un niño inmigrante africano que ha llegado escondido en un carguero. Con la ayuda de su esposa Arletty y de toda su comunidad de vecinos, Marcel intentará proteger al niño de la policía y conseguir que pueda reunirse con su madre en Londres. La película es una tierna y conmovedora historia de empatía, amistad y solidaridad humana contada con el habitual humor deadpan de Kaurismäki.",
    importancia: "Fue nominada a la Palma de Oro en el Festival de Cannes y ganó el FIPRESCI en el mismo festival. Es parte de la trilogía portuaria de Aki Kaurismäki y representa la cumbre de su estilo minimalista y humanista, demostrando que el cine social puede ser al mismo tiempo esperanzador y profundamente conmovedor.",
  },
  {
    id: 29, titulo: "Lejos de los árboles", direccion: "Jacinto Esteva", pais: "España", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Documental",
    descripcion: "Rodado entre 1965 y 1970 por Jacinto Esteva y Pere Faura, este ambicioso documental recorre exhaustivamente la España más profunda y rural: sus fiestas populares, tradiciones ancestrales, religiosidad y costumbres más crudas y truculentas durante el franquismo. La mirada surrealista de Esteva captura las contradicciones y la dureza de una España ancestral que parecía congelada en el tiempo.",
    importancia: "Es considerada la película maldita del franquismo: censurada, prohibida y apartada durante años por las autoridades. Es la obra fundamental de la Escuela de Barcelona, un movimiento cinematográfico que ofreció una alternativa estética e ideológica al cine oficial de la dictadura, y constituye un documento histórico invaluable sobre la España del siglo XX.",
  },
  {
    id: 30, titulo: "Los climas", direccion: "Nuri Bilge Ceylan", pais: "Turquía", disponibilidad: "DVD", directora: false, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama",
    descripcion: "La película narra la desintegración de la relación entre Isa, un profesor universitario turco de mediana edad, y su joven esposa Bahar. Estructurada en torno a las estaciones del año, la historia explora con rigor visual la frialdad emocional, el egoísmo y la incomunicación que destruyen progresivamente el vínculo de pareja. Ceylan utiliza paisajes desolados y largos silencios para revelar las tensiones internas de sus personajes de manera sutil y devastadora.",
    importancia: "Ganó el Premio FIPRESCI en el Festival de Cannes 2006 y consolidó a Nuri Bilge Ceylan como uno de los grandes autores del cine mundial contemporáneo. Es considerada una obra maestra del cine turco por su sofisticada exploración psicológica y su extraordinario trabajo fotográfico, abriendo camino al reconocimiento internacional del cine de autor turco.",
  },
  {
    id: 31, titulo: "Los niños salvajes", direccion: "Patricia Ferreira", pais: "España", disponibilidad: "DVD", directora: true, tComunitaria: false, cineNoUSA: false, doblada: false, hispanohablante: true,
    genero: "Drama social",
    descripcion: "La película narra la historia de tres adolescentes, Alex, Gabi y Oki, que viven en una gran ciudad y se ven abocados a la calle tras la desintegración de sus familias. La amistad se convierte en su único salvavidas ante un entorno hostil y un sistema de protección a la infancia que no logra rescatarlos del abandono. Patricia Ferreira retrata con naturalismo y sensibilidad la marginación juvenil y la incapacidad de la sociedad para proteger a los más vulnerables.",
    importancia: "Reconocida por la crítica como una de las mejores películas sociales españolas, fue aclamada por su sólido guión y su sobria dirección. La película visibilizó la realidad de los menores en situación de desamparo y se convirtió en una referencia fundamental del cine social español, demostrando la capacidad del cine para dar voz a quienes no la tienen.",
  },
  {
    id: 32, titulo: "Luna de Avellaneda", direccion: "Juan José Campanella", pais: "Argentina", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Comedia dramática",
    descripcion: "Román Maldonado, nacido una noche de carnaval en el club social y deportivo Luna de Avellaneda, ve cómo la crisis económica y la decadencia amenazan con cerrar la institución que ha sido el centro de su vida y de toda su comunidad durante más de cuarenta años. A través de los personajes del club, la película retrata la nostalgia por una época de cohesión social y solidaridad que se desvanece con el paso del tiempo en la Argentina post-crisis de 2001.",
    importancia: "Protagonizada por Ricardo Darín y dirigida por Juan José Campanella (quien luego ganaría el Óscar con El secreto de sus ojos), es una de las películas argentinas más queridas y populares de las últimas décadas. Se ha convertido en un símbolo cultural de la identidad argentina, representando las esperanzas, la nostalgia y las frustraciones de una comunidad ante el declive de las instituciones.",
  },
  {
    id: 33, titulo: "Meek's Cutoff", direccion: "Kelly Reichardt", pais: "EEUU", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: false, doblada: true, hispanohablante: false,
    genero: "Western / Drama de supervivencia",
    descripcion: "Basada libremente en hechos reales de 1845, la película sigue a tres familias de pioneros que, guiados por el cazador Stephen Meek, se pierden en el árido desierto de Oregón. A medida que el agua y los alimentos se agotan, la desconfianza hacia el guía crece y la captura de un nativo americano plantea dilemas morales que dividen al grupo. Kelly Reichardt desmitifica el mito del Destino Manifiesto con una mirada contemplativa, silenciosa y feminista.",
    importancia: "Presentada en competición en el Festival de Venecia, es una relectura radical del western clásico que subvierte los mitos de la conquista del Oeste. La película consolidó a Kelly Reichardt como una de las voces más singulares del cine independiente estadounidense, destacando por su enfoque feminista, su desmitificación del expansionismo americano y su pacing deliberadamente anti-espectacular.",
  },
  {
    id: 34, titulo: "Morir... dormir... tal vez soñar", direccion: "Manuel Mur Oti", pais: "España", disponibilidad: "Descarga (con buenos subtitulos)", directora: false, tComunitaria: false, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Drama / Drama fantástico",
    descripcion: "El fantasma de un hombre regresa a una vieja mansión vacía para recordar los momentos cruciales de toda una vida, reconstruyendo la historia de una familia española desde 1916 hasta 1966. A través de sus recuerdos, la película atraviesa guerras, tragedias personales y las grandes transformaciones sociales de medio siglo de historia de España. Manuel Mur Oti construye una reflexión poética y profunda sobre la memoria, la pérdida y la imposibilidad de recuperar el pasado.",
    importancia: "Es la última película de Manuel Mur Oti y está considerada una obra cumbre y de culto del cine español. Formalmente alejada del resto de su filmografía, es una pieza experimental que mezcla elementos de drama fantástico, drama familiar y reflexión existencial, convirtiéndose en un films muy personal que ha sido reivindicado con los años como una joya del cine español.",
  },
  {
    id: 35, titulo: "Opera", direccion: "Dario Argento", pais: "Italia", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Horror / Giallo / Thriller",
    descripcion: "Una joven soprano a punto de alcanzar el estrellato es acosada por un psicópata enmascarado que la obliga a presenciar el brutal asesinato de sus amigos y colegas en el teatro de ópera de Parma. El asesino, obsesionado con la cantante, utiliza métodos cada vez más sádicos y elaborados mientras la policía intenta dar con él. Dario Argento entrelaza el mundo de la ópera con el terror giallo de manera innovadora y visualmente deslumbrante.",
    importancia: "Es una de las obras más emblemáticas of Dario Argento y del género giallo italiano. Destaca por su innovador uso de efectos especiales, especialmente la célebre secuencia POV con agujas atadas a los ojos de la víctima, y por su revolucionaria banda sonora que mezcla ópera con heavy metal. Es una referencia indispensable en la historia del cine de terror y ha influido en toda una generación de cineastas del género.",
  },
  {
    id: 36, titulo: "Othon", direccion: "Straub/Huillet", pais: "Francia", disponibilidad: "Descarga (con buenos subtitulos)", directora: true, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama histórico / Cine de vanguardia",
    descripcion: "Basada en la tragedia de Pierre Corneille, la película narra la historia del ambicioso noble romano Otón, que negocia su búsqueda de poder a través del amor y las intrigas políticas durante el turbulento año 69 d.C., conocido como el año de los cuatro emperadores. Jean-Marie Straub y Danièle Huillet trasladan la obra teatral al cine con un rigor formal extremo, eliminando toda concesión al espectáculo para centrarse en la potencia del texto y la materia fílmica.",
    importancia: "Straub y Huillet son figuras fundamentales del cine de vanguardia europeo, y Othon es representativa de su estética de la literalidad y su rechazo a las convenciones narrativas del cine comercial. Sus películas, consideradas obras de exquisitez y rigor excepcionales, han influido profundamente en generaciones de cineastas de arte y ensayo, y constituyen un hito en la historia del cine político y formalista.",
  },
  {
    id: 37, titulo: "Paris is burning", direccion: "Jennie Livingston", pais: "EEUU", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: false, doblada: false, hispanohablante: false,
    genero: "Documental",
    descripcion: "El documental captura la Edad de Oro de la cultura ballroom en Nueva York durante los años 80, explorando las competiciones donde drag queens y comunidades LGTBIQ+ afroamericanas y latinas competían en categorías de moda, baile y vogueing. A través de extensas entrevistas con figuras como Pepper LaBeija, Dorian Corey y Willi Ninja, la película revela los sueños, las luchas y la creatividad de esta comunidad marginal en plena epidemia de VIH/SIDA.",
    importancia: "Es un documental pionero y fundamental que puso la cultura ballroom y el vogue en el mapa cultural global. Su influencia se extiende de forma masiva a la moda, la música pop, el arte contemporáneo y la cultura popular. Es esencial para entender la historia queer y la lucha por la visibilidad de las comunidades afroamericanas y latinas LGTBIQ+. Fue seleccionada para preservación en el Registro Nacional de Cine de la Biblioteca del Congreso de EE.UU. en 2016.",
  },
  {
    id: 38, titulo: "Pequeña Miss Sunshine (2006)", direccion: "Jonathan Dayton, Valerie Faris", pais: "EEUU", disponibilidad: "Blu ray", directora: false, tComunitaria: false, cineNoUSA: false, doblada: true, hispanohablante: false,
    genero: "Tragicomedia / Road movie",
    descripcion: "Cuando la pequeña Olive Hoover se clasifica para el concurso de belleza Little Miss Sunshine, toda su disfuncional familia emprende un largo viaje por carretera en su vieja furgoneta VW desde Nuevo México hasta California. A lo largo del trayecto, cada miembro de la familia —un padre fracasado como motivador, un hermano nihilista, un tío depresivo y un abuelo libertino— enfrentará sus propios fracasos mientras descubren el verdadero significado de la unidad familiar.",
    importancia: "Fue un fenómeno cultural y de taquilla que revitalizó el cine independiente estadounidense. Ganó dos premios Óscar (Mejor Guión Original y Mejor Actor de Reparto para Alan Arkin) de sus cuatro nominaciones. Se convirtió en una referencia del road movie contemporáneo y es celebrada universalmente por su humor negro, su mirada compasiva hacia la familia disfuncional y su mensaje sobre la importancia de la solidaridad ante el fracaso.",
  },
  {
    id: 39, titulo: "Persépolis (2007)", direccion: "Marjane Satrapi, Vincent Paronnaud", pais: "Irán/Francia", disponibilidad: "Descarga (con buenos subtitulos)", directora: true, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Animación / Drama biográfico",
    descripcion: "Basada en la novela gráfica autobiográfica de Marjane Satrapi, la película narra la historia de una joven iraní que crece durante la Revolución Islámica de 1979 y la posterior guerra con Irak. Marjane, rebelde y apasionada, debe lidiar con el autoritarismo religioso, la represión, la guerra y el exilio en Europa, manteniendo siempre su espíritu libre y crítico. La animación en blanco y negro de estilo cómic transmite con intensidad la crudeza y la poesía de su experiencia vital.",
    importancia: "Ganó el Premio del Jurado en el Festival de Cannes 2007 y fue nominada al Óscar a Mejor Película Animada, convirtiendo a Marjane Satrapi en la primera mujer nominada en esa categoría en la historia de los Óscar. Es una obra fundamental del cine de animación para adultos que demostró la capacidad del medio animado para tratar temas políticos, históricos y personales con la misma profundidad que el cine de imagen real.",
  },
  {
    id: 40, titulo: "Pídele cuentas al rey", direccion: "José Antonio Quirós", pais: "España", disponibilidad: "DVD", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Comedia dramática / Road movie",
    descripcion: "Basada en la historia real de un minero asturiano que, tras el cierre de la mina donde trabaja, decide viajar a pie con su familia desde las cuencas mineras hasta Madrid para pedir una audiencia al Rey y reclamar por la situación precaria de los trabajadores. La película sigue el viaje de Fidel y los obstáculos que encuentra en el camino mientras lucha por la dignidad de su comunidad.",
    importancia: "Opera prima de José Antonio Quirós que retrata la crisis minera en Asturias y la desindustrialización en España. Es una road movie social de denuncia que da voz a las luchas obreras de los años 90 y se ha convertido en un referente del cine social español.",
  },
  {
    id: 41, titulo: "Pride", direccion: "Matthew Warchus", pais: "UK", disponibilidad: "Blu ray", directora: false, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Comedia dramática / Drama histórico",
    descripcion: "Basada en hechos reales, narra cómo un grupo de activistas LGBT londinenses recauda fondos para apoyar a las familias de los mineros en huelga en Gales durante el verano de 1984, bajo el gobierno de Margaret Thatcher. A pesar de las reticencias iniciales de ambas partes, se forja una alianza inquebrantable entre dos comunidades marginadas.",
    importancia: "Película pionera en representar la alianza histórica real entre el movimiento LGSM (Lesbians and Gays Support the Miners) y los sindicatos mineros en el Reino Unido. Ganó el Prix de la Quinzaine des Réalisateurs en Cannes y es un ejemplo notable de cine comprometido que combina humor y activismo social.",
  },
  {
    id: 42, titulo: "Saint Maud", direccion: "Rose Glass", pais: "Gran Bretaña", disponibilidad: "Descarga (con buenos subtitulos)", directora: true, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Horror psicológico / Drama",
    descripcion: "Maud, una enfermera de cuidados paliativos recién convertida al catolicismo, se obsesiona con salvar el alma de su paciente terminal Amanda, convirtiendo su devoción religiosa en una espiral perturbadora y aislante. Su fervor la lleva a un desenlace tan inesperado como perturbador.",
    importancia: "Opera prima de Rose Glass que revitalizó el cine de terror británico con una propuesta íntima y perturbadora. Fue nominada a múltiples premios BAFTA (incluyendo Mejor Película Británica) y aclamada internacionalmente por su enfoque innovador del horror psicológico y religioso, lejos de los tópicos del género.",
  },
  {
    id: 43, titulo: "Salaam Bombay!", direccion: "Mira Nair", pais: "India", disponibilidad: "DVD", directora: true, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama social",
    descripcion: "Narra la vida de Krishna, un niño que es abandonado por su familia y termina viviendo en las calles de Bombay, donde sobrevive entre la marginación, el trabajo infantil y la explotación, siempre con la esperanza de poder volver algún día a casa. La película muestra la crudeza de la vida de los niños de la calle en la India.",
    importancia: "Primera película india nominada al Óscar como Mejor Película de Lengua Extranjera (1989). Obtuvo la Cámara de Oro en el Festival de Cannes y es considerada una obra maestra del neorrealismo que puso a Mira Nair en el mapa del cine mundial. Criterion Collection la incluyó en su catálogo en una edición 4K restaurada.",
  },
  {
    id: 44, titulo: "Siempre Nos Quedará Mañana (2023)", direccion: "Paola Cortellesi", pais: "Italia", disponibilidad: "Descarga (con buenos subtitulos)", directora: true, tComunitaria: false, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama / Comedia dramática",
    descripcion: "Ambientada en la Roma de la posguerra, sigue a Delia, una mujer trabajadora que sueña con un futuro mejor para ella y su hija mientras sufre abusos por parte de su marido dominante, hasta que una misteriosa carta le da la esperanza de un cambio. La película mezcla tonos cómicos y dramáticos con una fuerza emocional devastadora.",
    importancia: "Ópera prima de Paola Cortellesi que se convirtió en el mayor éxito de taquilla del cine italiano en 2023. Aborda la violencia de género con una narrativa que conecta un pasado histórico con problemas actuales, convirtiéndose en un fenómeno social y cultural en Italia y en todo el mundo.",
  },
  {
    id: 45, titulo: "Swing Girls", direccion: "Shinobu Yaguchi", pais: "Japón", disponibilidad: "Descarga (con buenos subtitulos)", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Comedia musical juvenil",
    descripcion: "Un grupo de estudiantes perezosas intentan saltarse las clases de recuperación de verano y, tras estropear accidentalmente los almuerzos y los instrumentos de la banda de la escuela, deciden reemplazar al grupo formando su propia big band de jazz. Lo que comienza como una travesura se transforma en una apasionante aventura musical.",
    importancia: "Película emblemática del cine juvenil japonés que ganó numerosos premios del Japan Academy, incluyendo Mejor Película y Mejor Director. Es considerada un clásico moderno por su energía contagiosa y su celebración de la música, la amistad y la superación personal a través del jazz.",
  },
  {
    id: 46, titulo: "System Crasher", direccion: "Nora Fingscheidt", pais: "Alemania", disponibilidad: "Blu ray", directora: true, tComunitaria: false, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama social",
    descripcion: "Benni, una niña de nueve años con graves problemas de comportamiento debido a traumas infantiles, es trasladada constantemente entre hogares de acogida, instituciones y especialistas que no logran manejar sus explosiones de rabia, mientras ella solo desea volver con su madre, quien tampoco puede hacerse cargo de ella.",
    importancia: "Ópera prima de Nora Fingscheidt que ganó el Oso de Plata a Mejor Contribución Artística en el Festival de Berlín y fue seleccionada como candidata alemana al Óscar. Su retrato visceral de la crisis del sistema de acogida infantil y la actuación de Helena Zengel conmovieron al público y la crítica internacional.",
  },
  {
    id: 47, titulo: "The Watermelon Woman", direccion: "Cheryl Dunye", pais: "EEUU", disponibilidad: "Descarga (con buenos subtitulos)", directora: true, tComunitaria: true, cineNoUSA: false, doblada: false, hispanohablante: false,
    genero: "Comedia dramática / Docuficción",
    descripcion: "Cheryl, una joven cineasta lesbiana negra que trabaja en una videoclub, investiga la vida de una actriz afroamericana de los años 30 conocida como 'The Watermelon Woman', mezclando ficción y documental para explorar la historia no contada de las mujeres negras en Hollywood. Paralelamente, Cheryl navega su propia vida amorosa y su identidad.",
    importancia: "Primera película de ficción dirigida por una mujer negra lesbiana que se estrenó comercialmente en Estados Unidos. Es una obra fundamental del cine queer y afroamericano que cuestiona quiénes tienen derecho a contar historias y recuperar la memoria histórica. Fue restaurada en 2K HD y reestrenada en 2016.",
  },
  {
    id: 48, titulo: "Un asunto de familia", direccion: "Hirokazu Kore-eda", pais: "Japón", disponibilidad: "Blu-ray", directora: false, tComunitaria: true, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama / Crimen",
    descripcion: "Una familia que sobrevive en la pobreza a base de pequeños hurtos en Tokio acoge a una niña abandonada y maltratada en las calles, formando un vínculo afectivo profundo que desafía la noción convencional de familia. Sin embargo, oscuros secretos sobre los lazos que los unen saldrán a la luz de forma devastadora.",
    importancia: "Ganó la Palma de Oro en el Festival de Cannes 2018, consolidando a Hirokazu Kore-eda como uno de los grandes maestros del cine contemporáneo. Es una reflexión profundamente humana sobre la pobreza, la familia elegida versus la biológica, y los límites del amor en las sociedades marginadas.",
  },
  {
    id: 49, titulo: "Una giornata particolare", direccion: "Ettore Scola", pais: "Italia", disponibilidad: "Blu ray", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama histórico",
    descripcion: "En Roma, el 6 de mayo de 1938, día en que Adolf Hitler visita a Benito Mussolini, una ama de casa abnegada y un periodista homosexual perseguido por el régimen fascista se encuentran en el edificio donde viven y entablan una íntima conversación que cambiará sus vidas para siempre.",
    importancia: "Obra maestra del cine italiano protagonizada por Sophia Loren y Marcello Mastroianni, nominada al Óscar a Mejor Película de Lengua Extranjera y ganadora del César a Mejor Película Extranjera. Es una crítica feminista y humanista al fascismo que fue incluida en el catálogo de The Criterion Collection y sigue siendo profundamente relevante.",
  },
  {
    id: 50, titulo: "Uncle Boonmee Who Can Recall His Past Lives", direccion: "Apichatpong Weerasethakul", pais: "Tailandia", disponibilidad: "Blu ray", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: false,
    genero: "Drama fantástico",
    descripcion: "En el noreste rural de Tailandia, un hombre que sufre insuficiencia renal pasa sus últimos días en su granja rodeado de seres queridos, incluyendo el fantasma de su esposa fallecida y el espíritu de su hijo transformado en un mono peludo. La película fluye entre lo real, lo onírico y lo espiritual en una meditación sobre la muerte.",
    importancia: "Primera película tailandesa en ganar la Palma de Oro en el Festival de Cannes. Representa el cine de arte y ensayo del sudeste asiático ante el mundo, explorando temas de reencarnación, memoria, pérdida y la relación entre humanos y naturaleza con un lenguaje cinematográfico radicalmente poético.",
  },
  {
    id: 51, titulo: "Winter's bone", direccion: "Debra Granik", pais: "EEUU", disponibilidad: "Blu ray", directora: true, tComunitaria: true, cineNoUSA: false, doblada: true, hispanohablante: false,
    genero: "Drama / Thriller rural",
    descripcion: "Ree Dolly, una adolescente de los montes Ozark en Arkansas, debe encontrar a su padre, un traficante de drogas desaparecido, antes de que la casa familiar sea embargada como fianza judicial. Para ello se enfrenta al silencio cómplice y la hostilidad de su propia comunidad, donde las leyes del parentesco son implacables.",
    importancia: "Nominada a cuatro premios Óscar, incluidos Mejor Película, Mejor Guión Adaptado y Mejor Actor de Reparto. Lanzó a la fama internacional a Jennifer Lawrence en su primer papel protagonista y es considerada una pieza fundamental del cine independiente estadounidense por su retrato crudo y auténtico de la América rural marginada.",
  },
  {
    id: 52, titulo: "Ya no estoy aquí", direccion: "Fernando Frías de la Parra", pais: "México", disponibilidad: "Descarga (con buenos subtitulos)", directora: false, tComunitaria: true, cineNoUSA: true, doblada: false, hispanohablante: true,
    genero: "Drama musical",
    descripcion: "Ulises, un joven líder de un grupo de contracultura en los barrios pobres de Monterrey, México, que se identifica con la cumbia colombiana 'rebajada' y el estilo 'kolombiano', se ve obligado a emigrar a Nueva York tras un enfrentamiento con una banda narcotraficante. Allí enfrenta la alienación, el desarraigo y la nostalgia de su identidad perdida.",
    importancia: "Representante de México en los premios Óscar 2021 y ganadora del Audience Award en el Festival de Sundance. Es una película fundamental sobre la identidad cultural mexicana, la diáspora y la pérdida, con una banda sonora emblemática que recuperó la figura de la cumbia 'sabadominga' para nuevas generaciones.",
  },
  {
    id: 53, titulo: "Yo Daniel Blake", direccion: "Ken Loach", pais: "Reino Unido", disponibilidad: "DVD", directora: false, tComunitaria: false, cineNoUSA: true, doblada: true, hispanohablante: false,
    genero: "Drama social",
    descripcion: "Daniel Blake, un carpintero de 59 años que sufre un infarto, intenta obtener ayudas sociales tras ser declarado no apto para trabajar por su médico, pero se encuentra atrapado en un laberinto burocrático insensible. En la oficina de prestaciones entabla amistad con Katie, una madre soltera con dos hijos en la misma situación desesperada.",
    importancia: "Ganó la Palma de Oro en el Festival de Cannes 2016, uno de los premios más importantes de la carrera de Ken Loach. Es una denuncia mordiente y necesaria del sistema de bienestar británico y las políticas de austeridad del gobierno conservador que provocó un debate nacional en el Reino Unido sobre la pobreza y la burocracia.",
  },
];

export const allCountries = [...new Set(films.map((f) => f.pais))].sort();
export const allGenres = [...new Set(films.map((f) => f.genero))].sort();
export const allAvailability = [...new Set(films.map((f) => f.disponibilidad))].sort();
