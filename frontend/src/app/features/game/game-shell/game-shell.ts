
import {
  Component,
  HostListener,
  OnDestroy,
  ViewChild,
  effect,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { Hud } from '../hud/hud';
import { GameWorld } from '../game-world/game-world';
import { Inventory } from '../hud/inventory/inventory';
import { tutorial } from '../tutorial/tutorial';

import { FocusMode } from '../../tasks/focus-mode/focus-mode';

import {
  FocusSessionService
} from '../../../services/tasks/focus-session';

@Component({
  selector: 'app-game-shell',
  standalone: true,
  imports: [
    Hud,
    GameWorld,
    Inventory,
    tutorial,
    FocusMode
  ],
  templateUrl: './game-shell.html',
  styleUrl: './game-shell.css'
})
export class GameShell implements OnDestroy {
  private readonly router = inject(Router);

  readonly focusService = inject(FocusSessionService);

  @ViewChild(GameWorld)
  gameWorld!: GameWorld;

  @ViewChild(tutorial)
  tutorialCmp!: tutorial;

  inventoryOpen = false;
  tutorialMessageVisible = false;

  private tutorialMessageTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // Quando o Focus começar, fecha o inventário.
    effect(() => {
      const focus = this.focusService.session();

      if (focus) {
        this.inventoryOpen = false;
        this.tutorialMessageVisible = false;
      }
    });
  }

  // =========================================
  // SETTINGS
  // =========================================

  openSettings(): void {
    if (this.focusService.active) return;

    void this.router.navigate(['/settings']);
  }

  // =========================================
  // INVENTORY
  // =========================================

  toggleInventory(): void {
    if (this.focusService.active) return;

    this.inventoryOpen = !this.inventoryOpen;
  }

  // =========================================
  // TUTORIAL
  // =========================================

  showTutorialMessage(): void {
    if (this.focusService.active) return;

    this.tutorialMessageVisible = true;

    if (this.tutorialMessageTimer) {
      clearTimeout(this.tutorialMessageTimer);
    }

    this.tutorialMessageTimer = setTimeout(() => {
      this.tutorialMessageVisible = false;
    }, 2500);
  }

  onPlayerAttack(): void {
    if (this.focusService.active) return;
    if (!this.tutorialCmp) return;

    this.tutorialCmp.onBasicAttack();
  }

  onEnemyDefeated(): void {
    if (this.focusService.active) return;
    if (!this.tutorialCmp) return;

    this.tutorialCmp.onTutorialEnemyDefeated();
  }

  // =========================================
  // KEYBOARD
  // =========================================

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();

    if (this.focusService.active) {
      // Não bloqueia atualização da página.
      // O cronômetro é salvo pelo FocusSessionService.
      if (
        event.key === 'F5' ||
        (event.ctrlKey && key === 'r')
      ) {
        return;
      }

      const blockedKeys = [
        'w', 'a', 's', 'd',
        'i', 'q', 'e', 'f',
        'shift', ' ',
        'arrowup',
        'arrowdown',
        'arrowleft',
        'arrowright',
        'escape'
      ];

      if (blockedKeys.includes(key)) {
        event.preventDefault();
      }

      return;
    }

    if (key === 'i') {
      this.toggleInventory();
    }
  }

  // =========================================
  // CLEANUP
  // =========================================

  ngOnDestroy(): void {
    if (this.tutorialMessageTimer) {
      clearTimeout(this.tutorialMessageTimer);
    }
  }
}
