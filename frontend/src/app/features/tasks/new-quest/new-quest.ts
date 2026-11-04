
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountSessionService } from '../../../services/account-session.service';

type QuestMode = 'normal' | 'focus';
type QuestDifficulty = 'easy' | 'medium' | 'hard';
type DateMode = 'today' | 'specific';
type JournalType = 'active' | 'fulfilled' | 'wrapped';

interface QuestReward {
  xp: number;
  credits: number;
  shopXp: number;
}

interface QuestFormModel {
  name: string;
  details: string;
  mode: QuestMode;
  difficulty: QuestDifficulty;
  focusMinutes: number;
  dateMode: DateMode;
  dueDate: string;
}

export interface PlayerQuest {
  id: number;
  icon: string;
  name: string;
  details: string;
  mode: QuestMode;
  difficulty: QuestDifficulty;
  reward: number;
  credits: number;
  shopXp: number;
  completed: boolean;
  archived: boolean;
  createdAt: number;
  completedAt?: number;
  dueDate?: string;
  durationSeconds?: number;
}

interface WeeklySummary {
  completed: number;
  xp: number;
  credits: number;
  shopXp: number;
}

// =========================================
// REWARD RULES
// =========================================

const QUEST_REWARDS: Record<QuestDifficulty, QuestReward> = {
  easy: {
    xp: 15,
    credits: 30,
    shopXp: 10
  },
  medium: {
    xp: 30,
    credits: 60,
    shopXp: 20
  },
  hard: {
    xp: 60,
    credits: 120,
    shopXp: 40
  }
};

