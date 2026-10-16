
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject
} from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from '../../../services/player.service';
import { FocusSessionService } from '../../../services/tasks/focus-session';

type Difficulty = 'easy' | 'medium' | 'hard';
type QuestMode = 'normal' | 'focus';

interface Reward {
  xp: number;
  credits: number;
  shopXp: number;
}

interface DailyTemplate {
  id: number;
  icon: string;
  name: string;
  details: string;
  difficulty: Difficulty;
}

interface DailyQuest extends DailyTemplate {
  reward: number;
  credits: number;
  shopXp: number;
}

interface PlayerQuest {
  id: number;
  icon: string;
  name: string;
  details: string;
  mode: QuestMode;
  difficulty: Difficulty;
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

interface RewardFeedback {
  title: string;
  xp: number;
  credits: number;
  shopXp: number;
}

@Component({
  selector: 'app-task-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-panel.html',
  styleUrl: './task-panel.css'
})
export class TaskPanel implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly playerService = inject(PlayerService);
  private readonly focusService = inject(FocusSessionService);

  readonly maxDaily = 10;
  readonly maxDailyChanges = 3;

  // Mantém os dados atuais: não reinicia seu progresso.
  private readonly dailyVersion = '3';

  private readonly versionKey = 'quests-daily-version';
  private readonly dateKey = 'quests-daily-date';
  private readonly countKey = 'quests-daily-completed';
  private readonly changesKey = 'quests-daily-changes';
  private readonly orderKey = 'quests-daily-order';

  private readonly playerQuestKey = 'playerQuests';
  private readonly playerSlotsKey = 'quests-player-slots';

  dailyCompletedCount = 0;
  dailyChanges = 0;
  private dailyOrder: number[] = [];

  rewardBusy = false;
  feedback: RewardFeedback | null = null;

  private feedbackTimer?: ReturnType<typeof setTimeout>;
  private dailyCheckTimer?: ReturnType<typeof setInterval>;

  playerQuests: PlayerQuest[] = [];
  playerSlotIds: (number | null)[] = [null, null];

  // =========================================
  // DAILY QUESTS
  // =========================================

  private readonly dailyTemplates: DailyTemplate[] = [
    {
      id: 1,
      icon: '💧',
      name: 'Drink Water',
      details: 'Take a short break and drink some water.',
      difficulty: 'easy'
    },
    {
      id: 2,
      icon: '📖',
      name: 'Read for 10 Minutes',
      details: 'Read something useful for ten minutes.',
      difficulty: 'easy'
    },
    {
      id: 3,
      icon: '🧹',
      name: 'Clean Your Space',
      details: 'Organize your desk or study area.',
      difficulty: 'easy'
    },
    {
      id: 4,
      icon: '📚',
      name: 'Study Session',
      details: 'Complete one focused study session.',
      difficulty: 'medium'
    },
    {
      id: 5,
      icon: '✍️',
      name: 'Write Your Notes',
      details: 'Review and write down what you learned.',
      difficulty: 'medium'
    },
    {
      id: 6,
      icon: '🎯',
      name: 'Complete One Goal',
      details: 'Finish one important objective today.',
      difficulty: 'medium'
    },
    {
      id: 7,
      icon: '🚶',
      name: 'Take a Break',
      details: 'Move around and clear your mind.',
      difficulty: 'easy'
    },
    {
      id: 8,
      icon: '⭐',
      name: 'Finish a Difficult Task',
      details: 'Complete something you have been postponing.',
      difficulty: 'hard'
    },
    {
      id: 9,
      icon: '🧠',
      name: 'Deep Study',
      details: 'Complete a challenging learning objective.',
      difficulty: 'hard'
    },
    {
      id: 10,
      icon: '🏆',
      name: 'Final Daily Mission',
      details: 'Complete your final mission of the day.',
      difficulty: 'hard'
    }
  ];

  // =========================================
  // FOCUS COMPLETION LISTENER
  // =========================================

  constructor() {
    effect(() => {
      const finishedId = this.focusService.finishedQuestId();

      if (finishedId === null) return;

      // Espera o ciclo de renderização atual terminar.
      // O overlay já recebe session() === null.
      setTimeout(() => {
        this.finishFocusQuest(finishedId);
      }, 0);
    });
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.prepareDaily();
    this.loadPlayerQuests();
    this.restorePlayerSlots();

    // Verifica o dia mesmo se a página ficar aberta.
    this.dailyCheckTimer = setInterval(() => {
      if (localStorage.getItem(this.dateKey) !== this.todayKey()) {
        this.prepareDaily();
        this.cdr.markForCheck();
      }
    }, 60_000);

    // Recupera uma sessão concluída durante um F5.
    const pendingId = this.focusService.finishedQuestId();

    if (pendingId !== null) {
      this.finishFocusQuest(pendingId);
    }
  }

