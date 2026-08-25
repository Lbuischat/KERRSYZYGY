import { Component, HostListener } from '@angular/core';

import { Hud } from '../hud/hud';
import { GameWorld } from '../game-world/game-world';
import { Settings } from '../settings/settings';
import { Inventory } from '../hud/inventory/inventory';


@Component({
  imports: [
    Hud,
    GameWorld,
    Settings,
    Inventory,
  ],
  selector: 'app-game-shell',
  styleUrl: './game-shell.css',
  templateUrl: './game-shell.html',
})
export class GameShell {
  settingsOpen = false;
  settingsClosing = false;

  inventoryOpen = false;

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

  toggleInventory(): void {
    this.inventoryOpen = !this.inventoryOpen;

    console.log('🎒 INVENTORY OPEN:', this.inventoryOpen);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'Escape') {
      if (this.settingsOpen) {
        console.log('🚪 ESC PRESSED - CLOSING SETTINGS');
        this.closeSettings();
      } else if (this.inventoryOpen) {
        console.log('🚪 ESC PRESSED - CLOSING INVENTORY');
        this.inventoryOpen = false;
      }
    }

    if (
      keyboardEvent.key.toLowerCase() === 'i' &&
      !this.settingsOpen
    ) {
      this.toggleInventory();
    }
  }
}