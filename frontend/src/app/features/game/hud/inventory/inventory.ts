import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})

export class Inventory {

  @Output() closeInventory = new EventEmitter<void>();

  activeFilter = 'all';

  selectedItem: any = null;

  slots = Array(30);

  selectFilter(filter: string): void {
    this.activeFilter = filter;
  }

  dropItem(): void {
    console.log('Drop item');
  }

  useItem(): void {
    console.log('Use item');
  }
}