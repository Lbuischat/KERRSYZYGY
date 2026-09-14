import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GamePosition {
  x: number;
  y: number;
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


  /** Freezes the game loops while a panel such as the inventory is open. */
  readonly paused = signal(false);


  setPaused(paused: boolean): void {
    this.paused.set(paused);
  }


  setPlayerPosition(position: GamePosition): void {
    this.playerPositionSubject.next(position);
  }


  setEnemyPositions(positions: GamePosition[]): void {
    this.enemyPositionsSubject.next(positions);
  }

}