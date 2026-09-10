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
  imagem: string;
}


@Component({
  selector: 'app-player-info',

  imports: [
    RouterLink,
    FormsModule
  ],

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


  /* =====================================================
     TASKS
  ===================================================== */

  tasks: Task[] = [];


  /* =====================================================
     PERSONAGENS
  ===================================================== */

  personagens: Personagem[] = [

    {
      nome: 'Astra',
      classe: 'Explorer',
      frase: 'Ready for the journey.',
      estilo: 'Cosmic',
      tema: 'Adventurer',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Luna',
      classe: 'Mage',
      frase: 'The stars will guide me.',
      estilo: 'Mystic',
      tema: 'Cosmic',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Nova',
      classe: 'Warrior',
      frase: 'My journey starts here.',
      estilo: 'Battle',
      tema: 'Adventurer',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Orion',
      classe: 'Ranger',
      frase: 'Always looking beyond.',
      estilo: 'Explorer',
      tema: 'Space',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Stella',
      classe: 'Guardian',
      frase: 'I will protect this world.',
      estilo: 'Guardian',
      tema: 'Cosmic',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    }

  ];


  /* =====================================================
     PERSONAGEM SELECIONADO
  ===================================================== */

  personagemSelecionado: number = 0;


  /* =====================================================
     CONTROLE DOS FEEDBACKS
  ===================================================== */

  formIncompleto: boolean = false;

  perfilCriado: boolean = false;

  mostrarSucesso: boolean = false;


  /* =====================================================
     PERSONAGEM ATUAL
  ===================================================== */

  get personagemAtual(): Personagem {

    return this.personagens[this.personagemSelecionado];

  }


  /* =====================================================
     TASKS COMPLETADAS
  ===================================================== */

  get completedTasks(): number {

    return this.tasks.filter(
      task => task.completed
    ).length;

  }


  /* =====================================================
     PROGRESSO DAS TASKS
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
     COMPLETAR TASK
  ===================================================== */

  completeTask(task: Task): void {

    if (task.completed) {
      return;
    }

    task.completed = true;

    this.playerService.profile.xp += task.reward;

    this.playerService.saveProfile();

  }


  /* =====================================================
     PRÓXIMO PERSONAGEM
  ===================================================== */

  proximoPersonagem(): void {

    this.personagemSelecionado =
      (this.personagemSelecionado + 1)
      % this.personagens.length;

  }


  /* =====================================================
     PERSONAGEM ANTERIOR
  ===================================================== */

  personagemAnterior(): void {

    this.personagemSelecionado =
      (
        this.personagemSelecionado
        - 1
        + this.personagens.length
      )
      % this.personagens.length;

  }


  /* =====================================================
     SELECIONAR PERSONAGEM PELAS BOLINHAS
  ===================================================== */

  selecionarPersonagem(index: number): void {

    this.personagemSelecionado = index;

  }


  /* =====================================================
     CRIAR / SALVAR PERFIL
  ===================================================== */

  criarPerfil(form: NgForm): void {

    /* Se o formulário estiver incompleto */

    if (form.invalid) {

      this.formIncompleto = true;

      this.mostrarSucesso = false;

      form.control.markAllAsTouched();

      return;

    }


    /* Perfil válido */

    this.formIncompleto = false;

    this.perfilCriado = true;

    this.mostrarSucesso = true;


    /*
     * Salva as informações que já foram escolhidas
     * durante o onboarding.
     */

    this.playerService.saveProfile();


    console.log(
      'Informações do perfil:',
      this.playerService.profile
    );


    console.log(
      'Personagem escolhido:',
      this.personagemAtual
    );


    /* Esconde a mensagem depois de 3 segundos */

    setTimeout(() => {

      this.mostrarSucesso = false;

    }, 3000);

  }

}