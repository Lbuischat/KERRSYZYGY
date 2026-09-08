import {
  Component,
  signal
} from '@angular/core';

import { Title } from '../title/title';
import { Login } from '../auth/login/login';

import { LanguageService } from '../../services/language/language.service';
import { Language } from '../../services/language/language.types';

@Component({
  selector: 'app-game-entry',
  imports: [Title, Login],
  templateUrl: './game-entry.html',
  styleUrl: './game-entry.css',
})
export class GameEntry {
  showLogin = signal(false);
  isTransitioning = signal(false);

  showLanguages = signal(false);

  private readonly transitionDuration = 1200;

  constructor(public readonly languageService: LanguageService) {}

  enterLogin(): void {
    if (this.isTransitioning()) {
      return;
    }

    this.isTransitioning.set(true);

    // Hide the language menu when entering login
    this.showLanguages.set(false);

    setTimeout(() => {
      this.showLogin.set(true);
    }, this.transitionDuration);
  }

  toggleLanguages(): void {
    this.showLanguages.update((value) => !value);
  }

  changeLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.showLanguages.set(false);
  }

  currentLanguageLabel(): string {
    switch (this.languageService.language()) {
      case 'pt':
        return 'Português';

      case 'es':
        return 'Español';

      case 'fr':
        return 'Français';

      case 'de':
        return 'Deutsch';

      default:
        return 'English';
    }
  }
}
