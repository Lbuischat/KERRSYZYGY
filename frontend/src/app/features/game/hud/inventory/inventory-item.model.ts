// ================================================================
// INVENTORY ITEM TYPES
// ================================================================

export type ItemCategory =
  | 'weapons'
  | 'armor'
  | 'potions'
  | 'items'
  | 'collectables';


// ================================================================
// BUFF TYPES
// ================================================================

export type BuffType =
  | 'health'
  | 'maxHealth'
  | 'stamina'
  | 'maxStamina'
  | 'damage'
  | 'speed';


// ================================================================
// ITEM BUFF
// ================================================================

export interface ItemBuff {

  type: BuffType;

  /*
   * The numerical value of the effect.
   *
   * Examples:
   *
   * health +25
   * speed +0.20
   * damage +10
   */

  value: number;

  /*
   * Temporary buffs have a duration in seconds.
   *
   * Permanent/equipment effects can omit this.
   */

  duration?: number;

}


// ================================================================
// INVENTORY ITEM
// ================================================================

export interface InventoryItem {

  /*
   * Unique identifier.
   *
   * IMPORTANT:
   * Use this ID everywhere instead of using the item's name.
   */

  id: string;


  /*
   * Display name.
   */

  name: string;


  /*
   * Inventory category.
   */

  category: ItemCategory;


  /*
   * Description shown in the selected-item panel.
   */

  description: string;


  /*
   * Optional image/icon.
   */

  icon?: string;


  /*
   * How many of this item the player owns.
   */

  quantity: number;


  /*
   * Whether the item can currently be used.
   *
   * Useful later for things like quest items.
   */

  usable: boolean;


  /*
   * Optional effect applied when the item is used.
   */

  buff?: ItemBuff;


  /*
   * Maximum number that can occupy one inventory entry.
   *
   * Example:
   *
   * 99 potions
   * 1 sword
   */

  maxStack?: number;

}