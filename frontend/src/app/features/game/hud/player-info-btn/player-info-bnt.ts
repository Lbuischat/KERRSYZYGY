import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../../../services/player.service';

interface WorldPoint {
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-player-info-bnt',
  imports: [CommonModule],
  templateUrl: './player-info-bnt.html',
  styleUrl: './player-info-bnt.css'
})
export class PlayerInfoBnt {

  constructor(
    public playerService: PlayerService,
    private router: Router
  ) {}

  openProfile(): void {
    this.router.navigate(['/player-info']);
  }

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

    if (count === 0) {
      return [];
    }

    const points: WorldPoint[] = [];

    /*
     * Everything is centered around 50,50.
     */
    const centerX = 50;
    const centerY = 50;

    /*
     * Keep the points outside the central star.
     */
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
}