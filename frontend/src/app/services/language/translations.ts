import { Language } from './language.types';

export const translations: Record<
  Language,
  {
    title: {
      remember: string;
    };

    login: {
      title: string;
      journey: string;
      or: string;
      email: string;
      password: string;
      submit: string;
      noAccount: string;
      createAccount: string;
    };

    start: {
      story: {
        beforeJourney: string;
        worldWaiting: string;
        continue: string;
      };

      gender: {
        eyebrow: string;
        title: string;
        description: string;
        continue: string;
      };

      username: {
        eyebrow: string;
        title: string;
        description: string;
        placeholder: string;
        continue: string;
      };

      pronouns: {
        eyebrow: string;
        title: string;
        description: string;
        continue: string;
      };

      birthday: {
        eyebrow: string;
        title: string;
        description: string;
        month: string;
        day: string;
        year: string;
        emailWishes: string;
        continue: string;
      };

      ready: {
        eyebrow: string;
        title: string;
        description: string;
        begin: string;
      };
    };

    language: {
      english: string;
      portuguese: string;
      spanish: string;
      french: string;
      german: string;
    };
  }
> = {
  en: {
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
  },

  pt: {
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
  },

  es: {
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
  },

  fr: {
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
  },

  de: {
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
  },
};
