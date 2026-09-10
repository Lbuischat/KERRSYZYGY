import { Component } from '@angular/core';
import { TaskService } from '../../../services/tasks/task.service';
import { Task } from '../../../features/tasks/task-panel/task.model';

@Component({
  selector: 'app-task-panel',
  imports: [],
  templateUrl: './task-panel.html',
  styleUrl: './task-panel.css'
})
export class TaskPanel {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService
  ) {
    this.tasks = this.taskService.getRandomTasks(3);
  }


  /* =====================================================
     COMPLETED TASKS
  ===================================================== */

  get completedTasks(): number {

    return this.tasks.filter(
      task => task.completed
    ).length;

  }


  /* =====================================================
     TASK PROGRESS
  ===================================================== */

  get taskProgress(): number {

    if (!this.tasks.length) {
      return 0;
    }

    return (
      this.completedTasks / this.tasks.length
    ) * 100;

  }


  /* =====================================================
     COMPLETE TASK
  ===================================================== */

  completeTask(task: Task): void {

    if (task.completed) {
      return;
    }

    task.completed = true;

    this.taskService.completeTask(task);

  }

}