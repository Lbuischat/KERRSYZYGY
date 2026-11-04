
import { CommonModule } from '@angular/common';

import {
  Component,
  OnDestroy,
  effect,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import {
  PlayerService
} from '../../../../services/player.service';

import {
  FocusSessionService
} from '../../../../services/tasks/focus-session';

interface WorldPoint {
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-player-info-bnt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-info-bnt.html',
  styleUrl: './player-info-bnt.css'
})
export class PlayerInfoBnt implements OnDestroy {

  // =========================================
  // FEEDBACK REATIVO
  // =========================================

  readonly rewarding = signal(false);

  readonly levelUpVisible = signal(false);

  readonly levelUpValue = signal(0);

  private rewardTimer?: ReturnType<typeof setTimeout>;

  private levelUpTimer?: ReturnType<typeof setTimeout>;

  constructor(
    public playerService: PlayerService,
    private focusService: FocusSessionService,
    private router: Router
  ) {

    // =====================================
    // FEEDBACK DE RECOMPENSA
    // =====================================

    effect(() => {
      const pulse = this.playerService.rewardPulse();

      if (pulse === 0) return;

      if (this.rewardTimer) {
        clearTimeout(this.rewardTimer);
      }

      this.rewarding.set(true);

      this.rewardTimer = setTimeout(() => {
        this.rewarding.set(false);
      }, 1200);
    });

    // =====================================
    // FEEDBACK DE NÍVEL
    // =====================================

    effect(() => {
      const newLevel = this.playerService.lastLevelUp();

      if (newLevel === null) return;

      if (this.levelUpTimer) {
        clearTimeout(this.levelUpTimer);
      }

      this.levelUpValue.set(newLevel);
      this.levelUpVisible.set(true);

      // Mostra o feedback por 2 segundos.
      this.levelUpTimer = setTimeout(() => {
        this.levelUpVisible.set(false);

        this.playerService.clearLevelUp();
      }, 2000);
    });
  }

  // =========================================
  // OPEN PROFILE
  // =========================================

  openProfile(): void {
    // Bloqueia navegação durante o Focus.
    if (this.focusService.active) return;

    void this.router.navigate(['/playerinfo']);
  }

  // =========================================
  // XP TOTAL ACUMULADO
  // =========================================

  get totalXp(): number {
    const level = this.playerService.level();

    const currentXp = this.playerService.xp();

    // Soma o XP de todos os níveis anteriores.
    const previousLevelsXp =
      50 * level +
      (5 * level * (level - 1)) / 2;

    return previousLevelsXp + currentXp;
  }

  // =========================================
  // META TOTAL DO PRÓXIMO NÍVEL
  // =========================================

  get xpForNextLevel(): number {
    const nextLevel = this.playerService.level() + 1;

    return (
      50 * nextLevel +
      (5 * nextLevel * (nextLevel - 1)) / 2
    );
  }

  // =========================================
  // XP NO NÍVEL ATUAL
  // =========================================

  get currentLevelXp(): number {
    return this.playerService.xp();
  }

  get currentLevelRequired(): number {
    return this.playerService.xpRequired();
  }

  get xpRemaining(): number {
    return Math.max(
      0,
      this.currentLevelRequired - this.currentLevelXp
    );
  }

  // =========================================
  // CRÉDITOS E XP DA LOJA
  // =========================================

  get currentCredits(): number {
    return this.playerService.credits();
  }

  get currentShopXp(): number {
    return this.playerService.shopXp();
  }

  // =========================================
  // WORLD LEVEL
  // =========================================

  get worldLevel(): number {
    return this.playerService.p().worldLevel || 1;
  }

  get worldTier(): number {
    return Math.floor(this.worldLevel / 10);
  }

  get worldProgress(): number {
    return this.worldLevel % 10;
  }

  // =========================================
  // WORLD POINTS
  // =========================================

  get worldPoints(): WorldPoint[] {
    const count = this.worldProgress;

    if (count === 0) {
      return [];
    }

    const points: WorldPoint[] = [];

    const centerX = 50;
    const centerY = 50;

    const radius = this.worldTier === 0 ? 35 : 39;

    for (let i = 0; i < count; i++) {
      const angle =
        (-90 + (360 / count) * i) *
        Math.PI / 180;

      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: this.worldTier === 0 ? 3 : 2.5
      });
    }

    return points;
  }

  // =========================================
  // CLEANUP
  // =========================================

  ngOnDestroy(): void {
    if (this.rewardTimer) {
      clearTimeout(this.rewardTimer);
    }

    if (this.levelUpTimer) {
      clearTimeout(this.levelUpTimer);
    }
  }
}
