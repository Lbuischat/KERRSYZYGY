import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { Bush } from '../bush/bush';
import { Enemy } from '../enemy/enemy';
import { Player } from '../player/player';
import { ProjectileService } from '../projectile/projectile.service';
import { GameStateService } from '../../../services/game-state/game-state.service';

@Component({
  selector: 'app-game-world',
  imports: [Player, Enemy, Bush],
  templateUrl: './game-world.html',
  styleUrl: './game-world.css',
})
export class GameWorld {
  @Output()
  tutorialBoundary = new EventEmitter<void>();

  @ViewChild(Player)
  player!: Player;

  @ViewChild(Enemy)
  enemy!: Enemy;

  @ViewChildren(Bush)
  bushComponents!: QueryList<Bush>;

  private readonly bushTiles = [
    { column: 2, row: 12 },
    { column: 17, row: 5 },
    { column: 14, row: 17 },
  ];

  get bushes() {
    return this.bushTiles;
  }

  private animationFrameId = 0;
  private projectileElements = new Map<number, HTMLElement>();
  private enemyAttackCooldown = 0;
  private playerWasAtBoundary = false;

  // Current camera position in world/screen coordinates.
  // These are used to convert mouse coordinates into world coordinates.
  private cameraX = 0;
  private cameraY = 0;

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
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.startGameLoop();
    }
  }

  private startGameLoop(): void {
    let lastTime = performance.now();

    const update = (currentTime: number): void => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      this.projectileService.update(deltaTime);

      this.checkTutorialBoundary();

      this.updateEnemyMovement();
      this.updateEnemyAttack(deltaTime);
      this.resolvePlayerEnemyCollision();
      this.checkProjectileCollisions();
      this.updateEnemyHealthBar();
      this.updateMiniMap();

      this.renderProjectiles();

      // Camera follows the player.
      this.updateCamera();

      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  // ================================================================
  // PROJECTILES
  // ================================================================

  shootProjectile(event: { mouseX: number; mouseY: number }): void {
    if (!this.player) {
      return;
    }

    const position = this.player.getPosition();

    /*
     * Mouse coordinates come from the SCREEN.
     *
     * The projectile system uses WORLD coordinates.
     *
     * Therefore:
     *
     * world position = screen position - camera position
     */
    const worldMouseX = event.mouseX - this.cameraX;

    const worldMouseY = event.mouseY - this.cameraY;

    this.projectileService.spawnProjectile(
      'player',
      position.x,
      position.y,
      worldMouseX,
      worldMouseY,
    );
  }

  // ================================================================
  // PLAYER ATTACK
  // ================================================================

  playerAttack(): void {
    console.log('PLAYER ATTACK RECEIVED');

    if (!this.player || !this.enemy) {
      console.log('Player or enemy not found');
      return;
    }

    const playerPosition = this.player.getPosition();
    const playerSize = this.player.getSize();

    const enemyX = this.enemy.x;
    const enemyY = this.enemy.y;
    const enemySize = this.enemy.size;

    const playerCenterX = playerPosition.x + playerSize / 2;

    const playerCenterY = playerPosition.y + playerSize / 2;

    const enemyCenterX = enemyX + enemySize / 2;

    const enemyCenterY = enemyY + enemySize / 2;

    const dx = playerCenterX - enemyCenterX;

    const dy = playerCenterY - enemyCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    console.log('Attack distance:', distance);

    const attackRange = 70;

    if (distance <= attackRange) {
      this.enemy.takeDamage(10);
      console.log('MELEE HIT! Damage: 10');
    } else {
      console.log('Attack missed — enemy too far away');
    }
  }

  playerInteract(): void {
    if (!this.player || !this.bushComponents) {
      return;
    }

    const playerPosition = this.player.getPosition();
    const playerSize = this.player.getSize();

    const playerCenterX = playerPosition.x + playerSize / 2;

    const playerCenterY = playerPosition.y + playerSize / 2;

    const interactionRange = 85;

    for (const bush of this.bushComponents) {
      const bushPosition = bush.getPosition();

      const bushCenterX = bushPosition.x + 128 / 2;

      const bushCenterY = bushPosition.y + 128 / 2;

      const dx = playerCenterX - bushCenterX;

      const dy = playerCenterY - bushCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      console.log('🌳 Bush distance:', distance);

      if (distance <= interactionRange) {
        console.log('🌳 PLAYER IS NEAR A BUSH!');
        bush.harvest();
        return;
      }
    }
  }

  // ================================================================
  // PLAYER / ENEMY COLLISION
  // ================================================================

  private resolvePlayerEnemyCollision(): void {
    if (!this.player || !this.enemy || this.enemy.isDead) {
      return;
    }

    const playerPosition = this.player.getPosition();

    const playerSize = this.player.getSize();

    const enemyPosition = {
      x: this.enemy.x,
      y: this.enemy.y,
    };

    const enemySize = this.enemy.size;

    const playerCenterX = playerPosition.x + playerSize / 2;

    const playerCenterY = playerPosition.y + playerSize / 2;

    const enemyCenterX = enemyPosition.x + enemySize / 2;

    const enemyCenterY = enemyPosition.y + enemySize / 2;

    const dx = playerCenterX - enemyCenterX;

    const dy = playerCenterY - enemyCenterY;

    const overlapX = playerSize / 2 + enemySize / 2 - Math.abs(dx);

    const overlapY = playerSize / 2 + enemySize / 2 - Math.abs(dy);

    if (overlapX <= 0 || overlapY <= 0) {
      return;
    }

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

  // ================================================================
  // ENEMY MOVEMENT
  // ================================================================

  private updateEnemyMovement(): void {
    if (!this.player || !this.enemy || this.enemy.isDead) {
      return;
    }

    const playerPosition = this.player.getPosition();

    const playerSize = this.player.getSize();

    this.enemy.checkPlayerInView(playerPosition.x, playerPosition.y, playerSize);

    if (!this.enemy.isPlayerInView) {
      return;
    }

    const playerCenterX = playerPosition.x + playerSize / 2;

    const playerCenterY = playerPosition.y + playerSize / 2;

    const enemyCenterX = this.enemy.x + this.enemy.size / 2;

    const enemyCenterY = this.enemy.y + this.enemy.size / 2;

    const dx = playerCenterX - enemyCenterX;

    const dy = playerCenterY - enemyCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {
      return;
    }

    const directionX = dx / distance;

    const directionY = dy / distance;

    this.enemy.x += directionX * this.enemy.speed;

    this.enemy.y += directionY * this.enemy.speed;

    this.enemy.updateVisualPosition();
  }

  // ================================================================
  // ENEMY ATTACK
  // ================================================================

  private updateEnemyAttack(deltaTime: number): void {
    if (!this.player || !this.enemy || this.enemy.isDead) {
      return;
    }

    if (this.enemyAttackCooldown > 0) {
      this.enemyAttackCooldown -= deltaTime;
      return;
    }

    const playerPosition = this.player.getPosition();

    const playerSize = this.player.getSize();

    const enemySize = this.enemy.size;

    const playerCenterX = playerPosition.x + playerSize / 2;

    const playerCenterY = playerPosition.y + playerSize / 2;

    const enemyCenterX = this.enemy.x + enemySize / 2;

    const enemyCenterY = this.enemy.y + enemySize / 2;

    const dx = playerCenterX - enemyCenterX;

    const dy = playerCenterY - enemyCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const collisionDistance = playerSize / 2 + enemySize / 2;

    if (distance <= collisionDistance) {
      console.log('🚨 ENEMY ATTACKING', 'isDead:', this.enemy.isDead, 'health:', this.enemy.health);

      this.player.takeDamage(10);

      this.enemyAttackCooldown = 0.75;

      console.log('Skunk attacked player!');
    }
  }

  // ================================================================
  // PROJECTILE COLLISIONS
  // ================================================================

  private checkProjectileCollisions(): void {
    if (!this.enemy || this.enemy.isDead) {
      return;
    }

    const projectiles = this.projectileService.getProjectiles();

    const enemyX = this.enemy.x;

    const enemyY = this.enemy.y;

    const enemySize = this.enemy.size;

    const enemyCenterX = enemyX + enemySize / 2;

    const enemyCenterY = enemyY + enemySize / 2;

    for (const projectile of projectiles) {
      const projectileCenterX = projectile.x + projectile.size / 2;

      const projectileCenterY = projectile.y + projectile.size / 2;

      const dx = projectileCenterX - enemyCenterX;

      const dy = projectileCenterY - enemyCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const collisionDistance = enemySize / 2 + projectile.size / 2;

      if (distance <= collisionDistance) {
        this.enemy.takeDamage(projectile.damage);

        this.projectileService.removeProjectile(projectile.id);
      }
    }
  }

  // ================================================================
  // ENEMY HEALTH BAR
  // ================================================================

  private updateEnemyHealthBar(): void {
    if (!this.enemy || this.enemy.isDead) {
      return;
    }

    const healthBar = document.getElementById('enemy-health-bar');

    if (!healthBar) {
      return;
    }

    healthBar.style.width = `${this.enemy.getHealthPercentage()}%`;
  }

  // ================================================================
  // PROJECTILE VISUALS
  // ================================================================

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

  // ================================================================
  // MINIMAP
  // ================================================================

  private updateMiniMap(): void {
    if (this.player) {
      const position = this.player.getPosition();

      this.gameStateService.setPlayerPosition({
        x: position.x,
        y: position.y,
      });
    }

    if (this.enemy && !this.enemy.isDead) {
      this.gameStateService.setEnemyPositions([
        {
          x: this.enemy.x,
          y: this.enemy.y,
        },
      ]);
    } else {
      this.gameStateService.setEnemyPositions([]);
    }
  }

  // ================================================================
  // CAMERA
  // ================================================================

  private updateCamera(): void {
    const camera = document.getElementById('camera');

    if (!camera || !this.player) {
      return;
    }

    const playerPosition = this.player.getPosition();

    const playerSize = this.player.getSize();

    // ------------------------------------------------
    // Player center in WORLD coordinates
    // ------------------------------------------------

    const playerCenterX = playerPosition.x + playerSize / 2;

    const playerCenterY = playerPosition.y + playerSize / 2;

    // ------------------------------------------------
    // Map dimensions
    // ------------------------------------------------

    const mapWidth = 2560;
    const mapHeight = 2560;

    // ------------------------------------------------
    // Screen dimensions
    // ------------------------------------------------

    const screenWidth = window.innerWidth;

    const screenHeight = window.innerHeight;

    // ------------------------------------------------
    // Try to place the player in the center
    // ------------------------------------------------

    let cameraX = screenWidth / 2 - playerCenterX;

    let cameraY = screenHeight / 2 - playerCenterY;

    // ------------------------------------------------
    // Don't let the camera show outside the MAP
    // ------------------------------------------------

    const minCameraX = screenWidth - mapWidth;

    const maxCameraX = 0;

    cameraX = Math.max(minCameraX, Math.min(cameraX, maxCameraX));

    const minCameraY = screenHeight - mapHeight;

    const maxCameraY = 0;

    cameraY = Math.max(minCameraY, Math.min(cameraY, maxCameraY));

    // ------------------------------------------------
    // Save camera position
    //
    // We need these values later when converting
    // screen mouse coordinates into world coordinates.
    // ------------------------------------------------

    this.cameraX = cameraX;
    this.cameraY = cameraY;

    // ------------------------------------------------
    // Move the entire world
    // ------------------------------------------------

    camera.style.transform = `translate(${cameraX}px, ${cameraY}px)`;
  }

  private checkTutorialBoundary(): void {
    if (!this.player) {
      return;
    }

    const position = this.player.getPosition();

    const boundary = 2500;

    const atBoundary =
      position.x >= boundary || position.y >= boundary || position.x <= 0 || position.y <= 0;

    if (atBoundary && !this.playerWasAtBoundary) {
      console.log('🚧 GAME WORLD DETECTED PLAYER AT BOUNDARY');

      this.tutorialBoundary.emit();
    }

    this.playerWasAtBoundary = atBoundary;
  }
}
