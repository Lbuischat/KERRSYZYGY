import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  inject,
  signal
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { Player } from '../player/player';

// ========================================
// TYPES
// ========================================

type TutorialStep =
  | 'movement'
  | 'sprint'
  | 'stamina'
  | 'attack'
  | 'attackEnemy'
  | 'gatherBerries'
  | 'complete';

type MovementDirection =
  | 'up'
  | 'left'
  | 'down'
  | 'right';

// ========================================
// COMPONENT
// ========================================

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.css'
})
export class tutorial implements OnInit, OnDestroy {

  // ========================================
  // PLATFORM
  // ========================================

  private readonly platformId = inject(PLATFORM_ID);

  private readonly cdr = inject(ChangeDetectorRef);

  // ========================================
  // PLAYER INPUT
  // ========================================

  @Input() player?: Player;

  // ========================================
  // CURRENT STEP
  // ========================================

  currentStep: TutorialStep = 'movement';

  completed = false;

  // ========================================
  // MOVEMENT - FOUR DIRECTIONS
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
  // BASIC ATTACK
  // ========================================

  attackPerformed = false;

  // ========================================
  // TUTORIAL ENEMY
  // ========================================

  @Output()
  enemyStepStarted = new EventEmitter<void>();

  tutorialEnemyDefeated = false;

  // ========================================
  // BERRY COLLECTION
  // ========================================

  berriesGathered = 0;

  readonly BERRIES_REQUIRED = 3;

  // ========================================
  // GAME LOOP
  // ========================================

  private animationFrameId = 0;

  private lastTime = 0;

  // ========================================
  // INITIALIZATION
  // ========================================

  ngOnInit(): void {

    // requestAnimationFrame is browser-only.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.lastTime = performance.now();

    this.startTutorialLoop();

  }

  // ========================================
  // MOVEMENT INPUT
  // ========================================

  @HostListener('document:keydown', ['$event'])
  onMovementKey(event: KeyboardEvent): void {

    if (this.currentStep !== 'movement') {
      return;
    }

    // Ignore modified keyboard shortcuts.
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    // Don't register keyboard input inside text fields.
    const target = event.target as HTMLElement | null;

    if (
      target?.closest(
        'input, textarea, select, [contenteditable="true"]'
      )
    ) {
      return;
    }

    const key = event.key.toLowerCase();

    let direction: MovementDirection | null = null;

    if (key === 'w' || key === 'arrowup') {
      direction = 'up';
    } else if (
      key === 'a' || key === 'arrowleft'
    ) {
      direction = 'left';
    } else if (
      key === 's' || key === 'arrowdown'
    ) {
      direction = 'down';
    } else if (
      key === 'd' || key === 'arrowright'
    ) {
      direction = 'right';
    }

    if (!direction) {
      return;
    }

    // Prevent arrow keys from scrolling the page.
    if (key.startsWith('arrow')) {
      event.preventDefault();
    }

    // Each direction only needs to be registered once.
    if (this.hasMoved(direction)) {
      return;
    }

    const next = new Set(this.completedDirections());

    next.add(direction);

    this.completedDirections.set(next);

    this.cdr.markForCheck();

    // Wait briefly so the player can see all four checkmarks.
    if (
      next.size === 4 &&
      !this.movementAdvanceTimer
    ) {

      this.movementAdvanceTimer = setTimeout(() => {

        this.movementAdvanceTimer = undefined;

        if (this.currentStep === 'movement') {
          this.nextStep();
        }

      }, 650);

    }

  }

  // ========================================
  // BASIC ATTACK EVENT
  // ========================================

  public onBasicAttack(): void {

    if (this.currentStep !== 'attack') {
      return;
    }

    this.attackPerformed = true;

    this.nextStep();

  }

  // ========================================
  // ENEMY DEFEATED EVENT
  // ========================================

  public onTutorialEnemyDefeated(): void {

    if (this.currentStep !== 'attackEnemy') {
      return;
    }

    this.tutorialEnemyDefeated = true;

    this.nextStep();

  }

