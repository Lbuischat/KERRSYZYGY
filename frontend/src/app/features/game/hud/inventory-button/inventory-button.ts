import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory-button',
  imports: [],
  templateUrl: './inventory-button.html',
  styleUrl: './inventory-button.css',
})
export class InventoryButton {
  @Output() inventoryClicked = new EventEmitter<void>();

  openInventory(): void {
    console.log('🎒 INVENTORY BUTTON CLICKED');
    this.inventoryClicked.emit();
  }
}