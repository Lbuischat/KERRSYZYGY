
import { isPlatformBrowser } from '@angular/common';

import {
  Component,
  ElementRef,
  Input,
  PLATFORM_ID,
  ViewChild,
  inject,
  isDevMode
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AccountSessionService
} from '../../../services/account-session.service';

import {
  PlayerService
} from '../../../services/player.service';

interface EditableProfile {
  username: string;
  gender: string;
  pronouns: string;
  birthday: string;
  language: string;
  bio: string;
}

@Component({
  selector: 'app-profile-flow-controls',
  standalone: true,
  imports: [FormsModule],

  template: `
    @if (mode === 'edit') {
      <button
        type="button"
        class="outline-button"
        (click)="openEditor()"
      >
        ✎ EDITAR INFORMAÇÕES
      </button>

      <dialog #editDialog class="edit-dialog">
        <div class="dialog-heading">
          <div>
            <span class="eyebrow">PERSONAL DOSSIER</span>
            <h2>Editar informações</h2>
          </div>

          <button
            type="button"
            class="close-button"
            (click)="cancel()"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <form
          class="edit-form"
          (ngSubmit)="saveChanges()"
        >
          <label>
            <span>Nome do jogador</span>
            <input
              type="text"
              name="username"
              required
              maxlength="30"
              [(ngModel)]="draft.username"
            />
          </label>

          <label>
            <span>Gênero</span>
            <input
              type="text"
              name="gender"
              required
              maxlength="40"
              [(ngModel)]="draft.gender"
            />
          </label>

          <label>
            <span>Pronomes</span>
            <input
              type="text"
              name="pronouns"
              required
              maxlength="40"
              [(ngModel)]="draft.pronouns"
            />
          </label>

          <label>
            <span>Data de nascimento</span>
            <input
              type="date"
              name="birthday"
              required
              [max]="today"
              [(ngModel)]="draft.birthday"
            />
          </label>

          <label>
            <span>Idioma</span>
            <select
              name="language"
              required
              [(ngModel)]="draft.language"
            >
              <option value="Português">Português</option>
              <option value="English">English</option>
              <option value="日本語">日本語</option>
              <option value="Español">Español</option>
            </select>
          </label>

          <label class="full-width">
            <span>Biografia</span>
            <textarea
              name="bio"
              rows="4"
              maxlength="500"
              [(ngModel)]="draft.bio"
            ></textarea>
          </label>

          @if (error) {
            <p class="error-text" role="alert">
              {{ error }}
            </p>
          }

          <footer class="dialog-actions">
            <button
              type="button"
              class="outline-button"
              (click)="cancel()"
            >
              CANCELAR
            </button>

            <button
              type="submit"
              class="primary-button"
            >
              SALVAR ALTERAÇÕES
            </button>
          </footer>
        </form>
      </dialog>
    }

    @if (mode === 'confirm') {
      <div class="confirm-wrap">
        @if (error) {
          <p class="error-text" role="alert">
            {{ error }}
          </p>
        }

        <button
          type="button"
          class="primary-button"
          (click)="confirmCharacter()"
        >
          {{
            startCompleted
              ? 'SALVAR E VOLTAR AO GAME'
              : 'CONFIRMAR PERSONAGEM E JOGAR'
          }}

          <span>→</span>
        </button>
      </div>
    }
  `,

  styles: [`
    :host {
      display: block;
      font-family: inherit;
    }

    button, input, textarea, select {
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    .outline-button,
    .primary-button {
      min-height: 40px;
      padding: 10px 14px;
      border: 1px solid rgba(170, 180, 220, .3);
      background: rgba(255, 255, 255, .05);
      color: #eaeaf6;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .06em;
    }

    .outline-button:hover {
      background: rgba(255, 255, 255, .12);
    }

    .primary-button {
      background: #4e4a8e;
      border-color: #7776bd;
    }

    .primary-button:hover {
      background: #635caa;
    }

    .confirm-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .confirm-wrap .primary-button {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .edit-dialog {
      box-sizing: border-box;
      width: min(660px, calc(100vw - 28px));
      max-height: 90vh;
      overflow-y: auto;
      padding: 24px;
      border: 1px solid #38405a;
      background: #0d111b;
      color: #f2f2fa;
      box-shadow: 0 24px 80px #0009;
    }

    .edit-dialog::backdrop {
      background: rgba(0, 0, 0, .8);
      backdrop-filter: blur(5px);
    }

    .dialog-heading {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 22px;
    }

    .dialog-heading h2 {
      margin: 6px 0 0;
      font-size: 24px;
      font-weight: 500;
    }

    .eyebrow {
      color: #9c9bbc;
      font-size: 10px;
      letter-spacing: .16em;
    }

    .close-button {
      border: 0;
      background: none;
      color: #ddd;
      font-size: 26px;
    }

    .edit-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 7px;
      min-width: 0;
    }

    label span {
      color: #b7b8c8;
      font-size: 10px;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    input, textarea, select {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #41465b;
      background: #171b29;
      color: white;
      color-scheme: dark;
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: 1px solid #aaa6ef;
    }

    .full-width,
    .dialog-actions,
    .error-text {
      grid-column: 1 / -1;
    }

    textarea {
      resize: vertical;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 9px;
      flex-wrap: wrap;
    }

    .error-text {
      color: #ffb7c0;
      font-size: 12px;
      margin: 0;
    }

    @media (max-width: 560px) {
      .edit-dialog {
        padding: 16px;
      }

      .edit-form {
        grid-template-columns: 1fr;
      }

      .confirm-wrap .primary-button {
        width: 100%;
      }
    }
  `]
})
export class ProfileFlowControls {
  @Input() mode: 'edit' | 'confirm' = 'edit';
  @Input() selectedCharacter = '';

