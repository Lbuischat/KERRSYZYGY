
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { PlayerService } from '../../../services/player.service';
import { TaskService } from '../../../services/tasks/task.service';
import { Task } from '../../../features/tasks/task-panel/task.model';

interface Personagem {
  nome: string;
  classe: string;
  colour: string;
}

@Component({
  selector: 'app-player-info',
  imports: [FormsModule],
  templateUrl: './player-info.html',
  styleUrl: './player-info.css'
})
export class PlayerInfo implements OnDestroy {
  constructor(
    public playerService: PlayerService,
    private taskService: TaskService
  ) {
    this.tasks = this.taskService.getRandomTasks(3);
  }

  tasks: Task[] = [];

  // Current avatar preview
  readonly personagens: Personagem[] = [
    { nome: 'Astra', classe: 'Explorer', colour: '#d94b4b' },
    { nome: 'Luna', classe: 'Mage', colour: '#d9c84b' },
    { nome: 'Nova', classe: 'Warrior', colour: '#d94b91' },
    { nome: 'Orion', classe: 'Ranger', colour: '#4b82d9' },
    { nome: 'Stella', classe: 'Guardian', colour: '#8b5bd9' }
  ];

  personagemSelecionado = 0;

  formIncompleto = false;
  mostrarSucesso = false;

  private successTimeout?: ReturnType<typeof setTimeout>;

  get personagemAtual(): Personagem {
    return this.personagens[this.personagemSelecionado];
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get taskProgress(): number {
    return this.tasks.length
      ? (this.completedTasks / this.tasks.length) * 100
      : 0;
  }

  completeTask(task: Task): void {
    if (task.completed) {
      return;
    }

    task.completed = true;

    this.playerService.profile.xp += task.reward;
    this.playerService.saveProfile();
  }

  criarPerfil(form: NgForm): void {
    if (form.invalid) {
      this.formIncompleto = true;
      this.mostrarSucesso = false;

      form.control.markAllAsTouched();
      return;
    }

    this.formIncompleto = false;

    this.playerService.saveProfile();
    this.mostrarSucesso = true;

    // Reset any previous success-message timer.
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    this.successTimeout = setTimeout(() => {
      this.mostrarSucesso = false;
      this.successTimeout = undefined;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }
}
