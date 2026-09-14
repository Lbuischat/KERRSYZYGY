import { BaseTranslation } from '../translation.types';

export const fr: BaseTranslation = {
  title: {
    remember: 'SE SOUVENIR',
  },

  login: {
    title: 'CONNEXION',
    journey: 'CONTINUEZ VOTRE VOYAGE',
    or: 'OU',
    email: 'E-MAIL',
    password: 'MOT DE PASSE',
    submit: 'SE CONNECTER',
    noAccount: 'VOUS N’AVEZ PAS DE COMPTE ?',
    createAccount: 'EN CRÉER UN.',
  },

  start: {
    story: {
      beforeJourney: 'Avant que votre voyage ne commence...',
      worldWaiting: 'Un monde attend d’être découvert.',
      continue: 'Continuer →',
    },
    gender: {
      eyebrow: 'VOTRE VOYAGE',
      title: 'Qui êtes-vous ?',
      description: 'Choisissez comment vous souhaitez être représenté(e) dans votre voyage.',
      continue: 'Continuer →',
    },
    username: {
      eyebrow: 'VOTRE NOM',
      title: 'Comment devons-nous vous appeler ?',
      description: 'Choisissez un nom pour votre voyage.',
      placeholder: 'Entrez votre nom d’utilisateur',
      continue: 'Continuer →',
    },
    pronouns: {
      eyebrow: 'VOTRE IDENTITÉ',
      title: 'Quels sont vos pronoms ?',
      description: 'Choisissez les pronoms que vous souhaitez que nous utilisions pour vous.',
      continue: 'Continuer →',
    },
    birthday: {
      eyebrow: 'UN PETIT DÉTAIL',
      title: 'Quelle est votre date d’anniversaire ?',
      description: 'Choisissez votre date de naissance.',
      month: 'Mois',
      day: 'Jour',
      year: 'Année',
      emailWishes: 'Recevez des vœux et des cadeaux d’anniversaire par e-mail',
      continue: 'Continuer →',
    },
    ready: {
      eyebrow: 'VOTRE VOYAGE COMMENCE',
      title: 'Êtes-vous prêt(e) ?',
      description: 'Tout est prêt. Votre aventure vous attend.',
      begin: 'Commencer le voyage →',
    },
  },

  language: {
    english: 'Anglais',
    portuguese: 'Portugais',
    spanish: 'Espagnol',
    french: 'Français',
    german: 'Allemand',
  },

  game: {
    hud: {
      wave: 'VAGUE',
      enemiesLeft: 'RESTANTS',
      points: 'PTS',
      finalWave: 'VAGUE FINALE',
    },

    scoreBoard: {
      victoryTitle: 'VICTOIRE',
      defeatTitle: 'PARTIE TERMINÉE',
      victorySubtitle: 'LES {waves} VAGUES VAINCUES',
      defeatSubtitle: 'L’EFFONDREMENT VOUS A PRIS',
      waveReached: 'VAGUE ATTEINTE',
      enemiesDefeated: 'ENNEMIS VAINCUS',
      timeSurvived: 'TEMPS SURVÉCU',
      score: 'SCORE',
      playAgain: 'REJOUER',
      leave: 'QUITTER',
    },

    inventory: {
      title: 'INVENTAIRE',
      close: 'Fermer l’inventaire',
      details: 'DÉTAILS',
      noSelection: 'Aucun objet sélectionné.',
      use: 'UTILISER',
      drop: 'JETER',
      carrying: 'VOUS EN AVEZ {count}',

      healed: '+{amount} DE VIE RESTAURÉE',
      speedBoost: 'VITESSE +{percent}% PENDANT {seconds}s',
      damageBoost: 'DÉGÂTS +{percent}% PENDANT {seconds}s',
      defenseBoost: 'DÉGÂTS SUBIS -{percent}% PENDANT {seconds}s',
      cannotUse: 'Cet objet ne peut pas être utilisé.',
      dropped: 'Jeté.',

      filters: {
        all: 'Tout',
        weapons: 'Armes',
        armor: 'Armures',
        potions: 'Potions',
        items: 'Objets',
        collectables: 'Collections',
      },
    },

    items: {
      'stellar-draught': {
        name: 'Gorgée Stellaire',
        description:
          'Lumière d’étoile en bouteille. Restaure 40 points de vie dès son utilisation.',
      },
      'solar-wind': {
        name: 'Vent Solaire',
        description:
          'Un souffle retenu de la couronne. Vous déplace 35% plus vite pendant 12 secondes.',
      },
      'collapse-matter': {
        name: 'Matière d’Effondrement',
        description:
          'Matière altérée par une gravité extrême. Inflige 50% de dégâts en plus pendant 15 secondes.',
      },
      'void-shard': {
        name: 'Éclat du Vide',
        description:
          'Une lame qui se souvient d’avoir été une étoile. Double vos dégâts pendant 8 secondes.',
      },
      'aegis-fragment': {
        name: 'Fragment d’Égide',
        description:
          'Une coque de lumière figée. Réduit de moitié les dégâts subis pendant 15 secondes.',
      },
      'syzygy-relic': {
        name: 'Relique de Syzygie',
        description:
          'Trois mondes alignés, pris dans la pierre. À garder, pas à boire.',
      },
    },

    settings: {
      back: '← Retour',
      gameplay: 'Jouabilité',
      sound: 'Son',
      accessibility: 'Accessibilité',
      language: 'Langue',

      rows: {
        showDamageNumbers: {
          title: 'Afficher les Dégâts',
          description: 'Affiche les valeurs de dégâts lors des attaques.',
        },
        showTutorials: {
          title: 'Afficher les Tutoriels',
          description: 'Affiche les tutoriels et les conseils d’introduction.',
        },
        hints: {
          title: 'Astuces',
          description: 'Affiche des astuces contextuelles pendant le jeu.',
        },
        difficulty: {
          title: 'Difficulté',
          description: 'Ajuste le niveau de défi global.',
        },
        enemyHealthBars: {
          title: 'Barres de Vie des Ennemis',
          description: 'Affiche les barres de vie au-dessus des ennemis.',
        },
        autoEquip: {
          title: 'Équipement Automatique',
          description: 'Équipe automatiquement le matériel obtenu.',
        },
        autoSave: {
          title: 'Sauvegarde Automatique',
          description: 'Sauvegarde automatiquement votre progression.',
        },

        masterVolume: {
          title: 'Volume Général',
          description: 'Ajuste le volume général du jeu.',
        },
        musicVolume: {
          title: 'Volume de la Musique',
          description: 'Ajuste le volume de la musique de fond.',
        },
        sfxVolume: {
          title: 'Volume des Effets',
          description: 'Ajuste le volume des effets sonores.',
        },
        environmentVolume: {
          title: 'Environnement',
          description: 'Ajuste le volume des sons d’ambiance.',
        },
        monstersVolume: {
          title: 'Monstres',
          description: 'Ajuste le volume des sons des monstres.',
        },
        natureVolume: {
          title: 'Nature',
          description: 'Ajuste le volume des sons de la nature.',
        },
        subtitles: {
          title: 'Sous-titres',
          description: 'Affiche les sous-titres des dialogues et des sons.',
        },
        muteAll: {
          title: 'Tout Couper',
          description: 'Coupe tout l’audio du jeu.',
        },

        reduceFlashes: {
          title: 'Réduire les Flashs',
          description: 'Réduit les flashs lumineux et les effets visuels brusques.',
        },
        screenShake: {
          title: 'Tremblement d’Écran',
          description: 'Active ou désactive le tremblement de caméra pendant le jeu.',
        },
        motionBlur: {
          title: 'Flou de Mouvement',
          description: 'Active ou désactive les effets de flou de mouvement.',
        },
        colorBlindMode: {
          title: 'Mode Daltonien',
          description: 'Ajuste les éléments visuels pour mieux distinguer les couleurs.',
        },
        uiScale: {
          title: 'Échelle de l’Interface',
          description: 'Ajuste la taille des éléments de l’interface.',
        },
        autoPickup: {
          title: 'Ramassage Automatique',
          description: 'Ramasse automatiquement les objets à proximité.',
        },
        reducedKeybinds: {
          title: 'Commandes Réduites',
          description: 'Réduit le nombre de commandes nécessaires.',
        },
        clickToWalk: {
          title: 'Cliquer pour Marcher',
          description: 'Déplace votre personnage en cliquant sur le sol.',
        },
      },
    },
  },
};
