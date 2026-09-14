import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
  viewChildren
} from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from '../../../services/language/language.service';
import { ActiveBuff, ItemId } from '../buffs/buff.model';
import { BuffService } from '../buffs/buff.service';
import { Enemy } from '../enemy/enemy';
import { Player } from '../player/player';
import { ProjectileService } from '../projectile/projectile.service';
import { GameStateService } from '../../../services/game-state/game-state.service';
import { ScoreBoard } from '../score-board/score-board';
import { Terrain } from './terrain/terrain';

interface EnemySpawn {
  id: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-game-world',
  imports: [
    Player,
    Enemy,
    ScoreBoard,
    Terrain
  ],
  templateUrl: './game-world.html',
  styleUrl: './game-world.css',
})
export class GameWorld implements AfterViewInit, OnDestroy {
  @ViewChild(Player)
  player!: Player;

  readonly enemyRefs = viewChildren(Enemy);

  private readonly buffService = inject(BuffService);

  readonly activeBuffs = this.buffService.active;

  private readonly languageService = inject(LanguageService);

  hudText() {
    return this.languageService.t().game.hud;
  }

  itemName(itemId: ItemId): string {
    return this.languageService.t().game.items[itemId].name;
  }

  private animationFrameId = 0;
  private projectileElements = new Map<number, HTMLElement>();
  private pendingTimers: ReturnType<typeof setTimeout>[] = [];
  cameraX = 0;
  cameraY = 0;

  readonly worldWidth = 20 * 128;
  readonly worldHeight = 20 * 128;

  // =========================================================
  // WAVE / RUN STATE
  // =========================================================

  readonly enemies = signal<EnemySpawn[]>([]);
  readonly wave = signal(1);
  readonly kills = signal(0);
  readonly score = signal(0);
  readonly elapsedSeconds = signal(0);
  readonly isGameOver = signal(false);
  readonly isVictory = signal(false);
  readonly waveBanner = signal('');
  readonly enemiesRemaining = signal(0);

  private nextEnemyId = 1;
  private runElapsedMs = 0;

  readonly maxWave = 6;
  private readonly enemyDamage = 10;
  private readonly enemyAttackDelay = 0.75;
  private readonly meleeRange = 70;
  private readonly meleeDamage = 10;
  private readonly killScore = 100;
  private readonly waveClearScore = 50;

  handleMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      this.player.handleMouseDown(event);
    }

    if (event.button === 2) {
      event.preventDefault();
      this.player.handleMouseDown(event);
    }
  }

  handleMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.player.handleMouseUp(event);
    }
  }

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,

    private projectileService: ProjectileService,

    private gameStateService: GameStateService,

    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startRun();
  }

  ngOnDestroy(): void {
    // ngOnDestroy also runs on the server, where there is no animation frame.
    this.stopGameLoop();
    this.clearPendingTimers();
  }

  private stopGameLoop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    cancelAnimationFrame(this.animationFrameId);
  }

  // =========================================================
  // RUN LIFECYCLE
  // =========================================================

  private startRun(): void {
    this.clearPendingTimers();

    this.kills.set(0);
    this.score.set(0);
    this.elapsedSeconds.set(0);
    this.isGameOver.set(false);
    this.isVictory.set(false);
    this.runElapsedMs = 0;

    this.buffService.clear();
    this.gameStateService.setPaused(false);

    this.startWave(1);
    this.startGameLoop();
  }

  restartRun(): void {
    // The previous run's enemies survive until the next change detection,
    // so retire them here or they get one more frame to hit the new player.
    for (const enemy of this.enemyRefs()) {
      enemy.isDead = true;
    }

    this.player.reset();
    this.enemies.set([]);
    this.startRun();
  }

  exitToMenu(): void {
    this.router.navigate(['/start']);
  }

  onPlayerDied(): void {
    this.finishRun(false);
  }

  private finishRun(victory: boolean): void {
    if (this.isGameOver()) {
      return;
    }

    this.stopGameLoop();
    this.clearPendingTimers();

    this.elapsedSeconds.set(this.currentRunSeconds());
    this.waveBanner.set('');
    this.isVictory.set(victory);
    this.isGameOver.set(true);
  }

  // =========================================================
  // WAVES
  // =========================================================

  private startWave(waveNumber: number): void {
    const spawns: EnemySpawn[] = [];

    // Wave 1 spawns a single enemy, and every wave after it adds one more.
    for (let i = 0; i < waveNumber; i++) {
      spawns.push(this.createSpawn());
    }

    this.wave.set(waveNumber);
    this.enemies.set(spawns);
    this.enemiesRemaining.set(spawns.length);

    this.showWaveBanner(
      waveNumber >= this.maxWave
        ? this.hudText().finalWave
        : `${this.hudText().wave} ${waveNumber}`
    );
  }

  onEnemyDied(id: number): void {
    this.kills.update(value => value + 1);
    this.score.update(value => value + this.killScore);
    this.enemiesRemaining.update(value => value - 1);

    // Let the death animation finish before the component is destroyed.
    this.addTimer(() => {
      this.enemies.update(list => list.filter(enemy => enemy.id !== id));
    }, 260);

    if (this.enemiesRemaining() > 0) {
      return;
    }

    this.score.update(value => value + this.wave() * this.waveClearScore);

    if (this.wave() >= this.maxWave) {
      this.addTimer(() => this.finishRun(true), 900);
      return;
    }

    this.addTimer(() => {
      if (!this.isGameOver()) {
        this.startWave(this.wave() + 1);
      }
    }, 1200);
  }

  // Enemies appear in a ring around the player: close enough to reach the
  // fight quickly, far enough not to land on top of them.
  private createSpawn(): EnemySpawn {
    const margin = 40;
    const enemySize = 40;
    const minimumDistance = 220;
    const maximumDistance = 430;

    const playerPosition = this.player
      ? this.player.getPosition()
      : { x: 300, y: 300 };

    const angle = Math.random() * Math.PI * 2;
    const distance =
      minimumDistance + Math.random() * (maximumDistance - minimumDistance);

    const x = this.clamp(
      playerPosition.x + Math.cos(angle) * distance,
      margin,
      this.worldWidth - margin - enemySize,
    );

    const y = this.clamp(
      playerPosition.y + Math.sin(angle) * distance,
      margin,
      this.worldHeight - margin - enemySize,
    );

    return {
      id: this.nextEnemyId++,
      x,
      y,
    };
  }

  private clamp(value: number, minimum: number, maximum: number): number {
    return Math.max(minimum, Math.min(value, maximum));
  }

  private showWaveBanner(text: string): void {
    this.waveBanner.set(text);

    this.addTimer(() => {
      if (this.waveBanner() === text) {
        this.waveBanner.set('');
      }
    }, 1600);
  }

  private currentRunSeconds(): number {
    return Math.floor(this.runElapsedMs / 1000);
  }

  buffSeconds(buff: ActiveBuff): number {
    return Math.ceil(buff.remainingSeconds);
  }

  private applyPendingHeal(): void {
    const heal = this.buffService.consumeHeal();

    if (heal > 0 && this.player) {
      this.player.heal(heal);
    }
  }

  private addTimer(action: () => void, delay: number): void {
    const timer = setTimeout(() => {
      this.pendingTimers = this.pendingTimers.filter(id => id !== timer);
      action();
    }, delay);

    this.pendingTimers.push(timer);
  }

  private clearPendingTimers(): void {
    for (const timer of this.pendingTimers) {
      clearTimeout(timer);
    }

    this.pendingTimers = [];
  }

  // =========================================================
  // GAME LOOP
  // =========================================================

  private startGameLoop(): void {
    this.stopGameLoop();

    let lastTime = performance.now();

    const update = (currentTime: number): void => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (this.isGameOver()) {
        return;
      }

      // Paused: the world freezes, but an item used in the inventory
      // still has to reach the player.
      if (this.gameStateService.paused()) {
        this.applyPendingHeal();

        this.animationFrameId = requestAnimationFrame(update);

        return;
      }

      // Counted from the loop, so paused time never reaches the score board.
      this.runElapsedMs += deltaTime * 1000;

      this.buffService.update(deltaTime);
      this.applyPendingHeal();

      this.updateCamera();
      this.projectileService.update(deltaTime);
      this.updateEnemyMovement();
      this.separateEnemies();
      this.updateEnemyAttack(deltaTime);
      this.resolvePlayerEnemyCollision();
      this.checkProjectileCollisions();
      this.updateEnemyHealthBars();
      this.updateElapsedTime();
      this.updateMiniMap();
      this.renderProjectiles();

      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  private aliveEnemies(): Enemy[] {
    return this.enemyRefs().filter(enemy => !enemy.isDead);
  }

  shootProjectile(event: { mouseX: number; mouseY: number }): void {

    const position = this.player.getPosition();

    // Mouse position is relative to the screen.
    // Convert it into world coordinates using the camera.
    const worldMouseX = event.mouseX + this.cameraX;
    const worldMouseY = event.mouseY + this.cameraY;

    this.projectileService.spawnProjectile(
      'player',
      position.x,
      position.y,
      worldMouseX,
      worldMouseY,
    );
  }

  playerAttack(): void {
    if (!this.player) {
      return;
    }

    const playerPosition = this.player.getPosition();
    const playerSize = this.player.getSize();
    const playerCenterX = playerPosition.x + playerSize / 2;
    const playerCenterY = playerPosition.y + playerSize / 2;

    const damage = Math.round(
      this.meleeDamage * this.buffService.damageMultiplier()
    );

    // A swing hits everything inside its arc, otherwise a swarm is unplayable.
    for (const enemy of this.aliveEnemies()) {
      const enemyCenterX = enemy.x + enemy.size / 2;
      const enemyCenterY = enemy.y + enemy.size / 2;
      const dx = playerCenterX - enemyCenterX;
      const dy = playerCenterY - enemyCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.meleeRange) {
        enemy.takeDamage(damage);
      }
    }
  }

  private resolvePlayerEnemyCollision(): void {
    if (!this.player) {
      return;
    }

    const playerSize = this.player.getSize();

    for (const enemy of this.aliveEnemies()) {
      const playerPosition = this.player.getPosition();
      const playerCenterX = playerPosition.x + playerSize / 2;
      const playerCenterY = playerPosition.y + playerSize / 2;
      const enemyCenterX = enemy.x + enemy.size / 2;
      const enemyCenterY = enemy.y + enemy.size / 2;

      // Distance between centers
      const dx = playerCenterX - enemyCenterX;
      const dy = playerCenterY - enemyCenterY;

      // How much the two boxes overlap
      const overlapX = playerSize / 2 + enemy.size / 2 - Math.abs(dx);
      const overlapY = playerSize / 2 + enemy.size / 2 - Math.abs(dy);

      // No collision
      if (overlapX <= 0 || overlapY <= 0) {
        continue;
      }

      // Push player out along the axis
      // with the smallest overlap
      let correctedX = playerPosition.x;
      let correctedY = playerPosition.y;
      if (overlapX < overlapY) {
        if (dx > 0) {
          correctedX += overlapX;
        } else {
          correctedX -= overlapX;
        }
      } else {
        if (dy > 0) {
          correctedY += overlapY;
        } else {
          correctedY -= overlapY;
        }
      }

      this.player.setPosition(correctedX, correctedY);
    }
  }

  private updateEnemyMovement(): void {
    if (!this.player) {
      return;
    }

    const playerPosition = this.player.getPosition();
    const playerSize = this.player.getSize();
    const playerCenterX = playerPosition.x + playerSize / 2;
    const playerCenterY = playerPosition.y + playerSize / 2;

    for (const enemy of this.aliveEnemies()) {
      // Enemies only chase a player they can see.
      if (!enemy.checkPlayerInView(playerPosition.x, playerPosition.y, playerSize)) {
        continue;
      }

      const enemyCenterX = enemy.x + enemy.size / 2;
      const enemyCenterY = enemy.y + enemy.size / 2;
      const dx = playerCenterX - enemyCenterX;
      const dy = playerCenterY - enemyCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Don't move if we're already touching the player
      if (distance === 0) {
        continue;
      }

      enemy.x += (dx / distance) * enemy.speed;
      enemy.y += (dy / distance) * enemy.speed;
      enemy.updateVisualPosition();
    }
  }

  // Without this the whole wave collapses into a single stacked blob.
  private separateEnemies(): void {
    const enemies = this.aliveEnemies();

    for (let i = 0; i < enemies.length; i++) {
      for (let j = i + 1; j < enemies.length; j++) {
        const first = enemies[i];
        const second = enemies[j];

        const dx =
          (first.x + first.size / 2) - (second.x + second.size / 2);
        const dy =
          (first.y + first.size / 2) - (second.y + second.size / 2);

        const distance = Math.sqrt(dx * dx + dy * dy);
        const minimumDistance = first.size / 2 + second.size / 2;

        if (distance >= minimumDistance) {
          continue;
        }

        // Two enemies spawned on the exact same pixel have no direction to
        // push along, so nudge one of them to break the tie.
        if (distance === 0) {
          first.x += 1;
          continue;
        }

        const push = (minimumDistance - distance) / 2;

        first.x += (dx / distance) * push;
        first.y += (dy / distance) * push;
        second.x -= (dx / distance) * push;
        second.y -= (dy / distance) * push;

        first.updateVisualPosition();
        second.updateVisualPosition();
      }
    }
  }

  private updateEnemyAttack(deltaTime: number): void {
    if (!this.player || this.player.isDead) {
      return;
    }

    const playerPosition = this.player.getPosition();
    const playerSize = this.player.getSize();
    const playerCenterX = playerPosition.x + playerSize / 2;
    const playerCenterY = playerPosition.y + playerSize / 2;

    for (const enemy of this.aliveEnemies()) {
      if (enemy.attackCooldown > 0) {
        enemy.attackCooldown -= deltaTime;
        continue;
      }

      const enemyCenterX = enemy.x + enemy.size / 2;
      const enemyCenterY = enemy.y + enemy.size / 2;
      const dx = playerCenterX - enemyCenterX;
      const dy = playerCenterY - enemyCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const collisionDistance = playerSize / 2 + enemy.size / 2;

      if (distance <= collisionDistance) {
        this.player.takeDamage(this.enemyDamage);
        enemy.attackCooldown = this.enemyAttackDelay;
      }
    }
  }

  private checkProjectileCollisions(): void {
    const enemies = this.aliveEnemies();
    if (enemies.length === 0) {
      return;
    }

    // Copied because a hit removes the projectile from the live array.
    const projectiles = [...this.projectileService.getProjectiles()];

    for (const projectile of projectiles) {
      const projectileCenterX = projectile.x + projectile.size / 2;
      const projectileCenterY = projectile.y + projectile.size / 2;

      for (const enemy of enemies) {
        if (enemy.isDead) {
          continue;
        }

        const enemyCenterX = enemy.x + enemy.size / 2;
        const enemyCenterY = enemy.y + enemy.size / 2;
        const dx = projectileCenterX - enemyCenterX;
        const dy = projectileCenterY - enemyCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const collisionDistance = enemy.size / 2 + projectile.size / 2;

        if (distance <= collisionDistance) {
          enemy.takeDamage(
            Math.round(
              projectile.damage * this.buffService.damageMultiplier()
            )
          );
          this.projectileService.removeProjectile(projectile.id);
          break;
        }
      }
    }
  }

  private updateEnemyHealthBars(): void {
    for (const enemy of this.aliveEnemies()) {
      enemy.updateHealthBar();
    }
  }

  private updateElapsedTime(): void {
    const seconds = this.currentRunSeconds();

    if (seconds !== this.elapsedSeconds()) {
      this.elapsedSeconds.set(seconds);
    }
  }

  private renderProjectiles(): void {
    const layer = document.getElementById('projectile-layer');
    if (!layer) {
      return;
    }
    const projectiles = this.projectileService.getProjectiles();
    const activeIds = new Set<number>();
    for (const projectile of projectiles) {
      activeIds.add(projectile.id);
      let element = this.projectileElements.get(projectile.id);
      // Create visual only once
      if (!element) {
        element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.borderRadius = '50%';
        element.style.pointerEvents = 'none';
        layer.appendChild(element);
        this.projectileElements.set(projectile.id, element);
      }
      // Update visual
      element.style.width = `${projectile.size}px`;
      element.style.height = `${projectile.size}px`;
      element.style.backgroundColor = projectile.color;
      element.style.transform = `translate(${projectile.x}px, ${projectile.y}px)`;
    }
    // Remove visuals for dead projectiles
    for (const [id, element] of this.projectileElements) {
      if (!activeIds.has(id)) {
        element.remove();
        this.projectileElements.delete(id);
      }
    }
  }

  private updateMiniMap(): void {
    if (this.player) {
      const position = this.player.getPosition();

      this.gameStateService.setPlayerPosition({
        x: position.x,
        y: position.y,
      });
    }

    this.gameStateService.setEnemyPositions(
      this.aliveEnemies().map(enemy => ({
        x: enemy.x,
        y: enemy.y,
      }))
    );
  }

  private updateCamera(): void {

    if (!this.player || !isPlatformBrowser(this.platformId)) {
      return;
    }

    const playerPosition = this.player.getPosition();
    const playerSize = this.player.getSize();

    const playerCenterX =
      playerPosition.x + playerSize / 2;

    const playerCenterY =
      playerPosition.y + playerSize / 2;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let targetCameraX =
      playerCenterX - screenWidth / 2;

    let targetCameraY =
      playerCenterY - screenHeight / 2;

    // Keep camera inside the world

    const maxCameraX =
      Math.max(0, this.worldWidth - screenWidth);

    const maxCameraY =
      Math.max(0, this.worldHeight - screenHeight);

    targetCameraX = Math.max(
      0,
      Math.min(targetCameraX, maxCameraX)
    );

    targetCameraY = Math.max(
      0,
      Math.min(targetCameraY, maxCameraY)
    );

    this.cameraX = targetCameraX;
    this.cameraY = targetCameraY;


    // =========================================================
    // DIRECTLY MOVE THE WORLD
    // =========================================================

    const worldLayer =
      document.getElementById('world-layer');

    if (!worldLayer) {
      return;
    }

    worldLayer.style.transform =
      `translate(
      ${-this.cameraX}px,
      ${-this.cameraY}px
    )`;
  }

}
