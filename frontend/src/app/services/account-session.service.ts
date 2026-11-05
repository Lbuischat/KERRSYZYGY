
import { isPlatformBrowser } from '@angular/common';

import {
  Injectable,
  PLATFORM_ID,
  inject,
  signal
} from '@angular/core';

interface SessionInfo {
  accountId: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountSessionService {

  private readonly platformId = inject(PLATFORM_ID);

  private readonly sessionKey =
    'kerrsyzygy-current-account';

  private readonly initialSession =
    this.readSession();

  // =========================================
  // CURRENT ACCOUNT
  // =========================================

  readonly accountId = signal<string | null>(
    this.initialSession?.accountId ?? null
  );

  readonly accountName = signal<string>(
    this.initialSession?.username ?? ''
  );

  // =========================================
  // ACTIVATE AFTER BACKEND LOGIN
  // =========================================

  activateFromBackend(response: unknown): boolean {

    if (!response || typeof response !== 'object') {
      return false;
    }

    const user =
      response as Record<string, unknown>;

    const mongoId =
      user['id'] ?? user['_id'];

    const googleId =
      user['sub'];

    let accountId: string | null = null;

    // MongoDB user
    if (
      typeof mongoId === 'string' &&
      /^[a-zA-Z0-9_-]{1,100}$/.test(mongoId)
    ) {
      accountId = `mongo-${mongoId}`;
    }

    // Google user
    else if (
      typeof googleId === 'string' &&
      /^[a-zA-Z0-9_-]{1,100}$/.test(googleId)
    ) {
      accountId = `google-${googleId}`;
    }

    if (!accountId) {
      return false;
    }

    const username =
      typeof user['username'] === 'string'
        ? user['username'].trim()
        : typeof user['name'] === 'string'
          ? user['name'].trim()
          : '';

    const session: SessionInfo = {
      accountId,
      username
    };

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        this.sessionKey,
        JSON.stringify(session)
      );
    }

    this.accountId.set(accountId);
    this.accountName.set(username);

    return true;
  }

  // =========================================
  // STORAGE SEPARADO POR CONTA
  // =========================================

  storageKey(baseKey: string): string {
    const id = this.accountId() ?? 'guest';

    return `${baseKey}:${id}`;
  }

  // =========================================
  // VERIFICAR SE FINALIZOU O START
  // =========================================

  hasCompletedStart(): boolean {

    if (
      !isPlatformBrowser(this.platformId) ||
      !this.accountId()
    ) {
      return false;
    }

    const key = this.storageKey(
      'start-completed'
    );

    return localStorage.getItem(key) === 'true';
  }

  // =========================================
  // CONFIRMAR O PERSONAGEM
  // =========================================

  markStartCompleted(): void {

    if (
      !isPlatformBrowser(this.platformId) ||
      !this.accountId()
    ) {
      return;
    }

    const key = this.storageKey(
      'start-completed'
    );

    localStorage.setItem(key, 'true');
  }

  // =========================================
  // END SESSION
  // =========================================

  endSession(): void {

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(
        this.sessionKey
      );
    }

    this.accountId.set(null);
    this.accountName.set('');
  }

  // =========================================
  // RESTORE SAVED SESSION
  // =========================================

  private readSession(): SessionInfo | null {

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const saved =
      sessionStorage.getItem(this.sessionKey);

    if (!saved) {
      return null;
    }

    // Compatibilidade com a implementação antiga,
    // que salvava apenas o ID como texto.
    if (this.validAccountId(saved)) {
      return {
        accountId: saved,
        username: ''
      };
    }

    try {
      const data: unknown = JSON.parse(saved);

      if (!data || typeof data !== 'object') {
        return null;
      }

      const session = data as Record<string, unknown>;

      if (!this.validAccountId(session['accountId'])) {
        return null;
      }

      return {
        accountId: session['accountId'],
        username:
          typeof session['username'] === 'string'
            ? session['username']
            : ''
      };
    } catch {
      return null;
    }
  }

  private validAccountId(
    value: unknown
  ): value is string {

    return (
      typeof value === 'string' &&
      /^(mongo|google)-[a-zA-Z0-9_-]{1,100}$/.test(value)
    );
  }
}
