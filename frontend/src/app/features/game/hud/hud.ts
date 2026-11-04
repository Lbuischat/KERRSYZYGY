
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { Subscription } from 'rxjs';

import { PlayerInfoBnt } from './player-info-btn/player-info-bnt';
import { ShopButton } from './shop-button/shop-button';
import { TaskPanel } from '../../tasks/task-panel/task-panel';

import {
  MiniMap,
  MiniMapEntity
} from './mini-map/mini-map';

import { ActionBar } from '../combat/action-bar/action-bar';
import { InventoryButton } from './inventory-button/inventory-button';
import { SettingsButton } from './settings-button/settings-button';

import {
  GameStateService
} from '../../../services/game-state/game-state.service';

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [
    PlayerInfoBnt,
    ShopButton,
    TaskPanel,
    MiniMap,
    ActionBar,
    InventoryButton,
    SettingsButton
  ],
  templateUrl: './hud.html',
  styleUrl: './hud.css'
})
export class Hud implements OnInit, OnDestroy {

  // =====================================
  // CONTROLE DO PAINEL DE MISSÕES
  // =====================================

  questsCollapsed = false;

  toggleQuests(): void {
    this.questsCollapsed = !this.questsCollapsed;
  }

  // =====================================
  // MINIMAP
  // =====================================

  worldWidth = 20 * 128;
  worldHeight = 20 * 128;

  playerPosition: MiniMapEntity = {
    x: 1255,
    y: 1255
  };

  enemies: MiniMapEntity[] = [];

  private subscription = new Subscription();

  constructor(
    private gameStateService: GameStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.gameStateService.playerPosition$.subscribe(
        position => {
          this.playerPosition = position;
          this.cdr.detectChanges();
        }
      )
    );

    this.subscription.add(
      this.gameStateService.enemyPositions$.subscribe(
        positions => {
          this.enemies = positions;
          this.cdr.detectChanges();
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // =====================================
  // EVENTOS DO HUD
  // =====================================

  @Output()
  settingsOpen = new EventEmitter<void>();

  @Output()
  inventoryOpen = new EventEmitter<void>();

  openSettings(): void {
    this.settingsOpen.emit();
  }

  toggleInventory(): void {
    this.inventoryOpen.emit();
  }
}
