import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bush',
  imports: [],
  templateUrl: './bush.html',
  styleUrl: './bush.css',
})
export class Bush {
  @Input() x = 0;
  @Input() y = 0;

  isHarvested = false;

  getPosition(): { x: number; y: number } {
    return {
      x: this.x,
      y: this.y,
    };
  }

  harvest(): void {
    if (this.isHarvested) {
      return;
    }

    const berries = Math.floor(Math.random() * 4) + 1;

    console.log(`🫐 YOU GOT ${berries} BERRIES!`);

    this.isHarvested = true;

    console.log('🌳 isHarvested:', this.isHarvested);
  }
}
