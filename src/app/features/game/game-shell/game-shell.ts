import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Hud } from '../hud/hud';
import { GameWorld } from '../game-world/game-world';
import { Inventory } from '../hud/inventory/inventory';
import { GameTutorial } from '../tutorial/tutorial';

@Component({
  imports: [
    Hud,
    GameWorld,
    Inventory,
    GameTutorial,
  ],
  selector: 'app-game-shell',
  styleUrl: './game-shell.css',
  templateUrl: './game-shell.html',
})
export class GameShell {

  inventoryOpen = false;
  tutorialOpen = true;

  constructor(private router: Router) {}

  openSettings(): void {
    this.router.navigate(['/settings']);
  }

  toggleInventory(): void {
    if (this.tutorialOpen) {
      return;
    }

    this.inventoryOpen = !this.inventoryOpen;

    console.log('🎒 INVENTORY OPEN:', this.inventoryOpen);
  }

  completeTutorial(): void {
    this.tutorialOpen = false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (this.tutorialOpen) {
      keyboardEvent.preventDefault();
      return;
    }

    if (
      keyboardEvent.key.toLowerCase() === 'i'
    ) {
      this.toggleInventory();
    }
  }
}
