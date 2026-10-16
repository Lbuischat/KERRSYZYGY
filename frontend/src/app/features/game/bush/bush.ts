import { Component, input } from '@angular/core';
import { InventoryService } from '../../../services/Inventory/inventory.service';

@Component({
  selector: 'app-bush',
  imports: [],
  templateUrl: './bush.html',
  styleUrl: './bush.css',
})
export class Bush {

  readonly x = input(0);
  readonly y = input(0);
  readonly harvested = input(false);

  constructor(
    private inventoryService: InventoryService
  ) { }

  getPosition(): { x: number; y: number } {

    return {
      x: this.x(),
      y: this.y(),
    };

  }

  harvest(berries: number): void {

    this.inventoryService.addBerry(berries);

  }

}