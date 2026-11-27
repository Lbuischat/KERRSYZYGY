import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GamePosition {
  x: number;
  y: number;
}

export interface PlayerVitals {
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  showHealth: boolean;
  showStamina: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameStateService {

  private playerPositionSubject =
    new BehaviorSubject<GamePosition>({
      x: 300,
      y: 300,
    });

  private enemyPositionsSubject =
    new BehaviorSubject<GamePosition[]>([]);

  playerPosition$ =
    this.playerPositionSubject.asObservable();

  enemyPositions$ =
    this.enemyPositionsSubject.asObservable();


  private readonly playerVitalsSubject =
    new BehaviorSubject<PlayerVitals>({
      health: 100,
      maxHealth: 100,
      stamina: 100,
      maxStamina: 100,
      showHealth: false,
      showStamina: false
    });

  readonly playerVitals$ =
    this.playerVitalsSubject.asObservable();

  setPlayerVitals(vitals: PlayerVitals): void {
    this.playerVitalsSubject.next({ ...vitals });
  }

  setPlayerPosition(position: GamePosition): void {
    this.playerPositionSubject.next(position);
  }


  setEnemyPositions(positions: GamePosition[]): void {
    this.enemyPositionsSubject.next(positions);
  }

}