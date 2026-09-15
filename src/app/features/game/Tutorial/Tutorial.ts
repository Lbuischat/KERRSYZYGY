import { Component, EventEmitter, Input, Output } from '@angular/core';

interface TutorialStep {
  title: string;
  description: string;
  details: string[];
}

@Component({
  selector: 'app-game-tutorial',
  imports: [],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.css',
})
export class GameTutorial {
  @Input() open = false;

  @Output() finished = new EventEmitter<void>();

  currentStep = 0;

  readonly steps: TutorialStep[] = [
    {
      title: 'Bem-vindo ao mundo do jogo',
      description: 'Aqui você vai aprender como começar a jornada e como o jogo funciona.',
      details: [
        'Use W,A,S,D ou utilize as setas para andar pelo mapa.',
        'O jogo foi pensado para estimular hábitos saudáveis, então as tarefas também ajudam no progresso.',
      ],
    },
    {
      title: 'Inventário e tarefas',
      description: 'O inventário guarda itens e recursos. As tarefas ficam no painel lateral e representam ações do dia a dia.',
      details: [
        'Pressione I para abrir o inventário.',
        'Revise suas tarefas para entender o que você precisa fazer no jogo e na vida real.',
      ],
    },
    {
      title: 'Combate e skills',
      description: 'No combate, você precisa se aproximar do inimigo e usar as ações corretas.',
      details: [
        'Clique com o botão esquerdo para atacar corpo a corpo.',
        'Clique com o botão direito para atirar projéteis.',
        'Use F e Q para habilidades especiais.',
      ],
    },
    {
      title: 'Mate o inimigo',
      description: 'Seu objetivo agora é derrotar o inimigo que aparece na arena.',
      details: [
        'Aproxime-se do inimigo com movimento suave.',
        'Ataque até que a vida dele chegue a zero.',
        'Quando vencer, o jogo continua e você pode explorar mais a fase.',
      ],
    },
  ];

  get current(): TutorialStep {
    return this.steps[this.currentStep];
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep += 1;
      return;
    }

    this.finished.emit();
    this.currentStep = 0;
  }
}
