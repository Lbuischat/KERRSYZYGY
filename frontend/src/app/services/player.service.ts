
import { isPlatformBrowser } from '@angular/common';

import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal
} from '@angular/core';

export interface PlayerProfile {
  username: string;
  gender: string;
  pronouns: string;
  birthday: string;
  language: string;
  characterName: string;
  bio: string;

  level: number;
  xp: number;
  credits: number;
  shopXp: number;
  worldLevel: number;

  receiveBirthdayEmails: boolean;
}

export interface PlayerReward {
  xp?: number;
  credits?: number;
  shopXp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly storageKey = 'playerProfile';

  private readonly defaultProfile: PlayerProfile = {
    username: '',
    gender: '',
    pronouns: '',
    birthday: '',
    language: '',
    characterName: '',
    bio: '',

    level: 0,
    xp: 0,
    credits: 1250,
    shopXp: 2840,
    worldLevel: 1,

    receiveBirthdayEmails: false
  };

  // =========================================
  // PLAYER STATE
  // =========================================

  readonly p = signal<PlayerProfile>({
    ...this.defaultProfile
  });

  get profile(): PlayerProfile {
    return this.p();
  }

  readonly username = computed(() => this.p().username);
  readonly level = computed(() => this.p().level);
  readonly xp = computed(() => this.p().xp);
  readonly credits = computed(() => this.p().credits);
  readonly shopXp = computed(() => this.p().shopXp);

  readonly worldLevelSignal = computed(
    () => this.p().worldLevel
  );

  // =========================================
  // LEVEL SYSTEM
  // =========================================

  getXpRequired(level: number): number {
    const safeLevel = Math.max(0, Math.floor(level));

    // LV 0 = 50 XP
    // LV 1 = 55 XP
    // LV 15 = 125 XP
    // LV 16 = 130 XP
    return 50 + safeLevel * 5;
  }

  readonly xpRequired = computed(
    () => this.getXpRequired(this.level())
  );

  // Compatibilidade com telas antigas.
  get xpPerLevel(): number {
    return this.xpRequired();
  }

  readonly xpProgressPercent = computed(() => {
    const required = this.xpRequired();

    if (required <= 0) return 0;

    return Math.min(
      100,
      (this.xp() / required) * 100
    );
  });

  get xpProgress(): number {
    return this.xpProgressPercent();
  }

  // =========================================
  // VISUAL FEEDBACK SIGNALS
  // =========================================

  readonly rewardPulse = signal(0);
  readonly lastLevelUp = signal<number | null>(null);

  constructor() {
    this.loadProfile();
  }

  // =========================================
  // ADD XP
  // =========================================

  addXp(amount: number): number[] {
    const gained = Math.max(0, Math.floor(amount));

    const levelsGained: number[] = [];

    this.p.update(player => {
      let nextXp = player.xp + gained;
      let nextLevel = player.level;

      // Não perde XP excedente.
      while (nextXp >= this.getXpRequired(nextLevel)) {
        nextXp -= this.getXpRequired(nextLevel);
        nextLevel++;

        levelsGained.push(nextLevel);
      }

      return {
        ...player,
        xp: nextXp,
        level: nextLevel
      };
    });

    if (levelsGained.length > 0) {
      this.lastLevelUp.set(
        levelsGained[levelsGained.length - 1]
      );
    }

    this.persist();

    return levelsGained;
  }

  // =========================================
  // APPLY QUEST REWARDS
  // =========================================

  applyRewards(reward: PlayerReward): number[] {
    const gainedXp = Math.max(
      0,
      Math.floor(reward.xp ?? 0)
    );

    const gainedCredits = Math.max(
      0,
      Math.floor(reward.credits ?? 0)
    );

    const gainedShopXp = Math.max(
      0,
      Math.floor(reward.shopXp ?? 0)
    );

    const levelsGained: number[] = [];

    // Atualiza tudo no mesmo Signal:
    // XP, Level, Credits e Shop XP juntos.
    this.p.update(player => {
      let nextXp = player.xp + gainedXp;
      let nextLevel = player.level;

      while (nextXp >= this.getXpRequired(nextLevel)) {
        nextXp -= this.getXpRequired(nextLevel);
        nextLevel++;

        levelsGained.push(nextLevel);
      }

      return {
        ...player,
        xp: nextXp,
        level: nextLevel,
        credits: player.credits + gainedCredits,
        shopXp: player.shopXp + gainedShopXp
      };
    });

    if (levelsGained.length > 0) {
      this.lastLevelUp.set(
        levelsGained[levelsGained.length - 1]
      );
    }

    if (gainedXp || gainedCredits || gainedShopXp) {
      this.rewardPulse.update(value => value + 1);
    }

    this.persist();

    return levelsGained;
  }

