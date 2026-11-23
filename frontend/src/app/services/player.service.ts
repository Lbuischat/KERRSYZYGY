import { isPlatformBrowser } from '@angular/common';

import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal
} from '@angular/core';

import { AccountSessionService } from './account-session.service';

// =========================================
// INTERFACES
// =========================================

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
  characterCreated?: boolean;
}

export interface PlayerReward {
  xp?: number;
  credits?: number;
  shopXp?: number;
}

// =========================================
// PLAYER SERVICE
// =========================================

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly accountSession = inject(AccountSessionService);

  private get storageKey(): string {
    return this.accountSession.storageKey('playerProfile');
  }

  // =========================================
  // DEFAULT PROFILE
  // =========================================

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
    credits: 0,
    shopXp: 0,
    worldLevel: 1,

    receiveBirthdayEmails: false,
    characterCreated: false
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

  // Compatibility with older components.

  get xpPerLevel(): number {
    return this.xpRequired();
  }

  readonly xpProgressPercent = computed(() => {
    const required = this.xpRequired();

    if (required <= 0) {
      return 0;
    }

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
  // ACCOUNT SWITCH
  // =========================================

  reloadForCurrentAccount(): void {
    // Prevent the previous account's state from
    // being saved into the newly selected account.

    this.p.set({
      ...this.defaultProfile
    });

    this.rewardPulse.set(0);
    this.lastLevelUp.set(null);

    this.loadProfile();
  }

  // =========================================
  // ADD XP
  // =========================================

  addXp(amount: number): number[] {
    const gained = this.safeAmount(amount);
    const levelsGained: number[] = [];

    this.p.update(player => {
      let nextXp = player.xp + gained;
      let nextLevel = player.level;

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
    const gainedXp = this.safeAmount(reward.xp);
    const gainedCredits = this.safeAmount(reward.credits);
    const gainedShopXp = this.safeAmount(reward.shopXp);

    const levelsGained: number[] = [];

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
    const gained = this.safeAmount(amount);

    this.p.update(player => ({
      ...player,
      credits: player.credits + gained
    }));

    this.persist();
  }

  setCredits(value: number): void {
    this.p.update(player => ({
      ...player,
      credits: this.safeAmount(value)
    }));

    this.persist();
  }

  spendCredits(amount: number): boolean {
    const cost = this.safeAmount(amount);

    if (this.credits() < cost) {
      return false;
    }

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
    const gained = this.safeAmount(amount);

    this.p.update(player => ({
      ...player,
      shopXp: player.shopXp + gained
    }));

    this.persist();
  }

  setShopXp(value: number): void {
    this.p.update(player => ({
      ...player,
      shopXp: this.safeAmount(value)
    }));

    this.persist();
  }

  spendShopXp(amount: number): boolean {
    const cost = this.safeAmount(amount);

    if (this.shopXp() < cost) {
      return false;
    }

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
      worldLevel: Math.max(
        1,
        this.safeAmount(value)
      )
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
  // SAVE PROFILE
  // =========================================

  saveProfile(): void {
    // Older components directly modify properties
    // through playerService.profile.
    // Creating a new object reference notifies Signals.

    this.p.update(player => ({
      ...player
    }));

    this.persist();
  }

  // =========================================
  // LOAD PROFILE
  // =========================================

  loadProfile(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      return;
    }

    try {
      const saved = JSON.parse(raw) as Partial<PlayerProfile>;

      const level = this.safeInteger(saved.level, 0);
      const xp = this.safeInteger(saved.xp, 0);

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

      // Corrects saved XP that exceeds the current level limit.
      this.normalizeXp();

      this.persist();

    } catch {
      console.warn('Could not load player profile.');
    }
  }

  // =========================================
  // NORMALIZE XP
  // =========================================

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

  // =========================================
  // VALIDATION HELPERS
  // =========================================

  private safeInteger(
    value: unknown,
    fallback: number
  ): number {
    const number = Number(value);

    return Number.isFinite(number)
      ? Math.max(0, Math.floor(number))
      : fallback;
  }

  private safeAmount(value: number | undefined): number {
    if (value === undefined || !Number.isFinite(value)) {
      return 0;
    }

    return Math.max(0, Math.floor(value));
  }

  // =========================================
  // PERSIST
  // =========================================

  private persist(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.p())
      );
    } catch {
      console.warn('Could not save player profile.');
    }
  }

  // =========================================
  // CLEAR PROFILE
  // =========================================

  clearProfile(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }

    this.p.set({
      ...this.defaultProfile
    });

    this.rewardPulse.set(0);
    this.lastLevelUp.set(null);
  }
}