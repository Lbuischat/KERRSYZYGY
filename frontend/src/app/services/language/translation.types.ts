import { ItemId } from '../../features/game/buffs/buff.model';
import { AuthText } from './sections/auth';
import { HudPanelsText } from './sections/hud-panels';
import { OnboardingText } from './sections/onboarding';
import { PlayerInfoText } from './sections/player-info';
import { ShopText } from './sections/shop';

export interface ItemText {
  name: string;
  description: string;
}

export interface SettingText {
  title: string;
  description: string;
}

/** The text each locales/<lang>.ts file provides directly. */
export interface BaseTranslation {
  title: {
    remember: string;
  };

  login: {
    title: string;
    journey: string;
    or: string;
    email: string;
    password: string;
    submit: string;
    noAccount: string;
    createAccount: string;
  };

  start: {
    story: {
      beforeJourney: string;
      worldWaiting: string;
      continue: string;
    };

    gender: {
      eyebrow: string;
      title: string;
      description: string;
      continue: string;
    };

    username: {
      eyebrow: string;
      title: string;
      description: string;
      placeholder: string;
      continue: string;
    };

    pronouns: {
      eyebrow: string;
      title: string;
      description: string;
      continue: string;
    };

    birthday: {
      eyebrow: string;
      title: string;
      description: string;
      month: string;
      day: string;
      year: string;
      emailWishes: string;
      continue: string;
    };

    ready: {
      eyebrow: string;
      title: string;
      description: string;
      begin: string;
    };
  };

  language: {
    english: string;
    portuguese: string;
    spanish: string;
    french: string;
    german: string;
  };

  game: {
    hud: {
      wave: string;
      enemiesLeft: string;
      points: string;
      finalWave: string;
    };

    scoreBoard: {
      victoryTitle: string;
      defeatTitle: string;
      victorySubtitle: string;
      defeatSubtitle: string;
      waveReached: string;
      enemiesDefeated: string;
      timeSurvived: string;
      score: string;
      playAgain: string;
      leave: string;
    };

    inventory: {
      title: string;
      close: string;
      details: string;
      noSelection: string;
      use: string;
      drop: string;
      carrying: string;

      /** Messages use {amount}, {percent} and {seconds} placeholders. */
      healed: string;
      speedBoost: string;
      damageBoost: string;
      defenseBoost: string;
      cannotUse: string;
      dropped: string;

      filters: {
        all: string;
        weapons: string;
        armor: string;
        potions: string;
        items: string;
        collectables: string;
      };
    };

    items: Record<ItemId, ItemText>;

    settings: {
      back: string;
      gameplay: string;
      sound: string;
      accessibility: string;
      language: string;

      rows: {
        showDamageNumbers: SettingText;
        showTutorials: SettingText;
        hints: SettingText;
        difficulty: SettingText;
        enemyHealthBars: SettingText;
        autoEquip: SettingText;
        autoSave: SettingText;

        masterVolume: SettingText;
        musicVolume: SettingText;
        sfxVolume: SettingText;
        environmentVolume: SettingText;
        monstersVolume: SettingText;
        natureVolume: SettingText;
        subtitles: SettingText;
        muteAll: SettingText;

        reduceFlashes: SettingText;
        screenShake: SettingText;
        motionBlur: SettingText;
        colorBlindMode: SettingText;
        uiScale: SettingText;
        autoPickup: SettingText;
        reducedKeybinds: SettingText;
        clickToWalk: SettingText;
      };
    };
  };
}

/**
 * Everything one language provides. The base text lives in locales/<lang>.ts,
 * each feature keeps its own text in sections/<feature>.ts, and
 * translations.ts joins them together.
 */
export interface Translation extends BaseTranslation {
  auth: AuthText;
  shop: ShopText;
  playerInfo: PlayerInfoText;
  hudPanels: HudPanelsText;
  onboarding: OnboardingText;
}

export type SettingRowKey = keyof Translation['game']['settings']['rows'];
