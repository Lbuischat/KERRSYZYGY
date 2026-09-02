import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {

  private readonly storageKey = 'kerrsyzygy-settings';


  // =========================
  // Gameplay
  // =========================

  showDamageNumbers = true;
  showTutorials = true;
  hints = true;
  enemyHealthBars = true;
  autoEquip = false;
  autoSave = true;
  difficulty = 1;


  // =========================
  // Audio
  // =========================

  masterVolume = 100;
  musicVolume = 100;
  sfxVolume = 100;
  environmentVolume = 100;
  monstersVolume = 100;
  natureVolume = 100;

  subtitles = false;
  muteAll = false;


  // =========================
  // Accessibility
  // =========================

  reduceFlashes = false;
  screenShake = true;
  motionBlur = true;
  colorBlindMode = false;
  uiScale = 1;
  autoPickup = true;
  reducedKeybinds = false;
  clickToWalk = false;


  constructor() {
    this.loadSettings();
  }


  // =========================================================
  // GAMEPLAY
  // =========================================================

  toggleDamageNumbers(): void {
    this.showDamageNumbers = !this.showDamageNumbers;
    this.saveSettings();
  }

  toggleTutorials(): void {
    this.showTutorials = !this.showTutorials;
    this.saveSettings();
  }

  toggleHints(): void {
    this.hints = !this.hints;
    this.saveSettings();
  }

  toggleEnemyHealthBars(): void {
    this.enemyHealthBars = !this.enemyHealthBars;
    this.saveSettings();
  }

  toggleAutoEquip(): void {
    this.autoEquip = !this.autoEquip;
    this.saveSettings();
  }

  toggleAutoSave(): void {
    this.autoSave = !this.autoSave;
    this.saveSettings();
  }

  setDifficulty(value: number): void {
    this.difficulty = Math.max(1, Math.min(10, value));
    this.saveSettings();
  }


  // =========================================================
  // AUDIO
  // =========================================================

  setMasterVolume(value: number): void {
    this.masterVolume = this.clampVolume(value);
    this.saveSettings();
  }

  setMusicVolume(value: number): void {
    this.musicVolume = this.clampVolume(value);
    this.saveSettings();
  }

  setSfxVolume(value: number): void {
    this.sfxVolume = this.clampVolume(value);
    this.saveSettings();
  }

  setEnvironmentVolume(value: number): void {
    this.environmentVolume = this.clampVolume(value);
    this.saveSettings();
  }

  setMonstersVolume(value: number): void {
    this.monstersVolume = this.clampVolume(value);
    this.saveSettings();
  }

  setNatureVolume(value: number): void {
    this.natureVolume = this.clampVolume(value);
    this.saveSettings();
  }

  toggleSubtitles(): void {
    this.subtitles = !this.subtitles;
    this.saveSettings();
  }

  toggleMuteAll(): void {
    this.muteAll = !this.muteAll;
    this.saveSettings();
  }


  // =========================================================
  // ACCESSIBILITY
  // =========================================================

  toggleReduceFlashes(): void {
    this.reduceFlashes = !this.reduceFlashes;
    this.saveSettings();
  }

  toggleScreenShake(): void {
    this.screenShake = !this.screenShake;
    this.saveSettings();
  }

  toggleMotionBlur(): void {
    this.motionBlur = !this.motionBlur;
    this.saveSettings();
  }

  toggleColorBlindMode(): void {
    this.colorBlindMode = !this.colorBlindMode;
    this.saveSettings();
  }

  setUiScale(value: number): void {
    this.uiScale = Math.max(0, Math.min(2, value));
    this.saveSettings();
  }

  toggleAutoPickup(): void {
    this.autoPickup = !this.autoPickup;
    this.saveSettings();
  }

  toggleReducedKeybinds(): void {
    this.reducedKeybinds = !this.reducedKeybinds;
    this.saveSettings();
  }

  toggleClickToWalk(): void {
    this.clickToWalk = !this.clickToWalk;
    this.saveSettings();
  }


  // =========================================================
  // LOCAL STORAGE
  // =========================================================

  private saveSettings(): void {

    // Make sure we're actually running in a browser.
    if (typeof localStorage === 'undefined') {
      return;
    }

    const settings = {
      showDamageNumbers: this.showDamageNumbers,
      showTutorials: this.showTutorials,
      hints: this.hints,
      enemyHealthBars: this.enemyHealthBars,
      autoEquip: this.autoEquip,
      autoSave: this.autoSave,
      difficulty: this.difficulty,

      masterVolume: this.masterVolume,
      musicVolume: this.musicVolume,
      sfxVolume: this.sfxVolume,
      environmentVolume: this.environmentVolume,
      monstersVolume: this.monstersVolume,
      natureVolume: this.natureVolume,
      subtitles: this.subtitles,
      muteAll: this.muteAll,

      reduceFlashes: this.reduceFlashes,
      screenShake: this.screenShake,
      motionBlur: this.motionBlur,
      colorBlindMode: this.colorBlindMode,
      uiScale: this.uiScale,
      autoPickup: this.autoPickup,
      reducedKeybinds: this.reducedKeybinds,
      clickToWalk: this.clickToWalk,
    };

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(settings)
    );
  }


  private loadSettings(): void {

    // Make sure we're actually running in a browser.
    if (typeof localStorage === 'undefined') {
      return;
    }

    const saved = localStorage.getItem(this.storageKey);

    // Nothing has been saved yet.
    if (!saved) {
      return;
    }

    try {

      const settings = JSON.parse(saved);

      if (typeof settings.showDamageNumbers === 'boolean') {
        this.showDamageNumbers = settings.showDamageNumbers;
      }

      if (typeof settings.showTutorials === 'boolean') {
        this.showTutorials = settings.showTutorials;
      }

      if (typeof settings.hints === 'boolean') {
        this.hints = settings.hints;
      }

      if (typeof settings.enemyHealthBars === 'boolean') {
        this.enemyHealthBars = settings.enemyHealthBars;
      }

      if (typeof settings.autoEquip === 'boolean') {
        this.autoEquip = settings.autoEquip;
      }

      if (typeof settings.autoSave === 'boolean') {
        this.autoSave = settings.autoSave;
      }

      if (typeof settings.difficulty === 'number') {
        this.difficulty = Math.max(
          1,
          Math.min(10, settings.difficulty)
        );
      }


      // AUDIO

      if (typeof settings.masterVolume === 'number') {
        this.masterVolume = this.clampVolume(settings.masterVolume);
      }

      if (typeof settings.musicVolume === 'number') {
        this.musicVolume = this.clampVolume(settings.musicVolume);
      }

      if (typeof settings.sfxVolume === 'number') {
        this.sfxVolume = this.clampVolume(settings.sfxVolume);
      }

      if (typeof settings.environmentVolume === 'number') {
        this.environmentVolume =
          this.clampVolume(settings.environmentVolume);
      }

      if (typeof settings.monstersVolume === 'number') {
        this.monstersVolume =
          this.clampVolume(settings.monstersVolume);
      }

      if (typeof settings.natureVolume === 'number') {
        this.natureVolume =
          this.clampVolume(settings.natureVolume);
      }

      if (typeof settings.subtitles === 'boolean') {
        this.subtitles = settings.subtitles;
      }

      if (typeof settings.muteAll === 'boolean') {
        this.muteAll = settings.muteAll;
      }


      // ACCESSIBILITY

      if (typeof settings.reduceFlashes === 'boolean') {
        this.reduceFlashes = settings.reduceFlashes;
      }

      if (typeof settings.screenShake === 'boolean') {
        this.screenShake = settings.screenShake;
      }

      if (typeof settings.motionBlur === 'boolean') {
        this.motionBlur = settings.motionBlur;
      }

      if (typeof settings.colorBlindMode === 'boolean') {
        this.colorBlindMode = settings.colorBlindMode;
      }

      if (typeof settings.uiScale === 'number') {
        this.uiScale = Math.max(
          0,
          Math.min(2, settings.uiScale)
        );
      }

      if (typeof settings.autoPickup === 'boolean') {
        this.autoPickup = settings.autoPickup;
      }

      if (typeof settings.reducedKeybinds === 'boolean') {
        this.reducedKeybinds = settings.reducedKeybinds;
      }

      if (typeof settings.clickToWalk === 'boolean') {
        this.clickToWalk = settings.clickToWalk;
      }

    } catch (error) {

      console.warn(
        'Could not load KERRSYZYGY settings.',
        error
      );

    }
  }


  // =========================================================
  // HELPERS
  // =========================================================

  private clampVolume(value: number): number {
    return Math.max(0, Math.min(100, value));
  }

}