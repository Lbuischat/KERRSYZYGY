export type ItemCategory = 'weapons' | 'armor' | 'potions' | 'items' | 'collectables';
export type BuffType =
  | 'health' | 'maxHealth' | 'stamina' | 'maxStamina'
  | 'damage' | 'speed' | 'xpGain';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface ItemBuff {
  type: BuffType;
  value: number;
  // Instantaneo se omitido. Para HP com duracao, valor e HP por segundo.
  duration?: number;
}

export type ItemEffect =
  | { type: 'xp'; value: number }
  | { type: 'dualRestore'; health: number; stamina: number };

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
