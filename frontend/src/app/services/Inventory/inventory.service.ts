
import { isPlatformBrowser } from '@angular/common';

import {
  Injectable,
  PLATFORM_ID,
  effect,
  inject,
  signal
} from '@angular/core';

import type {
  InventoryItem
} from '../../features/game/hud/inventory/inventory-item.model';

import { BuffService } from './Buff/buff.service';
import { AccountSessionService } from '../account-session.service';
import { PlayerService } from '../player.service';
import { GameStateService } from '../game-state/game-state.service';

const STARTER_ITEMS: InventoryItem[] = [
  {
    id: 'berry',
    name: 'Crimson Jewel',
    category: 'items',
    description:
      'A fresh berry gathered from a wild bush. Restores a small amount of health.',
    icon: '/assets/berry.png',
    quantity: 1,
    usable: true,
    maxStack: 99,
    buff: {
      type: 'health',
      value: 10
    }
  },
  {
    id: 'astral-potion',
    name: 'Astral Potion',
    category: 'potions',
    description:
      'A strange potion containing condensed starlight.',
    icon: '/gassets/items/astral-potion.png',
    quantity: 3,

    // Será habilitada quando seu efeito temporário
    // estiver conectado à stamina do Player.
    usable: false,
    maxStack: 99,

    buff: {
      type: 'stamina',
      value: 25,
      duration: 10
    }
  },
  {
    id: 'star-fragment',
    name: 'Star Fragment',
    category: 'collectables',
    description:
      'A fragment of celestial material. It seems to retain a faint glow.',
    icon: '/gassets/items/star-fragment.png',
    quantity: 7,
    usable: false,
    maxStack: 99
  }
];

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly buffService = inject(BuffService);
  private readonly playerService = inject(PlayerService);
  private readonly account = inject(AccountSessionService);
  private readonly gameState = inject(GameStateService);
  private readonly platformId = inject(PLATFORM_ID);

  // Notifica a hotbar quando o inventário muda.
  readonly revision = signal(0);

  private items: InventoryItem[] = [];

  private latestHealth = 100;
  private latestMaxHealth = 100;

  constructor() {
    this.load();

    // Acompanhar a vida real do personagem.
    this.gameState.playerVitals$.subscribe(vitals => {
      this.latestHealth = vitals.health;
      this.latestMaxHealth = vitals.maxHealth;
    });

    // Recarregar inventário ao mudar de conta.
    effect(() => {
      this.account.accountId();
      this.load();
    });
  }

  // ==========================================
  // CONSULTAR ITENS
  // ==========================================

  getItems(): InventoryItem[] {
    return this.items.map(item => ({ ...item }));
  }

  getItem(itemId: string): InventoryItem | undefined {
    const item = this.items.find(
      entry => entry.id === itemId
    );

    return item ? { ...item } : undefined;
  }

  // ==========================================
  // ADICIONAR ITENS
  // ==========================================

  addItem(item: InventoryItem, amount = 1): void {
    if (
      !Number.isInteger(amount) ||
      amount <= 0 ||
      !item.id
    ) {
      return;
    }

    const existing = this.items.find(
      entry => entry.id === item.id
    );

    if (existing) {
      existing.quantity += amount;
    } else {
      this.items.push({
        ...item,
        quantity: amount
      });
    }

    this.changed();
  }

  // ==========================================
  // REMOVER ITENS
  // ==========================================

  removeItem(itemId: string, amount = 1): boolean {
    if (
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return false;
    }

    const item = this.items.find(
      entry => entry.id === itemId
    );

    if (
      !item ||
      item.quantity < amount
    ) {
      return false;
    }

    item.quantity -= amount;

    if (item.quantity === 0) {
      this.items = this.items.filter(
        entry => entry.id !== itemId
      );
    }

    this.changed();

    return true;
  }

  // ==========================================
  // USAR ITENS
  // ==========================================

  useItem(itemId: string): boolean {
    const item = this.items.find(
      entry => entry.id === itemId
    );

    if (
      !item ||
      !item.usable ||
      item.quantity < 1
    ) {
      return false;
    }

    // Não consumir itens sem efeitos implementados.
    if (!item.buff && !item.effect) {
      return false;
    }

    // Não desperdiçar cura com a vida cheia.
    if (
      item.buff?.type === 'health' &&
      this.latestHealth >= this.latestMaxHealth
    ) {
      return false;
    }

    // Ganho de experiência.
    if (item.effect?.type === 'xp') {
      this.playerService.addXp(item.effect.value);
    }

    // Cura e outros buffs.
    if (item.buff) {
      this.buffService.addBuff(item.buff);
    }

    return this.removeItem(itemId, 1);
  }

  // ==========================================
  // COLETA DAS FRUTINHAS
  // ==========================================

  addBerry(amount: number): void {
    if (
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return;
    }

    // Recria a fruta caso todas tenham sido
    // consumidas anteriormente.
    this.addItem(STARTER_ITEMS[0], amount);
  }

  // ==========================================
  // SALVAR ALTERAÇÕES
  // ==========================================

  private changed(): void {
    this.revision.update(n => n + 1);
    this.save();
  }

  private get storageKey(): string {
    return this.account.storageKey('inventory-items-v2');
  }

  private save(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.items)
      );
    } catch (error) {
      console.warn(
        'Falha ao salvar o inventário:',
        error
      );
    }
  }

  // ==========================================
  // CARREGAR ITENS SALVOS
  // ==========================================

  private load(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.items = STARTER_ITEMS.map(
        item => ({ ...item })
      );
      return;
    }

    try {
      const raw = localStorage.getItem(
        this.storageKey
      );

      if (!raw) {
        this.items = STARTER_ITEMS.map(
          item => ({ ...item })
        );
      } else {
        const parsed: unknown = JSON.parse(raw);

        this.items = Array.isArray(parsed)
          ? parsed.filter(
              (item): item is InventoryItem =>
                item &&
                typeof item.id === 'string' &&
                typeof item.name === 'string' &&
                typeof item.category === 'string' &&
                typeof item.quantity === 'number' &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0 &&
                typeof item.usable === 'boolean' &&
                typeof item.description === 'string'
            )
          : STARTER_ITEMS.map(item => ({ ...item }));
      }

    } catch {
      this.items = STARTER_ITEMS.map(
        item => ({ ...item })
      );
    }

    this.revision.update(n => n + 1);
  }
}
