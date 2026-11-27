
import { isPlatformBrowser } from '@angular/common';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
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
import { Quickbar } from './quickbar/quickbar';

import {
  GameStateService,
  type PlayerVitals
} from '../../../services/game-state/game-state.service';

interface PanelStyle {
  opacity: string;
  transition: string;
  pointerEvents: string;
}

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
    SettingsButton,
    Quickbar
  ],
  templateUrl: './hud.html',
  styleUrl: './hud.css'
})
export class Hud implements
  OnInit,
  AfterViewInit,
  OnDestroy {

  // ==========================================
  // SERVIÇOS
  // ==========================================

  private readonly gameState = inject(GameStateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly subscriptions = new Subscription();

  @ViewChild('hudRoot')
  private hudRoot?: ElementRef<HTMLElement>;

  // ==========================================
  // TRANSPARÊNCIA DO HUD
  // ==========================================

  private animationId: number | null = null;
  private lastCheck = 0;

  private readonly CHECK_INTERVAL = 80;
  private readonly OVERLAP_MARGIN = 12;
  private readonly FADED_OPACITY = '0.15';

  private readonly originalStyles =
    new Map<HTMLElement, PanelStyle>();

  // ==========================================
  // VIDA E STAMINA
  // ==========================================

  vitals: PlayerVitals = {
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    showHealth: false,
    showStamina: false
  };

  get currentHealth(): number {
    return Math.ceil(this.vitals.health);
  }

  get maxHealth(): number {
    return this.vitals.maxHealth;
  }

  get currentStamina(): number {
    return Math.ceil(this.vitals.stamina);
  }

  get maxStamina(): number {
    return this.vitals.maxStamina;
  }

  get healthPercent(): number {
    return this.percentage(
      this.vitals.health,
      this.vitals.maxHealth
    );
  }

  get staminaPercent(): number {
    return this.percentage(
      this.vitals.stamina,
      this.vitals.maxStamina
    );
  }

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
      this.vitals.health > 0 &&
      this.healthPercent <= 25
    );
  }

  private percentage(
    value: number,
    maximum: number
  ): number {
    if (maximum <= 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.max(0, (value / maximum) * 100)
    );
  }

  // ==========================================
  // MISSÕES
  // ==========================================

  questsCollapsed = false;

  toggleQuests(): void {
    this.questsCollapsed = !this.questsCollapsed;
  }

  // ==========================================
  // MINIMAPA
  // ==========================================

  worldWidth = 20 * 128;
  worldHeight = 20 * 128;

  playerPosition: MiniMapEntity = {
    x: 1255,
    y: 1255
  };

  enemies: MiniMapEntity[] = [];

  // ==========================================
  // EVENTOS
  // ==========================================

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

  // ==========================================
  // INICIALIZAR SERVIÇOS
  // ==========================================

  ngOnInit(): void {

    this.subscriptions.add(
      this.gameState.playerVitals$.subscribe(vitals => {
        this.vitals = vitals;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this.gameState.playerPosition$.subscribe(position => {
        this.playerPosition = position;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this.gameState.enemyPositions$.subscribe(positions => {
        this.enemies = positions;
        this.cdr.detectChanges();
      })
    );
  }

  // ==========================================
  // INICIAR DETECÇÃO DE SOBREPOSIÇÃO
  // ==========================================

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      const tick = (time: number): void => {

        if (
          time - this.lastCheck >=
          this.CHECK_INTERVAL
        ) {
          this.lastCheck = time;
          this.updateTransparency();
        }

        this.animationId = requestAnimationFrame(tick);
      };

      this.animationId = requestAnimationFrame(tick);
    });
  }

  // ==========================================
  // ATUALIZAR TRANSPARÊNCIA
  // ==========================================

  private updateTransparency(): void {
    const root = this.hudRoot?.nativeElement;

    if (!root) {
      return;
    }

    const doc = root.ownerDocument;

    // Usa o sprite real do personagem.
    // getBoundingClientRect considera a câmera.
    const player = doc.querySelector<HTMLElement>(
      '#player-character'
    );

    const playerRect = player?.getBoundingClientRect();

    // Inclui todos os painéis identificados,
    // vida, stamina e a hotbar existente.
    const panels = root.querySelectorAll<HTMLElement>(
      '[data-hud-occlusion], .quickbar-root'
    );

    const activePanels = new Set<HTMLElement>();

    for (const panel of panels) {
      activePanels.add(panel);

      if (!this.originalStyles.has(panel)) {
        const original: PanelStyle = {
          opacity: panel.style.opacity,
          transition: panel.style.transition,
          pointerEvents: panel.style.pointerEvents
        };

        this.originalStyles.set(panel, original);

        const reducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        if (!reducedMotion) {
          panel.style.transition = original.transition
            ? `${original.transition}, opacity 180ms ease`
            : 'opacity 180ms ease';
        }
      }

      const original = this.originalStyles.get(panel)!;

      if (
        !playerRect ||
        playerRect.width <= 0 ||
        playerRect.height <= 0
      ) {
        this.restorePanel(panel, original);
        continue;
      }

      const panelRect = panel.getBoundingClientRect();

      if (
        panelRect.width <= 0 ||
        panelRect.height <= 0
      ) {
        this.restorePanel(panel, original);
        continue;
      }

      const margin = this.OVERLAP_MARGIN;

      const overlapping =
        playerRect.right + margin > panelRect.left &&
        playerRect.left - margin < panelRect.right &&
        playerRect.bottom + margin > panelRect.top &&
        playerRect.top - margin < panelRect.bottom;

      if (overlapping) {
        panel.style.opacity = this.FADED_OPACITY;
      } else {
        this.restorePanel(panel, original);
      }
    }

    // Restaura painéis removidos ou desmontados.
    for (const [panel, original] of this.originalStyles) {
      if (!activePanels.has(panel)) {
        this.restorePanel(panel, original);
        panel.style.transition = original.transition;
        this.originalStyles.delete(panel);
      }
    }
  }

  private restorePanel(
    panel: HTMLElement,
    original: PanelStyle
  ): void {
    panel.style.opacity = original.opacity;
    panel.style.pointerEvents = original.pointerEvents;
  }

  // ==========================================
  // LIMPEZA
  // ==========================================

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

    if (
      isPlatformBrowser(this.platformId) &&
      this.animationId !== null
    ) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    for (const [panel, original] of this.originalStyles) {
      this.restorePanel(panel, original);
      panel.style.transition = original.transition;
    }

    this.originalStyles.clear();
  }
}
