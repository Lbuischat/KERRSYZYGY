// Tipos compatíveis com o inventário do KERRSYZYGY.
export type ItemCategory = 'weapons' | 'armor' | 'potions' | 'items' | 'collectables';
export type BuffType = 'health' | 'maxHealth' | 'stamina' | 'maxStamina' | 'damage' | 'speed' | 'xpGain';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export interface ItemBuff { type: BuffType; value: number; duration?: number; }
export type ItemEffect =
  | { type: 'xp'; value: number }
  | { type: 'shopXp'; value: number }
  | { type: 'dualRestore'; health: number; stamina: number }
  | { type: 'upgrade'; stats: Partial<Record<'maxHealth'|'maxStamina'|'damage'|'speed'|'xpGain', number>> };
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
