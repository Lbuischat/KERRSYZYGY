import { Component } from '@angular/core';
import { Hud } from '../hud/hud';
import { GameWorld } from '../game-world/game-world';

@Component({
  imports: [Hud, GameWorld],
  selector: 'app-game-shell',
  styleUrl: './game-shell.css',
  templateUrl: './game-shell.html',
})
export class GameShell {}
