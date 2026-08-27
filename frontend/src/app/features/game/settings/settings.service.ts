import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {

  // =========================
  // Gameplay
  // =========================

  showDamageNumbers = true;
  showTutorials = true;
  hints = true;
  enemyHealthBars = true;
  autoEquip = true;
  autoSave = true;

  difficulty = 0;


  // =========================
  // Audio
  // =========================

  masterVolume = 100;
  musicVolume = 100;
  sfxVolume = 100;
  environmentVolume = 100;
  monstersVolume = 100;
  natureVolume = 100;


  // =========================
  // Accessibility
  // =========================

  reduceFlashes = true;
  screenShake = true;
  motionBlur = true;
  colorBlindMode = true;

  uiScale = 1;

  autoPickup = true;
  reducedKeybinds = true;
  clickToWalk = true;


  // =========================
  // Gameplay toggles
  // =========================

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


  // =========================
  // Accessibility toggles
  // =========================

  toggleReduceFlashes(): void {
    this.reduceFlashes = !this.reduceFlashes;
  }

  toggleScreenShake(): void {
    this.screenShake = !this.screenShake;
  }

  toggleMotionBlur(): void {
    this.motionBlur = !this.motionBlur;
  }

  toggleColorBlindMode(): void {
    this.colorBlindMode = !this.colorBlindMode;
  }

  toggleAutoPickup(): void {
    this.autoPickup = !this.autoPickup;
  }

  toggleReducedKeybinds(): void {
    this.reducedKeybinds = !this.reducedKeybinds;
  }

  toggleClickToWalk(): void {
    this.clickToWalk = !this.clickToWalk;
  }
}