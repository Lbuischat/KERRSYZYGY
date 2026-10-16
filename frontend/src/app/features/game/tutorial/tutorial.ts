import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  inject,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { Player } from '../player/player';

type TutorialStep =
  'movement' | 'sprint' | 'stamina' | 'attack' | 'attackEnemy' | 'gatherBerries' | 'complete';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.css',
})
export class tutorial implements OnInit, OnDestroy {
  // ================================================================
  // PLATFORM
  // ================================================================

  private readonly platformId = inject(PLATFORM_ID);

  private readonly cdr = inject(ChangeDetectorRef);

  // ================================================================
  // PLAYER INPUT
  // ================================================================

  @Input() player?: Player;

  // ================================================================
  // CURRENT STEP
  // ================================================================

  currentStep: TutorialStep = 'movement';

  // ================================================================
  // MOVEMENT
  // ================================================================

  public movementProgress = 0;

  private movementTime = 0;

  private readonly MOVEMENT_REQUIRED = 1.5;

  // ================================================================
  // SPRINT
  // ================================================================

  public sprintProgress = 0;

  private sprintTime = 0;

  private readonly SPRINT_REQUIRED = 2;

  // ================================================================
  // STAMINA
  // ================================================================

  public staminaProgress = 0;

  private staminaStarted = false;

  // ================================================================
  // BASIC ATTACK
  // ================================================================

  public attackPerformed = false;

  // ================================================================
  // TUTORIAL ENEMY
  // ================================================================

  @Output()
  enemyStepStarted = new EventEmitter<void>();

  public tutorialEnemyDefeated = false;

  berriesGathered = 0;
  readonly BERRIES_REQUIRED = 3;

  // ================================================================
  // COMPLETE
  // ================================================================

  public completed = false;

  // ================================================================
  // GAME LOOP
  // ================================================================

  private animationFrameId = 0;

  private lastTime = 0;

  // ================================================================
  // INITIALIZATION
  // ================================================================

  ngOnInit(): void {
    // requestAnimationFrame and performance.now()
    // only exist in the browser.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.lastTime = performance.now();

    this.startTutorialLoop();
  }

  // ================================================================
  // BASIC ATTACK EVENT
  // ================================================================

  public onBasicAttack(): void {
    if (this.currentStep !== 'attack') {
      return;
    }

    this.attackPerformed = true;

    this.nextStep();
  }

  // ================================================================
  // ENEMY DEFEATED EVENT
  // ================================================================

  public onTutorialEnemyDefeated(): void {
    if (this.currentStep !== 'attackEnemy') {
      return;
    }

    this.tutorialEnemyDefeated = true;

    this.nextStep();
  }

  public onBerryGathered(): void {
    if (this.currentStep !== 'gatherBerries') return;

    if (this.berriesGathered < this.BERRIES_REQUIRED) {
      this.berriesGathered++;

      if (this.berriesGathered >= this.BERRIES_REQUIRED) {
        this.nextStep();
      }
    }
  }

  // ================================================================
  // TUTORIAL LOOP
  // ================================================================

  private startTutorialLoop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const update = (currentTime: number): void => {
      const deltaTime = (currentTime - this.lastTime) / 1000;

      this.lastTime = currentTime;

      this.updateTutorial(deltaTime);

      // Tell Angular that tutorial progress and step state changed.
      this.cdr.detectChanges();

      if (!this.completed) {
        this.animationFrameId = requestAnimationFrame(update);
      }
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  // ================================================================
  // UPDATE TUTORIAL
  // ================================================================

  private updateTutorial(deltaTime: number): void {
    if (this.completed) {
      return;
    }

    switch (this.currentStep) {
      case 'movement':
        this.updateMovement(deltaTime);

        break;

      case 'sprint':
        this.updateSprint(deltaTime);

        break;

      case 'stamina':
        this.updateStamina();

        break;

      case 'attack':
        /*
         * Waiting for Player.attack.
         */

        break;

      case 'attackEnemy':
        /*
         * Waiting for enemy death.
         */

        break;
    }
  }

  // ================================================================
  // MOVEMENT
  // ================================================================

  private updateMovement(deltaTime: number): void {
    if (!this.player) {
      return;
    }

    if (!this.player.getIsMoving()) {
      return;
    }

    this.movementTime += deltaTime;

    this.movementProgress = Math.min(100, (this.movementTime / this.MOVEMENT_REQUIRED) * 100);

    if (this.movementTime >= this.MOVEMENT_REQUIRED) {
      this.movementProgress = 100;
      this.nextStep();
    }
  }

  // ================================================================
  // SPRINT
  // ================================================================

  private updateSprint(deltaTime: number): void {
    if (!this.player) {
      return;
    }

    if (!this.player.getIsSprinting()) {
      return;
    }

    this.sprintTime += deltaTime;

    this.sprintProgress = Math.min(100, (this.sprintTime / this.SPRINT_REQUIRED) * 100);

    if (this.sprintTime >= this.SPRINT_REQUIRED) {
      this.sprintProgress = 100;

      this.nextStep();
    }
  }

  // ================================================================
  // STAMINA
  // ================================================================

  private updateStamina(): void {
    if (!this.player) {
      return;
    }

    const stamina = this.player.getStamina();

    this.staminaProgress = Math.min(100, Math.max(0, 100 - stamina));

    if (stamina <= 0) {
      this.staminaProgress = 100;

      this.nextStep();
    }
  }

  // ================================================================
  // NEXT STEP
  // ================================================================

  private nextStep(): void {
    switch (this.currentStep) {
      // --------------------------------------------------------
      // MOVEMENT → SPRINT
      // --------------------------------------------------------

      case 'movement':
        this.currentStep = 'sprint';

        this.movementProgress = 100;

        this.sprintProgress = 0;

        this.sprintTime = 0;

        break;

      // --------------------------------------------------------
      // SPRINT → STAMINA
      // --------------------------------------------------------

      case 'sprint':
        this.currentStep = 'stamina';

        this.sprintProgress = 100;

        this.staminaProgress = 0;

        this.staminaStarted = false;

        break;

      // --------------------------------------------------------
      // STAMINA → ATTACK
      // --------------------------------------------------------

      case 'stamina':
        this.currentStep = 'attack';

        this.staminaProgress = 100;

        this.attackPerformed = false;

        break;

      // --------------------------------------------------------
      // ATTACK → ENEMY
      // --------------------------------------------------------

      case 'attack':
        this.currentStep = 'attackEnemy';

        this.attackPerformed = true;

        this.tutorialEnemyDefeated = false;

        this.enemyStepStarted.emit();

        break;

      // --------------------------------------------------------
      // ENEMY → GATHER BERRIES
      // --------------------------------------------------------

      case 'attackEnemy':
        this.currentStep = 'gatherBerries';

        this.tutorialEnemyDefeated = true;

        break;

      // --------------------------------------------------------
      // GATHER BERRIES → COMPLETE
      // --------------------------------------------------------

      case 'gatherBerries':
        this.currentStep = 'complete';

        this.completed = true;

        break;
    }
  }

  // ================================================================
  // HELPERS
  // ================================================================

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
        return Math.min(100, (this.berriesGathered / this.BERRIES_REQUIRED) * 100);

      case 'complete':
        return 100;
    }
  }

  public isComplete(): boolean {
    return this.completed;
  }

  // ================================================================
  // CLEANUP
  // ================================================================

  ngOnDestroy(): void {
    // cancelAnimationFrame is also browser-only.
    if (isPlatformBrowser(this.platformId) && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
