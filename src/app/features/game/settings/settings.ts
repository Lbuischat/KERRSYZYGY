import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {

  activeTab = 'gpt';

  @Output() closeSettings = new EventEmitter<void>();

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  getBackToGame(): void {
    console.log('⚙️ GET BACK TO GAME CLICKED');
    this.closeSettings.emit();
  }

  showDamageNumbers = true;
  showTutorials = true;
  hints = true;
  enemyHealthBars = true;
  autoEquip = true;
  autoSave = true;

  toggleDamageNumbers(): void {
    this.showDamageNumbers = !this.showDamageNumbers;
  }
  toggleTutorials(): void {
    this.showTutorials = !this.showTutorials;
  }

  toggleHints(): void {
    this.hints = !this.hints;
  }

  toggleEnemyHealthBars(): void {
    this.enemyHealthBars = !this.enemyHealthBars;
  }

  toggleAutoEquip(): void {
    this.autoEquip = !this.autoEquip;
  }

  toggleAutoSave(): void {
    this.autoSave = !this.autoSave;
  }

}