import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

export interface MiniMapEntity {
  x: number;
  y: number;
}

@Component({
  selector: 'app-mini-map',
  standalone: true,
  templateUrl: './mini-map.html',
  styleUrl: './mini-map.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MiniMap {

  // =========================================================
  // WORLD
  // =========================================================

  @Input() worldWidth = 20 * 128;
  @Input() worldHeight = 20 * 128;


  // =========================================================
  // PLAYER
  // =========================================================

  @Input()
  playerPosition: MiniMapEntity = {
    x: 300,
    y: 300
  };


  // =========================================================
  // PLAYER DIRECTION
  // =========================================================

  @Input()
  direcaoJogador = 0;


  // =========================================================
  // ENEMIES
  // =========================================================

  @Input()
  enemies: MiniMapEntity[] = [];


  // =========================================================
  // PLAYER POSITION
  // =========================================================

  getPlayerX(): number {

    return this.worldToPercentage(
      this.playerPosition.x,
      this.worldWidth
    );

  }


  getPlayerY(): number {

    return this.worldToPercentage(
      this.playerPosition.y,
      this.worldHeight
    );

  }


  // =========================================================
  // ENEMY POSITION
  // =========================================================

  getEnemyX(
    enemy: MiniMapEntity
  ): number {

    return this.worldToPercentage(
      enemy.x,
      this.worldWidth
    );

  }


  getEnemyY(
    enemy: MiniMapEntity
  ): number {

    return this.worldToPercentage(
      enemy.y,
      this.worldHeight
    );

  }


  // =========================================================
  // WORLD → MINI MAP
  // =========================================================

  private worldToPercentage(
    position: number,
    worldSize: number
  ): number {

    if (worldSize <= 0) {
      return 0;
    }

    const percentage =
      (position / worldSize) * 100;

    return Math.max(
      0,
      Math.min(
        100,
        percentage
      )
    );

  }

}