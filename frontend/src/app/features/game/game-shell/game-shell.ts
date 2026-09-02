import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Hud } from '../hud/hud';
import { GameWorld } from '../game-world/game-world';
import { Inventory } from '../hud/inventory/inventory';

@Component({
  imports: [
    Hud,
    GameWorld,
    Inventory,
  ],
  selector: 'app-game-shell',
  styleUrl: './game-shell.css',
  templateUrl: './game-shell.html',
})
export class GameShell {

  inventoryOpen = false;

  constructor(private router: Router) {}

  openSettings(): void {
    this.router.navigate(['/settings']);
  }

  toggleInventory(): void {
    this.inventoryOpen = !this.inventoryOpen;

    console.log('🎒 INVENTORY OPEN:', this.inventoryOpen);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (
      keyboardEvent.key.toLowerCase() === 'i'
    ) {
      this.toggleInventory();
    }
  }
}