  ngOnDestroy(): void {
    if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
    if (this.dailyCheckTimer) clearInterval(this.dailyCheckTimer);
  }

  // =========================================
  // REWARDS
  // =========================================

  private rewardForDaily(difficulty: Difficulty): Reward {
    switch (difficulty) {
      case 'medium':
        return { xp: 20, credits: 40, shopXp: 10 };
      case 'hard':
        return { xp: 40, credits: 80, shopXp: 20 };
      default:
        return { xp: 10, credits: 20, shopXp: 5 };
    }
  }

  private rewardForPlayer(difficulty: Difficulty): Reward {
    switch (difficulty) {
      case 'medium':
        return { xp: 30, credits: 60, shopXp: 20 };
      case 'hard':
        return { xp: 60, credits: 120, shopXp: 40 };
      default:
        return { xp: 15, credits: 30, shopXp: 10 };
    }
  }

  // =========================================
  // DAILY STORAGE
  // =========================================

  private prepareDaily(): void {
    const today = this.todayKey();

    const savedVersion = localStorage.getItem(this.versionKey);
    const savedDate = localStorage.getItem(this.dateKey);

    if (savedVersion !== this.dailyVersion || savedDate !== today) {
      this.resetDailyDay();

      localStorage.setItem(this.versionKey, this.dailyVersion);
      localStorage.setItem(this.dateKey, today);
    }

    this.dailyCompletedCount = Math.max(
      0,
      Math.min(
        10,
        Number(localStorage.getItem(this.countKey)) || 0
      )
    );

    this.dailyChanges = Math.max(
      0,
      Math.min(
        3,
        Number(localStorage.getItem(this.changesKey)) || 0
      )
    );

    this.loadDailyOrder();
  }

  private resetDailyDay(): void {
    this.dailyCompletedCount = 0;
    this.dailyChanges = 0;
    this.dailyOrder = this.createDailyOrder();

    localStorage.setItem(this.countKey, '0');
    localStorage.setItem(this.changesKey, '0');

    localStorage.setItem(
      this.orderKey,
      JSON.stringify(this.dailyOrder)
    );
  }

  private createDailyOrder(): number[] {
    const ids = this.dailyTemplates.map(quest => quest.id);

    for (let i = ids.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[random]] = [ids[random], ids[i]];
    }

