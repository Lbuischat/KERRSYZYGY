import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import {
  FormsModule,
  NgForm
} from '@angular/forms';

import {
  Router
} from '@angular/router';


type QuestMode =
  | 'normal'
  | 'focus';


type QuestDifficulty =
  | 'easy'
  | 'medium'
  | 'hard';


type DateMode =
  | 'today'
  | 'specific';


type JournalType =
  | 'active'
  | 'fulfilled'
  | 'wrapped';


interface QuestReward {
  xp: number;
  credits: number;
  shopXp: number;
}


interface QuestFormModel {
  name: string;
  details: string;

  mode:
    QuestMode;

  difficulty:
    QuestDifficulty;

  focusMinutes:
    number;

  dateMode:
    DateMode;

  dueDate:
    string;
}


export interface PlayerQuest {
  id: number;

  icon: string;

  name: string;

  details: string;

  mode:
    QuestMode;

  difficulty:
    QuestDifficulty;

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


@Component({
  selector:
    'app-new-quest',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './new-quest.html',

  styleUrl:
    './new-quest.css'
})
export class NewQuest
  implements OnInit {

  private readonly router =
    inject(Router);


  private readonly platformId =
    inject(PLATFORM_ID);


  private readonly storageKey =
    'playerQuests';


  model:
    QuestFormModel = {

      name: '',

      details: '',

      mode:
        'normal',

      difficulty:
        'easy',

      focusMinutes:
        5,

      dateMode:
        'today',

      dueDate:
        this.todayKey()

    };


  readonly focusOptions = [
    2,
    5,
    10,
    15,
    20,
    30
  ];


  editingId:
    number | null =
    null;


  successMessage =
    '';


  selectedJournal:
    JournalType =
    'active';


  expandedQuestId:
    number | null =
    null;


  showAll =
    false;


  private quests:
    PlayerQuest[] =
    [];


  private successTimer:
    ReturnType<typeof setTimeout> | null =
    null;


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit():
    void {

    if (
      !this.isBrowser
    ) {

      return;

    }


    this.loadQuests();

  }


  private get isBrowser():
    boolean {

    return isPlatformBrowser(
      this.platformId
    );

  }


  // =====================================================
  // REWARD TABLE
  // =====================================================

  private getReward(
    difficulty:
      QuestDifficulty
  ): QuestReward {

    const table:
      Record<
        QuestDifficulty,
        QuestReward
      > = {

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


    return table[
      difficulty
    ];

  }


  get rewardPreview():
    QuestReward {

    return this.getReward(
      this.model.difficulty
    );

  }


  // =====================================================
  // DIFFICULTY
  // =====================================================

  selectDifficulty(
    difficulty:
      QuestDifficulty
  ): void {

    this.model.difficulty =
      difficulty;

  }


  // =====================================================
  // DATE
  // =====================================================

  get minDate():
    string {

    return this.todayKey();

  }


  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  saveQuest(
    form:
      NgForm
  ): void {

    if (
      !this.isBrowser
    ) {

      return;

    }


    if (
      form.invalid
    ) {

      form.control
        .markAllAsTouched();


      return;

    }


    const name =
      this.model
        .name
        .trim();


    if (!name) {

      return;

    }


    const reward =
      this.getReward(
        this.model.difficulty
      );


    const dueDate =

      this.model.dateMode ===
        'today'

        ? this.todayKey()

        : this.model.dueDate;


    const durationSeconds =

      this.model.mode ===
        'focus'

        ? this.model.focusMinutes *
          60

        : undefined;


    // ===================================================
    // UPDATE
    // ===================================================

    if (
      this.editingId !==
      null
    ) {

      this.quests =
        this.quests.map(
          quest => {

            if (
              quest.id !==
              this.editingId
            ) {

              return quest;

            }


            return {

              ...quest,

              name,

              details:
                this.model
                  .details
                  .trim(),

              mode:
                this.model.mode,

              difficulty:
                this.model.difficulty,

              reward:
                reward.xp,

              credits:
                reward.credits,

              shopXp:
                reward.shopXp,

              dueDate,

              durationSeconds,

              icon:

                this.model.mode ===
                  'focus'

                  ? '◎'

                  : '✦'

            };

          }
        );


      this.showSuccess(
        'QUEST UPDATED'
      );

    }


    // ===================================================
    // CREATE
    // ===================================================

    else {

      const newQuest:
        PlayerQuest = {

          id:
            Date.now(),

          icon:

            this.model.mode ===
              'focus'

              ? '◎'

              : '✦',

          name,

          details:
            this.model
              .details
              .trim(),

          mode:
            this.model.mode,

          difficulty:
            this.model.difficulty,

          reward:
            reward.xp,

          credits:
            reward.credits,

          shopXp:
            reward.shopXp,

          completed:
            false,

          archived:
            false,

          createdAt:
            Date.now(),

          dueDate,

          durationSeconds

        };


      this.quests = [

        ...this.quests,

        newQuest

      ];


      this.showSuccess(
        'QUEST CREATED'
      );

    }


    this.saveQuests();


    this.resetForm();


    form.resetForm(
      this.model
    );

  }


  // =====================================================
  // EDIT
  // =====================================================

  editQuest(
    quest:
      PlayerQuest
  ): void {

    if (
      quest.completed
    ) {

      return;

    }


    this.editingId =
      quest.id;


    this.model = {

      name:
        quest.name,

      details:
        quest.details,

      mode:
        quest.mode,

      difficulty:
        quest.difficulty,

      focusMinutes:

        quest.durationSeconds

          ? Math.round(
              quest.durationSeconds /
              60
            )

          : 5,

      dateMode:

        quest.dueDate &&
        quest.dueDate !==
          this.todayKey()

          ? 'specific'

          : 'today',

      dueDate:
        quest.dueDate ??
        this.todayKey()

    };


    window.scrollTo({

      top:
        0,

      behavior:
        'smooth'

    });

  }


  cancelEdit():
    void {

    this.resetForm();

  }


  // =====================================================
  // JOURNAL
  // =====================================================

  get activeQuests():
    PlayerQuest[] {

    return this.quests

      .filter(
        quest =>
          !quest.completed &&
          !quest.archived
      )

      .sort(
        (
          a,
          b
        ) =>
          b.createdAt -
          a.createdAt
      );

  }


  get fulfilledQuests():
    PlayerQuest[] {

    return this.quests

      .filter(
        quest =>
          quest.completed &&
          !quest.archived
      )

      .sort(
        (
          a,
          b
        ) =>
          (
            b.completedAt ??
            0
          )
          -
          (
            a.completedAt ??
            0
          )
      );

  }


  get wrappedQuests():
    PlayerQuest[] {

    return this.quests

      .filter(
        quest =>
          quest.archived
      )

      .sort(
        (
          a,
          b
        ) =>
          (
            b.completedAt ??
            0
          )
          -
          (
            a.completedAt ??
            0
          )
      );

  }


  selectJournal(
    tab:
      JournalType
  ): void {

    this.selectedJournal =
      tab;


    this.expandedQuestId =
      null;


    this.showAll =
      false;

  }


  get journalQuests():
    PlayerQuest[] {

    let quests:
      PlayerQuest[];


    if (
      this.selectedJournal ===
      'fulfilled'
    ) {

      quests =
        this.fulfilledQuests;

    }

    else if (
      this.selectedJournal ===
      'wrapped'
    ) {

      quests =
        this.wrappedQuests;

    }

    else {

      quests =
        this.activeQuests;

    }


    return this.showAll

      ? quests

      : quests.slice(
          0,
          5
        );

  }


  get currentJournalTotal():
    number {

    if (
      this.selectedJournal ===
      'fulfilled'
    ) {

      return this
        .fulfilledQuests
        .length;

    }


    if (
      this.selectedJournal ===
      'wrapped'
    ) {

      return this
        .wrappedQuests
        .length;

    }


    return this
      .activeQuests
      .length;

  }


  toggleShowAll():
    void {

    this.showAll =
      !this.showAll;

  }


  toggleQuestDetails(
    questId:
      number
  ): void {

    this.expandedQuestId =

      this.expandedQuestId ===
        questId

        ? null

        : questId;

  }


  // =====================================================
  // DELETE
  // =====================================================

  deleteQuest(
    questId:
      number
  ): void {

    this.quests =
      this.quests.filter(
        quest =>
          quest.id !==
          questId
      );


    this.saveQuests();


    this.expandedQuestId =
      null;


    this.showSuccess(
      'QUEST REMOVED'
    );

  }


  // =====================================================
  // ARCHIVE
  // =====================================================

  archiveQuest(
    questId:
      number
  ): void {

    this.quests =
      this.quests.map(
        quest =>

          quest.id ===
            questId

            ? {

                ...quest,

                archived:
                  true

              }

            : quest
      );


    this.saveQuests();


    this.selectedJournal =
      'wrapped';


    this.expandedQuestId =
      null;

  }


  // =====================================================
  // RESTORE
  // =====================================================

  restoreQuest(
    questId:
      number
  ): void {

    this.quests =
      this.quests.map(
        quest =>

          quest.id ===
            questId

            ? {

                ...quest,

                archived:
                  false

              }

            : quest
      );


    this.saveQuests();


    this.selectedJournal =
      'fulfilled';


    this.expandedQuestId =
      null;

  }


  // =====================================================
  // DELETE HISTORY
  // =====================================================

  deleteHistoryQuest(
    questId:
      number
  ): void {

    this.quests =
      this.quests.filter(
        quest =>
          quest.id !==
          questId
      );


    this.saveQuests();


    this.expandedQuestId =
      null;

  }


  // =====================================================
  // WEEK
  // =====================================================

  get weeklySummary():
    WeeklySummary {

    const limit =
      Date.now() -
      (
        7 *
        24 *
        60 *
        60 *
        1000
      );


    const completed =
      this.quests.filter(
        quest =>

          quest.completed &&

          (
            quest.completedAt ??
            0
          ) >=
          limit
      );


    return completed.reduce<WeeklySummary>(

      (
        total,
        quest
      ) => ({

        completed:
          total.completed +
          1,

        xp:
          total.xp +
          quest.reward,

        credits:
          total.credits +
          quest.credits,

        shopXp:
          total.shopXp +
          quest.shopXp

      }),

      {

        completed:
          0,

        xp:
          0,

        credits:
          0,

        shopXp:
          0

      }

    );

  }


  // =====================================================
  // BACK
  // =====================================================

  backToGame():
    void {

    this.router.navigate([
      '/game'
    ]);

  }


  // =====================================================
  // STORAGE
  // =====================================================

  private loadQuests():
    void {

    const raw =
      localStorage.getItem(
        this.storageKey
      );


    if (!raw) {

      this.quests =
        [];


      return;

    }


    try {

      const saved =
        JSON.parse(
          raw
        );


      this.quests =
        Array.isArray(
          saved
        )

          ? saved.map(
              quest =>
                this.normalizeQuest(
                  quest
                )
            )

          : [];

    } catch {

      this.quests =
        [];

    }

  }


  private normalizeQuest(
    raw:
      any
  ): PlayerQuest {

    const difficulty:
      QuestDifficulty =

      raw?.difficulty ===
        'medium' ||

      raw?.difficulty ===
        'hard'

        ? raw.difficulty

        : 'easy';


    /*
     * IMPORTANTE:
     * quests antigas também recebem
     * a recompensa correta da dificuldade.
     */
    const reward =
      this.getReward(
        difficulty
      );


    return {

      id:
        Number(
          raw?.id
        ) ||
        Date.now(),

      icon:
        raw?.icon ??
        '✦',

      name:
        raw?.name ??
        raw?.title ??
        'Unnamed Quest',

      details:
        raw?.details ??
        '',

      mode:

        raw?.mode ===
          'focus'

          ? 'focus'

          : 'normal',

      difficulty,

      /*
       * FORÇA os valores novos.
       *
       * Assim uma quest antiga que tinha
       * 15 XP como Medium passa para 30.
       */
      reward:
        reward.xp,

      credits:
        reward.credits,

      shopXp:
        reward.shopXp,

      completed:
        Boolean(
          raw?.completed
        ),

      archived:
        Boolean(
          raw?.archived
        ),

      createdAt:
        Number(
          raw?.createdAt
        ) ||
        Date.now(),

      completedAt:

        raw?.completedAt

          ? Number(
              raw.completedAt
            )

          : undefined,

      dueDate:
        raw?.dueDate ??
        this.todayKey(),

      durationSeconds:

        raw?.durationSeconds

          ? Number(
              raw.durationSeconds
            )

          : undefined

    };

  }


  private saveQuests():
    void {

    localStorage.setItem(

      this.storageKey,

      JSON.stringify(
        this.quests
      )

    );

  }


  // =====================================================
  // RESET FORM
  // =====================================================

  private resetForm():
    void {

    this.editingId =
      null;


    this.model = {

      name: '',

      details: '',

      mode:
        'normal',

      difficulty:
        'easy',

      focusMinutes:
        5,

      dateMode:
        'today',

      dueDate:
        this.todayKey()

    };

  }


  // =====================================================
  // FEEDBACK
  // =====================================================

  private showSuccess(
    message: string
  ): void {

    this.successMessage =
      message;


    if (
      this.successTimer
    ) {

      clearTimeout(
        this.successTimer
      );

    }


    this.successTimer =
      setTimeout(
        () => {

          this.successMessage =
            '';

        },
        2400
      );

  }


  // =====================================================
  // TODAY
  // =====================================================

  private todayKey():
    string {

    const date =
      new Date();


    const year =
      date.getFullYear();


    const month =
      String(
        date.getMonth() +
        1
      ).padStart(
        2,
        '0'
      );


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        '0'
      );


    return `${year}-${month}-${day}`;

  }

}