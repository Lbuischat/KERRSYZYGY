
import { CommonModule } from '@angular/common';

import {
  Component,
  OnDestroy,
  effect,
  inject,
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
  private readonly router = inject(Router);

  private readonly focusService = inject(FocusSessionService);

  readonly playerService = inject(PlayerService);

  // =========================================
  // VISUAL STATE
  // =========================================

  readonly rewarding = signal(false);

  readonly levelUpVisible = signal(false);

  readonly levelUpValue = signal(0);

  private rewardTimer?: ReturnType<typeof setTimeout>;

  private levelTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // =========================================
    // REWARD FEEDBACK
    // =========================================

    effect(() => {
      const pulse = this.playerService.rewardPulse();

      if (pulse <= 0) return;

      this.rewarding.set(true);

      if (this.rewardTimer) {
        clearTimeout(this.rewardTimer);
      }

      this.rewardTimer = setTimeout(() => {
        this.rewarding.set(false);
      }, 900);
    });

    // =========================================
    // LEVEL UP - 2 SECONDS
    // =========================================

    effect(() => {
      const level = this.playerService.lastLevelUp();

      if (level === null) return;

      this.levelUpValue.set(level);
      this.levelUpVisible.set(true);

      if (this.levelTimer) {
        clearTimeout(this.levelTimer);
      }

      this.levelTimer = setTimeout(() => {
        this.levelUpVisible.set(false);

        this.playerService.clearLevelUp();
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    if (this.rewardTimer) {
      clearTimeout(this.rewardTimer);
    }

    if (this.levelTimer) {
      clearTimeout(this.levelTimer);
    }
  }

  // =========================================
  // PROFILE
  // =========================================

  openProfile(): void {
    if (this.focusService.active) return;

    void this.router.navigate(['/playerinfo']);
  }

  // =========================================
  // WORLD LEVEL
  // =========================================

  get worldLevel(): number {
    return this.playerService.profile.worldLevel || 1;
  }

  get worldTier(): number {
    return Math.floor(this.worldLevel / 10);
  }

  get worldProgress(): number {
    return this.worldLevel % 10;
  }

  get worldPoints(): WorldPoint[] {
    const count = this.worldProgress;

    if (count === 0) return [];

    const points: WorldPoint[] = [];
    const centerX = 50;
    const centerY = 50;

    const radius = this.worldTier === 0 ? 35 : 39;

    for (let index = 0; index < count; index++) {
      const angle =
        (-90 + (360 / count) * index) * Math.PI / 180;

      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: this.worldTier === 0 ? 3 : 2.5
      });
    }

    return points;
  }
}
