
import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  inject,
  signal
} from '@angular/core';

export interface FocusSessionData {
  questId: number;
  questTitle: string;
  startedAt: number;
  endsAt: number;
  durationSeconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class FocusSessionService {
  private readonly platformId = inject(PLATFORM_ID);

  // Mantém a chave usada anteriormente pelo projeto.
  private readonly storageKey = 'active-focus-session';

  // Guarda uma conclusão que ainda precisa ser processada.
  private readonly finishedKey = 'finished-focus-quest-id';

  readonly session = signal<FocusSessionData | null>(null);

  readonly finishedQuestId = signal<number | null>(null);

  private readonly clock = signal(Date.now());

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    if (!this.isBrowser) return;

    this.restoreSession();
    this.restoreFinishedQuest();

    // O serviço continua acompanhando o timer mesmo
    // quando o componente visual não é atualizado.
    this.timer = setInterval(() => {
      this.checkExpired();
    }, 250);
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get active(): boolean {
    return this.session() !== null;
  }

  // =========================================
  // START
  // =========================================

  start(
    questId: number,
    questTitle: string,
    durationSeconds: number
  ): boolean {
    if (!this.isBrowser) return false;

    this.checkExpired();

    if (this.active) {
      return false;
    }

    const duration = Math.max(
      1,
      Math.floor(durationSeconds)
    );

    const now = Date.now();

    const newSession: FocusSessionData = {
      questId,
      questTitle,
      startedAt: now,
      endsAt: now + duration * 1000,
      durationSeconds: duration
    };

    this.session.set(newSession);
    this.clock.set(now);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(newSession)
    );

    return true;
  }

  // =========================================
  // RESTORE
  // =========================================

  private restoreSession(): void {
    const raw = localStorage.getItem(this.storageKey);

    if (!raw) return;

    try {
      const saved = JSON.parse(raw);

      const questId = Number(saved.questId);
      const startedAt = Number(saved.startedAt);
      const endsAt = Number(saved.endsAt);

      if (
        !Number.isFinite(questId) ||
        !Number.isFinite(startedAt) ||
        !Number.isFinite(endsAt) ||
        endsAt <= startedAt
      ) {
        localStorage.removeItem(this.storageKey);
        return;
      }

      const restored: FocusSessionData = {
        questId,
        questTitle: String(saved.questTitle ?? 'Focus Quest'),
        startedAt,
        endsAt,
        durationSeconds: Math.max(
          1,
          Number(saved.durationSeconds) ||
            Math.ceil((endsAt - startedAt) / 1000)
        )
      };

      this.session.set(restored);

      // Se o tempo terminou enquanto a página estava
      // fechada ou atualizando, finaliza imediatamente.
      this.checkExpired();
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }

  private restoreFinishedQuest(): void {
    const raw = localStorage.getItem(this.finishedKey);

    if (raw === null) return;

    const id = Number(raw);

    if (Number.isFinite(id)) {
      this.finishedQuestId.set(id);
    } else {
      localStorage.removeItem(this.finishedKey);
    }
  }

  // =========================================
  // COUNTDOWN
  // =========================================

  remainingMilliseconds(): number {
    // Faz o Angular acompanhar o relógio do serviço.
    this.clock();

    const current = this.session();

    if (!current) return 0;

    return Math.max(
      0,
      current.endsAt - Date.now()
    );
  }

  progressPercent(): number {
    const current = this.session();

    if (!current) return 0;

    const total = current.endsAt - current.startedAt;

    if (total <= 0) return 100;

    const remaining = this.remainingMilliseconds();

    return Math.min(
      100,
      Math.max(0, ((total - remaining) / total) * 100)
    );
  }

  checkExpired(): void {
    const current = this.session();

    if (!current) return;

    this.clock.set(Date.now());

    if (Date.now() >= current.endsAt) {
      this.finish();
    }
  }

  // =========================================
  // FINISH
  // =========================================

  finish(): void {
    const current = this.session();

    if (!current) return;

    const completedId = current.questId;

    // Primeiro registra qual missão terminou.
    if (this.isBrowser) {
      localStorage.setItem(
        this.finishedKey,
        String(completedId)
      );

      localStorage.removeItem(this.storageKey);
    }

    // Fechar a sessão remove automaticamente o overlay.
    this.session.set(null);

    // O TaskPanel observa este Signal e conclui a quest.
    this.finishedQuestId.set(completedId);
  }

  // =========================================
  // ACKNOWLEDGE
  // =========================================

  acknowledgeFinishedQuest(questId: number): void {
    if (this.finishedQuestId() !== questId) {
      return;
    }

    this.finishedQuestId.set(null);

    if (this.isBrowser) {
      localStorage.removeItem(this.finishedKey);
    }
  }
}
