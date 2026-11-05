import {
  Component,
  Input,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';

import {
  toSignal
} from '@angular/core/rxjs-interop';

import {
  GameStateService
} from '../../../../services/game-state/game-state.service';

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

  private readonly gameStateService =
    inject(GameStateService);


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
    x: 1255,
    y: 1255
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
  // LIVE ENEMY POSITIONS
  // =========================================================

  readonly radarEnemies = toSignal(
    this.gameStateService.enemyPositions$,
    {
      initialValue: [] as MiniMapEntity[]
    }
  );


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