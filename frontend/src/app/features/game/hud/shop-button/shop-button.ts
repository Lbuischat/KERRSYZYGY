
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-shop-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shop-button.html',
  styleUrl: './shop-button.css'
})
export class ShopButton {
  // Saldo real do jogador, atualizado pelas missões.
  readonly playerService = inject(PlayerService);
}
