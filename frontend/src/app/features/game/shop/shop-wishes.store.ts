
import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  effect,
  inject,
  signal
} from '@angular/core';

import { AccountSessionService } from
  '../../../services/account-session.service';

@Injectable({
  providedIn: 'root'
})
export class ShopWishesStore {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly accountSession = inject(AccountSessionService);

  readonly ids = signal<string[]>([]);
  readonly feedback = signal('');

  private feedbackTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // Carrega os desejos sempre que muda de conta.
    effect(() => {
      this.accountSession.accountId();

      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.ids.set(this.readSavedIds());
    });
  }

  isSaved(id: string): boolean {
    return this.ids().includes(id);
  }

  toggle(id: string, name: string): void {
    if (!id.trim()) return;

    const currentlySaved = this.isSaved(id);

    this.ids.update(current =>
      currentlySaved
        ? current.filter(itemId => itemId !== id)
        : [...current, id]
    );

    this.persist();

    this.showFeedback(
      currentlySaved
        ? `${name} removido dos Wishes.`
        : `✦ ${name} adicionado aos Wishes!`
    );
  }

  private getStorageKey(): string {
    return this.accountSession.storageKey('shop-wishes');
  }

  private readSavedIds(): string[] {
    try {
      const current = localStorage.getItem(
        this.getStorageKey()
      );

      if (current) {
        return this.validIds(JSON.parse(current));
      }

      // Compatibilidade com favoritos de uma
      // versão anterior da loja, se existirem.
      const oldShopState =
        localStorage.getItem(
          this.accountSession.storageKey('game-shop-state')
        ) ??
        localStorage.getItem('game-shop-state');

      if (!oldShopState) return [];

      const parsed: unknown = JSON.parse(oldShopState);

      if (
        !parsed ||
        typeof parsed !== 'object'
      ) {
        return [];
      }

      const oldIds = (
        parsed as Record<string, unknown>
      )['wishlistIds'];

      return this.validIds(oldIds);
    } catch {
      return [];
    }
  }

  private validIds(value: unknown): string[] {
    if (!Array.isArray(value)) return [];

    return [...new Set(
      value.filter(
        (id): id is string =>
          typeof id === 'string' &&
          id.trim().length > 0
      )
    )];
  }

  private persist(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(
        this.getStorageKey(),
        JSON.stringify(this.ids())
      );
    } catch (error) {
      console.warn(
        'Não foi possível salvar os Wishes.',
        error
      );
    }
  }

  private showFeedback(message: string): void {
    this.feedback.set(message);

    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }

    this.feedbackTimer = setTimeout(() => {
      this.feedback.set('');
    }, 2000);
  }
}
