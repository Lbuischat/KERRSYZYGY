import { BaseTranslation } from '../translation.types';

export const en: BaseTranslation = {
  title: {
    remember: 'REMEMBER',
  },

  login: {
    title: 'LOGIN',
    journey: 'CONTINUE YOUR JOURNEY',
    or: 'OR',
    email: 'EMAIL',
    password: 'PASSWORD',
    submit: 'LOG IN',
    noAccount: "DON'T HAVE AN ACCOUNT?",
    createAccount: 'CREATE ONE.',
  },

  start: {
    story: {
      beforeJourney: 'Before your journey begins...',
      worldWaiting: 'There is a world waiting to be discovered.',
      continue: 'Continue →',
    },
    gender: {
      eyebrow: 'YOUR JOURNEY',
      title: 'Who are you?',
      description: 'Choose how you want to be represented in your journey.',
      continue: 'Continue →',
    },
    username: {
      eyebrow: 'YOUR NAME',
      title: 'What should we call you?',
      description: 'Choose a name for your journey.',
      placeholder: 'Enter your username',
      continue: 'Continue →',
    },
    pronouns: {
      eyebrow: 'YOUR IDENTITY',
      title: 'What are your pronouns?',
      description: "Choose the pronouns you'd like us to use for you.",
      continue: 'Continue →',
    },
    birthday: {
      eyebrow: 'ONE LITTLE DETAIL',
      title: 'When is your birthday?',
      description: 'Choose your birthday.',
      month: 'Month',
      day: 'Day',
      year: 'Year',
      emailWishes: 'Receive birthday wishes & gifts by email',
      continue: 'Continue →',
    },
    ready: {
      eyebrow: 'YOUR JOURNEY BEGINS',
      title: 'Are you ready?',
      description: 'Everything is ready. Your adventure awaits.',
      begin: 'Begin Journey →',
    },
  },

  language: {
    english: 'English',
    portuguese: 'Português',
    spanish: 'Español',
    french: 'Français',
    german: 'Deutsch',
  },

  game: {
    hud: {
      wave: 'WAVE',
      enemiesLeft: 'LEFT',
      points: 'PTS',
      finalWave: 'FINAL WAVE',
    },

    scoreBoard: {
      victoryTitle: 'VICTORY',
      defeatTitle: 'RUN ENDED',
      victorySubtitle: 'ALL {waves} WAVES CLEARED',
      defeatSubtitle: 'THE COLLAPSE TOOK YOU',
      waveReached: 'WAVE REACHED',
      enemiesDefeated: 'ENEMIES DEFEATED',
      timeSurvived: 'TIME SURVIVED',
      score: 'SCORE',
      playAgain: 'PLAY AGAIN',
      leave: 'LEAVE',
    },

    inventory: {
      title: 'INVENTORY',
      close: 'Close inventory',
      details: 'DETAILS',
      noSelection: 'No item selected.',
      use: 'USE',
      drop: 'DROP',
      carrying: 'CARRYING {count}',

      healed: '+{amount} HEALTH RESTORED',
      speedBoost: 'SPEED +{percent}% FOR {seconds}s',
      damageBoost: 'DAMAGE +{percent}% FOR {seconds}s',
      defenseBoost: 'DAMAGE TAKEN -{percent}% FOR {seconds}s',
      cannotUse: 'This one cannot be used.',
      dropped: 'Dropped.',

      filters: {
        all: 'All',
        weapons: 'Weapons',
        armor: 'Armor',
        potions: 'Potions',
        items: 'Items',
        collectables: 'Collectables',
      },
    },

    items: {
      'stellar-draught': {
        name: 'Stellar Draught',
        description:
          'Bottled starlight. Restores 40 health the moment it is used.',
      },
      'solar-wind': {
        name: 'Solar Wind',
        description:
          'A held breath of the corona. Moves you 35% faster for 12 seconds.',
      },
      'collapse-matter': {
        name: 'Collapse Matter',
        description:
          'Matter altered by extreme gravity. Deals 50% more damage for 15 seconds.',
      },
      'void-shard': {
        name: 'Void Shard',
        description:
          'An edge that remembers being a star. Doubles your damage for 8 seconds.',
      },
      'aegis-fragment': {
        name: 'Aegis Fragment',
        description:
          'A shell of frozen light. Halves the damage you take for 15 seconds.',
      },
      'syzygy-relic': {
        name: 'Syzygy Relic',
        description:
          'Three worlds in a line, held in stone. Worth keeping, not drinking.',
      },
    },

    settings: {
      back: '← Back',
      gameplay: 'Gameplay',
      sound: 'Sound',
      accessibility: 'Accessibility',
      language: 'Language',

      rows: {
        showDamageNumbers: {
          title: 'Show Damage Numbers',
          description: 'Display damage values when attacking enemies.',
        },
        showTutorials: {
          title: 'Show Tutorials',
          description: 'Display tutorial prompts and introductory guidance.',
        },
        hints: {
          title: 'Hints',
          description: 'Show contextual hints while playing.',
        },
        difficulty: {
          title: 'Difficulty',
          description: 'Adjust the overall challenge level.',
        },
        enemyHealthBars: {
          title: 'Enemy Health Bars',
          description: 'Display health bars above enemies.',
        },
        autoEquip: {
          title: 'Auto Equip',
          description: 'Automatically equip newly acquired gear.',
        },
        autoSave: {
          title: 'Auto Save',
          description: 'Automatically save your progress.',
        },

        masterVolume: {
          title: 'Master Volume',
          description: 'Adjust the overall volume of the game.',
        },
        musicVolume: {
          title: 'Music Volume',
          description: 'Adjust the volume of background music.',
        },
        sfxVolume: {
          title: 'SFX Volume',
          description: 'Adjust the volume of sound effects.',
        },
        environmentVolume: {
          title: 'Environment',
          description: 'Adjust the volume of environmental sounds.',
        },
        monstersVolume: {
          title: 'Monsters',
          description: 'Adjust the volume of monster sounds.',
        },
        natureVolume: {
          title: 'Nature',
          description: 'Adjust the volume of nature sounds.',
        },
        subtitles: {
          title: 'Subtitles',
          description: 'Display subtitles for spoken dialogue and sounds.',
        },
        muteAll: {
          title: 'Mute All',
          description: 'Mute all game audio.',
        },

        reduceFlashes: {
          title: 'Reduce Flashes',
          description: 'Reduce bright flashes and sudden visual effects.',
        },
        screenShake: {
          title: 'Screen Shake',
          description: 'Enable or disable camera shake during gameplay.',
        },
        motionBlur: {
          title: 'Motion Blur',
          description: 'Enable or disable motion blur effects.',
        },
        colorBlindMode: {
          title: 'Color Blind Mode',
          description: 'Adjust visual elements to improve color distinction.',
        },
        uiScale: {
          title: 'UI Scale',
          description: 'Adjust the size of interface elements.',
        },
        autoPickup: {
          title: 'Auto Pickup',
          description: 'Automatically pick up nearby items.',
        },
        reducedKeybinds: {
          title: 'Reduced Keybinds',
          description: 'Reduce the number of required controls.',
        },
        clickToWalk: {
          title: 'Click to Walk',
          description: 'Move your character by clicking on the ground.',
        },
      },
    },
  },
};
