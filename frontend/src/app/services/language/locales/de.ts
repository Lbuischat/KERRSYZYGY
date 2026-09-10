import { BaseTranslation } from '../translation.types';

export const de: BaseTranslation = {
  title: {
    remember: 'ERINNERN',
  },

  login: {
    title: 'ANMELDUNG',
    journey: 'SETZEN SIE IHRE REISE FORT',
    or: 'ODER',
    email: 'E-MAIL',
    password: 'PASSWORT',
    submit: 'ANMELDEN',
    noAccount: 'NOCH KEIN KONTO?',
    createAccount: 'KONTO ERSTELLEN.',
  },

  start: {
    story: {
      beforeJourney: 'Bevor deine Reise beginnt...',
      worldWaiting: 'Eine Welt wartet darauf, entdeckt zu werden.',
      continue: 'Weiter →',
    },
    gender: {
      eyebrow: 'DEINE REISE',
      title: 'Wer bist du?',
      description: 'Wähle, wie du auf deiner Reise dargestellt werden möchtest.',
      continue: 'Weiter →',
    },
    username: {
      eyebrow: 'DEIN NAME',
      title: 'Wie sollen wir dich nennen?',
      description: 'Wähle einen Namen für deine Reise.',
      placeholder: 'Gib deinen Benutzernamen ein',
      continue: 'Weiter →',
    },
    pronouns: {
      eyebrow: 'DEINE IDENTITÄT',
      title: 'Welche Pronomen verwendest du?',
      description: 'Wähle die Pronomen, die wir für dich verwenden sollen.',
      continue: 'Weiter →',
    },
    birthday: {
      eyebrow: 'EIN KLEINES DETAIL',
      title: 'Wann hast du Geburtstag?',
      description: 'Wähle deinen Geburtstag.',
      month: 'Monat',
      day: 'Tag',
      year: 'Jahr',
      emailWishes: 'Erhalte Geburtstagsgrüße und Geschenke per E-Mail',
      continue: 'Weiter →',
    },
    ready: {
      eyebrow: 'DEINE REISE BEGINNT',
      title: 'Bist du bereit?',
      description: 'Alles ist bereit. Dein Abenteuer erwartet dich.',
      begin: 'Reise beginnen →',
    },
  },

  language: {
    english: 'Englisch',
    portuguese: 'Portugiesisch',
    spanish: 'Spanisch',
    french: 'Französisch',
    german: 'Deutsch',
  },

  game: {
    hud: {
      wave: 'WELLE',
      enemiesLeft: 'ÜBRIG',
      points: 'PKT',
      finalWave: 'LETZTE WELLE',
    },

    scoreBoard: {
      victoryTitle: 'SIEG',
      defeatTitle: 'RUNDE BEENDET',
      victorySubtitle: 'ALLE {waves} WELLEN GESCHAFFT',
      defeatSubtitle: 'DER KOLLAPS HAT DICH GEHOLT',
      waveReached: 'ERREICHTE WELLE',
      enemiesDefeated: 'BESIEGTE GEGNER',
      timeSurvived: 'ÜBERLEBTE ZEIT',
      score: 'PUNKTE',
      playAgain: 'NOCHMAL SPIELEN',
      leave: 'VERLASSEN',
    },

    inventory: {
      title: 'INVENTAR',
      close: 'Inventar schließen',
      details: 'DETAILS',
      noSelection: 'Kein Gegenstand ausgewählt.',
      use: 'BENUTZEN',
      drop: 'WEGWERFEN',
      carrying: 'DU HAST {count}',

      healed: '+{amount} LEBEN WIEDERHERGESTELLT',
      speedBoost: 'TEMPO +{percent}% FÜR {seconds}s',
      damageBoost: 'SCHADEN +{percent}% FÜR {seconds}s',
      defenseBoost: 'ERLITTENER SCHADEN -{percent}% FÜR {seconds}s',
      cannotUse: 'Dieser Gegenstand kann nicht benutzt werden.',
      dropped: 'Weggeworfen.',

      filters: {
        all: 'Alle',
        weapons: 'Waffen',
        armor: 'Rüstung',
        potions: 'Tränke',
        items: 'Gegenstände',
        collectables: 'Sammlerstücke',
      },
    },

    items: {
      'stellar-draught': {
        name: 'Sternentrunk',
        description:
          'Abgefülltes Sternenlicht. Stellt im Moment der Nutzung 40 Leben wieder her.',
      },
      'solar-wind': {
        name: 'Sonnenwind',
        description:
          'Ein angehaltener Atemzug der Korona. Macht dich 12 Sekunden lang 35% schneller.',
      },
      'collapse-matter': {
        name: 'Kollapsmaterie',
        description:
          'Von extremer Schwerkraft veränderte Materie. 15 Sekunden lang 50% mehr Schaden.',
      },
      'void-shard': {
        name: 'Leerensplitter',
        description:
          'Eine Klinge, die sich erinnert, ein Stern gewesen zu sein. Verdoppelt deinen Schaden für 8 Sekunden.',
      },
      'aegis-fragment': {
        name: 'Aegis-Fragment',
        description:
          'Eine Schale aus gefrorenem Licht. Halbiert 15 Sekunden lang den erlittenen Schaden.',
      },
      'syzygy-relic': {
        name: 'Syzygie-Relikt',
        description:
          'Drei Welten in einer Linie, in Stein gefasst. Zum Aufbewahren, nicht zum Trinken.',
      },
    },

    settings: {
      back: '← Zurück',
      gameplay: 'Spiel',
      sound: 'Ton',
      accessibility: 'Barrierefreiheit',
      language: 'Sprache',

      rows: {
        showDamageNumbers: {
          title: 'Schadenszahlen anzeigen',
          description: 'Zeigt Schadenswerte beim Angriff auf Gegner an.',
        },
        showTutorials: {
          title: 'Tutorials anzeigen',
          description: 'Zeigt Tutorials und einführende Hinweise an.',
        },
        hints: {
          title: 'Hinweise',
          description: 'Zeigt während des Spiels kontextbezogene Hinweise an.',
        },
        difficulty: {
          title: 'Schwierigkeit',
          description: 'Passt den allgemeinen Schwierigkeitsgrad an.',
        },
        enemyHealthBars: {
          title: 'Lebensbalken der Gegner',
          description: 'Zeigt Lebensbalken über den Gegnern an.',
        },
        autoEquip: {
          title: 'Automatisch ausrüsten',
          description: 'Rüstet neu erhaltene Ausrüstung automatisch aus.',
        },
        autoSave: {
          title: 'Automatisch speichern',
          description: 'Speichert deinen Fortschritt automatisch.',
        },

        masterVolume: {
          title: 'Gesamtlautstärke',
          description: 'Passt die Gesamtlautstärke des Spiels an.',
        },
        musicVolume: {
          title: 'Musiklautstärke',
          description: 'Passt die Lautstärke der Hintergrundmusik an.',
        },
        sfxVolume: {
          title: 'Effektlautstärke',
          description: 'Passt die Lautstärke der Soundeffekte an.',
        },
        environmentVolume: {
          title: 'Umgebung',
          description: 'Passt die Lautstärke der Umgebungsgeräusche an.',
        },
        monstersVolume: {
          title: 'Monster',
          description: 'Passt die Lautstärke der Monstergeräusche an.',
        },
        natureVolume: {
          title: 'Natur',
          description: 'Passt die Lautstärke der Naturgeräusche an.',
        },
        subtitles: {
          title: 'Untertitel',
          description: 'Zeigt Untertitel für Dialoge und Geräusche an.',
        },
        muteAll: {
          title: 'Alles stummschalten',
          description: 'Schaltet den gesamten Spielton stumm.',
        },

        reduceFlashes: {
          title: 'Blitze reduzieren',
          description: 'Reduziert helle Blitze und plötzliche visuelle Effekte.',
        },
        screenShake: {
          title: 'Bildschirmwackeln',
          description: 'Aktiviert oder deaktiviert das Kamerawackeln im Spiel.',
        },
        motionBlur: {
          title: 'Bewegungsunschärfe',
          description: 'Aktiviert oder deaktiviert Bewegungsunschärfe-Effekte.',
        },
        colorBlindMode: {
          title: 'Farbenblind-Modus',
          description: 'Passt visuelle Elemente an, um Farben besser zu unterscheiden.',
        },
        uiScale: {
          title: 'Oberflächengröße',
          description: 'Passt die Größe der Oberflächenelemente an.',
        },
        autoPickup: {
          title: 'Automatisch aufheben',
          description: 'Hebt Gegenstände in der Nähe automatisch auf.',
        },
        reducedKeybinds: {
          title: 'Reduzierte Tastenbelegung',
          description: 'Reduziert die Anzahl der benötigten Steuerungstasten.',
        },
        clickToWalk: {
          title: 'Klicken zum Gehen',
          description: 'Bewege deine Figur durch Klicken auf den Boden.',
        },
      },
    },
  },
};
