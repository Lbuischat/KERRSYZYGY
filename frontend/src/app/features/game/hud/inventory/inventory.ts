import {
  Component,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import {
  InventoryItem,
  ItemCategory
} from './inventory-item.model';

import {
  InventoryService
} from '../../../../services/Inventory/inventory.service';


// ================================================================
// INVENTORY COMPONENT
// ================================================================

@Component({
  selector: 'app-inventory',

  imports: [],

  templateUrl: './inventory.html',

  styleUrl: './inventory.css',
})
export class Inventory {


  // ==============================================================
  // EVENTS
  // ==============================================================

  @Output()
  closeInventory =
    new EventEmitter<void>();


  // ==============================================================
  // FILTER
  // ==============================================================

  activeFilter:
    | 'all'
    | ItemCategory =
    'all';


  // ==============================================================
  // SELECTED ITEM
  // ==============================================================

  selectedItem:
    InventoryItem |
    null =
    null;


  // ==============================================================
  // CONSTRUCTOR
  // ==============================================================

  constructor(
    private inventoryService:
      InventoryService
  ) { }


  // ==============================================================
  // GET FILTERED ITEMS
  // ==============================================================

  get filteredItems(): InventoryItem[] {

    const items =
      this.inventoryService
        .getItems();


    if (
      this.activeFilter ===
      'all'
    ) {

      return items;

    }


    return items.filter(
      item =>
        item.category ===
        this.activeFilter
    );

  }


  // ==============================================================
  // INVENTORY SLOTS
  // ==============================================================

  get slots(): (
    InventoryItem |
    null
  )[] {

    const items =
      this.filteredItems;

    const slots:
      (
        InventoryItem |
        null
      )[] = [];


    for (
      let i = 0;
      i < 30;
      i++
    ) {

      slots.push(
        items[i] ?? null
      );

    }


    return slots;

  }


  // ==============================================================
  // FILTER
  // ==============================================================

  selectFilter(
    filter:
      'all'
      | ItemCategory
  ): void {

    this.activeFilter =
      filter;

    /*
     * Don't leave an item selected if
     * it disappears because of the filter.
     */

    if (
      this.selectedItem &&
      !this.filteredItems.some(
        item =>
          item.id ===
          this.selectedItem?.id
      )
    ) {

      this.selectedItem =
        null;

    }

  }


  // ==============================================================
  // SELECT ITEM
  // ==============================================================

  selectItem(
    item:
      InventoryItem |
      null
  ): void {

    this.selectedItem =
      item;

  }


  // ==============================================================
  // USE ITEM
  // ==============================================================

  useItem(): void {

    if (
      !this.selectedItem
    ) {

      return;

    }


    const itemId =
      this.selectedItem.id;


    const success =
      this.inventoryService.useItem(
        itemId
      );


    if (!success) {

      return;

    }


    /*
     * Refresh the selected item.
     *
     * If its quantity reached zero,
     * remove it from the selected panel.
     */

    const updatedItem =
      this.inventoryService.getItem(
        itemId
      );


    this.selectedItem =
      updatedItem ?? null;

  }


  // ==============================================================
  // DROP ITEM
  // ==============================================================

  dropItem(): void {

    if (
      !this.selectedItem
    ) {

      return;

    }


    const itemId =
      this.selectedItem.id;


    const success =
      this.inventoryService.removeItem(
        itemId,
        1
      );


    if (!success) {

      return;

    }


    const updatedItem =
      this.inventoryService.getItem(
        itemId
      );


    this.selectedItem =
      updatedItem ?? null;

  }

  // ==============================================================
  // CLOSE
  // ==============================================================

  close(): void {

    this.closeInventory.emit();

  }

  // ================================================================
  // KEYBOARD
  // ================================================================

  @HostListener(
    'document:keydown',
    ['$event']
  )
  onKeyDown(
    event: KeyboardEvent
  ): void {

    if (
      event.key === 'Escape'
    ) {

      event.preventDefault();

      this.close();

    }

  }



}