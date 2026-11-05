
import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';

import {
  FocusSessionService
} from '../../../services/tasks/focus-session';

@Component({
  selector: 'app-focus-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './focus-mode.html',
  styleUrl: './focus-mode.css'
})
export class FocusMode implements OnInit, OnDestroy {
  readonly focusService = inject(FocusSessionService);

  private readonly cdr = inject(ChangeDetectorRef);

  private interval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    // Verifica imediatamente, inclusive depois de F5.
    this.updateTimer();

    this.interval = setInterval(() => {
      this.updateTimer();
    }, 250);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // =========================================
  // TIMER
  // =========================================

  updateTimer(): void {
    this.focusService.checkExpired();

    // Garante que o contador e a saída do overlay
    // sejam refletidos mesmo em Angular zoneless.
    this.cdr.detectChanges();
  }

  get minutes(): string {
    const seconds = Math.ceil(
      this.focusService.remainingMilliseconds() / 1000
    );

    return String(Math.floor(seconds / 60)).padStart(2, '0');
  }

  get seconds(): string {
    const totalSeconds = Math.ceil(
      this.focusService.remainingMilliseconds() / 1000
    );

    return String(totalSeconds % 60).padStart(2, '0');
  }

  get progress(): number {
    return this.focusService.progressPercent();
  }

  // =========================================
  // FINISH
  // =========================================

  finishFocus(): void {
    this.focusService.finish();
    this.cdr.detectChanges();
  }

  // =========================================
  // GAME INPUT LOCK
  // =========================================

  @HostListener('document:keydown', ['$event'])
  blockKeyboard(event: KeyboardEvent): void {
    if (!this.focusService.active) return;

    // Permite atualizar a página: a sessão é restaurada.
    if (
      event.key === 'F5' ||
      (event.ctrlKey && event.key.toLowerCase() === 'r')
    ) {
      return;
    }

    const blocked = [
      'w', 'a', 's', 'd',
      'i', 'q', 'e', 'f',
      'shift', ' ',
      'arrowup',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'escape'
    ];

    if (blocked.includes(event.key.toLowerCase())) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  blockMouse(event: MouseEvent): void {
    if (!this.focusService.active) return;

    event.stopPropagation();
  }
}
