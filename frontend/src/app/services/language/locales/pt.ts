import { BaseTranslation } from '../translation.types';

export const pt: BaseTranslation = {
  title: {
    remember: 'LEMBRAR',
  },

  login: {
    title: 'ENTRAR',
    journey: 'CONTINUE SUA JORNADA',
    or: 'OU',
    email: 'E-MAIL',
    password: 'SENHA',
    submit: 'ENTRAR',
    noAccount: 'NÃO TEM UMA CONTA?',
    createAccount: 'CRIAR UMA.',
  },

  start: {
    story: {
      beforeJourney: 'Antes de sua jornada começar...',
      worldWaiting: 'Há um mundo esperando para ser descoberto.',
      continue: 'Continuar →',
    },
    gender: {
      eyebrow: 'SUA JORNADA',
      title: 'Quem é você?',
      description: 'Escolha como você quer ser representado em sua jornada.',
      continue: 'Continuar →',
    },
    username: {
      eyebrow: 'SEU NOME',
      title: 'Como devemos chamar você?',
      description: 'Escolha um nome para sua jornada.',
      placeholder: 'Digite seu nome de usuário',
      continue: 'Continuar →',
    },
    pronouns: {
      eyebrow: 'SUA IDENTIDADE',
      title: 'Quais são seus pronomes?',
      description: 'Escolha os pronomes que você gostaria que usássemos para você.',
      continue: 'Continuar →',
    },
    birthday: {
      eyebrow: 'UM PEQUENO DETALHE',
      title: 'Quando é o seu aniversário?',
      description: 'Escolha sua data de nascimento.',
      month: 'Mês',
      day: 'Dia',
      year: 'Ano',
      emailWishes: 'Receba felicitações e presentes de aniversário por e-mail',
      continue: 'Continuar →',
    },
    ready: {
      eyebrow: 'SUA JORNADA COMEÇA',
      title: 'Você está pronto?',
      description: 'Tudo está pronto. Sua aventura espera por você.',
      begin: 'Começar Jornada →',
    },
  },

  language: {
    english: 'Inglês',
    portuguese: 'Português',
    spanish: 'Espanhol',
    french: 'Francês',
    german: 'Alemão',
  },

  game: {
    hud: {
      wave: 'ONDA',
      enemiesLeft: 'RESTAM',
      points: 'PTS',
      finalWave: 'ONDA FINAL',
    },

    scoreBoard: {
      victoryTitle: 'VITÓRIA',
      defeatTitle: 'FIM DA PARTIDA',
      victorySubtitle: 'TODAS AS {waves} ONDAS VENCIDAS',
      defeatSubtitle: 'O COLAPSO LEVOU VOCÊ',
      waveReached: 'ONDA ALCANÇADA',
      enemiesDefeated: 'INIMIGOS DERROTADOS',
      timeSurvived: 'TEMPO SOBREVIVIDO',
      score: 'PONTUAÇÃO',
      playAgain: 'JOGAR DE NOVO',
      leave: 'SAIR',
    },

    inventory: {
      title: 'INVENTÁRIO',
      close: 'Fechar inventário',
      details: 'DETALHES',
      noSelection: 'Nenhum item selecionado.',
      use: 'USAR',
      drop: 'DESCARTAR',
      carrying: 'VOCÊ TEM {count}',

      healed: '+{amount} DE VIDA RESTAURADA',
      speedBoost: 'VELOCIDADE +{percent}% POR {seconds}s',
      damageBoost: 'DANO +{percent}% POR {seconds}s',
      defenseBoost: 'DANO RECEBIDO -{percent}% POR {seconds}s',
      cannotUse: 'Este item não pode ser usado.',
      dropped: 'Descartado.',

      filters: {
        all: 'Tudo',
        weapons: 'Armas',
        armor: 'Armaduras',
        potions: 'Poções',
        items: 'Itens',
        collectables: 'Colecionáveis',
      },
    },

    items: {
      'stellar-draught': {
        name: 'Gole Estelar',
        description:
          'Luz de estrela engarrafada. Restaura 40 de vida no instante em que é usado.',
      },
      'solar-wind': {
        name: 'Vento Solar',
        description:
          'Um suspiro preso da coroa solar. Move você 35% mais rápido por 12 segundos.',
      },
      'collapse-matter': {
        name: 'Matéria de Colapso',
        description:
          'Matéria alterada por gravidade extrema. Causa 50% mais dano por 15 segundos.',
      },
      'void-shard': {
        name: 'Lasca do Vazio',
        description:
          'Uma lâmina que lembra ter sido estrela. Dobra seu dano por 8 segundos.',
      },
      'aegis-fragment': {
        name: 'Fragmento de Égide',
        description:
          'Uma casca de luz congelada. Reduz à metade o dano que você recebe por 15 segundos.',
      },
      'syzygy-relic': {
        name: 'Relíquia da Sizígia',
        description:
          'Três mundos em linha, presos na pedra. Vale guardar, não beber.',
      },
    },

    settings: {
      back: '← Voltar',
      gameplay: 'Jogabilidade',
      sound: 'Som',
      accessibility: 'Acessibilidade',
      language: 'Idioma',

      rows: {
        showDamageNumbers: {
          title: 'Mostrar Números de Dano',
          description: 'Exibe os valores de dano ao atacar inimigos.',
        },
        showTutorials: {
          title: 'Mostrar Tutoriais',
          description: 'Exibe tutoriais e orientações iniciais.',
        },
        hints: {
          title: 'Dicas',
          description: 'Mostra dicas contextuais durante o jogo.',
        },
        difficulty: {
          title: 'Dificuldade',
          description: 'Ajusta o nível geral de desafio.',
        },
        enemyHealthBars: {
          title: 'Barras de Vida dos Inimigos',
          description: 'Exibe barras de vida acima dos inimigos.',
        },
        autoEquip: {
          title: 'Equipar Automaticamente',
          description: 'Equipa automaticamente os equipamentos obtidos.',
        },
        autoSave: {
          title: 'Salvamento Automático',
          description: 'Salva seu progresso automaticamente.',
        },

        masterVolume: {
          title: 'Volume Geral',
          description: 'Ajusta o volume geral do jogo.',
        },
        musicVolume: {
          title: 'Volume da Música',
          description: 'Ajusta o volume da música de fundo.',
        },
        sfxVolume: {
          title: 'Volume dos Efeitos',
          description: 'Ajusta o volume dos efeitos sonoros.',
        },
        environmentVolume: {
          title: 'Ambiente',
          description: 'Ajusta o volume dos sons do ambiente.',
        },
        monstersVolume: {
          title: 'Monstros',
          description: 'Ajusta o volume dos sons dos monstros.',
        },
        natureVolume: {
          title: 'Natureza',
          description: 'Ajusta o volume dos sons da natureza.',
        },
        subtitles: {
          title: 'Legendas',
          description: 'Exibe legendas para diálogos e sons.',
        },
        muteAll: {
          title: 'Silenciar Tudo',
          description: 'Silencia todo o áudio do jogo.',
        },

        reduceFlashes: {
          title: 'Reduzir Flashes',
          description: 'Reduz clarões e efeitos visuais bruscos.',
        },
        screenShake: {
          title: 'Tremor de Tela',
          description: 'Ativa ou desativa o tremor da câmera durante o jogo.',
        },
        motionBlur: {
          title: 'Desfoque de Movimento',
          description: 'Ativa ou desativa os efeitos de desfoque de movimento.',
        },
        colorBlindMode: {
          title: 'Modo Daltônico',
          description: 'Ajusta os elementos visuais para melhorar a distinção de cores.',
        },
        uiScale: {
          title: 'Escala da Interface',
          description: 'Ajusta o tamanho dos elementos da interface.',
        },
        autoPickup: {
          title: 'Coleta Automática',
          description: 'Recolhe automaticamente os itens próximos.',
        },
        reducedKeybinds: {
          title: 'Controles Reduzidos',
          description: 'Reduz o número de controles necessários.',
        },
        clickToWalk: {
          title: 'Clicar para Andar',
          description: 'Move seu personagem clicando no chão.',
        },
      },
    },
  },
};
