import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { PlayerService } from '../../../services/player.service';
import { TaskService } from '../../../services/tasks/task.service';
import { Task } from '../../../features/tasks/task-panel/task.model';

interface Personagem {
  nome: string;
  classe: string;
  frase: string;
  estilo: string;
  tema: string;
  colour: string;
}

@Component({
  selector: 'app-player-info',
  imports: [RouterLink, FormsModule],
  templateUrl: './player-info.html',
  styleUrl: './player-info.css'
})
export class PlayerInfo {

  constructor(
    public playerService: PlayerService,
    private taskService: TaskService
  ) {
    this.tasks = this.taskService.getRandomTasks(3);
  }

  tasks: Task[] = [];

  personagens: Personagem[] = [
    {
      nome: 'Astra',
      classe: 'Explorer',
      frase: 'Ready for the journey.',
      estilo: 'Cosmic',
      tema: 'Adventurer',
      colour: '#d94b4b'
    },
    {
      nome: 'Luna',
      classe: 'Mage',
      frase: 'The stars will guide me.',
      estilo: 'Mystic',
      tema: 'Cosmic',
      colour: '#d9c84b'
    },
    {
      nome: 'Nova',
      classe: 'Warrior',
      frase: 'My journey starts here.',
      estilo: 'Battle',
      tema: 'Adventurer',
      colour: '#d94b91'
    },
    {
      nome: 'Orion',
      classe: 'Ranger',
      frase: 'Always looking beyond.',
      estilo: 'Explorer',
      tema: 'Space',
      colour: '#4b82d9'
    },
    {
      nome: 'Stella',
      classe: 'Guardian',
      frase: 'I will protect this world.',
      estilo: 'Guardian',
      tema: 'Cosmic',
      colour: '#8b5bd9'
    }
  ];

  personagemSelecionado: number = 0;

  formIncompleto: boolean = false;
  perfilCriado: boolean = false;
  mostrarSucesso: boolean = false;

  get personagemAtual(): Personagem {
    return this.personagens[this.personagemSelecionado];
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get taskProgress(): number {
    if (!this.tasks.length) {
      return 0;
    }

    return (this.completedTasks / this.tasks.length) * 100;
  }

  completeTask(task: Task): void {
    if (task.completed) {
      return;
    }

    task.completed = true;

    this.playerService.profile.xp += task.reward;
    this.playerService.saveProfile();
  }

  proximoPersonagem(): void {
    this.personagemSelecionado =
      (this.personagemSelecionado + 1) % this.personagens.length;
  }

  personagemAnterior(): void {
    this.personagemSelecionado =
      (this.personagemSelecionado - 1 + this.personagens.length) %
      this.personagens.length;
  }

  selecionarPersonagem(index: number): void {
    this.personagemSelecionado = index;
  }

  criarPerfil(form: NgForm): void {
    if (form.invalid) {
      this.formIncompleto = true;
      this.mostrarSucesso = false;

      form.control.markAllAsTouched();

      return;
    }

    this.formIncompleto = false;
    this.perfilCriado = true;
    this.mostrarSucesso = true;

    this.playerService.saveProfile();

    console.log(
      'Informações do perfil:',
      this.playerService.profile
    );

    console.log(
      'Personagem escolhido:',
      this.personagemAtual
    );

    setTimeout(() => {
      this.mostrarSucesso = false;
    }, 3000);
  }
}