import { Injectable } from '@angular/core';
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


  setPlayerPosition(position: GamePosition): void {
    this.playerPositionSubject.next(position);
  }


  setEnemyPositions(positions: GamePosition[]): void {
    this.enemyPositionsSubject.next(positions);
  }

}