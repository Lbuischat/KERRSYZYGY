import {
  ChangeDetectorRef,
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
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
import { GameStateService } from '../../../services/game-state/game-state.service';

@Component({
  selector: 'app-hud',
  imports: [
    PlayerInfoBnt,
    ShopButton,
    TaskPanel,
    MiniMap,
    ActionBar,
    InventoryButton,
    SettingsButton,
  ],
  templateUrl: './hud.html',
  styleUrl: './hud.css',
})
export class Hud implements OnInit, OnDestroy {

  // =========================================================
  // MINIMAP DATA
  // =========================================================

  worldWidth = 20 * 128;

  worldHeight = 20 * 128;

  playerPosition: MiniMapEntity = {
    x: 300,
    y: 300,
  };

  enemies: MiniMapEntity[] = [];

  private subscription = new Subscription();

  constructor(
    private gameStateService: GameStateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.gameStateService.playerPosition$.subscribe(position => {
        this.playerPosition = position;
        this.cdr.detectChanges();
      })
    );

    this.subscription.add(
      this.gameStateService.enemyPositions$.subscribe(positions => {
        this.enemies = positions;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  // =========================================================
  // HUD EVENTS
  // =========================================================

  @Output() settingsOpen = new EventEmitter<void>();

  @Output() inventoryOpen = new EventEmitter<void>();


  openSettings(): void {
    console.log('⚙️ HUD RECEIVED SETTINGS CLICK');
    this.settingsOpen.emit();
  }


  toggleInventory(): void {
    console.log('🎒 HUD RECEIVED INVENTORY CLICK');
    this.inventoryOpen.emit();
  }

}