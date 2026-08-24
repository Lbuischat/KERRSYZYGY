import { Component, HostListener } from '@angular/core';

import { Hud } from '../hud/hud';
import { GameWorld } from '../game-world/game-world';
import { Settings } from '../settings/settings';

@Component({
  imports: [Hud, GameWorld, Settings],
  selector: 'app-game-shell',
  styleUrl: './game-shell.css',
  templateUrl: './game-shell.html',
})
export class GameShell {

  settingsOpen = false;
  settingsClosing = false;

  openSettings(): void {
    this.settingsOpen = true;
    console.log('⚙️ SETTINGS OPEN:', this.settingsOpen);
  }

  closeSettings(): void {
    if (!this.settingsOpen || this.settingsClosing) {
      return;
    }

    console.log('⚙️ SETTINGS CLOSING');

    this.settingsClosing = true;

    setTimeout(() => {
      this.settingsOpen = false;
      this.settingsClosing = false;

      console.log('⚙️ SETTINGS CLOSED');
    }, 180);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'Escape' && this.settingsOpen) {
      console.log('🚪 ESC PRESSED - CLOSING SETTINGS');
      this.closeSettings();
    }
  }
}