    return ids;
  }

  private loadDailyOrder(): void {
    const raw = localStorage.getItem(this.orderKey);

    if (raw) {
      try {
        const ids: unknown = JSON.parse(raw);

        if (
          Array.isArray(ids) &&
          ids.length === 10 &&
          new Set(ids).size === 10 &&
          ids.every(
            id =>
              Number.isInteger(id) &&
              id >= 1 &&
              id <= 10
          )
        ) {
          this.dailyOrder = ids as number[];
          return;
        }
      } catch {
        // Gera outra ordem se o storage estiver inválido.
      }
    }

    this.dailyOrder = this.createDailyOrder();

    localStorage.setItem(
      this.orderKey,
      JSON.stringify(this.dailyOrder)
    );
  }

  // =========================================
  // CURRENT DAILY
  // =========================================

  get dailyQuest(): DailyQuest | null {
    if (this.dailyCompletedCount >= this.maxDaily) {
      return null;
    }

    const templateId = this.dailyOrder[this.dailyCompletedCount];

    const template = this.dailyTemplates.find(
      quest => quest.id === templateId
    );

    if (!template) return null;

    const reward = this.rewardForDaily(template.difficulty);

    return {
      ...template,
      reward: reward.xp,
      credits: reward.credits,
      shopXp: reward.shopXp
    };
  }

  // =========================================
  // COMPLETE DAILY
  // =========================================

  completeDaily(): void {
    if (!this.isBrowser || this.focusActive) return;

    if (localStorage.getItem(this.dateKey) !== this.todayKey()) {
      this.prepareDaily();
    }

    const quest = this.dailyQuest;

    if (!quest || this.dailyCompletedCount >= this.maxDaily) {
      return;
    }

    // Salva a conclusão imediatamente.
    this.dailyCompletedCount++;

    localStorage.setItem(
      this.countKey,
      String(this.dailyCompletedCount)
    );

    // Atualização imediata no HUD.
    this.playerService.applyRewards({
      xp: quest.reward,
      credits: quest.credits,
      shopXp: quest.shopXp
    });

    this.showFeedback(
      `MISSÃO ${this.dailyCompletedCount}/10 CONCLUÍDA!`,
      quest.reward,
      quest.credits,
      quest.shopXp
    );

    // O getter dailyQuest agora retorna a próxima missão.
    this.cdr.markForCheck();
  }

  // =========================================
  // SWAP DAILY
  // =========================================

  changeDailyQuest(): void {
    if (!this.isBrowser || this.focusActive) return;

    if (
      this.dailyCompletedCount >= this.maxDaily ||
      this.dailyCompletedCount >= 9 ||
      this.dailyChanges >= this.maxDailyChanges
    ) {
      return;
    }

    const index = this.dailyCompletedCount;

    const remaining = this.dailyOrder.length - index - 1;

    if (remaining <= 0) return;

    const random =
      index + 1 + Math.floor(Math.random() * remaining);

    [this.dailyOrder[index], this.dailyOrder[random]] = [
      this.dailyOrder[random],
      this.dailyOrder[index]
    ];

    this.dailyChanges++;

    localStorage.setItem(
      this.changesKey,
      String(this.dailyChanges)
    );

    localStorage.setItem(
      this.orderKey,
      JSON.stringify(this.dailyOrder)
    );

    this.cdr.markForCheck();
  }

  // =========================================
  // PLAYER QUEST STORAGE
  // =========================================

  private loadPlayerQuests(): void {
    const raw = localStorage.getItem(this.playerQuestKey);

    if (!raw) {
      this.playerQuests = [];
      return;
    }

    try {
      const data: unknown = JSON.parse(raw);

      if (!Array.isArray(data)) {
        this.playerQuests = [];
        return;
      }

      this.playerQuests = data.map(rawQuest => {
        const difficulty: Difficulty =
          rawQuest.difficulty === 'medium' ||
          rawQuest.difficulty === 'hard'
            ? rawQuest.difficulty
            : 'easy';

        const standardReward = this.rewardForPlayer(difficulty);
        const completed = Boolean(rawQuest.completed);

        return {
          id: Number(rawQuest.id),
          icon: rawQuest.icon ?? '✦',
          name: rawQuest.name ?? rawQuest.title ?? 'Quest',
          details: rawQuest.details ?? '',
          mode: rawQuest.mode === 'focus' ? 'focus' : 'normal',
          difficulty,

          // Recompensas corretas para missões ativas.
          // Mantém os valores antigos do histórico concluído.
          reward: completed
            ? Number(rawQuest.reward ?? standardReward.xp)
            : standardReward.xp,

          credits: completed
            ? Number(rawQuest.credits ?? standardReward.credits)
            : standardReward.credits,

          shopXp: completed
            ? Number(rawQuest.shopXp ?? standardReward.shopXp)
            : standardReward.shopXp,

          completed,
          archived: Boolean(rawQuest.archived),
          createdAt: Number(rawQuest.createdAt) || Date.now(),
          completedAt: rawQuest.completedAt
            ? Number(rawQuest.completedAt)
            : undefined,
          dueDate: rawQuest.dueDate,
          durationSeconds: rawQuest.durationSeconds
            ? Number(rawQuest.durationSeconds)
            : undefined
        } as PlayerQuest;
      });

      this.savePlayerQuests();
    } catch {
      console.warn('Erro ao carregar playerQuests.');
      this.playerQuests = [];
    }
  }

  private savePlayerQuests(): void {
    if (!this.isBrowser) return;

    localStorage.setItem(
      this.playerQuestKey,
      JSON.stringify(this.playerQuests)
    );
  }

  get activePlayerQuests(): PlayerQuest[] {
    return this.playerQuests
      .filter(quest => !quest.completed && !quest.archived)
      .sort((a, b) => a.createdAt - b.createdAt);
  }

  get playerSlots(): (PlayerQuest | null)[] {
    const active = this.activePlayerQuests;

    return this.playerSlotIds.map(id =>
      id === null
        ? null
        : active.find(quest => quest.id === id) ?? null
    );
  }

  private restorePlayerSlots(): void {
    const raw = localStorage.getItem(this.playerSlotsKey);

    if (raw) {
      try {
        const ids = JSON.parse(raw);

        this.playerSlotIds = [
          ids?.[0] ?? null,
          ids?.[1] ?? null
        ];
      } catch {
        this.playerSlotIds = [null, null];
      }
    }

    this.ensurePlayerSlots();
  }

  private ensurePlayerSlots(): void {
    const active = this.activePlayerQuests;

    for (let slot = 0; slot < 2; slot++) {
      const currentId = this.playerSlotIds[slot];
      const otherId = this.playerSlotIds[slot === 0 ? 1 : 0];

      const exists =
        currentId !== null &&
        currentId !== otherId &&
        active.some(quest => quest.id === currentId);

      if (exists) continue;

      const nextQuest = active.find(
        quest => quest.id !== otherId
      );

      this.playerSlotIds[slot] = nextQuest?.id ?? null;
    }

    localStorage.setItem(
      this.playerSlotsKey,
      JSON.stringify(this.playerSlotIds)
    );
  }

  // =========================================
  // COMPLETE PLAYER QUEST
  // =========================================

  completePlayerQuest(
    quest: PlayerQuest,
    fromFocus = false
  ): void {
    if (!this.isBrowser || quest.completed) return;

    // Focus não pode ser concluído manualmente.
    if (quest.mode === 'focus' && !fromFocus) return;

    if (this.focusActive && !fromFocus) return;

    // Marca antes de pagar a recompensa para
    // impedir cliques ou eventos duplicados.
    quest.completed = true;
    quest.completedAt = Date.now();
    quest.archived = false;

    this.savePlayerQuests();
    this.ensurePlayerSlots();

    // XP, créditos e Shop XP imediatamente.
    this.playerService.applyRewards({
      xp: quest.reward,
      credits: quest.credits,
      shopXp: quest.shopXp
    });

    this.showFeedback(
      'MISSÃO CONCLUÍDA!',
      quest.reward,
      quest.credits,
      quest.shopXp
    );

    this.cdr.markForCheck();
  }

  // =========================================
  // FOCUS
  // =========================================

  get focusActive(): boolean {
    return this.focusService.active;
  }

  get activeFocusQuestId(): number | null {
    return this.focusService.session()?.questId ?? null;
  }

  startFocusQuest(quest: PlayerQuest): void {
    if (this.focusActive || quest.completed) return;
    if (quest.mode !== 'focus') return;

    this.focusService.start(
      quest.id,
      quest.name,
      quest.durationSeconds ?? 120
    );
  }

  private finishFocusQuest(questId: number): void {
    if (!this.isBrowser) return;

    // Recupera o estado atualizado depois do timer.
    this.loadPlayerQuests();

    const quest = this.playerQuests.find(
      item => item.id === questId
    );

    if (!quest) {
      console.warn(
        'Focus concluído, mas missão não encontrada:',
        questId
      );
      return;
    }

    // Se já foi concluída antes, não paga novamente.
    if (quest.completed) {
      this.focusService.acknowledgeFinishedQuest(questId);
      return;
    }

    this.completePlayerQuest(quest, true);

    // Só remove a conclusão pendente quando a
    // missão realmente foi marcada como concluída.
    this.focusService.acknowledgeFinishedQuest(questId);
  }

  // =========================================
  // PLAYER SLOT SWAP
  // =========================================

  showAnother(slot: number): void {
    if (!this.isBrowser || this.focusActive) return;
    if (slot !== 0 && slot !== 1) return;

    const quests = this.activePlayerQuests;

    if (quests.length <= 1) return;

    const otherSlot = slot === 0 ? 1 : 0;

    const otherId = this.playerSlotIds[otherSlot];
    const currentId = this.playerSlotIds[slot];

    const candidates = quests.filter(
      quest => quest.id !== otherId
    );

    if (!candidates.length) return;

    const currentIndex = candidates.findIndex(
      quest => quest.id === currentId
    );

    const nextIndex =
      currentIndex < 0
        ? 0
        : (currentIndex + 1) % candidates.length;

    this.playerSlotIds[slot] = candidates[nextIndex].id;

    localStorage.setItem(
      this.playerSlotsKey,
      JSON.stringify(this.playerSlotIds)
    );

    this.cdr.markForCheck();
  }

  // =========================================
  // FEEDBACK
  // =========================================

  private showFeedback(
    title: string,
    xp: number,
    credits: number,
    shopXp: number
  ): void {
    this.feedback = {
      title,
      xp,
      credits,
      shopXp
    };

    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }

    this.feedbackTimer = setTimeout(() => {
      this.feedback = null;
      this.cdr.markForCheck();
    }, 1800);
  }

  // =========================================
  // NAVIGATION
  // =========================================

  openNewQuest(): void {
    if (this.focusActive) return;

    void this.router.navigate(['/new-quest']);
  }

  difficultyLabel(difficulty: Difficulty): string {
    switch (difficulty) {
      case 'medium':
        return 'MÉDIO';

      case 'hard':
        return 'DURO';

      default:
        return 'FÁCIL';
    }
  }

  private todayKey(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
