import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  @Output() closeInventory = new EventEmitter<void>();
}