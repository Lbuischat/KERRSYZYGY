export interface Task {
  id: number;
  icon: string;
  name: string;
  reward: number;
  completed: boolean;
}


export type QuestSource =
  | 'daily'
  | 'player';


export type QuestMode =
  | 'normal'
  | 'focus';


export type QuestDifficulty =
  | 'easy'
  | 'medium'
  | 'hard';


export type QuestProgressType =
  | 'manual'
  | 'counter'
  | 'xp'
  | 'timer';


export type QuestStatus =
  | 'on-the-way'
  | 'fulfilled'
  | 'wrapped-up';


export interface QuestReward {
  xp: number;
  credits: number;
  shopXp: number;
}


export interface Quest {

  id: string;

  templateId?: string;

  icon: string;

  title: string;

  details: string;

  source:
    QuestSource;

  mode:
    QuestMode;

  difficulty:
    QuestDifficulty;

  progressType:
    QuestProgressType;

  progress:
    number;

  target:
    number;

  requiredDifficulty?:
    QuestDifficulty;


  rewardXp:
    number;

  rewardCredits:
    number;

  rewardShopXp:
    number;


  durationSeconds?:
    number;

  completed:
    boolean;

  rewardClaimed:
    boolean;

  status:
    QuestStatus;

  createdAt:
    number;

  dueDate?:
    string;

  startedAt?:
    number;

  completedAt?:
    number;

}


export interface ActiveTimedQuest {

  questId:
    string;

  startedAt:
    number;

  endsAt:
    number;

}


export interface CreatePlayerQuestInput {

  title:
    string;

  details:
    string;

  mode:
    QuestMode;

  difficulty:
    QuestDifficulty;

  dueDate:
    string;

  durationSeconds?:
    number;

}


export interface RewardFeedback {

  nonce:
    number;

  questId:
    string;

  title:
    string;

  rewardXp:
    number;

  rewardCredits:
    number;

  rewardShopXp:
    number;

}


export interface WeeklyQuestSummary {

  completed:
    number;

  xp:
    number;

  credits:
    number;

  shopXp:
    number;

}


/*
 * =========================================================
 * RECOMPENSAS
 * =========================================================
 *
 * PLAYER:
 *
 * EASY
 * 15 XP
 * 30 Credits
 * 10 Shop XP
 *
 * MEDIUM
 * 30 XP
 * 60 Credits
 * 20 Shop XP
 *
 * HARD
 * 60 XP
 * 120 Credits
 * 40 Shop XP
 *
 *
 * DAILY recebe um pouco menos.
 */

export const QUEST_REWARDS:
  Record<
    QuestSource,
    Record<
      QuestDifficulty,
      QuestReward
    >
  > = {

    player: {

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

    },


    daily: {

      easy: {
        xp: 10,
        credits: 20,
        shopXp: 5
      },

      medium: {
        xp: 20,
        credits: 40,
        shopXp: 10
      },

      hard: {
        xp: 40,
        credits: 80,
        shopXp: 20
      }

    }

  };