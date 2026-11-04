
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  signal
} from '@angular/core';

import { Player } from '../player/player';

type TutorialStep =
  | 'movement'
  | 'sprint'
  | 'stamina'
  | 'attack'
  | 'attackEnemy'
  | 'complete';

type MovementDirection =
  | 'up'
  | 'left'
  | 'down'
  | 'right';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.css'
})
export class tutorial
  implements OnInit, OnChanges, OnDestroy {

  @Input() player?: Player;

  private readonly cdr = inject(ChangeDetectorRef);

  // ========================================
  // ETAPA ATUAL
  // ========================================

  currentStep: TutorialStep = 'movement';
  completed = false;

  // ========================================
  // MOVEMENT - QUATRO DIREÇÕES
  // ========================================

  readonly directionOptions: {
    id: MovementDirection;
    label: string;
    keys: string[];
  }[] = [
    {
      id: 'up',
      label: 'UP',
      keys: ['W', '↑']
    },
    {
      id: 'left',
      label: 'LEFT',
      keys: ['A', '←']
    },
    {
      id: 'down',
      label: 'DOWN',
      keys: ['S', '↓']
    },
    {
      id: 'right',
      label: 'RIGHT',
      keys: ['D', '→']
    }
  ];

  readonly completedDirections =
    signal<ReadonlySet<MovementDirection>>(
      new Set<MovementDirection>()
    );

  private movementAdvanceTimer?:
    ReturnType<typeof setTimeout>;

  get movementProgress(): number {
    return this.completedDirections().size * 25;
  }

  get movementCount(): number {
    return this.completedDirections().size;
  }

  hasMoved(direction: MovementDirection): boolean {
    return this.completedDirections().has(direction);
  }

  // ========================================
  // SPRINT
  // ========================================

  sprintProgress = 0;
  private sprintTime = 0;
  private readonly SPRINT_REQUIRED = 2;

  // ========================================
  // STAMINA
  // ========================================

  staminaProgress = 0;

  // ========================================
  // COMBATE
  // ========================================

  attackPerformed = false;
  tutorialEnemyDefeated = false;

  // ========================================
  // PLAYER CONNECTION
  // ========================================

  private getPlayerSprinting?: () => boolean;
  private getPlayerStamina?: () => number;

  // ========================================
  // GAME LOOP
  // ========================================

  private animationFrameId = 0;
  private lastTime = 0;

  ngOnInit(): void {
    if (typeof requestAnimationFrame === 'undefined') {
      return;
    }

    this.lastTime = performance.now();
    this.startTutorialLoop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['player'] && this.player) {
      this.connectPlayer(
        () => this.player!.getIsMoving(),
        () => this.player!.getIsSprinting(),
        () => this.player!.getStamina()
      );
    }
  }

  public connectPlayer(
    _getMoving: () => boolean,
    getSprinting: () => boolean,
    getStamina: () => number
  ): void {
    this.getPlayerSprinting = getSprinting;
    this.getPlayerStamina = getStamina;
  }

  // ========================================
  // RECONHECER CADA DIREÇÃO
  // ========================================

  @HostListener('document:keydown', ['$event'])
  onMovementKey(event: KeyboardEvent): void {

    if (this.currentStep !== 'movement') {
      return;
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const target = event.target as Element | null;

    if (
      target?.closest(
        'input, textarea, select, [contenteditable="true"]'
      )
    ) {
      return;
    }

    const key = event.key.toLowerCase();

    let direction: MovementDirection | null = null;

    // W ou seta para cima
    if (key === 'w' || key === 'arrowup') {
      direction = 'up';
    }

    // A ou seta para esquerda
    else if (key === 'a' || key === 'arrowleft') {
      direction = 'left';
    }

    // S ou seta para baixo
    else if (key === 's' || key === 'arrowdown') {
      direction = 'down';
    }

    // D ou seta para direita
    else if (key === 'd' || key === 'arrowright') {
      direction = 'right';
    }

    if (!direction) {
      return;
    }

    // Não conta a mesma direção duas vezes.
    if (this.hasMoved(direction)) {
      return;
    }

    const next = new Set(this.completedDirections());
    next.add(direction);

    this.completedDirections.set(next);

    // Quando reconhecer as quatro direções:
    if (next.size === 4 && !this.movementAdvanceTimer) {

      // Mostra os quatro ✓ antes de avançar.
      this.movementAdvanceTimer = setTimeout(() => {
        this.movementAdvanceTimer = undefined;

        if (this.currentStep === 'movement') {
          this.nextStep();
        }
      }, 650);
    }
  }

  // ========================================
  // EVENTOS DE COMBATE
  // ========================================

  public onBasicAttack(): void {
    if (this.currentStep !== 'attack') {
      return;
    }

    this.attackPerformed = true;
    this.nextStep();
  }

  public onTutorialEnemyDefeated(): void {
    if (this.currentStep !== 'attackEnemy') {
      return;
    }

    this.tutorialEnemyDefeated = true;
    this.nextStep();
  }

  // ========================================
  // LOOP DO TUTORIAL
  // ========================================

  private startTutorialLoop(): void {
    const update = (currentTime: number): void => {
      if (this.completed) {
        return;
      }

      const deltaTime = Math.min(
        0.1,
        Math.max(0, (currentTime - this.lastTime) / 1000)
      );

      this.lastTime = currentTime;

      this.updateTutorial(deltaTime);

      if (!this.completed) {
        this.animationFrameId = requestAnimationFrame(update);
      }
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  private updateTutorial(deltaTime: number): void {
    if (this.completed) {
      return;
    }

    switch (this.currentStep) {
      case 'movement':
        // Movement é concluído pelas quatro direções.
        // Não avança mais apenas por passar o tempo.
        break;

      case 'sprint':
        this.updateSprint(deltaTime);
        break;

      case 'stamina':
        this.updateStamina();
        break;

      case 'attack':
        break;

      case 'attackEnemy':
        break;

      case 'complete':
        break;
    }
  }

  // ========================================
  // SPRINT
  // ========================================

  private updateSprint(deltaTime: number): void {
    if (!this.getPlayerSprinting) {
      return;
    }

    if (!this.getPlayerSprinting()) {
      return;
    }

    this.sprintTime += deltaTime;

    const nextProgress = Math.min(
      100,
      (this.sprintTime / this.SPRINT_REQUIRED) * 100
    );

    if (
      Math.floor(nextProgress) !==
      Math.floor(this.sprintProgress)
    ) {
      this.sprintProgress = nextProgress;
      this.cdr.markForCheck();
    }

    if (this.sprintTime >= this.SPRINT_REQUIRED) {
      this.sprintProgress = 100;
      this.nextStep();
    }
  }

  // ========================================
  // STAMINA
  // ========================================

  private updateStamina(): void {
    if (!this.getPlayerStamina) {
      return;
    }

    const stamina = this.getPlayerStamina();

    const nextProgress = Math.min(
      100,
      Math.max(0, 100 - stamina)
    );

    if (
      Math.floor(nextProgress) !==
      Math.floor(this.staminaProgress)
    ) {
      this.staminaProgress = nextProgress;
      this.cdr.markForCheck();
    }

    if (stamina <= 0) {
      this.staminaProgress = 100;
      this.nextStep();
    }
  }

  // ========================================
  // AVANÇAR ETAPAS
  // ========================================

  private nextStep(): void {
    switch (this.currentStep) {

      case 'movement':
        // Movement -> Sprint
        this.currentStep = 'sprint';
        this.sprintProgress = 0;
        this.sprintTime = 0;
        break;

      case 'sprint':
        // Sprint -> Stamina
        this.currentStep = 'stamina';
        this.staminaProgress = 0;
        break;

      case 'stamina':
        // Stamina -> Attack
        this.currentStep = 'attack';
        this.attackPerformed = false;
        break;

      case 'attack':
        // Attack -> Defeat Enemy
        this.currentStep = 'attackEnemy';
        this.tutorialEnemyDefeated = false;
        break;

      case 'attackEnemy':
        // Enemy -> Complete
        this.currentStep = 'complete';
        this.tutorialEnemyDefeated = true;
        this.completed = true;
        break;

      case 'complete':
        break;
    }

    this.cdr.markForCheck();
  }

  // ========================================
  // PROGRESSO ATUAL
  // ========================================

  public getProgress(): number {
    switch (this.currentStep) {
      case 'movement':
        return this.movementProgress;

      case 'sprint':
        return this.sprintProgress;

      case 'stamina':
        return this.staminaProgress;

      case 'attack':
        return this.attackPerformed ? 100 : 0;

      case 'attackEnemy':
        return this.tutorialEnemyDefeated ? 100 : 0;

      case 'complete':
        return 100;
    }
  }

  public isComplete(): boolean {
    return this.completed;
  }

  // ========================================
  // LIMPEZA
  // ========================================

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.movementAdvanceTimer) {
      clearTimeout(this.movementAdvanceTimer);
    }
  }
}