  @ViewChild('editDialog')
  editDialog?: ElementRef<HTMLDialogElement>;

  readonly session = inject(AccountSessionService);

  private readonly playerService = inject(PlayerService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  draft: EditableProfile = this.readProfile();
  error = '';

  get today(): string {
    const now = new Date();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      now.getDate()
    ).padStart(2, '0');

    return `${now.getFullYear()}-${month}-${day}`;
  }

  get startCompleted(): boolean {
    if (this.session.accountId()) {
      return this.session.hasCompletedStart();
    }

    if (
      isPlatformBrowser(this.platformId) &&
      isDevMode()
    ) {
      return localStorage.getItem(
        this.session.storageKey('start-completed')
      ) === 'true';
    }

    return false;
  }

  // =========================================
  // EDITAR DADOS
  // =========================================

  openEditor(): void {
    this.error = '';
    this.draft = this.readProfile();

    this.editDialog?.nativeElement.showModal();
  }

  cancel(): void {
    this.error = '';

    this.editDialog?.nativeElement.close();
  }

  saveChanges(): void {
    const name = this.draft.username.trim();
    const gender = this.draft.gender.trim();
    const pronouns = this.draft.pronouns.trim();
    const language = this.draft.language.trim();

    if (
      !name ||
      !gender ||
      !pronouns ||
      !language ||
      !this.validBirthday(this.draft.birthday)
    ) {
      this.error =
        'Preencha todos os campos e informe uma data válida.';
      return;
    }

    Object.assign(this.playerService.profile, {
      username: name,
      gender,
      pronouns,
      birthday: this.draft.birthday,
      language,
      bio: this.draft.bio.trim()
    });

    this.playerService.saveProfile();
    this.cancel();
  }

  // =========================================
  // CONFIRMAR PERSONAGEM
  // =========================================

  confirmCharacter(): void {
    this.error = '';

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Em produção, exige login.
    // No ng serve, permite jogador de demonstração.
    const hasAccount = !!this.session.accountId();

    if (!hasAccount && !isDevMode()) {
      this.error =
        'Faça login antes de confirmar o personagem.';
      return;
    }

    const profile = this.playerService.profile;

    if (
      !profile.username?.trim() ||
      !profile.gender?.trim() ||
      !profile.pronouns?.trim() ||
      !this.validBirthday(
        this.toIsoDate(profile.birthday)
      )
    ) {
      this.error =
        'Confira nome, gênero, pronomes e aniversário em EDITAR INFORMAÇÕES.';
      return;
    }

    // Salva o personagem escolhido no carrossel.
    profile.characterName =
      this.selectedCharacter ||
      profile.characterName ||
      'Aether';

    this.playerService.saveProfile();

    if (hasAccount) {
      // Conta real: progresso separado por usuário.
      this.session.markStartCompleted();
    } else {
      // Demonstração local: não cria login falso.
      localStorage.setItem(
        this.session.storageKey('start-completed'),
        'true'
      );
    }

    void this.router.navigateByUrl('/game');
  }

  // =========================================
  // LER DADOS
  // =========================================

  private readProfile(): EditableProfile {
    const profile = this.playerService.profile;

    return {
      username: profile.username || '',
      gender: profile.gender || '',
      pronouns: profile.pronouns || '',
      birthday: this.toIsoDate(
        profile.birthday || ''
      ),
      language: profile.language || 'Português',
      bio: profile.bio || ''
    };
  }

  private toIsoDate(value: string): string {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const match =
      /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

    return match
      ? `${match[3]}-${match[2]}-${match[1]}`
      : '';
  }

  private validBirthday(value: string): boolean {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      value > this.today
    ) {
      return false;
    }

    const [year, month, day] =
      value.split('-').map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }
}
