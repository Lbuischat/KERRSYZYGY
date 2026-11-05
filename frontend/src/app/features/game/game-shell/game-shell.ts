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

import { FocusSessionService } from '../../../services/tasks/focus-session';
import { PlayerService } from '../../../services/player.service';

// ========================================
// TYPES
// ========================================

type SpriteName =
  | 'aether'
  | 'selene'
  | 'kael'
  | 'vesper'
  | 'chrona'
  | 'lumi'
  | 'ravi'
  | 'iris'
  | 'nox'
  | 'atlas';

type AccessoryKind =
  | 'explorer'
  | 'oracle'
  | 'guardian'
  | 'hunter'
  | 'chrono';

interface SpritePalette {
  skin: string;
  hair: string;
  outfit: string;
  dark: string;
  accent: string;
  cape: string;
  eye: string;
  accessory: AccessoryKind;
}

// ========================================
// CHARACTER SPRITE CONFIGURATION
// ========================================

const SPRITES: Record<SpriteName, SpritePalette> = {
  aether: {
    skin: '#b87959',
    hair: '#192237',
    outfit: '#26435e',
    dark: '#132d40',
    accent: '#80d9ff',
    cape: '#142d40',
    eye: '#1d1830',
    accessory: 'explorer'
  },

  selene: {
    skin: '#d9a889',
    hair: '#e2d9f3',
    outfit: '#44406e',
    dark: '#29234f',
    accent: '#bda6ff',
    cape: '#29234f',
    eye: '#343054',
    accessory: 'oracle'
  },

  kael: {
    skin: '#915c48',
    hair: '#292027',
    outfit: '#6e453e',
    dark: '#4b252d',
    accent: '#ffd078',
    cape: '#4b252d',
    eye: '#211823',
    accessory: 'guardian'
  },

  vesper: {
    skin: '#684234',
    hair: '#a25568',
    outfit: '#24505a',
    dark: '#15343d',
    accent: '#71e1c6',
    cape: '#15343d',
    eye: '#0b2428',
    accessory: 'hunter'
  },

  chrona: {
    skin: '#c28b72',
    hair: '#c5cede',
    outfit: '#483b6d',
    dark: '#302448',
    accent: '#f29ac8',
    cape: '#302448',
    eye: '#312645',
    accessory: 'chrono'
  },

  lumi: {
    skin: '#b9dce7',
    hair: '#476b84',
    outfit: '#244e65',
    dark: '#0b293b',
    accent: '#69f0ed',
    cape: '#0b293b',
    eye: '#08718c',
    accessory: 'chrono'
  },

  ravi: {
    skin: '#b87654',
    hair: '#30222b',
    outfit: '#795035',
    dark: '#4a3036',
    accent: '#ffb164',
    cape: '#4a3036',
    eye: '#241a24',
    accessory: 'explorer'
  },

  iris: {
    skin: '#d09b76',
    hair: '#354a37',
    outfit: '#3c6949',
    dark: '#234b42',
    accent: '#a2e88d',
    cape: '#234b42',
    eye: '#27382b',
    accessory: 'oracle'
  },

  nox: {
    skin: '#88624e',
    hair: '#15182a',
    outfit: '#302a51',
    dark: '#15152d',
    accent: '#a995ff',
    cape: '#15152d',
    eye: '#e8dfff',
    accessory: 'hunter'
  },

  atlas: {
    skin: '#7f533e',
    hair: '#3a2731',
    outfit: '#385071',
    dark: '#5b2944',
    accent: '#efca73',
    cape: '#5b2944',
    eye: '#211823',
    accessory: 'guardian'
  }
};

// ========================================
// GAME SHELL COMPONENT
// ========================================

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
  readonly playerService = inject(PlayerService);

  // ========================================
  // COMPONENT REFERENCES
  // ========================================

  @ViewChild(GameWorld)
  gameWorld?: GameWorld;

  @ViewChild(tutorial)
  tutorialCmp?: tutorial;

  // ========================================
  // UI STATE
  // ========================================

  inventoryOpen = false;
  tutorialMessageVisible = false;

  private tutorialMessageTimer?: ReturnType<typeof setTimeout>;

  constructor() {

    // Close temporary UI when focus mode begins.
    effect(() => {
      if (this.focusService.session()) {
        this.inventoryOpen = false;
        this.tutorialMessageVisible = false;
      }
    });
  }

  // ========================================
  // SELECTED CHARACTER
  // ========================================

  get selectedSprite(): SpriteName {

    const name = (
      this.playerService.p().characterName || 'Aether'
    )
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

    switch (name) {
      case 'aether':
        return 'aether';

      case 'selene':
        return 'selene';

      case 'kael':
        return 'kael';

      case 'vesper':
        return 'vesper';

      case 'chrona':
      case 'crona':
        return 'chrona';

      case 'lumi':
        return 'lumi';

      case 'ravi':
        return 'ravi';

      case 'iris':
        return 'iris';

      case 'nox':
        return 'nox';

      case 'atlas':
        return 'atlas';

      default:
        return 'aether';
    }
  }

  // ========================================
  // SPRITE COLORS AND ACCESSORIES
  // ========================================

  get spritePalette(): SpritePalette {
    return SPRITES[this.selectedSprite];
  }

  get spriteAccessory(): AccessoryKind {
    return this.spritePalette.accessory;
  }

  isAccessory(kind: AccessoryKind): boolean {
    return this.spriteAccessory === kind;
  }

  // ========================================
  // SETTINGS
  // ========================================

  openSettings(): void {

    if (this.focusService.active) {
      return;
    }

    void this.router.navigate(['/settings']);
  }

  // ========================================
  // INVENTORY
  // ========================================

  toggleInventory(): void {

    if (this.focusService.active) {
      return;
    }

    this.inventoryOpen = !this.inventoryOpen;

    console.log(
      '🎒 INVENTORY OPEN:',
      this.inventoryOpen
    );
  }

  // ========================================
  // TUTORIAL MESSAGE
  // ========================================

  showTutorialMessage(): void {

    if (this.focusService.active) {
      return;
    }

    this.tutorialMessageVisible = true;

    if (this.tutorialMessageTimer) {
      clearTimeout(this.tutorialMessageTimer);
    }

    this.tutorialMessageTimer = setTimeout(() => {
      this.tutorialMessageVisible = false;
    }, 2500);
  }

  // ========================================
  // TUTORIAL EVENT FORWARDING
  // ========================================

  onPlayerAttack(): void {

    if (this.focusService.active) {
      return;
    }

    this.tutorialCmp?.onBasicAttack();
  }

  onEnemyDefeated(): void {

    if (this.focusService.active) {
      return;
    }

    this.tutorialCmp?.onTutorialEnemyDefeated();
  }

  onTutorialEnemyStepStarted(): void {

    this.gameWorld?.startTutorialEnemyGuide();
  }

  // ========================================
  // KEYBOARD CONTROLS
  // ========================================

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {

    const key = event.key.toLowerCase();

    if (this.focusService.active) {

      // Allow page refresh.
      if (
        event.key === 'F5' ||
        (event.ctrlKey && key === 'r')
      ) {
        return;
      }

      const blockedKeys = [
        'w',
        'a',
        's',
        'd',
        'i',
        'q',
        'e',
        'f',
        'shift',
        ' ',
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

  // ========================================
  // CLEANUP
  // ========================================

  ngOnDestroy(): void {

    if (this.tutorialMessageTimer) {
      clearTimeout(this.tutorialMessageTimer);
    }
  }
}