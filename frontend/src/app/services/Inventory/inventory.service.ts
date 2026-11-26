import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import type { InventoryItem } from '../../features/game/hud/inventory/inventory-item.model';
import { BuffService } from './Buff/buff.service';
import { AccountSessionService } from '../account-session.service';
import { PlayerService } from '../player.service';
import { GameStateService } from '../game-state/game-state.service';
import { refreshKnownItemEffects } from '../../features/game/shop/shop-inventory.adapter';

const STARTER_ITEMS: InventoryItem[] = [
  {
    id: 'berry', name: 'Crimson Jewel', category: 'collectables',
    description: 'A fresh berry gathered from a wild bush. Restores a small amount of health.',
    icon: '/assets/berry.png', quantity: 1, usable: true, maxStack: 99,
    buff: { type: 'health', value: 10 }
  },
  {
    id: 'astral-potion', name: 'Astral Potion', category: 'potions',
    description: 'A strange potion containing condensed starlight.',
    icon: '/assets/items/inventory/astral-potion.svg', quantity: 3,
    // O efeito de stamina temporário só será habilitado após integrar
    // a regeneração ao Player; não consumir sem efeito funcional.
    usable: false, maxStack: 99,
    buff: { type: 'stamina', value: 25, duration: 10 }
  },
  {
    id: 'star-fragment', name: 'Star Fragment', category: 'collectables',
    description: 'A fragment of celestial material. It seems to retain a faint glow.',
    icon: '/assets/items/inventory/star-fragment.svg', quantity: 7,
    usable: false, maxStack: 99
  }
];

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly buffService = inject(BuffService);
  private readonly playerService = inject(PlayerService);
  private readonly account = inject(AccountSessionService);
  private readonly gameState = inject(GameStateService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly revision = signal(0);
  private items: InventoryItem[] = [];
  private latestHealth = 100;
  private latestMaxHealth = 100;
  private latestStamina = 100;
  private latestMaxStamina = 100;

  constructor() {
    this.load();
    this.gameState.playerVitals$.subscribe(vitals => {
      this.latestHealth = vitals.health;
      this.latestMaxHealth = vitals.maxHealth;
      this.latestStamina = vitals.stamina;
      this.latestMaxStamina = vitals.maxStamina;
    });
    effect(() => {
      this.account.accountId();
      this.load();
    });
  }

  getItems(): InventoryItem[] {
    return this.items.map(item => ({ ...item }));
  }

  getItem(itemId: string): InventoryItem | undefined {
    const item = this.items.find(entry => entry.id === itemId);
    return item ? { ...item } : undefined;
  }

  addItem(item: InventoryItem, amount = 1): void {
    if (!Number.isInteger(amount) || amount <= 0 || !item.id) return;
    const normalized = refreshKnownItemEffects(item);
    const existing = this.items.find(entry => entry.id === item.id);
    if (existing) {
      existing.quantity += amount;
    } else {
      this.items.push({ ...normalized, quantity: amount });
    }
    this.changed();
  }

  removeItem(itemId: string, amount = 1): boolean {
    if (!Number.isInteger(amount) || amount <= 0) return false;
    const item = this.items.find(entry => entry.id === itemId);
    if (!item || item.quantity < amount) return false;
    item.quantity -= amount;
    if (item.quantity === 0) this.items = this.items.filter(entry => entry.id !== itemId);
    this.changed();
    return true;
  }

  useItem(itemId: string): boolean {
    const item = this.items.find(entry => entry.id === itemId);
    if (!item || !item.usable || item.quantity < 1) return false;
    if (!item.buff && !item.effect) return false;

    const healthMissing = this.latestHealth < this.latestMaxHealth;
    const staminaMissing = this.latestStamina < this.latestMaxStamina;

    // Nao desperdiçar recuperadores quando o atributo ja esta cheio.
    if (item.buff?.duration === undefined) {
      if (item.buff?.type === 'health' && !healthMissing) return false;
      if (item.buff?.type === 'stamina' && !staminaMissing) return false;
    }
    if (item.effect?.type === 'dualRestore' && !healthMissing && !staminaMissing) {
      return false;
    }

    if (item.effect?.type === 'xp') {
      this.playerService.addXp(item.effect.value);
    } else if (item.effect?.type === 'dualRestore') {
      if (healthMissing) this.buffService.addBuff({ type: 'health', value: item.effect.health });
      if (staminaMissing) this.buffService.addBuff({ type: 'stamina', value: item.effect.stamina });
    }

    if (item.buff) this.buffService.addBuff(item.buff);
    return this.removeItem(itemId, 1);
  }

  addBerry(amount: number): void {
    if (!Number.isInteger(amount) || amount <= 0) return;
    this.addItem(STARTER_ITEMS[0], amount);
  }

  private changed(): void {
    this.revision.update(n => n + 1);
    this.save();
  }

  private get storageKey(): string {
    return this.account.storageKey('inventory-items-v2');
  }

  private save(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (error) {
      console.warn('Falha ao salvar o inventário:', error);
    }
  }

  private load(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.items = STARTER_ITEMS.map(item => ({ ...item }));
      return;
    }
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        this.items = STARTER_ITEMS.map(item => ({ ...item }));
      } else {
        const parsed: unknown = JSON.parse(raw);
        this.items = Array.isArray(parsed)
          ? parsed.filter((item): item is InventoryItem =>
              item && typeof item.id === 'string' &&
              typeof item.name === 'string' &&
              typeof item.category === 'string' &&
              typeof item.quantity === 'number' &&
              Number.isInteger(item.quantity) && item.quantity > 0 &&
              typeof item.usable === 'boolean' &&
              typeof item.description === 'string'
            ).map(item => refreshKnownItemEffects(item))
          : STARTER_ITEMS.map(item => ({ ...item }));
      }
    } catch {
      this.items = STARTER_ITEMS.map(item => ({ ...item }));
    }
    // FIX_INVENTORY_ICONS_V1: corrigir itens salvos sem zerar inventario.
    let precisaSalvar = false;
    this.items = this.items.map(item => {
      if (item.id === 'berry') {
        if (item.category !== 'collectables' || item.icon !== '/assets/berry.png') precisaSalvar = true;
        return { ...item, category: 'collectables', icon: '/assets/berry.png' };
      }
      if (item.id === 'astral-potion') {
        if (item.icon !== '/assets/items/inventory/astral-potion.svg') precisaSalvar = true;
        return { ...item, icon: '/assets/items/inventory/astral-potion.svg' };
      }
      if (item.id === 'star-fragment') {
        if (item.icon !== '/assets/items/inventory/star-fragment.svg') precisaSalvar = true;
        return { ...item, icon: '/assets/items/inventory/star-fragment.svg' };
      }
      return item;
    });
    if (precisaSalvar) this.save();
    
    this.revision.update(n => n + 1);
  }
}
