
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
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

  private readonly gameStateService =
    inject(GameStateService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly subscriptions =
    new Subscription();

  // =========================================
  // VIDA E STAMINA — MESMO ESTADO DO PLAYER
  // =========================================

  readonly vitals = toSignal(
    this.gameStateService.playerVitals$,
    { requireSync: true }
  );

  get currentHealth(): number {
    return Math.ceil(this.vitals().health);
  }

  get maxHealth(): number {
    return this.vitals().maxHealth;
  }

  get currentStamina(): number {
    return Math.ceil(this.vitals().stamina);
  }

  get maxStamina(): number {
    return this.vitals().maxStamina;
  }

  // =========================================
  // PORCENTAGENS
  // =========================================

  get healthPercent(): number {
    const data = this.vitals();

    if (data.maxHealth <= 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.max(
        0,
        (data.health / data.maxHealth) * 100
      )
    );
  }

  get staminaPercent(): number {
    const data = this.vitals();

    if (data.maxStamina <= 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.max(
        0,
        (data.stamina / data.maxStamina) * 100
      )
    );
  }

  // =========================================
  // CORES DA VIDA
  // =========================================

  get healthColor(): string {

    if (this.healthPercent <= 25) {
      return '#ef4444';
    }

    if (this.healthPercent <= 55) {
      return '#f5b841';
    }

    return '#3ed18b';
  }

  get isCritical(): boolean {
    return (
      this.currentHealth > 0 &&
      this.healthPercent <= 25
    );
  }

  // =========================================
  // MISSÕES
  // =========================================

  questsCollapsed = false;

  toggleQuests(): void {
    this.questsCollapsed =
      !this.questsCollapsed;
  }

  // =========================================
  // MINIMAPA
  // =========================================

  worldWidth = 20 * 128;
  worldHeight = 20 * 128;

  playerPosition: MiniMapEntity = {
    x: 1255,
    y: 1255
  };

  enemies: MiniMapEntity[] = [];

  // =========================================
  // INICIALIZAÇÃO
  // =========================================

  ngOnInit(): void {

    this.subscriptions.add(
      this.gameStateService.playerPosition$
        .subscribe(position => {

          this.playerPosition = position;

          this.cdr.detectChanges();
        })
    );

    this.subscriptions.add(
      this.gameStateService.enemyPositions$
        .subscribe(positions => {

          this.enemies = positions;

          this.cdr.detectChanges();
        })
    );
  }

  // =========================================
  // EVENTOS
  // =========================================

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

  // =========================================
  // LIMPEZA
  // =========================================

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
