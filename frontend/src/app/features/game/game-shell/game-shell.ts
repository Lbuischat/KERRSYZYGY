import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hud } from '../hud/hud';
import { GameWorld } from '../game-world/game-world';
import { Inventory } from '../hud/inventory/inventory';
import { tutorial } from '../tutorial/tutorial';

@Component({
  imports: [
    Hud,
    GameWorld,
    Inventory,
    tutorial,
  ],
  selector: 'app-game-shell',
  styleUrl: './game-shell.css',
  templateUrl: './game-shell.html',
})
export class GameShell {

  @ViewChild(GameWorld)
  gameWorld!: GameWorld;

  /*
   * Reference to the Tutorial component so events coming up from
   * GameWorld (attack, enemy defeated) can be forwarded into it.
   */
  @ViewChild(tutorial)
  tutorialCmp!: tutorial;

  inventoryOpen = false;

  tutorialMessageVisible = false;

  private tutorialMessageTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) { }

  openSettings(): void {
    this.router.navigate(['/settings']);
  }

  toggleInventory(): void {
    this.inventoryOpen = !this.inventoryOpen;

    console.log(
      '🎒 INVENTORY OPEN:',
      this.inventoryOpen
    );
  }

  showTutorialMessage(): void {
    this.tutorialMessageVisible = true;

    if (this.tutorialMessageTimer) {
      clearTimeout(this.tutorialMessageTimer);
    }

    this.tutorialMessageTimer = setTimeout(() => {
      this.tutorialMessageVisible = false;
    }, 2500);
  }

  // ================================================================
  // TUTORIAL EVENT FORWARDING
  // ================================================================

  onPlayerAttack(): void {

    if (!this.tutorialCmp) {
      return;
    }

    this.tutorialCmp.onBasicAttack();

  }

  onEnemyDefeated(): void {

    if (!this.tutorialCmp) {
      return;
    }

    this.tutorialCmp.onTutorialEnemyDefeated();

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