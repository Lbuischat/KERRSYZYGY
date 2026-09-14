import { Language } from './language.types';
import { BaseTranslation, Translation } from './translation.types';
import { de } from './locales/de';
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { pt } from './locales/pt';
import { authSection } from './sections/auth';
import { hudPanelsSection } from './sections/hud-panels';
import { onboardingSection } from './sections/onboarding';
import { playerInfoSection } from './sections/player-info';
import { shopSection } from './sections/shop';

function compose(language: Language, base: BaseTranslation): Translation {
  return {
    ...base,
    auth: authSection[language],
    shop: shopSection[language],
    playerInfo: playerInfoSection[language],
    hudPanels: hudPanelsSection[language],
    onboarding: onboardingSection[language],
  };
}

export const translations: Record<Language, Translation> = {
  en: compose('en', en),
  pt: compose('pt', pt),
  es: compose('es', es),
  fr: compose('fr', fr),
  de: compose('de', de),
};
