import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import { Enemy } from '../enemy/enemy';
import { Player } from '../player/player';
import { ProjectileService } from '../projectile/projectile.service';
import { GameStateService } from '../../../services/game-state/game-state.service';
import { Terrain } from './terrain/terrain';

@Component({
  selector: 'app-game-world',
  imports: [
    Player,
    Enemy,
    Terrain
  ],
  templateUrl: './game-world.html',
  styleUrl: './game-world.css',
})
export class GameWorld {
  @ViewChild(Player)
  player!: Player;

  @ViewChild(Enemy)
  enemy!: Enemy;

  private animationFrameId = 0;
  private projectileElements = new Map<number, HTMLElement>();
  private enemyAttackCooldown = 0;
  cameraX = 0;
  cameraY = 0;

  readonly worldWidth = 20 * 128;
  readonly worldHeight = 20 * 128;

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

      this.updateCamera();
      this.projectileService.update(deltaTime);
      this.updateEnemyMovement();
      this.updateEnemyAttack(deltaTime);
      this.resolvePlayerEnemyCollision();
      this.checkProjectileCollisions();
      this.updateEnemyHealthBar();
      this.updateMiniMap(); // <-- IMPORTANT
      this.renderProjectiles();

      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
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
    const attackRange = 70; // Adjust this value as needed
    if (distance <= attackRange) {
      this.enemy.takeDamage(10);
      console.log('MELEE HIT! Damage: 10');
    } else {
      console.log('Attack missed — enemy too far away');
    }
  }

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

    // Distance between centers
    const dx = playerCenterX - enemyCenterX;
    const dy = playerCenterY - enemyCenterY;

    // How much the two boxes overlap
    const overlapX = playerSize / 2 + enemySize / 2 - Math.abs(dx);
    const overlapY = playerSize / 2 + enemySize / 2 - Math.abs(dy);

    // No collision
    if (overlapX <= 0 || overlapY <= 0) {
      return;
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

  private updateEnemyMovement(): void {
    if (!this.player || !this.enemy || this.enemy.isDead) {
      return;
    }
    const playerPosition = this.player.getPosition();
    const playerSize = this.player.getSize();

    this.enemy.checkPlayerInView(
      playerPosition.x,
      playerPosition.y,
      playerSize
    );

    if (!this.enemy.isPlayerInView) {
      return;
    }

    const playerCenterX =
      playerPosition.x +
      playerSize / 2;

    const playerCenterY =
      playerPosition.y +
      playerSize / 2;

    const enemyCenterX =
      this.enemy.x +
      this.enemy.size / 2;

    const enemyCenterY =
      this.enemy.y +
      this.enemy.size / 2;

    const dx =
      playerCenterX - enemyCenterX;

    const dy =
      playerCenterY - enemyCenterY;

    const distance =
      Math.sqrt(dx * dx + dy * dy);

    // Don't move if we're already touching the player
    if (distance === 0) {
      return;
    }
    const directionX = dx / distance;
    const directionY = dy / distance;
    this.enemy.x += directionX * this.enemy.speed;
    this.enemy.y += directionY * this.enemy.speed;
    this.enemy.updateVisualPosition();
  }

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
    const enemyX = this.enemy.x;
    const enemyY = this.enemy.y;
    const enemySize = this.enemy.size;
    const playerCenterX =
      playerPosition.x +
      playerSize / 2;

    const playerCenterY =
      playerPosition.y +
      playerSize / 2;

    const enemyCenterX =
      this.enemy.x +
      this.enemy.size / 2;

    const enemyCenterY =
      this.enemy.y +
      this.enemy.size / 2;

    const dx =
      playerCenterX - enemyCenterX;

    const dy =
      playerCenterY - enemyCenterY;

    const distance =
      Math.sqrt(dx * dx + dy * dy);
    const collisionDistance = playerSize / 2 + enemySize / 2;
    if (distance <= collisionDistance) {
      console.log('🚨 ENEMY ATTACKING', 'isDead:', this.enemy.isDead, 'health:', this.enemy.health);
      this.player.takeDamage(10);
      this.enemyAttackCooldown = 0.75;
      console.log('Skunk attacked player!');
    }
  }

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
