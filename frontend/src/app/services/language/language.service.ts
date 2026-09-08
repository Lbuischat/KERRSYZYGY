import { Injectable, signal } from '@angular/core';

import { Language } from './language.types';
import { translations } from './translations';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language = signal<Language>('en');

  readonly translations = translations;

  setLanguage(language: Language): void {
    this.language.set(language);
  }

  t() {
    return this.translations[this.language()];
  }
}