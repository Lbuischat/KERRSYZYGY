import { Injectable, inject, signal } from '@angular/core';

import { LanguageService } from '../../../../services/language/language.service';
import { BuffService } from '../../buffs/buff.service';
import { InventoryItem, ItemBuff, ItemId } from '../../buffs/buff.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly buffService = inject(BuffService);
  private readonly languageService = inject(LanguageService);

  readonly items = signal<InventoryItem[]>(createStartingItems());

  /** Returns the message shown in the details panel. */
  use(itemId: ItemId): string {
    const item = this.items().find(entry => entry.id === itemId);

    if (!item) {
      return '';
    }

    if (!item.buff) {
      return this.languageService.t().game.inventory.cannotUse;
    }

    this.buffService.apply(item);
    this.consume(item.id);

    return this.describeBuff(item.buff);
  }

  drop(itemId: ItemId): void {
    this.consume(itemId);
  }

  reset(): void {
    this.items.set(createStartingItems());
  }

  private consume(itemId: ItemId): void {
    this.items.update(list =>
      list
        .map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  private describeBuff(buff: ItemBuff): string {
    const text = this.languageService.t().game.inventory;

    if (buff.kind === 'heal') {
      return text.healed.replace('{amount}', String(buff.amount));
    }

    const template =
      buff.kind === 'speed'
        ? text.speedBoost
        : buff.kind === 'defense'
          ? text.defenseBoost
          : text.damageBoost;

    const percent = Math.round(Math.abs(1 - buff.amount) * 100);

    return template
      .replace('{percent}', String(percent))
      .replace('{seconds}', String(buff.durationSeconds));
  }
}

function createStartingItems(): InventoryItem[] {
  return [
    {
      id: 'stellar-draught',
      category: 'potions',
      glyph: '✚',
      quantity: 3,
      buff: {
        kind: 'heal',
        amount: 40,
        durationSeconds: 0,
      },
    },

    {
      id: 'solar-wind',
      category: 'potions',
      glyph: '➤',
      quantity: 2,
      buff: {
        kind: 'speed',
        amount: 1.35,
        durationSeconds: 12,
      },
    },

    {
      id: 'collapse-matter',
      category: 'items',
      glyph: '✦',
      quantity: 2,
      buff: {
        kind: 'damage',
        amount: 1.5,
        durationSeconds: 15,
      },
    },

    {
      id: 'void-shard',
      category: 'weapons',
      glyph: '⚔',
      quantity: 1,
      buff: {
        kind: 'damage',
        amount: 2,
        durationSeconds: 8,
      },
    },

    {
      id: 'aegis-fragment',
      category: 'armor',
      glyph: '❈',
      quantity: 2,
      buff: {
        kind: 'defense',
        amount: 0.5,
        durationSeconds: 15,
      },
    },

    {
      id: 'syzygy-relic',
      category: 'collectables',
      glyph: '◈',
      quantity: 1,
      buff: null,
    },
  ];
}