  // =========================================
  // COMPATIBILITY METHODS
  // =========================================

  // Mantemos os métodos antigos para não quebrar
  // chamadas de outras partes do projeto.
  //
  // Nesta versão, a atualização é imediata.
  // A transição visual da barra continua no CSS.

  async addXpAnimated(
    amount: number,
    _delayMs = 0
  ): Promise<number[]> {
    return this.addXp(amount);
  }

  async addCreditsAnimated(
    amount: number,
    _delayMs = 0
  ): Promise<void> {
    this.addCredits(amount);
  }

  async addShopXpAnimated(
    amount: number,
    _delayMs = 0
  ): Promise<void> {
    this.addShopXp(amount);
  }

  async applyRewardsAnimated(
    reward: PlayerReward
  ): Promise<number[]> {
    return this.applyRewards(reward);
  }

  // =========================================
  // CREDITS
  // =========================================

  addCredits(amount: number): void {
    const gained = Math.max(0, Math.floor(amount));

    this.p.update(player => ({
      ...player,
      credits: player.credits + gained
    }));

    this.persist();
  }

  setCredits(value: number): void {
    this.p.update(player => ({
      ...player,
      credits: Math.max(0, Math.floor(value))
    }));

    this.persist();
  }

  spendCredits(amount: number): boolean {
    const cost = Math.max(0, Math.floor(amount));

    if (this.credits() < cost) return false;

    this.p.update(player => ({
      ...player,
      credits: player.credits - cost
    }));

    this.persist();
    return true;
  }

  // =========================================
  // SHOP XP
  // =========================================

  addShopXp(amount: number): void {
    const gained = Math.max(0, Math.floor(amount));

    this.p.update(player => ({
      ...player,
      shopXp: player.shopXp + gained
    }));

    this.persist();
  }

  setShopXp(value: number): void {
    this.p.update(player => ({
      ...player,
      shopXp: Math.max(0, Math.floor(value))
    }));

    this.persist();
  }

  spendShopXp(amount: number): boolean {
    const cost = Math.max(0, Math.floor(amount));

    if (this.shopXp() < cost) return false;

    this.p.update(player => ({
      ...player,
      shopXp: player.shopXp - cost
    }));

    this.persist();
    return true;
  }

  // =========================================
  // WORLD LEVEL
  // =========================================

  setWorldLevel(value: number): void {
    this.p.update(player => ({
      ...player,
      worldLevel: Math.max(1, Math.floor(value))
    }));

    this.persist();
  }

  increaseWorldLevel(): void {
    this.p.update(player => ({
      ...player,
      worldLevel: player.worldLevel + 1
    }));

    this.persist();
  }

  // =========================================
  // LEVEL UP FEEDBACK
  // =========================================

  clearLevelUp(): void {
    this.lastLevelUp.set(null);
  }

  // =========================================
  // SAVE / LOAD
  // =========================================

  saveProfile(): void {
    // Algumas páginas antigas alteram o objeto profile.
    // Criar uma referência nova notifica o Angular.
    this.p.update(player => ({ ...player }));

    this.persist();
  }

  loadProfile(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const raw = localStorage.getItem(this.storageKey);

    if (!raw) return;

    try {
      const saved = JSON.parse(raw) as Partial<PlayerProfile>;

      const level = this.safeInteger(
        saved.level,
        0
      );

      const xp = this.safeInteger(
        saved.xp,
        0
      );

      const credits = this.safeInteger(
        saved.credits,
        this.defaultProfile.credits
      );

      const shopXp = this.safeInteger(
        saved.shopXp,
        this.defaultProfile.shopXp
      );

      const worldLevel = Math.max(
        1,
        this.safeInteger(saved.worldLevel, 1)
      );

      this.p.set({
        ...this.defaultProfile,
        ...saved,
        level,
        xp,
        credits,
        shopXp,
        worldLevel
      });

      // Corrige XP antigo que ultrapassava o limite.
      this.normalizeXp();

      this.persist();
    } catch {
      console.warn('Could not load player profile.');
    }
  }

  private normalizeXp(): void {
    const player = this.p();

    let level = player.level;
    let xp = player.xp;

    while (xp >= this.getXpRequired(level)) {
      xp -= this.getXpRequired(level);
      level++;
    }

    this.p.set({
      ...player,
      level,
      xp
    });
  }

  private safeInteger(
    value: unknown,
    fallback: number
  ): number {
    const number = Number(value);

    return Number.isFinite(number)
      ? Math.max(0, Math.floor(number))
      : fallback;
  }

  private persist(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.p())
      );
    } catch {
      console.warn('Could not save player profile.');
    }
  }

  clearProfile(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }

    this.p.set({
      ...this.defaultProfile
    });

    this.lastLevelUp.set(null);
  }
}
