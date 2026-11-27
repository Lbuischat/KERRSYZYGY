import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { AccountSessionService } from '../account-session.service';

export type UpgradeStat = 'maxHealth' | 'maxStamina' | 'damage' | 'speed' | 'xpGain';
export type UpgradeStats = Record<UpgradeStat, number>;
const ZERO: UpgradeStats = { maxHealth: 0, maxStamina: 0, damage: 0, speed: 0, xpGain: 0 };
const LIMIT: UpgradeStats = { maxHealth: 250, maxStamina: 180, damage: .7, speed: .3, xpGain: .5 };

@Injectable({ providedIn: 'root' })
export class UpgradeService {
  private readonly account = inject(AccountSessionService);
  private readonly platform = inject(PLATFORM_ID);
  readonly bonuses = signal<UpgradeStats>({ ...ZERO });
  constructor() {
    effect(() => { this.account.accountId(); this.load(); });
  }
  get(stat: UpgradeStat): number { return this.bonuses()[stat]; }
  apply(gains: Partial<UpgradeStats>): boolean {
    const next = { ...this.bonuses() };
    let changed = false;
    for (const stat of Object.keys(ZERO) as UpgradeStat[]) {
      const increase = gains[stat] ?? 0;
      if (!Number.isFinite(increase) || increase <= 0) continue;
      const rounded = Math.round((next[stat] + increase) * 10000) / 10000;
      const value = Math.min(LIMIT[stat], rounded);
      if (value > next[stat]) { next[stat] = value; changed = true; }
    }
    if (!changed) return false;
    this.bonuses.set(next);
    this.save();
    return true;
  }
  private get key(): string { return this.account.storageKey('kerr-permanent-upgrades-v1'); }
  private load(): void {
    if (!isPlatformBrowser(this.platform)) return;
    try {
      const raw = localStorage.getItem(this.key);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      const obj = parsed && typeof parsed === 'object' ? parsed as Partial<UpgradeStats> : {};
      const result = { ...ZERO };
      for (const stat of Object.keys(ZERO) as UpgradeStat[]) {
        const value = obj[stat];
        if (typeof value === 'number' && Number.isFinite(value)) {
          result[stat] = Math.max(0, Math.min(LIMIT[stat], value));
        }
      }
      this.bonuses.set(result);
    } catch { this.bonuses.set({ ...ZERO }); }
  }
  private save(): void {
    if (!isPlatformBrowser(this.platform)) return;
    try { localStorage.setItem(this.key, JSON.stringify(this.bonuses())); }
    catch (e) { console.warn('Could not save permanent upgrades', e); }
  }
}
