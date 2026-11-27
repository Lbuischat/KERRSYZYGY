import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { InventoryItem } from '../../features/game/hud/inventory/inventory-item.model';
import { refreshKnownItemEffects } from '../../features/game/shop/shop-inventory.adapter';
import { AccountSessionService } from '../account-session.service';
import { PlayerService } from '../player.service';
import { GameStateService } from '../game-state/game-state.service';
import { BuffService } from './Buff/buff.service';
import { UpgradeService } from './upgrade.service';
import { ItemEffectsRuntimeService } from './item-effects-runtime.service';

const INITIAL: InventoryItem[] = [
  // O desenho original da berry não é substituído.
  { id: 'berry', name: 'Crimson Jewel', category: 'collectables',
    description: 'Fruta coletada no mapa: recupera 10 HP.',
    icon: '/assets/berry.png', quantity: 1, usable: true, maxStack: 99,
    buff: { type: 'health', value: 10 } },
  { id: 'astral-potion', name: 'Astral Potion', category: 'potions',
    description: 'Restaura 25 de stamina.',
    icon: '/assets/items/inventory/astral-potion.svg', quantity: 3,
    usable: true, maxStack: 99, buff: { type: 'stamina', value: 25 } },
  { id: 'star-fragment', name: 'Star Fragment', category: 'collectables',
    description: 'Concede 5 XP.',
    icon: '/assets/items/inventory/star-fragment.svg', quantity: 7,
    usable: true, maxStack: 99, effect: { type: 'xp', value: 5 } }
];

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly account = inject(AccountSessionService);
  private readonly playerService = inject(PlayerService);
  private readonly buffService = inject(BuffService);
  private readonly gameState = inject(GameStateService);
  private readonly upgrades = inject(UpgradeService);
  private readonly runtime = inject(ItemEffectsRuntimeService);

  readonly revision = signal(0);
  private items: InventoryItem[] = [];
  private latestHealth = 100;
  private latestMaxHealth = 100;
  private latestStamina = 100;
  private latestMaxStamina = 100;

  constructor() {
    // Compatível também com a versão antiga do GameStateService.
    const state = this.gameState as unknown as {
      playerVitals$?: Observable<{
        health: number; maxHealth: number; stamina: number; maxStamina: number;
      }>;
    };
    state.playerVitals$?.subscribe(v => {
      this.latestHealth = v.health;
      this.latestMaxHealth = v.maxHealth;
      this.latestStamina = v.stamina;
      this.latestMaxStamina = v.maxStamina;
    });
    effect(() => {
      this.account.accountId();
      this.load();
    });
  }

  getItems(): InventoryItem[] { return this.items.map(item => ({ ...item })); }

  getItem(id: string): InventoryItem | undefined {
    const item = this.items.find(entry => entry.id === id);
    return item ? { ...item } : undefined;
  }

  addItem(item: InventoryItem, amount = 1): void {
    if (!item.id || !Number.isInteger(amount) || amount < 1) return;
    const normalized = refreshKnownItemEffects({ ...item });
    const existing = this.items.find(entry => entry.id === normalized.id);
    if (existing) {
      Object.assign(existing, normalized, { quantity: existing.quantity + amount });
    } else {
      this.items.push({ ...normalized, quantity: amount });
    }
    this.changed();
  }

  removeItem(id: string, amount = 1): boolean {
    if (!Number.isInteger(amount) || amount < 1) return false;
    const entry = this.items.find(item => item.id === id);
    if (!entry || entry.quantity < amount) return false;
    entry.quantity -= amount;
    if (entry.quantity === 0) this.items = this.items.filter(item => item.id !== id);
    this.changed();
    return true;
  }

  useItem(id: string): boolean {
    const item = this.items.find(entry => entry.id === id);
    if (!item || item.quantity < 1 || !item.usable) return false;
    const effect = item.effect;
    const buff = item.buff;
    if (!effect && !buff) return false;

    const p = this.runtime.playerVitals;
    const missingHp = p ? p.health < p.maxHealth : this.latestHealth < this.latestMaxHealth;
    const missingStamina = p ? p.stamina < p.maxStamina : this.latestStamina < this.latestMaxStamina;

    // Não desperdiçar consumíveis sem necessidade.
    if (buff?.type === 'health' && buff.duration === undefined && !missingHp) return false;
    if (buff?.type === 'stamina' && buff.duration === undefined && !missingStamina) return false;
    if (effect?.type === 'dualRestore' && !missingHp && !missingStamina) return false;

    if (effect?.type === 'upgrade') {
      // Só gastar a unidade se a melhoria realmente couber no limite.
      if (!this.upgrades.apply(effect.stats)) return false;
    } else if (effect?.type === 'xp') {
      this.playerService.addXp(effect.value);
    } else if (effect?.type === 'shopXp') {
      this.playerService.addShopXp(effect.value);
    } else if (effect?.type === 'dualRestore') {
      if (missingHp) this.buffService.addBuff({ type: 'health', value: effect.health });
      if (missingStamina) this.buffService.addBuff({ type: 'stamina', value: effect.stamina });
    }

    if (buff) this.buffService.addBuff(buff);
    return this.removeItem(id, 1);
  }

  addBerry(amount: number): void {
    if (!Number.isInteger(amount) || amount < 1) return;
    this.addItem(INITIAL[0], amount);
  }

  private changed(): void {
    this.revision.update(n => n + 1);
    this.save();
  }

  private get key(): string {
    // Mantém a chave já usada pela hotbar e inventário existente.
    return this.account.storageKey('inventory-items-v2');
  }

  private load(): void {
    let loaded = INITIAL.map(item => refreshKnownItemEffects({ ...item }));
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem(this.key);
        if (raw) {
          const json: unknown = JSON.parse(raw);
          if (Array.isArray(json)) {
            loaded = json
              .filter((x): x is InventoryItem => !!x && typeof x.id === 'string' &&
                typeof x.quantity === 'number' && Number.isInteger(x.quantity) &&
                x.quantity > 0 && typeof x.name === 'string' &&
                typeof x.description === 'string' && typeof x.category === 'string')
              .map(x => {
                const updated = refreshKnownItemEffects({ ...x });
                if (updated.id === 'berry') {
                  return { ...updated, category: 'collectables' as const, icon: '/assets/berry.png' };
                }
                if (updated.id === 'astral-potion') {
                  updated.icon = '/assets/items/inventory/astral-potion.svg';
                }
                if (updated.id === 'star-fragment') {
                  updated.icon = '/assets/items/inventory/star-fragment.svg';
                }
                return updated;
              });
          }
        }
      } catch (e) {
        console.warn('Inventário antigo não pôde ser lido:', e);
      }
    }
    this.items = loaded;
    this.revision.update(n => n + 1);
  }

  private save(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.setItem(this.key, JSON.stringify(this.items)); }
    catch (e) { console.warn('Falha ao salvar inventário:', e); }
  }
}