@Component({
  selector: 'app-new-quest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-quest.html',
  styleUrl: './new-quest.css'
})
export class NewQuest implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly accountSession = inject(AccountSessionService);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private get storageKey(): string {
    return this.accountSession.storageKey('playerQuests');
  }

  // =========================================
  // FORM
  // =========================================

  model: QuestFormModel = {
    name: '',
    details: '',
    mode: 'normal',
    difficulty: 'easy',
    focusMinutes: 5,
    dateMode: 'today',
    dueDate: this.todayKey()
  };

  readonly focusOptions = [2, 5, 10, 15, 20, 30];

  editingId: number | null = null;

  successMessage = '';

  // =========================================
  // REACTIVE DIFFICULTY
  // =========================================

  readonly selectedDifficulty = signal<QuestDifficulty>('easy');

  readonly rewardState = computed<QuestReward>(() => {
    return QUEST_REWARDS[this.selectedDifficulty()];
  });

  get rewardPreview(): QuestReward {
    return this.rewardState();
  }

  selectDifficulty(difficulty: QuestDifficulty): void {
    // Atualiza o Signal que controla a recompensa.
    this.selectedDifficulty.set(difficulty);

    // Atualiza o modelo usado pelo HTML.
    this.model = {
      ...this.model,
      difficulty
    };
  }

  // =========================================
  // JOURNAL STATE
  // =========================================

  selectedJournal: JournalType = 'active';

  expandedQuestId: number | null = null;

  showAll = false;

  private quests: PlayerQuest[] = [];

  private successTimer?: ReturnType<typeof setTimeout>;

  // =========================================
  // LIFECYCLE
  // =========================================

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.loadQuests();
  }

  ngOnDestroy(): void {
    if (this.successTimer) {
      clearTimeout(this.successTimer);
    }
  }

  // =========================================
  // DATES
  // =========================================

  get minDate(): string {
    return this.todayKey();
  }

  private todayKey(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // =========================================
  // CREATE / UPDATE QUEST
  // =========================================

  saveQuest(form: NgForm): void {
    if (!this.isBrowser) return;

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const name = this.model.name.trim();

    if (!name) return;

    // Recompensa calculada pela dificuldade
    // selecionada de verdade, não por valor fixo.
    const difficulty = this.selectedDifficulty();

    const rewards = QUEST_REWARDS[difficulty];

    const dueDate =
      this.model.dateMode === 'today'
        ? this.todayKey()
        : this.model.dueDate;

    const durationSeconds =
      this.model.mode === 'focus'
        ? this.model.focusMinutes * 60
        : undefined;

    // =====================================
    // UPDATE EXISTING QUEST
    // =====================================

    if (this.editingId !== null) {
      this.quests = this.quests.map(quest => {
        if (quest.id !== this.editingId) {
          return quest;
        }

        return {
          ...quest,
          name,
          details: this.model.details.trim(),
          mode: this.model.mode,
          difficulty,
          reward: rewards.xp,
          credits: rewards.credits,
          shopXp: rewards.shopXp,
          dueDate,
          durationSeconds,
          icon: this.model.mode === 'focus' ? '◎' : '✦'
        };
      });

      this.showSuccess('QUEST UPDATED');
    }

    // =====================================
    // CREATE NEW QUEST
    // =====================================

    else {
      const newQuest: PlayerQuest = {
        id: Date.now(),
        icon: this.model.mode === 'focus' ? '◎' : '✦',
        name,
        details: this.model.details.trim(),
        mode: this.model.mode,
        difficulty,
        reward: rewards.xp,
        credits: rewards.credits,
        shopXp: rewards.shopXp,
        completed: false,
        archived: false,
        createdAt: Date.now(),
        dueDate,
        durationSeconds
      };

      this.quests = [
        ...this.quests,
        newQuest
      ];

      this.showSuccess('QUEST CREATED');
    }

    this.saveQuests();

    this.resetForm();
    form.resetForm(this.model);
  }

  // =========================================
  // EDIT QUEST
  // =========================================

  editQuest(quest: PlayerQuest): void {
    if (quest.completed) return;

    this.editingId = quest.id;

    this.model = {
      name: quest.name,
      details: quest.details,
      mode: quest.mode,
      difficulty: quest.difficulty,

      focusMinutes: quest.durationSeconds
        ? Math.round(quest.durationSeconds / 60)
        : 5,

      dateMode:
        quest.dueDate && quest.dueDate !== this.todayKey()
          ? 'specific'
          : 'today',

      dueDate: quest.dueDate ?? this.todayKey()
    };

    // Sincroniza a dificuldade ao editar.
    this.selectedDifficulty.set(quest.difficulty);

    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  // =========================================
  // RESET FORM
  // =========================================

  private resetForm(): void {
    this.editingId = null;

    this.model = {
      name: '',
      details: '',
      mode: 'normal',
      difficulty: 'easy',
      focusMinutes: 5,
      dateMode: 'today',
      dueDate: this.todayKey()
    };

    this.selectedDifficulty.set('easy');
  }

  // =========================================
  // JOURNAL FILTERS
  // =========================================

  get activeQuests(): PlayerQuest[] {
    return this.quests
      .filter(quest => !quest.completed && !quest.archived)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  get fulfilledQuests(): PlayerQuest[] {
    return this.quests
      .filter(quest => quest.completed && !quest.archived)
      .sort(
        (a, b) =>
          (b.completedAt ?? 0) - (a.completedAt ?? 0)
      );
  }

  get wrappedQuests(): PlayerQuest[] {
    return this.quests
      .filter(quest => quest.archived)
      .sort(
        (a, b) =>
          (b.completedAt ?? 0) - (a.completedAt ?? 0)
      );
  }

  selectJournal(tab: JournalType): void {
    this.selectedJournal = tab;
    this.expandedQuestId = null;
    this.showAll = false;
  }

  get journalQuests(): PlayerQuest[] {
    let quests: PlayerQuest[];

    switch (this.selectedJournal) {
      case 'fulfilled':
        quests = this.fulfilledQuests;
        break;

      case 'wrapped':
        quests = this.wrappedQuests;
        break;

      default:
        quests = this.activeQuests;
    }

    return this.showAll
      ? quests
      : quests.slice(0, 5);
  }

  get currentJournalTotal(): number {
    switch (this.selectedJournal) {
      case 'fulfilled':
        return this.fulfilledQuests.length;

      case 'wrapped':
        return this.wrappedQuests.length;

      default:
        return this.activeQuests.length;
    }
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  toggleQuestDetails(questId: number): void {
    this.expandedQuestId =
      this.expandedQuestId === questId
        ? null
        : questId;
  }

  // =========================================
  // DELETE ACTIVE QUEST
  // =========================================

  deleteQuest(questId: number): void {
    this.quests = this.quests.filter(
      quest => quest.id !== questId
    );

    this.saveQuests();

    this.expandedQuestId = null;

    this.showSuccess('QUEST REMOVED');
  }

  // =========================================
  // ARCHIVE QUEST
  // =========================================

  archiveQuest(questId: number): void {
    this.quests = this.quests.map(quest =>
      quest.id === questId
        ? {
            ...quest,
            archived: true
          }
        : quest
    );

    this.saveQuests();

    this.selectedJournal = 'wrapped';
    this.expandedQuestId = null;
  }

  // =========================================
  // RESTORE ARCHIVED QUEST
  // =========================================

  restoreQuest(questId: number): void {
    this.quests = this.quests.map(quest =>
      quest.id === questId
        ? {
            ...quest,
            archived: false
          }
        : quest
    );

    this.saveQuests();

    this.selectedJournal = 'fulfilled';
    this.expandedQuestId = null;
  }

  // =========================================
  // DELETE HISTORY
  // =========================================

  deleteHistoryQuest(questId: number): void {
    this.quests = this.quests.filter(
      quest => quest.id !== questId
    );

    this.saveQuests();

    this.expandedQuestId = null;
  }

  // =========================================
  // WEEKLY SUMMARY
  // =========================================

  get weeklySummary(): WeeklySummary {
    const weekStart =
      Date.now() - 7 * 24 * 60 * 60 * 1000;

    const completedQuests = this.quests.filter(
      quest =>
        quest.completed &&
        (quest.completedAt ?? 0) >= weekStart
    );

    return completedQuests.reduce<WeeklySummary>(
      (total, quest) => ({
        completed: total.completed + 1,
        xp: total.xp + quest.reward,
        credits: total.credits + quest.credits,
        shopXp: total.shopXp + quest.shopXp
      }),
      {
        completed: 0,
        xp: 0,
        credits: 0,
        shopXp: 0
      }
    );
  }

  // =========================================
  // LOCAL STORAGE
  // =========================================

  private loadQuests(): void {
    if (!this.isBrowser) return;

    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      this.quests = [];
      return;
    }

    try {
      const saved: unknown = JSON.parse(raw);

      this.quests = Array.isArray(saved)
        ? saved.map(quest => this.normalizeQuest(quest))
        : [];
    } catch {
      console.warn('Erro ao carregar missões.');
      this.quests = [];
    }
  }

  private normalizeQuest(raw: any): PlayerQuest {
    const difficulty: QuestDifficulty =
      raw?.difficulty === 'medium' ||
      raw?.difficulty === 'hard'
        ? raw.difficulty
        : 'easy';

    const rewards = QUEST_REWARDS[difficulty];

    const completed = Boolean(raw?.completed);

    // Missões ativas recebem os valores corretos
    // conforme a dificuldade.
    //
    // Missões já concluídas preservam seus valores
    // históricos para não alterar o relatório passado.
    const historicalValue = (
      value: unknown,
      fallback: number
    ): number => {
      if (value === undefined || value === null) {
        return fallback;
      }

      const parsed = Number(value);

      return Number.isFinite(parsed)
        ? Math.max(0, parsed)
        : fallback;
    };

    return {
      id: Number(raw?.id) || Date.now(),
      icon: raw?.icon ?? '✦',
      name: raw?.name ?? raw?.title ?? 'Unnamed Quest',
      details: raw?.details ?? '',
      mode: raw?.mode === 'focus' ? 'focus' : 'normal',
      difficulty,

      reward: completed
        ? historicalValue(raw?.reward, rewards.xp)
        : rewards.xp,

      credits: completed
        ? historicalValue(raw?.credits, rewards.credits)
        : rewards.credits,

      shopXp: completed
        ? historicalValue(raw?.shopXp, rewards.shopXp)
        : rewards.shopXp,

      completed,
      archived: Boolean(raw?.archived),
      createdAt: Number(raw?.createdAt) || Date.now(),

      completedAt: raw?.completedAt
        ? Number(raw.completedAt)
        : undefined,

      dueDate: raw?.dueDate ?? this.todayKey(),

      durationSeconds: raw?.durationSeconds
        ? Number(raw.durationSeconds)
        : undefined
    };
  }

  private saveQuests(): void {
    if (!this.isBrowser) return;

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.quests)
    );
  }

  // =========================================
  // SUCCESS FEEDBACK
  // =========================================

  private showSuccess(message: string): void {
    this.successMessage = message;

    if (this.successTimer) {
      clearTimeout(this.successTimer);
    }

    this.successTimer = setTimeout(() => {
      this.successMessage = '';
    }, 2400);
  }

  // =========================================
  // NAVIGATION
  // =========================================

  backToGame(): void {
    void this.router.navigate(['/game']);
  }
}
