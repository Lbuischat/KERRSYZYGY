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

import {
  InventoryButton
} from './inventory-button/inventory-button';

import {
  SettingsButton
} from './settings-button/settings-button';

import { Quickbar } from './quickbar/quickbar';

import {
  GameStateService,
  type PlayerVitals
} from '../../../services/game-state/game-state.service';

interface OriginalPanelStyle {
  opacity: string;
  pointerEvents: string;
  transition: string;
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
export class Hud implements OnInit, AfterViewInit, OnDestroy {

  // ==========================================
  // SERVIÇOS
  // ==========================================

  private readonly gameStateService =
    inject(GameStateService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly zone =
    inject(NgZone);

  private readonly platformId =
    inject(PLATFORM_ID);

  private readonly subscriptions =
    new Subscription();

  // ==========================================
  // REFERÊNCIA DO HUD
  // ==========================================

  @ViewChild('hudRoot')
  private hudRoot?: ElementRef<HTMLElement>;

  // ==========================================
  // TRANSPARÊNCIA DINÂMICA
  // ==========================================

  private animationId: number | null = null;

  private lastCheck = 0;

  private readonly CHECK_INTERVAL = 80;

  private readonly OVERLAP_MARGIN = 12;

  private readonly FADED_OPACITY = '0.12';

  private readonly originalStyles =
    new Map<HTMLElement, OriginalPanelStyle>();

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
    return this.calculatePercentage(
      this.vitals.health,
      this.vitals.maxHealth
    );
  }

  get staminaPercent(): number {
    return this.calculatePercentage(
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

  private calculatePercentage(
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
  // PAINEL DE MISSÕES
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
  // INICIALIZAÇÃO
  // ==========================================

  ngOnInit(): void {

    // VIDA E STAMINA SINCRONIZADAS

    this.subscriptions.add(
      this.gameStateService.playerVitals$
        .subscribe(vitals => {

          this.vitals = vitals;

          this.cdr.detectChanges();
        })
    );

    // POSIÇÃO DO PERSONAGEM

    this.subscriptions.add(
      this.gameStateService.playerPosition$
        .subscribe(position => {

          this.playerPosition = position;

          this.cdr.detectChanges();
        })
    );

    // POSIÇÕES DOS INIMIGOS

    this.subscriptions.add(
      this.gameStateService.enemyPositions$
        .subscribe(positions => {

          this.enemies = positions;

          this.cdr.detectChanges();
        })
    );
  }

  // ==========================================
  // INICIAR TRANSPARÊNCIA AUTOMÁTICA
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

          this.updateHudTransparency();
        }

        this.animationId =
          requestAnimationFrame(tick);
      };

      this.animationId =
        requestAnimationFrame(tick);
    });
  }

  // ==========================================
  // DETECTAR O PERSONAGEM
  // ==========================================

  private updateHudTransparency(): void {

    const root = this.hudRoot?.nativeElement;

    if (!root) {
      return;
    }

    const doc = root.ownerDocument;

    // Personagem do jogo.
    // Usa a posição real na tela,
    // considerando a movimentação da câmera.

    const player =
      doc.querySelector<HTMLElement>(
        '#player-character'
      );

    const playerRect =
      player?.getBoundingClientRect();

    // Seleciona somente os elementos que
    // podem ficar transparentes.
    //
    // Vida e stamina NÃO entram na lista.

    const panels =
      root.querySelectorAll<HTMLElement>(
        '[data-hud-occlusion], .quickbar-root'
      );

    const activePanels = new Set<HTMLElement>();

    panels.forEach(panel => {

      activePanels.add(panel);

      // Guarda o estilo original uma vez.

      if (!this.originalStyles.has(panel)) {

        this.originalStyles.set(panel, {
          opacity: panel.style.opacity,
          pointerEvents: panel.style.pointerEvents,
          transition: panel.style.transition
        });

        const reducedMotion =
          window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;

        if (!reducedMotion) {

          const previousTransition =
            panel.style.transition;

          panel.style.transition =
            previousTransition
              ? `${previousTransition}, opacity 180ms ease`
              : 'opacity 180ms ease';
        }
      }

      const original =
        this.originalStyles.get(panel);

      if (!original) {
        return;
      }

      // Se o personagem não estiver
      // disponível, restaura o painel.

      if (
        !playerRect ||
        playerRect.width <= 0 ||
        playerRect.height <= 0
      ) {

        this.restorePanel(panel, original);

        return;
      }

      const panelRect =
        panel.getBoundingClientRect();

      if (
        panelRect.width <= 0 ||
        panelRect.height <= 0
      ) {

        this.restorePanel(panel, original);

        return;
      }

      // ======================================
      // VERIFICAR SOBREPOSIÇÃO
      // ======================================

      const margin =
        this.OVERLAP_MARGIN;

      const overlapping = (
        playerRect.right + margin >
          panelRect.left &&

        playerRect.left - margin <
          panelRect.right &&

        playerRect.bottom + margin >
          panelRect.top &&

        playerRect.top - margin <
          panelRect.bottom
      );

      // ======================================
      // APLICAR TRANSPARÊNCIA
      // ======================================

      if (overlapping) {

        panel.style.opacity =
          this.FADED_OPACITY;

        // Evita que o painel invisível
        // bloqueie o clique no jogo.

        panel.style.pointerEvents = 'none';

      } else {

        this.restorePanel(panel, original);
      }
    });

    // ========================================
    // LIMPAR PAINÉIS REMOVIDOS DO DOM
    // ========================================

    for (
      const [panel, original]
      of this.originalStyles
    ) {

      if (!activePanels.has(panel)) {

        this.restorePanel(panel, original);

        panel.style.transition =
          original.transition;

        this.originalStyles.delete(panel);
      }
    }
  }

  // ==========================================
  // RESTAURAR PAINEL
  // ==========================================

  private restorePanel(
    panel: HTMLElement,
    original: OriginalPanelStyle
  ): void {

    panel.style.opacity =
      original.opacity;

    panel.style.pointerEvents =
      original.pointerEvents;
  }

  // ==========================================
  // DESTRUIR COMPONENTE
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

    // Restaurar tudo ao sair do jogo.

    for (
      const [panel, original]
      of this.originalStyles
    ) {

      this.restorePanel(panel, original);

      panel.style.transition =
        original.transition;
    }

    this.originalStyles.clear();
  }
}