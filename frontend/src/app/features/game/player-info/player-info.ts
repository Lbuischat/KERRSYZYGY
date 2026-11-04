
import { Component, OnDestroy, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { PlayerService } from '../../../services/player.service';
import { TaskService } from '../../../services/tasks/task.service';
import { Task } from '../../tasks/task-panel/task.model';
import { ProfileFlowControls } from './profile-flow-controls';

import {
  CharacterPortrait,
  Personagem
} from './character-portrait';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CharacterPortrait,
    ProfileFlowControls
  ],
  templateUrl: './player-info.html',
  styleUrl: './player-info.css'
})
export class PlayerInfo implements OnDestroy {
  tasks: Task[] = [];

  // Seleção reativa
  private readonly selectedIndex = signal(0);

  readonly selectedCharacter = computed(() =>
    this.personagens[this.selectedIndex()]
  );

  get personagemSelecionado(): number {
    return this.selectedIndex();
  }

  formIncompleto = false;
  perfilCriado = false;
  mostrarSucesso = false;

  private successTimer?: ReturnType<typeof setTimeout>;

  // =========================================
  // 10 PERSONAGENS
  // =========================================

  readonly personagens: Personagem[] = [
    {
      id: 'aether',
      nome: 'Aether',
      classe: 'EXPLORADOR ESTELAR',
      frase: 'Nenhum mapa mostra todos os caminhos.',
      descricao:
        'Um viajante que atravessa planetas esquecidos em busca de artefatos, respostas e novas constelações.',
      estilo: 'Exploração',
      tema: 'Cósmico',
      kind: 'explorer',
      colour: '#80d9ff',
      skin: '#b87959',
      hair: '#192237',
      armor: '#26435e',
      cape: '#132d40'
    },
    {
      id: 'selene',
      nome: 'Selene',
      classe: 'ORÁCULO LUNAR',
      frase: 'A lua guarda histórias que o sol não vê.',
      descricao:
        'Decifra mensagens escritas nas estrelas e transforma antigos segredos em feitiços de proteção.',
      estilo: 'Magia',
      tema: 'Lunar',
      kind: 'oracle',
      colour: '#bda6ff',
      skin: '#d9a889',
      hair: '#e2d9f3',
      armor: '#44406e',
      cape: '#29234f'
    },
    {
      id: 'kael',
      nome: 'Kael',
      classe: 'GUARDIÃO SOLAR',
      frase: 'Minha coragem será a última luz a se apagar.',
      descricao:
        'Defensor dos reinos celestes, enfrenta criaturas do vazio com uma armadura alimentada pela energia solar.',
      estilo: 'Defesa',
      tema: 'Solar',
      kind: 'guardian',
      colour: '#ffd078',
      skin: '#915c48',
      hair: '#292027',
      armor: '#6e453e',
      cape: '#4b252d'
    },
    {
      id: 'vesper',
      nome: 'Vesper',
      classe: 'CAÇADORA NEBULAR',
      frase: 'O silêncio também aponta a direção.',
      descricao:
        'Uma rastreadora veloz que cruza nebulosas perigosas e encontra rotas invisíveis para os demais viajantes.',
      estilo: 'Agilidade',
      tema: 'Nebulosa',
      kind: 'hunter',
      colour: '#71e1c6',
      skin: '#684234',
      hair: '#a25568',
      armor: '#24505a',
      cape: '#15343d'
    },
    {
      id: 'chrona',
      nome: 'Chrona',
      classe: 'ARQUITETA DO TEMPO',
      frase: 'Cada segundo pode mudar um universo.',
      descricao:
        'Guardião dos portais temporais, observa possibilidades futuras e tenta impedir que o cosmos se desfaça.',
      estilo: 'Estratégia',
      tema: 'Tempo',
      kind: 'chrono',
      colour: '#f29ac8',
      skin: '#c28b72',
      hair: '#c5cede',
      armor: '#483b6d',
      cape: '#302448'
    },

    // =====================================
    // NOVOS PERSONAGENS
    // =====================================

    {
      id: 'lumi',
      nome: 'Lumi',
      classe: 'ANDROIDE DAS ESTRELAS',
      frase: 'Até uma máquina pode aprender a sonhar.',
      descricao:
        'Uma androide criada para proteger estações espaciais. Sua inteligência e seus circuitos luminosos guardam memórias de mil galáxias.',
      estilo: 'Tecnologia',
      tema: 'Neon',
      kind: 'android',
      colour: '#69f0ed',
      skin: '#b9dce7',
      hair: '#476b84',
      armor: '#244e65',
      cape: '#0b293b'
    },
    {
      id: 'ravi',
      nome: 'Ravi',
      classe: 'ENGENHEIRO DE METEOROS',
      frase: 'Um pouco de sucata e uma grande ideia mudam tudo.',
      descricao:
        'Inventor e mecânico capaz de consertar qualquer nave. Seus óculos de solda e suas ferramentas nunca ficam para trás.',
      estilo: 'Engenharia',
      tema: 'Industrial',
      kind: 'mechanic',
      colour: '#ffb164',
      skin: '#b87654',
      hair: '#30222b',
      armor: '#795035',
      cape: '#4a3036'
    },
    {
      id: 'iris',
      nome: 'Íris',
      classe: 'BOTÂNICA DE NEBULOSAS',
      frase: 'Onde tudo parece vazio, a vida encontra um caminho.',
      descricao:
        'Cultiva jardins em luas desertas e usa sementes estelares para curar os mundos atingidos pelo vazio.',
      estilo: 'Cura',
      tema: 'Natureza',
      kind: 'botanist',
      colour: '#a2e88d',
      skin: '#d09b76',
      hair: '#354a37',
      armor: '#3c6949',
      cape: '#234b42'
    },
    {
      id: 'nox',
      nome: 'Nox',
      classe: 'GUARDIÃO DAS SOMBRAS',
      frase: 'Nem toda escuridão é inimiga da luz.',
      descricao:
        'Um viajante misterioso que domina portais de sombra e protege os caminhos secretos entre as estrelas.',
      estilo: 'Furtividade',
      tema: 'Eclipse',
      kind: 'shadow',
      colour: '#a995ff',
      skin: '#88624e',
      hair: '#15182a',
      armor: '#302a51',
      cape: '#15152d'
    },
    {
      id: 'atlas',
      nome: 'Atlas',
      classe: 'CAPITÃO DAS CONSTELAÇÕES',
      frase: 'O universo é grande demais para ficar parado.',
      descricao:
        'Capitão de uma nave de exploradores livres, coleciona mapas impossíveis e conhece cada porto espacial.',
      estilo: 'Liderança',
      tema: 'Aventura',
      kind: 'captain',
      colour: '#efca73',
      skin: '#7f533e',
      hair: '#3a2731',
      armor: '#385071',
      cape: '#5b2944'
    }
  ];

