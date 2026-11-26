
import {
  Component,
  HostListener,
  OnDestroy,
  inject,
  signal
} from '@angular/core';

import {
  InventoryService
} from '../../../../services/Inventory/inventory.service';

import {
  QuickbarService,
  type QuickbarSlot
} from '../../../../services/Inventory/quickbar.service';

import type {
  InventoryItem
} from '../inventory/inventory-item.model';

@Component({
  selector: 'app-quickbar',
  standalone: true,
  imports: [],
  templateUrl: './quickbar.html',
  styleUrl: './quickbar.css'
})
export class Quickbar implements OnDestroy {

  readonly quickbar = inject(QuickbarService);

  private readonly inventory = inject(InventoryService);

  readonly selecting = signal<QuickbarSlot | null>(null);

  readonly feedback = signal('');

  private messageTimeout?: ReturnType<typeof setTimeout>;

  // Itens disponíveis para equipar.
  get availableItems(): InventoryItem[] {
    this.inventory.revision();

    return this.inventory.getItems().filter(
      item => item.usable && item.quantity > 0
    );
  }

  // Item atualmente associado a um slot.
  getItem(index: QuickbarSlot): InventoryItem | undefined {
    this.inventory.revision();

    return this.quickbar.getAssignedItem(index);
  }

  // Clicar no slot abre ou fecha o seletor.
  chooseSlot(index: QuickbarSlot): void {
    this.selecting.set(
      this.selecting() === index ? null : index
    );
  }

  // Equipar item selecionado.
  equip(itemId: string): void {
    const slot = this.selecting();

    if (slot === null) {
      return;
    }

    if (this.quickbar.assign(slot, itemId)) {
      this.selecting.set(null);
      this.quickbar.dismissTutorial();

      this.message(
        'Item equipado no atalho ' + (slot + 1)
      );
    }
  }

  // Retira o item apenas da hotbar.
  unequip(index: QuickbarSlot): void {
    this.quickbar.clear(index);
    this.selecting.set(null);
  }

  // Utiliza o consumível, quando permitido.
  use(index: QuickbarSlot): void {
    const item = this.getItem(index);

    if (!item) {
      this.message(
        'Slot vazio — clique e selecione um item'
      );
      return;
    }

    if (this.quickbar.use(index)) {
      this.message(item.name + ' utilizado');
    } else {
      this.message(
        'Não é possível usar ' + item.name + ' agora'
      );
    }
  }

  // ==========================================
  // TECLAS 1, 2 E 3 DA FILEIRA SUPERIOR
  // ==========================================

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {

    if (
      event.repeat ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey
    ) {
      return;
    }

    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    // Não usar itens quando estiver digitando.
    if (
      event.target.closest(
        'input,textarea,select,[contenteditable="true"]'
      )
    ) {
      return;
    }

    // Não consumir itens com o inventário aberto.
    if (document.querySelector('app-inventory')) {
      return;
    }

    const keys: Record<string, QuickbarSlot> = {
      Digit1: 0,
      Digit2: 1,
      Digit3: 2
    };

    // event.code diferencia Digit1 de Numpad1.
    const slot = keys[event.code];

    if (slot === undefined) {
      return;
    }

    event.preventDefault();

    if (this.selecting() !== null) {
      return;
    }

    this.use(slot);
  }

  private message(message: string): void {
    this.feedback.set(message);

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(
      () => this.feedback.set(''),
      2000
    );
  }

  ngOnDestroy(): void {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }
}
