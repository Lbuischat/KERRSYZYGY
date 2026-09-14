import { BaseTranslation } from '../translation.types';

export const es: BaseTranslation = {
  title: {
    remember: 'RECORDAR',
  },

  login: {
    title: 'INICIAR SESIÓN',
    journey: 'CONTINÚA TU VIAJE',
    or: 'O',
    email: 'CORREO ELECTRÓNICO',
    password: 'CONTRASEÑA',
    submit: 'INICIAR SESIÓN',
    noAccount: '¿NO TIENES UNA CUENTA?',
    createAccount: 'CREAR UNA.',
  },

  start: {
    story: {
      beforeJourney: 'Antes de que comience tu viaje...',
      worldWaiting: 'Hay un mundo esperando a ser descubierto.',
      continue: 'Continuar →',
    },
    gender: {
      eyebrow: 'TU VIAJE',
      title: '¿Quién eres?',
      description: 'Elige cómo quieres ser representado en tu viaje.',
      continue: 'Continuar →',
    },
    username: {
      eyebrow: 'TU NOMBRE',
      title: '¿Cómo deberíamos llamarte?',
      description: 'Elige un nombre para tu viaje.',
      placeholder: 'Introduce tu nombre de usuario',
      continue: 'Continuar →',
    },
    pronouns: {
      eyebrow: 'TU IDENTIDAD',
      title: '¿Cuáles son tus pronombres?',
      description: 'Elige los pronombres que quieres que usemos contigo.',
      continue: 'Continuar →',
    },
    birthday: {
      eyebrow: 'UN PEQUEÑO DETALLE',
      title: '¿Cuándo es tu cumpleaños?',
      description: 'Elige tu fecha de nacimiento.',
      month: 'Mes',
      day: 'Día',
      year: 'Año',
      emailWishes: 'Recibe felicitaciones y regalos de cumpleaños por correo electrónico',
      continue: 'Continuar →',
    },
    ready: {
      eyebrow: 'TU VIAJE COMIENZA',
      title: '¿Estás listo?',
      description: 'Todo está listo. Tu aventura te espera.',
      begin: 'Comenzar Viaje →',
    },
  },

  language: {
    english: 'Inglés',
    portuguese: 'Portugués',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
  },

  game: {
    hud: {
      wave: 'OLEADA',
      enemiesLeft: 'QUEDAN',
      points: 'PTS',
      finalWave: 'OLEADA FINAL',
    },

    scoreBoard: {
      victoryTitle: 'VICTORIA',
      defeatTitle: 'PARTIDA TERMINADA',
      victorySubtitle: 'LAS {waves} OLEADAS SUPERADAS',
      defeatSubtitle: 'EL COLAPSO TE ALCANZÓ',
      waveReached: 'OLEADA ALCANZADA',
      enemiesDefeated: 'ENEMIGOS DERROTADOS',
      timeSurvived: 'TIEMPO SOBREVIVIDO',
      score: 'PUNTUACIÓN',
      playAgain: 'JUGAR DE NUEVO',
      leave: 'SALIR',
    },

    inventory: {
      title: 'INVENTARIO',
      close: 'Cerrar inventario',
      details: 'DETALLES',
      noSelection: 'Ningún objeto seleccionado.',
      use: 'USAR',
      drop: 'TIRAR',
      carrying: 'LLEVAS {count}',

      healed: '+{amount} DE VIDA RESTAURADA',
      speedBoost: 'VELOCIDAD +{percent}% DURANTE {seconds}s',
      damageBoost: 'DAÑO +{percent}% DURANTE {seconds}s',
      defenseBoost: 'DAÑO RECIBIDO -{percent}% DURANTE {seconds}s',
      cannotUse: 'Este objeto no se puede usar.',
      dropped: 'Tirado.',

      filters: {
        all: 'Todo',
        weapons: 'Armas',
        armor: 'Armaduras',
        potions: 'Pociones',
        items: 'Objetos',
        collectables: 'Coleccionables',
      },
    },

    items: {
      'stellar-draught': {
        name: 'Trago Estelar',
        description:
          'Luz de estrellas embotellada. Restaura 40 de vida en el instante en que se usa.',
      },
      'solar-wind': {
        name: 'Viento Solar',
        description:
          'Un aliento contenido de la corona. Te mueve un 35% más rápido durante 12 segundos.',
      },
      'collapse-matter': {
        name: 'Materia de Colapso',
        description:
          'Materia alterada por gravedad extrema. Inflige un 50% más de daño durante 15 segundos.',
      },
      'void-shard': {
        name: 'Esquirla del Vacío',
        description:
          'Un filo que recuerda haber sido estrella. Duplica tu daño durante 8 segundos.',
      },
      'aegis-fragment': {
        name: 'Fragmento de Égida',
        description:
          'Una cáscara de luz congelada. Reduce a la mitad el daño que recibes durante 15 segundos.',
      },
      'syzygy-relic': {
        name: 'Reliquia de Sicigia',
        description:
          'Tres mundos en línea, atrapados en piedra. Vale guardarla, no beberla.',
      },
    },

    settings: {
      back: '← Volver',
      gameplay: 'Jugabilidad',
      sound: 'Sonido',
      accessibility: 'Accesibilidad',
      language: 'Idioma',

      rows: {
        showDamageNumbers: {
          title: 'Mostrar Números de Daño',
          description: 'Muestra los valores de daño al atacar enemigos.',
        },
        showTutorials: {
          title: 'Mostrar Tutoriales',
          description: 'Muestra tutoriales y orientación inicial.',
        },
        hints: {
          title: 'Pistas',
          description: 'Muestra pistas contextuales mientras juegas.',
        },
        difficulty: {
          title: 'Dificultad',
          description: 'Ajusta el nivel general de desafío.',
        },
        enemyHealthBars: {
          title: 'Barras de Vida de Enemigos',
          description: 'Muestra barras de vida sobre los enemigos.',
        },
        autoEquip: {
          title: 'Equipar Automáticamente',
          description: 'Equipa automáticamente el equipo obtenido.',
        },
        autoSave: {
          title: 'Guardado Automático',
          description: 'Guarda tu progreso automáticamente.',
        },

        masterVolume: {
          title: 'Volumen General',
          description: 'Ajusta el volumen general del juego.',
        },
        musicVolume: {
          title: 'Volumen de la Música',
          description: 'Ajusta el volumen de la música de fondo.',
        },
        sfxVolume: {
          title: 'Volumen de Efectos',
          description: 'Ajusta el volumen de los efectos de sonido.',
        },
        environmentVolume: {
          title: 'Ambiente',
          description: 'Ajusta el volumen de los sonidos ambientales.',
        },
        monstersVolume: {
          title: 'Monstruos',
          description: 'Ajusta el volumen de los sonidos de los monstruos.',
        },
        natureVolume: {
          title: 'Naturaleza',
          description: 'Ajusta el volumen de los sonidos de la naturaleza.',
        },
        subtitles: {
          title: 'Subtítulos',
          description: 'Muestra subtítulos para diálogos y sonidos.',
        },
        muteAll: {
          title: 'Silenciar Todo',
          description: 'Silencia todo el audio del juego.',
        },

        reduceFlashes: {
          title: 'Reducir Destellos',
          description: 'Reduce los destellos y los efectos visuales bruscos.',
        },
        screenShake: {
          title: 'Temblor de Pantalla',
          description: 'Activa o desactiva el temblor de cámara durante el juego.',
        },
        motionBlur: {
          title: 'Desenfoque de Movimiento',
          description: 'Activa o desactiva los efectos de desenfoque de movimiento.',
        },
        colorBlindMode: {
          title: 'Modo Daltónico',
          description: 'Ajusta los elementos visuales para mejorar la distinción de colores.',
        },
        uiScale: {
          title: 'Escala de la Interfaz',
          description: 'Ajusta el tamaño de los elementos de la interfaz.',
        },
        autoPickup: {
          title: 'Recogida Automática',
          description: 'Recoge automáticamente los objetos cercanos.',
        },
        reducedKeybinds: {
          title: 'Controles Reducidos',
          description: 'Reduce el número de controles necesarios.',
        },
        clickToWalk: {
          title: 'Clic para Caminar',
          description: 'Mueve a tu personaje haciendo clic en el suelo.',
        },
      },
    },
  },
};
