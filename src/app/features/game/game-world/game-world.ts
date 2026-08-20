import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-game-world',
  imports: [],
  templateUrl: './game-world.html',
  styleUrl: './game-world.css',
})
export class GameWorld {

  // =========================
  // PLAYER
  // =========================

  private playerX = 300;
  private playerY = 300;

  // Speed
  private speed = 4;
  private sprintMultiplier = 1.5;

  // Stamina
  private maxStamina = 100;
  private stamina = 100;
  private staminaDrain = 20;
  private staminaRegen = 15;

  // =========================
  // MOVEMENT
  // =========================

  private keys = new Set<string>();
  private animationFrameId = 0;

  // =========================
  // COMBAT
  // =========================

  private mouseDownTime = 0;
  private holdTimer?: ReturnType<typeof setTimeout>;

  private isHoldingAttack = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setupControls();
      this.startGameLoop();
    }
  }

  // =========================
  // CONTROLS
  // =========================

  private setupControls(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  // =========================
  // KEYBOARD
  // =========================

  private handleKeyDown = (event: KeyboardEvent): void => {

    const key = event.key.toLowerCase();

    // Skill 2 — F
    if (key === 'f') {
      event.preventDefault();
      this.useSkill2();
      return;
    }

    // Skill 3 — Q
    if (key === 'q') {
      event.preventDefault();
      this.useSkill3();
      return;
    }

    // Movement + Shift
    if (
      key === 'w' ||
      key === 'a' ||
      key === 's' ||
      key === 'd' ||
      key === 'arrowup' ||
      key === 'arrowdown' ||
      key === 'arrowleft' ||
      key === 'arrowright' ||
      key === 'shift'
    ) {
      event.preventDefault();
      this.keys.add(key);
    }
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    this.keys.delete(event.key.toLowerCase());
  };

  // =========================
  // MOUSE / ATTACK
  // =========================

  private handleMouseDown = (event: MouseEvent): void => {

    if (event.button !== 0) {
      return;
    }

    this.isHoldingAttack = true;
    this.mouseDownTime = performance.now();

    // Normal attack starts immediately
    this.changePlayerColor('yellow');

    // After 2 seconds, turn into Skill 1
    this.holdTimer = setTimeout(() => {

      if (this.isHoldingAttack) {
        this.useSkill1();
      }

    }, 2000);
  };

  private handleMouseUp = (event: MouseEvent): void => {

    if (event.button !== 0) {
      return;
    }

    this.isHoldingAttack = false;

    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
    }

    // Release = back to normal
    this.changePlayerColor('red');
  };

  // =========================
  // SKILL 1
  // =========================

  private useSkill1(): void {

    this.changePlayerColor('turquoise');

    // Skill 1 stays active while LMB
    // continues to be held.
  }

  // =========================
  // SKILL 2
  // =========================

  private useSkill2(): void {

    this.changePlayerColor('purple');

    setTimeout(() => {
      if (!this.isHoldingAttack) {
        this.changePlayerColor('red');
      }
    }, 500);
  }

  // =========================
  // SKILL 3
  // =========================

  private useSkill3(): void {

    this.changePlayerColor('white');

    setTimeout(() => {
      if (!this.isHoldingAttack) {
        this.changePlayerColor('red');
      }
    }, 500);
  }

  // =========================
  // GAME LOOP
  // =========================

  private startGameLoop(): void {

    let lastTime = performance.now();

    const update = (currentTime: number): void => {

      const deltaTime =
        (currentTime - lastTime) / 1000;

      lastTime = currentTime;

      let horizontal = 0;
      let vertical = 0;

      // Up
      if (
        this.keys.has('w') ||
        this.keys.has('arrowup')
      ) {
        vertical -= 1;
      }

      // Down
      if (
        this.keys.has('s') ||
        this.keys.has('arrowdown')
      ) {
        vertical += 1;
      }

      // Left
      if (
        this.keys.has('a') ||
        this.keys.has('arrowleft')
      ) {
        horizontal -= 1;
      }

      // Right
      if (
        this.keys.has('d') ||
        this.keys.has('arrowright')
      ) {
        horizontal += 1;
      }

      // Normalize diagonal movement
      if (horizontal !== 0 && vertical !== 0) {
        horizontal *= 0.7071;
        vertical *= 0.7071;
      }

      // Is player moving?
      const isMoving =
        horizontal !== 0 ||
        vertical !== 0;

      // Is player sprinting?
      const isSprinting =
        this.keys.has('shift') &&
        isMoving &&
        this.stamina > 0;

      // =========================
      // STAMINA
      // =========================

      if (isSprinting) {

        this.stamina -=
          this.staminaDrain * deltaTime;

        if (this.stamina <= 0) {
          this.stamina = 0;
        }

      } else {

        this.stamina +=
          this.staminaRegen * deltaTime;

        if (this.stamina > this.maxStamina) {
          this.stamina = this.maxStamina;
        }
      }

      // =========================
      // SPEED
      // =========================

      const currentSpeed =
        isSprinting
          ? this.speed * this.sprintMultiplier
          : this.speed;

      // =========================
      // MOVE
      // =========================

      this.playerX +=
        horizontal * currentSpeed;

      this.playerY +=
        vertical * currentSpeed;

      // Update player
      this.updatePlayerPosition();

      // Continue loop
      this.animationFrameId =
        requestAnimationFrame(update);
    };

    this.animationFrameId =
      requestAnimationFrame(update);
  }

  // =========================
  // UPDATE PLAYER
  // =========================

  private updatePlayerPosition(): void {

    const player =
      document.getElementById('player');

    const staminaContainer =
      document.getElementById('stamina-container');

    const staminaBar =
      document.getElementById('stamina-bar');

    // Move player
    if (player) {
      player.style.transform =
        `translate(${this.playerX}px, ${this.playerY}px)`;
    }

    // Show stamina while Shift is held
    if (staminaContainer) {

      const shiftHeld =
        this.keys.has('shift');

      staminaContainer.style.display =
        shiftHeld ? 'block' : 'none';
    }

    // Update stamina
    if (staminaBar) {

      const staminaPercentage =
        (this.stamina / this.maxStamina) * 100;

      staminaBar.style.width =
        `${staminaPercentage}%`;
    }
  }

  // =========================
  // CHANGE COLOR
  // =========================

  private changePlayerColor(color: string): void {

    const playerCharacter =
      document.getElementById('player-character');

    if (!playerCharacter) {
      return;
    }

    playerCharacter.style.backgroundColor = color;
  }
}