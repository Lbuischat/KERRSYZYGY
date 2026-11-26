
export type ItemCategory =
  | 'weapons'
  | 'armor'
  | 'potions'
  | 'items'
  | 'collectables';

export type BuffType =
  | 'health'
  | 'maxHealth'
  | 'stamina'
  | 'maxStamina'
  | 'damage'
  | 'speed';

export type ItemRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary';

export interface ItemBuff {
  type: BuffType;
  value: number;
  duration?: number;
}

export interface ItemEffect {
  type: 'xp';
  value: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;

  icon?: string;
  quantity: number;
  usable: boolean;

  buff?: ItemBuff;
  effect?: ItemEffect;
  rarity?: ItemRarity;

  maxStack?: number;
}
