export type ItemCategory =
  | 'weapons'
  | 'armor'
  | 'potions'
  | 'items'
  | 'collectables';

/** Names and descriptions live in the translation files, keyed by these ids. */
export type ItemId =
  | 'stellar-draught'
  | 'solar-wind'
  | 'collapse-matter'
  | 'void-shard'
  | 'aegis-fragment'
  | 'syzygy-relic';

export type BuffKind =
  | 'heal'
  | 'speed'
  | 'damage'
  | 'defense';

export interface ItemBuff {
  kind: BuffKind;

  /**
   * For 'heal' this is a flat amount of health.
   * For every other kind it is a multiplier:
   * 1.5 means +50% damage, 0.5 means half the damage taken.
   */
  amount: number;

  /** 0 means the effect is applied instantly and does not linger. */
  durationSeconds: number;
}

export interface InventoryItem {
  id: ItemId;
  category: ItemCategory;
  glyph: string;
  quantity: number;
  buff: ItemBuff | null;
}

export interface ActiveBuff {
  kind: BuffKind;
  itemId: ItemId;
  amount: number;
  remainingSeconds: number;
}
