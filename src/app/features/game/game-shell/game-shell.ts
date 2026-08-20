import { Component } from '@angular/core';
import { Hud } from '../hud/hud';

@Component({
  imports: [Hud],
  selector: 'app-game-shell',
  styleUrl: './game-shell.css',
  templateUrl: './game-shell.html',
})
export class GameShell {}
