import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from '../../../services/language/language.service';
import { Language } from '../../../services/language/language.types';
import { SettingRowKey } from '../../../services/language/translation.types';
import { GameSettingsService } from './settings.service';

type SettingsSection = 'gameplay' | 'sound' | 'accessibility' | 'language';

type SettingsGroup = Exclude<SettingsSection, 'language'>;

/**
 * One row of the settings screen. Toggles use isOn/toggle and sliders use
 * min/max/value/set; every row carries both, so the template never has to
 * narrow a union type.
 */
interface SettingRow {
  key: SettingRowKey;
  control: 'star' | 'binary' | 'slider';
  isOn: () => boolean;
  toggle: () => void;
  min: number;
  max: number;
  value: () => number;
  set: (value: number) => void;
  isStarLit: (star: number) => boolean;
}

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {

  readonly settings = inject(GameSettingsService);
  readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);

  readonly text = computed(() => this.languageService.t().game.settings);

  readonly sections: SettingsSection[] = [
    'gameplay',
    'sound',
    'accessibility',
    'language',
  ];

  readonly activeSection = signal<SettingsSection>('gameplay');

  /** Each language is written in its own name, so anyone can find theirs. */
  readonly languageOptions: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
  ];

  private readonly groups: Record<SettingsGroup, SettingRow[]> = {
    gameplay: [
      this.star(
        'showDamageNumbers',
        () => this.settings.showDamageNumbers,
        () => this.settings.toggleDamageNumbers(),
      ),
      this.star(
        'showTutorials',
        () => this.settings.showTutorials,
        () => this.settings.toggleTutorials(),
      ),
      this.star(
        'hints',
        () => this.settings.hints,
        () => this.settings.toggleHints(),
      ),
      this.slider(
        'difficulty',
        1,
        10,
        () => this.settings.difficulty,
        value => this.settings.setDifficulty(value),
        star => star * 2 <= this.settings.difficulty,
      ),
      this.star(
        'enemyHealthBars',
        () => this.settings.enemyHealthBars,
        () => this.settings.toggleEnemyHealthBars(),
      ),
      this.binary(
        'autoEquip',
        () => this.settings.autoEquip,
        () => this.settings.toggleAutoEquip(),
      ),
      this.binary(
        'autoSave',
        () => this.settings.autoSave,
        () => this.settings.toggleAutoSave(),
      ),
    ],

    sound: [
      this.volume(
        'masterVolume',
        () => this.settings.masterVolume,
        value => this.settings.setMasterVolume(value),
      ),
      this.volume(
        'musicVolume',
        () => this.settings.musicVolume,
        value => this.settings.setMusicVolume(value),
      ),
      this.volume(
        'sfxVolume',
        () => this.settings.sfxVolume,
        value => this.settings.setSfxVolume(value),
      ),
      this.volume(
        'environmentVolume',
        () => this.settings.environmentVolume,
        value => this.settings.setEnvironmentVolume(value),
      ),
      this.volume(
        'monstersVolume',
        () => this.settings.monstersVolume,
        value => this.settings.setMonstersVolume(value),
      ),
      this.volume(
        'natureVolume',
        () => this.settings.natureVolume,
        value => this.settings.setNatureVolume(value),
      ),
      this.star(
        'subtitles',
        () => this.settings.subtitles,
        () => this.settings.toggleSubtitles(),
      ),
      this.star(
        'muteAll',
        () => this.settings.muteAll,
        () => this.settings.toggleMuteAll(),
      ),
    ],

    accessibility: [
      this.star(
        'reduceFlashes',
        () => this.settings.reduceFlashes,
        () => this.settings.toggleReduceFlashes(),
      ),
      this.star(
        'screenShake',
        () => this.settings.screenShake,
        () => this.settings.toggleScreenShake(),
      ),
      this.star(
        'motionBlur',
        () => this.settings.motionBlur,
        () => this.settings.toggleMotionBlur(),
      ),
      this.star(
        'colorBlindMode',
        () => this.settings.colorBlindMode,
        () => this.settings.toggleColorBlindMode(),
      ),
      this.slider(
        'uiScale',
        0,
        2,
        () => this.settings.uiScale,
        value => this.settings.setUiScale(value),
        star => star <= ((this.settings.uiScale + 1) * 5 / 3),
      ),
      this.star(
        'autoPickup',
        () => this.settings.autoPickup,
        () => this.settings.toggleAutoPickup(),
      ),
      this.star(
        'reducedKeybinds',
        () => this.settings.reducedKeybinds,
        () => this.settings.toggleReducedKeybinds(),
      ),
      this.star(
        'clickToWalk',
        () => this.settings.clickToWalk,
        () => this.settings.toggleClickToWalk(),
      ),
    ],
  };

  readonly rows = computed(() => {
    const section = this.activeSection();

    return section === 'language' ? [] : this.groups[section];
  });

  selectSection(section: SettingsSection): void {
    this.activeSection.set(section);
  }

  goBack(): void {
    this.router.navigate(['/game']);
  }

  // =========================================================
  // ROW FACTORIES
  // =========================================================

  private star(
    key: SettingRowKey,
    isOn: () => boolean,
    toggle: () => void,
  ): SettingRow {
    return { ...this.withoutSlider(), key, control: 'star', isOn, toggle };
  }

  private binary(
    key: SettingRowKey,
    isOn: () => boolean,
    toggle: () => void,
  ): SettingRow {
    return { ...this.withoutSlider(), key, control: 'binary', isOn, toggle };
  }

  private slider(
    key: SettingRowKey,
    min: number,
    max: number,
    value: () => number,
    set: (value: number) => void,
    isStarLit: (star: number) => boolean,
  ): SettingRow {
    return {
      key,
      control: 'slider',
      isOn: () => false,
      toggle: () => { },
      min,
      max,
      value,
      set,
      isStarLit,
    };
  }

  /** Volumes all share the 0–100 range, one lit star per 20%. */
  private volume(
    key: SettingRowKey,
    value: () => number,
    set: (value: number) => void,
  ): SettingRow {
    return this.slider(key, 0, 100, value, set, star => star * 20 <= value());
  }

  private withoutSlider() {
    return {
      min: 0,
      max: 0,
      value: () => 0,
      set: () => { },
      isStarLit: () => false,
    };
  }
}
