import { Injectable } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import { Task } from '../../features/tasks/task-panel/task.model';


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private readonly taskPool: Omit<Task, 'completed'>[] = [

    {
      id: 1,
      icon: '💧',
      name: 'Drink Water',
      reward: 20,
    },

    {
      id: 2,
      icon: '📚',
      name: 'Study',
      reward: 100,
    },

    {
      id: 3,
      icon: '🏃',
      name: 'Exercise',
      reward: 50,
    },

    {
      id: 4,
      icon: '🌙',
      name: 'Sleep Early',
      reward: 75,
    },

    {
      id: 5,
      icon: '📖',
      name: 'Read for 20 Minutes',
      reward: 40,
    },

    {
      id: 6,
      icon: '🧘',
      name: 'Meditate',
      reward: 60,
    },

    {
      id: 7,
      icon: '🚶',
      name: 'Take a Walk',
      reward: 35,
    },

    {
      id: 8,
      icon: '✍️',
      name: 'Write in Your Journal',
      reward: 45,
    },

    {
      id: 9,
      icon: '🎯',
      name: 'Complete One Goal',
      reward: 80,
    },

    {
      id: 10,
      icon: '🧹',
      name: 'Clean Your Space',
      reward: 30,
    },

  ];


  constructor(
    private playerService: PlayerService
  ) {}


  /* =====================================================
     RANDOM TASKS
  ===================================================== */

  getRandomTasks(amount: number = 3): Task[] {

    const shuffled = [...this.taskPool].sort(
      () => Math.random() - 0.5
    );

    return shuffled
      .slice(0, amount)
      .map(task => ({
        ...task,
        completed: false,
      }));

  }


  /* =====================================================
     COMPLETE TASK
  ===================================================== */

  completeTask(task: Task): void {

    if (task.completed) {
      return;
    }


    // Mark the task as completed
    task.completed = true;


    // Give the player the task reward
    this.playerService.profile.xp += task.reward;


    // Save the updated player profile
    this.playerService.saveProfile();

  }

}