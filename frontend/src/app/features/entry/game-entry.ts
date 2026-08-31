import {
  Component,
  signal
} from '@angular/core';

import { Title } from '../title/title';
import { Login } from '../auth/login/login';

@Component({
  selector: 'app-game-entry',
  imports: [
    Title,
    Login
  ],
  templateUrl: './game-entry.html',
  styleUrl: './game-entry.css'
})
export class GameEntry {

  showLogin = signal(false);
  isTransitioning = signal(false);

  private readonly transitionDuration = 1200;

  enterLogin(): void {

    if (this.isTransitioning()) {
      return;
    }

    this.isTransitioning.set(true);

    setTimeout(() => {
      this.showLogin.set(true);
    }, this.transitionDuration);
  }
}