  // ========================================
  // BERRY COLLECTION EVENT
  // ========================================

  public onBerryGathered(): void {

    if (this.currentStep !== 'gatherBerries') {
      return;
    }

    if (this.berriesGathered >= this.BERRIES_REQUIRED) {
      return;
    }

    this.berriesGathered++;

    this.cdr.markForCheck();

    if (this.berriesGathered >= this.BERRIES_REQUIRED) {
      this.nextStep();
    }

  }

  // ========================================
  // TUTORIAL GAME LOOP
  // ========================================

  private startTutorialLoop(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const update = (currentTime: number): void => {

      if (this.completed) {
        return;
      }

      // Prevent large progress jumps after a delayed frame.
      const deltaTime = Math.min(
        0.1,
        Math.max(0, (currentTime - this.lastTime) / 1000)
      );

      this.lastTime = currentTime;

      this.updateTutorial(deltaTime);

      if (!this.completed) {
        this.animationFrameId =
          requestAnimationFrame(update);
      }

    };

    this.animationFrameId = requestAnimationFrame(update);

  }

  // ========================================
  // UPDATE TUTORIAL
  // ========================================

  private updateTutorial(deltaTime: number): void {

    if (this.completed) {
      return;
    }

    switch (this.currentStep) {

      case 'movement':
        // Completed by recognizing all four directions.
        break;

      case 'sprint':
        this.updateSprint(deltaTime);
        break;

      case 'stamina':
        this.updateStamina();
        break;

      case 'attack':
        // Waiting for Player attack event.
        break;

      case 'attackEnemy':
        // Waiting for tutorial enemy defeat event.
        break;

      case 'gatherBerries':
        // Waiting for berry collection events.
        break;

      case 'complete':
        break;

    }

  }

  // ========================================
  // SPRINT
  // ========================================

  private updateSprint(deltaTime: number): void {

    if (!this.player) {
      return;
    }

    if (!this.player.getIsSprinting()) {
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

    if (!this.player) {
      return;
    }

    const stamina = this.player.getStamina();

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
  // ADVANCE TUTORIAL
  // ========================================

  private nextStep(): void {

    switch (this.currentStep) {

      // MOVEMENT → SPRINT
      case 'movement':

        this.currentStep = 'sprint';

        this.sprintProgress = 0;

        this.sprintTime = 0;

        break;

      // SPRINT → STAMINA
      case 'sprint':

        this.currentStep = 'stamina';

        this.staminaProgress = 0;

        break;

      // STAMINA → ATTACK
      case 'stamina':

        this.currentStep = 'attack';

        this.attackPerformed = false;

        break;

      // ATTACK → ENEMY
      case 'attack':

        this.currentStep = 'attackEnemy';

        this.tutorialEnemyDefeated = false;

        // Tell the parent component to start the enemy encounter.
        this.enemyStepStarted.emit();

        break;

      // ENEMY → BERRIES
      case 'attackEnemy':

        this.currentStep = 'gatherBerries';

        this.tutorialEnemyDefeated = true;

        break;

      // BERRIES → COMPLETE
      case 'gatherBerries':

        this.currentStep = 'complete';

        this.completed = true;

        break;

      case 'complete':
        break;

    }

    this.cdr.markForCheck();

  }

  // ========================================
  // CURRENT PROGRESS
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

      case 'gatherBerries':
        return Math.min(
          100,
          (this.berriesGathered / this.BERRIES_REQUIRED) * 100
        );

      case 'complete':
        return 100;

    }

  }

  public isComplete(): boolean {
    return this.completed;
  }

  // ========================================
  // CLEANUP
  // ========================================

  ngOnDestroy(): void {

    if (
      isPlatformBrowser(this.platformId) &&
      this.animationFrameId
    ) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.movementAdvanceTimer) {

      clearTimeout(this.movementAdvanceTimer);

      this.movementAdvanceTimer = undefined;

    }

  }

}