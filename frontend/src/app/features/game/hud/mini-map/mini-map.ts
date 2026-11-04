
import {
  ChangeDetectionStrategy,
  Component,
  Input,
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

  // ========================================
  // TAMANHO DO MUNDO
  // ========================================

  @Input() worldWidth = 2560;
  @Input() worldHeight = 2560;

  // ========================================
  // JOGADOR
  // ========================================

  @Input()
  playerPosition: MiniMapEntity = {
    x: 1255,
    y: 1255
  };

  @Input()
  direcaoJogador = 0;

  // Compatibilidade com o HUD existente.
  @Input()
  enemies: MiniMapEntity[] = [];

  // ========================================
  // POSIÇÕES ATUALIZADAS DOS INIMIGOS
  // ========================================

  readonly radarEnemies = toSignal(
    this.gameStateService.enemyPositions$,
    {
      initialValue: [] as MiniMapEntity[]
    }
  );

  // ========================================
  // POSIÇÃO DO JOGADOR
  // ========================================

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

  // ========================================
  // POSIÇÃO DOS INIMIGOS
  // ========================================

  getEnemyX(enemy: MiniMapEntity): number {
    return this.worldToPercentage(
      enemy.x,
      this.worldWidth
    );
  }

  getEnemyY(enemy: MiniMapEntity): number {
    return this.worldToPercentage(
      enemy.y,
      this.worldHeight
    );
  }

  // ========================================
  // CONVERTER POSIÇÃO PARA %
  // ========================================

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
      Math.min(100, percentage)
    );
  }
}
