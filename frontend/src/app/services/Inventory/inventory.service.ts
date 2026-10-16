import { Injectable } from '@angular/core';

import {
  InventoryItem
} from '../../../app/features/game/hud/inventory/inventory-item.model';

import {
  BuffService
} from '../../services/Inventory/Buff/buff.service';


// ================================================================
// INVENTORY SERVICE
// ================================================================

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  /*
   * The player's inventory.
   *
   * This is the actual source of truth.
   *
   * The Inventory component should NEVER be the source of truth.
   */

  private items: InventoryItem[] = [

    {
      id: 'berry',

      name: 'Crimson Jewel',

      category: 'items',

      description:
        'A fresh berry gathered from a wild bush. Restores a small amount of health.',

      icon:
        '/assets/berry.png',

      quantity: 1,

      usable: true,

      maxStack: 99,

      buff: {
        type: 'health',
        value: 10
      }
    },


    // ------------------------------------------------------------
    // EXAMPLE POTION
    // ------------------------------------------------------------

    {
      id: 'astral-potion',

      name: 'Astral Potion',

      category: 'potions',

      description:
        'A strange potion containing condensed starlight.',

      icon:
        '/gassets/items/astral-potion.png',

      quantity: 3,

      usable: true,

      maxStack: 99,

      buff: {
        type: 'stamina',
        value: 25,
        duration: 10
      }

    },


    // ------------------------------------------------------------
    // EXAMPLE COLLECTABLE
    // ------------------------------------------------------------

    {
      id: 'star-fragment',

      name: 'Star Fragment',

      category: 'collectables',

      description:
        'A fragment of celestial material. It seems to retain a faint glow.',

      icon:
        '/gassets/items/star-fragment.png',

      quantity: 7,

      usable: false,

      maxStack: 99

    }

  ];


  constructor(
    private buffService: BuffService
  ) { }


  // ==============================================================
  // GET ALL ITEMS
  // ==============================================================

  getItems(): InventoryItem[] {

    return [
      ...this.items
    ];

  }


  // ==============================================================
  // GET ITEM
  // ==============================================================

  getItem(
    itemId: string
  ): InventoryItem | undefined {

    return this.items.find(
      item =>
        item.id === itemId
    );

  }


  // ==============================================================
  // ADD ITEM
  // ==============================================================

  addItem(
    item: InventoryItem,
    amount = 1
  ): void {

    const existingItem =
      this.getItem(item.id);


    // ------------------------------------------------------------
    // ITEM ALREADY EXISTS
    // ------------------------------------------------------------

    if (existingItem) {

      existingItem.quantity +=
        amount;

      return;

    }


    // ------------------------------------------------------------
    // NEW ITEM
    // ------------------------------------------------------------

    this.items.push({

      ...item,

      quantity: amount

    });

  }


  // ==============================================================
  // REMOVE ITEM
  // ==============================================================

  removeItem(
    itemId: string,
    amount = 1
  ): boolean {

    const item =
      this.getItem(itemId);


    if (!item) {

      return false;

    }


    if (
      item.quantity <
      amount
    ) {

      return false;

    }


    item.quantity -=
      amount;


    // ------------------------------------------------------------
    // REMOVE EMPTY STACK
    // ------------------------------------------------------------

    if (
      item.quantity <= 0
    ) {

      this.items =
        this.items.filter(
          existing =>
            existing.id !== itemId
        );

    }


    return true;

  }


  // ==============================================================
  // USE ITEM
  // ==============================================================

  useItem(
    itemId: string
  ): boolean {

    const item =
      this.getItem(itemId);


    // ------------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------------

    if (!item) {

      console.warn(
        'Cannot use item. Item not found:',
        itemId
      );

      return false;

    }


    if (!item.usable) {

      console.warn(
        'Item is not usable:',
        item.name
      );

      return false;

    }


    if (
      item.quantity <= 0
    ) {

      return false;

    }


    // ------------------------------------------------------------
    // APPLY BUFF
    // ------------------------------------------------------------

    if (item.buff) {

      this.buffService.addBuff(
        item.buff
      );

    }


    // ------------------------------------------------------------
    // REMOVE ONE ITEM
    // ------------------------------------------------------------

    this.removeItem(
      itemId,
      1
    );


    console.log(
      '🧪 USED ITEM:',
      item.name
    );


    return true;

  }

  addBerry(amount: number): void {

    const berry = this.getItem('berry');

    if (!berry) {

      console.warn(
        'Berry item does not exist in inventory.'
      );

      return;

    }

    berry.quantity += amount;

  }

}