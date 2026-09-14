import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';

import { LanguageService } from '../../../../services/language/language.service';
import { InventoryItem, ItemCategory, ItemId } from '../../buffs/buff.model';
import { InventoryService } from './inventory.service';

type InventoryFilter = ItemCategory | 'all';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})

export class Inventory {

  @Output() closeInventory = new EventEmitter<void>();

  private readonly inventoryService = inject(InventoryService);
  private readonly languageService = inject(LanguageService);

  readonly text = computed(() => this.languageService.t().game);

  readonly filters: InventoryFilter[] = [
    'all',
    'weapons',
    'armor',
    'potions',
    'items',
    'collectables',
  ];

  readonly activeFilter = signal<InventoryFilter>('all');
  readonly selectedId = signal<ItemId | null>(null);
  readonly message = signal('');

  readonly totalSlots = 30;

  readonly visibleItems = computed(() => {
    const filter = this.activeFilter();
    const items = this.inventoryService.items();

    return filter === 'all'
      ? items
      : items.filter(item => item.category === filter);
  });

  /** Empty slots keep the grid full even when few items are carried. */
  readonly emptySlots = computed(() =>
    Array(Math.max(0, this.totalSlots - this.visibleItems().length))
  );

  readonly selectedItem = computed<InventoryItem | null>(() => {
    const id = this.selectedId();

    if (!id) {
      return null;
    }

    return this.inventoryService.items().find(item => item.id === id) ?? null;
  });

  carryingLabel(item: InventoryItem): string {
    return this.text().inventory.carrying.replace('{count}', String(item.quantity));
  }

  selectFilter(filter: InventoryFilter): void {
    this.activeFilter.set(filter);
    this.message.set('');
  }

  selectItem(item: InventoryItem): void {
    this.selectedId.set(item.id);
    this.message.set('');
  }

  useItem(): void {
    const item = this.selectedItem();

    if (!item) {
      return;
    }

    this.message.set(this.inventoryService.use(item.id));

    if (!this.selectedItem()) {
      this.selectedId.set(null);
    }
  }

  dropItem(): void {
    const item = this.selectedItem();

    if (!item) {
      return;
    }

    this.inventoryService.drop(item.id);
    this.message.set(this.text().inventory.dropped);

    if (!this.selectedItem()) {
      this.selectedId.set(null);
    }
  }
}
