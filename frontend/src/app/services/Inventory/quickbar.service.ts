
import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  effect,
  inject,
  signal
} from '@angular/core';

import { AccountSessionService } from '../account-session.service';
import { InventoryService } from './inventory.service';

export type QuickbarSlot = 0 | 1 | 2;

@Injectable({
  providedIn: 'root'
})
export class QuickbarService {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly accountSession = inject(AccountSessionService);
  private readonly inventory = inject(InventoryService);

  // Os três slots começam vazios.
  // Só recebem itens quando o jogador os escolhe.
  readonly slots = signal<(string | null)[]>([
    null,
    null,
    null
  ]);

  readonly tutorialVisible = signal(true);

  constructor() {
    // Recupera os slots salvos da conta ativa.
    effect(() => {
      this.accountSession.accountId();
      this.load();
    });
  }

  getAssignedItem(index: QuickbarSlot) {
    const itemId = this.slots()[index];

    return itemId
      ? this.inventory.getItem(itemId)
      : undefined;
  }

  // Equipar um item em um dos três slots.
  assign(index: QuickbarSlot, itemId: string): boolean {
    const item = this.inventory.getItem(itemId);

    if (
      !item ||
      !item.usable ||
      item.quantity < 1
    ) {
      return false;
    }

    const next = [...this.slots()];

    // O mesmo item não ocupa dois atalhos.
    for (let i = 0; i < next.length; i++) {
      if (
        i !== index &&
        next[i] === itemId
      ) {
        next[i] = null;
      }
    }

    next[index] = itemId;

    this.slots.set(next);
    this.save();

    return true;
  }

  // Retira um item do slot, sem descartá-lo.
  clear(index: QuickbarSlot): void {
    const next = [...this.slots()];

    next[index] = null;

    this.slots.set(next);
    this.save();
  }

  // Utiliza o item do slot.
  use(index: QuickbarSlot): boolean {
    const itemId = this.slots()[index];

    if (!itemId) {
      return false;
    }

    return this.inventory.useItem(itemId);
  }

  dismissTutorial(): void {
    this.tutorialVisible.set(false);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(
      this.accountSession.storageKey('quickbar-help-seen'),
      '1'
    );
  }

  showTutorial(): void {
    this.tutorialVisible.set(true);
  }

  // Recupera dados salvos ou mantém os slots vazios.
  private load(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const raw = localStorage.getItem(
        this.accountSession.storageKey('quickbar-slots-v1')
      );

      const data: unknown = raw
        ? JSON.parse(raw)
        : null;

      const clean = Array.isArray(data)
        ? [0, 1, 2].map(index =>
            typeof data[index] === 'string'
              ? data[index]
              : null
          )
        : [null, null, null];

      this.slots.set(clean);

      this.tutorialVisible.set(
        localStorage.getItem(
          this.accountSession.storageKey('quickbar-help-seen')
        ) !== '1'
      );

    } catch {
      this.slots.set([null, null, null]);
      this.tutorialVisible.set(true);
    }
  }

  // Salva por conta, sem misturar jogadores.
  private save(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(
        this.accountSession.storageKey('quickbar-slots-v1'),
        JSON.stringify(this.slots())
      );

    } catch (error) {
      console.warn(
        'Não foi possível salvar a hotbar:',
        error
      );
    }
  }
}
