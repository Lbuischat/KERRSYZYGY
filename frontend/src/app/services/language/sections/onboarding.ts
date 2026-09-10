import { Language } from '../language.types';

/** Text for the title, entry and character-creation screens not covered by the base locales. */
export interface OnboardingText {}

export const onboardingSection: Record<Language, OnboardingText> = {
  en: {},
  pt: {},
  es: {},
  fr: {},
  de: {},
};
