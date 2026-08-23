import { Component } from '@angular/core';

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

  openSettings(): void {
    this.settingsOpen = true;
    console.log('⚙️ SETTINGS OPEN:', this.settingsOpen);
  }

  closeSettings(): void {
    this.settingsOpen = false;
    console.log('⚙️ SETTINGS CLOSED');
  }

}