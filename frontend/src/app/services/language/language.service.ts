import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

import { PlayerService } from '../player.service';
import { Language } from './language.types';
import { translations } from './translations';

const STORAGE_KEY = 'kerrsyzygy-language';

const LANGUAGES: readonly Language[] = ['en', 'pt', 'es', 'fr', 'de'];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly playerService = inject(PlayerService);

  readonly languages = LANGUAGES;

  language = signal<Language>(this.loadLanguage());

  readonly translations = translations;

  constructor() {
    // Screen readers and the browser's own translate prompt read <html lang>.
    effect(() => {
      this.document.documentElement.lang = this.language();
    });
  }

  setLanguage(language: Language): void {
    this.language.set(language);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, language);

    // The player profile records the language too, so keep both in step.
    this.playerService.profile.language = language;
    this.playerService.saveProfile();
  }

  t() {
    return this.translations[this.language()];
  }

  private loadLanguage(): Language {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    const saved =
      localStorage.getItem(STORAGE_KEY) ??
      this.playerService.profile.language;

    return isLanguage(saved) ? saved : 'en';
  }
}

function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}