  constructor(
    public playerService: PlayerService,
    private taskService: TaskService
  ) {
    this.tasks = this.taskService.getRandomTasks(3);

    // Recupera o personagem salvo anteriormente
    const savedName =
      this.playerService.profile.characterName;

    const index = this.personagens.findIndex(
      personagem => personagem.nome === savedName
    );

    if (index >= 0) {
      this.selectedIndex.set(index);
    }
  }

  // =========================================
  // PERSONAGEM ATUAL
  // =========================================

  get personagemAtual(): Personagem {
    return this.selectedCharacter();
  }

  // =========================================
  // TAREFAS
  // =========================================

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get taskProgress(): number {
    return this.tasks.length
      ? (this.completedTasks / this.tasks.length) * 100
      : 0;
  }

  completeTask(task: Task): void {
    if (task.completed) return;

    task.completed = true;
    this.playerService.addXp(task.reward);
  }

  // =========================================
  // CARROSSEL REATIVO
  // =========================================

  proximoPersonagem(): void {
    this.selecionarPersonagem(
      (this.personagemSelecionado + 1) %
      this.personagens.length
    );
  }

  personagemAnterior(): void {
    this.selecionarPersonagem(
      (
        this.personagemSelecionado -
        1 +
        this.personagens.length
      ) % this.personagens.length
    );
  }

  selecionarPersonagem(index: number): void {
    if (
      index < 0 ||
      index >= this.personagens.length
    ) {
      return;
    }

    // Atualiza imagem e informações
    // imediatamente pelo mesmo Signal
    this.selectedIndex.set(index);
  }

  // =========================================
  // SALVAR PERFIL
  // =========================================

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

    this.playerService.profile.characterName =
      this.personagemAtual.nome;

    this.playerService.saveProfile();

    if (this.successTimer) {
      clearTimeout(this.successTimer);
    }

    this.successTimer = setTimeout(() => {
      this.mostrarSucesso = false;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.successTimer) {
      clearTimeout(this.successTimer);
    }
  }
}
