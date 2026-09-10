import { Component, EventEmitter, Input, Output, computed, inject } from '@angular/core';

import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-score-board',
  imports: [],
  templateUrl: './score-board.html',
  styleUrl: './score-board.css',
})
export class ScoreBoard {

  private readonly languageService = inject(LanguageService);

  readonly text = computed(() => this.languageService.t().game.scoreBoard);

  @Input() wave = 1;
  @Input() maxWave = 6;
  @Input() kills = 0;
  @Input() seconds = 0;
  @Input() score = 0;
  @Input() victory = false;

  @Output() playAgain = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();

  get subtitle(): string {
    return this.victory
      ? this.text().victorySubtitle.replace('{waves}', String(this.maxWave))
      : this.text().defeatSubtitle;
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.seconds / 60);
    const remainingSeconds = this.seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
