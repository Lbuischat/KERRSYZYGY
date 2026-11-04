
import { isPlatformBrowser } from '@angular/common';

import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  signal
} from '@angular/core';

import { Bush } from '../bush/bush';
import { Enemy } from '../enemy/enemy';
import { Player } from '../player/player';

import {
  ProjectileService
} from '../projectile/projectile.service';

import {
  GameStateService
} from '../../../services/game-state/game-state.service';

import {
  InventoryService
} from '../../../services/Inventory/inventory.service';

import {
  AudioService
} from '../../../services/audio/audio.service';

interface EnemySpawn {
  id: string;
  x: number;
  y: number;
  elite: boolean;
  training: boolean;
}

interface EnemyShot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  damage: number;
  lifetime: number;
  volleyId: number | null;
  element: HTMLElement;
}

@Component({
  selector: 'app-game-world',
  standalone: true,
  imports: [Player, Enemy, Bush],
  templateUrl: './game-world.html',
  styleUrl: './game-world.css'
})
export class GameWorld implements OnDestroy {

  // ========================================
  // EVENTOS DO TUTORIAL
  // ========================================

  @Output()
  tutorialBoundary = new EventEmitter<void>();

  @Output()
  playerAttacked = new EventEmitter<void>();

  @Output()
  enemyDefeated = new EventEmitter<void>();

  // ========================================
  // JOGADOR E INIMIGOS
  // ========================================

  @ViewChild(Player)
  player!: Player;

  @ViewChildren(Enemy)
  enemyComponents!: QueryList<Enemy>;

  private readonly MAP_SIZE = 2560;
  private readonly TILE = 128;

  private readonly PLAYER_START_X = 1255;
  private readonly PLAYER_START_Y = 1255;

  // ========================================
  // CINCO SLIMES MAIS DISTANTES
  // ========================================

  readonly enemySpawns: EnemySpawn[] = [
    {
      id: 'tutorial',
      x: 650,
      y: 850,
      elite: false,
      training: true
    },
    {
      id: 'slime-2',
      x: 350,
      y: 1770,
      elite: false,
      training: false
    },
    {
      id: 'slime-3',
      x: 1900,
      y: 1530,
      elite: false,
      training: false
    },
    {
      id: 'slime-4',
      x: 1760,
      y: 2250,
      elite: false,
      training: false
    },
    {
      id: 'elite',
      x: 2170,
      y: 400,
      elite: true,
      training: false
    }
  ];

  // ========================================
  // ARBUSTOS
  // ========================================

  readonly bushes = signal([
    {
      id: 1,
      column: 2,
      row: 12,
      harvested: false
    },
    {
      id: 2,
      column: 17,
      row: 5,
      harvested: false
    },
    {
      id: 3,
      column: 14,
      row: 17,
      harvested: false
    }
  ]);

  // ========================================
  // TELA DE MORTE
  // ========================================

  readonly gameOver = signal(false);

  private deathPosition: {
    x: number;
    y: number;
  } | null = null;

  // ========================================
  // CONTROLE DO LOOP
  // ========================================

  private animationFrameId = 0;
  private destroyed = false;

  // Atualização do minimapa a cada 150 ms.
  // Evita forçar o HUD a atualizar 60x por segundo.
  private lastMapSync = 0;

  // ========================================
  // PROJÉTEIS
  // ========================================

  private projectileElements =
    new Map<number, HTMLElement>();

  private enemyShots: EnemyShot[] = [];

  private nextEnemyShotId = 1;
  private nextVolleyId = 1;

  private hitVolleyIds = new Set<number>();

  // ========================================
  // CÂMERA E TUTORIAL
  // ========================================

  private cameraX = 0;
  private cameraY = 0;

  private playerWasAtBoundary = false;
  private tutorialEnemyWasDead = false;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: object,

    private readonly projectileService: ProjectileService,

    private readonly gameStateService: GameStateService,

    private readonly inventoryService: InventoryService,

    private readonly audioService: AudioService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.startGameLoop();
    }
  }

  private get enemies(): Enemy[] {
    return this.enemyComponents?.toArray() ?? [];
  }

  // ========================================
  // LOOP DO JOGO
  // ========================================

  private startGameLoop(): void {
    let lastTime = performance.now();

    const frame = (now: number): void => {
      if (this.destroyed) return;

      const dt = Math.min(
        0.05,
        Math.max(0, (now - lastTime) / 1000)
      );

      lastTime = now;

      // Detecta morte de qualquer origem.
      if (
        this.player &&
        this.player.getHealthPercentage() <= 0
      ) {
        this.triggerGameOver();
      }

      if (!this.gameOver()) {
        this.projectileService.update(dt);

        this.checkTutorialBoundary();
        this.updateEnemies(dt);
        this.checkPlayerProjectileCollisions();
        this.updateEnemyShots(dt);
        this.checkTutorialEnemyDefeated();

        this.renderPlayerProjectiles();
      } else if (this.player && this.deathPosition) {
        // O Player usa um loop próprio.
        // Mantemos a posição de morte durante o overlay.
        this.player.setPosition(
          this.deathPosition.x,
          this.deathPosition.y
        );
      }

      // Radar continua atualizado.
      this.updateMiniMap(now);

      this.updateCamera();

      this.animationFrameId =
        requestAnimationFrame(frame);
    };

    this.animationFrameId =
      requestAnimationFrame(frame);
  }

  // ========================================
  // ATIVAR GAME OVER
  // ========================================

  private triggerGameOver(): void {
    if (this.gameOver()) return;

    if (this.player) {
      this.deathPosition =
        this.player.getPosition();
    }

    this.gameOver.set(true);
  }

  // ========================================
  // REINICIAR JOGO
  // ========================================

  restartGame(): void {
    if (!this.player || !this.gameOver()) {
      return;
    }

    // Restaurar vida.
    this.player.heal(100);

    // Posição inicial.
    this.player.setPosition(
      this.PLAYER_START_X,
      this.PLAYER_START_Y
    );

    this.deathPosition = null;

    const healthBar =
      document.getElementById('player-health-bar');

    if (healthBar) {
      healthBar.style.width = '100%';
    }

    // Limpar projéteis do jogador.
    const playerShots = [
      ...this.projectileService.getProjectiles()
    ];

    for (const shot of playerShots) {
      this.projectileService.removeProjectile(
        shot.id
      );
    }

    for (const element of this.projectileElements.values()) {
      element.remove();
    }

    this.projectileElements.clear();

    // Limpar projéteis dos inimigos.
    for (const shot of this.enemyShots) {
      shot.element.remove();
    }

    this.enemyShots = [];
    this.hitVolleyIds.clear();

    // Restaurar todos os cinco slimes.
    this.enemies.forEach((enemy, index) => {
      const spawn = this.enemySpawns[index];

      if (!spawn) return;

      enemy.x = spawn.x;
      enemy.y = spawn.y;

      enemy.maxHealth = enemy.elite ? 350 : 100;
      enemy.health = enemy.maxHealth;

      enemy.isDead = false;
      enemy.isPlayerInView = false;

      enemy.touchTimer = 0;
      enemy.spitTimer = 1.4;

      enemy.burstTimer = 3.8;
      enemy.burstWindup = 0;
      enemy.burstCharging = false;

      const root = enemy.enemyRef?.nativeElement;

      if (root) {
        for (const animation of root.getAnimations()) {
          animation.cancel();
        }

        root.style.display = '';
        root.style.opacity = '';
        root.style.transform = '';

        const sprite =
          root.querySelector<HTMLElement>(
            '.enemy-sprite'
          );

        if (sprite) {
          for (const animation of sprite.getAnimations()) {
            animation.cancel();
          }
        }

        const bar =
          root.querySelector<HTMLElement>(
            '.health-bar'
          );

        if (bar) {
          bar.style.width = '100%';
        }

        root.querySelector('.enemy-view-range')
          ?.classList.remove('detected');
      }

      enemy.updateVisualPosition();
    });

    this.tutorialEnemyWasDead = false;
    this.playerWasAtBoundary = false;

    this.gameOver.set(false);

    // Mostrar todos os pontos restaurados.
    this.updateMiniMap(performance.now(), true);
    this.updateCamera();
  }

  // ========================================
  // CONTROLES DO MOUSE
  // ========================================

  handleMouseDown(event: MouseEvent): void {
    if (!this.player || this.gameOver()) return;

    if (event.button === 0) {
      this.player.handleMouseDown(event);
    }

    if (event.button === 2) {
      event.preventDefault();
      this.player.handleMouseDown(event);
    }
  }

  handleMouseUp(event: MouseEvent): void {
    if (!this.player || this.gameOver()) return;

    if (event.button === 0) {
      this.player.handleMouseUp(event);
    }
  }

  // ========================================
  // DISPARO DO JOGADOR
  // ========================================

  shootProjectile(event: {
    mouseX: number;
    mouseY: number;
  }): void {
    if (!this.player || this.gameOver()) return;

    const p = this.player.getPosition();

    this.projectileService.spawnProjectile(
      'player',
      p.x,
      p.y,
      event.mouseX - this.cameraX,
      event.mouseY - this.cameraY
    );
  }

  // ========================================
  // ATAQUE CORPO A CORPO
  // ========================================

  playerAttack(): void {
    if (!this.player || this.gameOver()) return;

    this.playerAttacked.emit();

    const p = this.player.getPosition();
    const size = this.player.getSize();

    let nearest: Enemy | null = null;
    let nearestDistance = 70;

    for (const enemy of this.enemies) {
      if (enemy.isDead) continue;

      const distance = Math.hypot(
        p.x + size / 2 -
          (enemy.x + enemy.size / 2),
        p.y + size / 2 -
          (enemy.y + enemy.size / 2)
      );

      if (distance <= nearestDistance) {
        nearestDistance = distance;
        nearest = enemy;
      }
    }

    nearest?.takeDamage(10);
  }

  // ========================================
  // INTERAÇÃO COM ARBUSTOS
  // ========================================

  playerInteract(): void {
    if (!this.player || this.gameOver()) return;

    const p = this.player.getPosition();
    const size = this.player.getSize();

    for (const bush of this.bushes()) {
      if (bush.harvested) continue;

      const dx =
        p.x + size / 2 -
        (bush.column * this.TILE + this.TILE / 2);

      const dy =
        p.y + size / 2 -
        (bush.row * this.TILE + this.TILE / 2);

      if (Math.hypot(dx, dy) > 85) continue;

      this.inventoryService.addBerry(
        Math.floor(Math.random() * 4) + 1
      );

      this.audioService.playItemPickup();

      this.bushes.update(list =>
        list.map(item =>
          item.id === bush.id
            ? { ...item, harvested: true }
            : item
        )
      );

      return;
    }
  }

  // ========================================
  // IA DOS CINCO SLIMES
  // ========================================

  private updateEnemies(dt: number): void {
    if (!this.player || this.gameOver()) return;

    const p = this.player.getPosition();
    const playerSize = this.player.getSize();

    for (const enemy of this.enemies) {
      if (enemy.isDead) continue;

      enemy.updateTimers(dt);

      const detected = enemy.checkPlayerInView(
        p.x,
        p.y,
        playerSize
      );

      if (!detected) {
        enemy.burstCharging = false;
        enemy.burstWindup = 0;
        continue;
      }

      const dx =
        p.x + playerSize / 2 -
        (enemy.x + enemy.size / 2);

      const dy =
        p.y + playerSize / 2 -
        (enemy.y + enemy.size / 2);

      const distance = Math.hypot(dx, dy);

      if (distance < 0.001) continue;

      const preferredDistance =
        enemy.elite ? 155 : 47;

      // Perseguir sem aproximar além da
      // distância de combate desejada.
      if (distance > preferredDistance) {
        const movement = Math.min(
          enemy.movementSpeed * dt,
          distance - preferredDistance
        );

        const nextX =
          enemy.x + (dx / distance) * movement;

        const nextY =
          enemy.y + (dy / distance) * movement;

        enemy.x = enemy.elite
          ? Math.max(1940, nextX)
          : nextX;

        enemy.y = nextY;

        enemy.updateVisualPosition();
      }

      const updatedDistance = Math.hypot(
        p.x + playerSize / 2 -
        (enemy.x + enemy.size / 2),

        p.y + playerSize / 2 -
        (enemy.y + enemy.size / 2)
      );

      const contactDistance =
        playerSize / 2 + enemy.size / 2;

      // Dano ao encostar.
      if (
        updatedDistance <= contactDistance &&
        enemy.touchTimer <= 0
      ) {
        this.damagePlayer(enemy.touchDamage);

        enemy.touchTimer = 1.2;

        if (this.gameOver()) return;
      }

      const canShoot =
        updatedDistance <= enemy.attackRange &&
        updatedDistance > contactDistance + 8;

      // Rajada tripla do mini-chefe.
      if (enemy.elite && enemy.burstCharging) {
        enemy.burstWindup = Math.max(
          0,
          enemy.burstWindup - dt
        );

        if (enemy.burstWindup <= 0) {
          enemy.burstCharging = false;

          if (canShoot) {
            this.fireEliteBurst(enemy);
          }

          enemy.spitTimer = Math.max(
            enemy.spitTimer,
            0.9
          );
        }
      } else if (
        enemy.elite &&
        canShoot &&
        enemy.burstTimer <= 0
      ) {
        enemy.burstCharging = true;
        enemy.burstWindup = 0.65;
        enemy.burstTimer = 5.8;

        enemy.spitTimer = Math.max(
          enemy.spitTimer,
          1.5
        );

        this.showEliteCharge(enemy);
      } else if (
        canShoot &&
        enemy.spitTimer <= 0
      ) {
        // Cuspe direto.
        this.spawnEnemyShot(enemy);
        enemy.spitTimer = enemy.spitCooldown;
      }

      this.resolvePlayerEnemyCollision(enemy);
    }
  }

  // ========================================
  // DANO NO JOGADOR
  // ========================================

  private damagePlayer(amount: number): void {
    if (
      !this.player ||
      this.gameOver() ||
      this.player.getHealthPercentage() <= 0
    ) {
      return;
    }

    this.player.takeDamage(amount);

    const health =
      this.player.getHealthPercentage();

    const bar =
      document.getElementById('player-health-bar');

    if (bar) {
      bar.style.width = `${health}%`;
    }

    if (health <= 0) {
      this.triggerGameOver();
    }
  }

  // ========================================
  // COLISÃO COM O INIMIGO
  // ========================================

  private resolvePlayerEnemyCollision(enemy: Enemy): void {
    if (!this.player || enemy.isDead) return;

    const p = this.player.getPosition();
    const size = this.player.getSize();

    const dx =
      p.x + size / 2 -
      (enemy.x + enemy.size / 2);

    const dy =
      p.y + size / 2 -
      (enemy.y + enemy.size / 2);

    const overlapX =
      size / 2 + enemy.size / 2 - Math.abs(dx);

    const overlapY =
      size / 2 + enemy.size / 2 - Math.abs(dy);

    if (overlapX <= 0 || overlapY <= 0) return;

    let newX = p.x;
    let newY = p.y;

    if (overlapX < overlapY) {
      newX += dx >= 0 ? overlapX : -overlapX;
    } else {
      newY += dy >= 0 ? overlapY : -overlapY;
    }

    this.player.setPosition(newX, newY);
  }

  // ========================================
  // AVISO VISUAL DO ATAQUE ESPECIAL
  // ========================================

  private showEliteCharge(enemy: Enemy): void {
    const sprite =
      enemy.enemyRef?.nativeElement
        .querySelector<HTMLElement>('.enemy-sprite');

    sprite?.animate(
      [
        {
          filter:
            'drop-shadow(0 0 3px #ffd56f) brightness(1)'
        },
        {
          filter:
            'drop-shadow(0 0 13px #cc8fff) brightness(1.8)'
        },
        {
          filter:
            'drop-shadow(0 0 3px #ffd56f) brightness(1)'
        }
      ],
      {
        duration: 650,
        easing: 'ease-in-out'
      }
    );
  }

  // ========================================
  // RAJADA DE TRÊS BOLHAS
  // ========================================

  private fireEliteBurst(enemy: Enemy): void {
    const volleyId = this.nextVolleyId++;

    for (const angle of [-0.34, 0, 0.34]) {
      this.spawnEnemyShot(
        enemy,
        angle,
        'burst',
        volleyId
      );
    }
  }

  // ========================================
  // CRIAR TIRO DO SLIME
  // ========================================

  private spawnEnemyShot(
    enemy: Enemy,
    angleOffset = 0,
    kind: 'spit' | 'burst' = 'spit',
    volleyId: number | null = null
  ): void {
    if (!this.player || this.gameOver()) return;

    const layer =
      document.getElementById('projectile-layer');

    if (!layer) return;

    const p = this.player.getPosition();
    const playerSize = this.player.getSize();

    const sx =
      enemy.x + enemy.size / 2;

    const sy =
      enemy.y + enemy.size / 2;

    const dx =
      p.x + playerSize / 2 - sx;

    const dy =
      p.y + playerSize / 2 - sy;

    if (Math.hypot(dx, dy) < 1) return;

    const direction =
      Math.atan2(dy, dx) + angleOffset;

    const burst = kind === 'burst';

    const speed = burst
      ? 215
      : enemy.projectileSpeed;

    const damage = burst
      ? 18
      : enemy.projectileDamage;

    const size = burst
      ? 16
      : enemy.elite ? 18 : 12;

    const background = burst
      ? 'radial-gradient(circle at 35% 30%,#fff,#d29aff 40%,#7033a0 90%)'
      : enemy.elite
        ? 'radial-gradient(circle at 35% 30%,#fff7ba,#ffc663 43%,#f667ac 90%)'
        : 'radial-gradient(circle at 35% 30%,#e4ffff,#42deda 45%,#3678ca 90%)';

    const glow = burst
      ? '#c487ff'
      : enemy.elite ? '#ffbf70' : '#5cdbfa';

    const element =
      document.createElement('div');

    Object.assign(element.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background,
      boxShadow: `0 0 12px ${glow}`,
      pointerEvents: 'none',
      zIndex: '25'
    });

    layer.appendChild(element);

    this.enemyShots.push({
      id: this.nextEnemyShotId++,
      x: sx - size / 2,
      y: sy - size / 2,
      vx: Math.cos(direction) * speed,
      vy: Math.sin(direction) * speed,
      size,
      damage,
      lifetime: 3.3,
      volleyId,
      element
    });
  }

  // ========================================
  // ATUALIZAR TIROS DOS SLIMES
  // ========================================

  private updateEnemyShots(dt: number): void {
    if (!this.player || this.gameOver()) return;

    const p = this.player.getPosition();
    const playerSize = this.player.getSize();

    const alive: EnemyShot[] = [];

    for (const shot of this.enemyShots) {

      if (
        shot.volleyId !== null &&
        this.hitVolleyIds.has(shot.volleyId)
      ) {
        shot.element.remove();
        continue;
      }

      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      shot.lifetime -= dt;

      const hit =
        shot.x < p.x + playerSize &&
        shot.x + shot.size > p.x &&
        shot.y < p.y + playerSize &&
        shot.y + shot.size > p.y;

      const out =
        shot.lifetime <= 0 ||
        shot.x < 0 ||
        shot.y < 0 ||
        shot.x > this.MAP_SIZE ||
        shot.y > this.MAP_SIZE;

      if (hit) {
        this.damagePlayer(shot.damage);

        if (shot.volleyId !== null) {
          this.hitVolleyIds.add(shot.volleyId);
        }
      }

      if (hit || out) {
        shot.element.remove();
      } else {
        shot.element.style.transform =
          `translate(${shot.x}px,${shot.y}px)`;

        alive.push(shot);
      }
    }

    this.enemyShots = alive;

    // Limpar identificadores de rajadas encerradas.
    const activeVolleys = new Set(
      alive
        .map(shot => shot.volleyId)
        .filter((id): id is number => id !== null)
    );

    for (const id of this.hitVolleyIds) {
      if (!activeVolleys.has(id)) {
        this.hitVolleyIds.delete(id);
      }
    }
  }

  // ========================================
  // TIROS DO JOGADOR ACERTAM SLIMES
  // ========================================

  private checkPlayerProjectileCollisions(): void {
    const projectiles =
      this.projectileService.getProjectiles();

    for (const shot of projectiles) {
      if (shot.ownerId !== 'player') continue;

      for (const enemy of this.enemies) {
        if (enemy.isDead) continue;

        const distance = Math.hypot(
          shot.x + shot.size / 2 -
          (enemy.x + enemy.size / 2),

          shot.y + shot.size / 2 -
          (enemy.y + enemy.size / 2)
        );

        if (
          distance >
          enemy.size / 2 + shot.size / 2
        ) {
          continue;
        }

        enemy.takeDamage(shot.damage);

        this.projectileService.removeProjectile(
          shot.id
        );

        break;
      }
    }
  }

  // ========================================
  // TUTORIAL — INIMIGO DERROTADO
  // ========================================

  private checkTutorialEnemyDefeated(): void {
    const tutorialEnemy = this.enemies.find(
      enemy => enemy.training
    );

    if (
      tutorialEnemy?.isDead &&
      !this.tutorialEnemyWasDead
    ) {
      this.tutorialEnemyWasDead = true;
      this.enemyDefeated.emit();
    }
  }

  // ========================================
  // DESENHAR TIROS DO JOGADOR
  // ========================================

  private renderPlayerProjectiles(): void {
    const layer =
      document.getElementById('projectile-layer');

    if (!layer) return;

    const projectiles =
      this.projectileService.getProjectiles();

    const active = new Set<number>();

    for (const shot of projectiles) {
      active.add(shot.id);

      let element =
        this.projectileElements.get(shot.id);

      if (!element) {
        element = document.createElement('div');

        Object.assign(element.style, {
          position: 'absolute',
          borderRadius: '50%',
          pointerEvents: 'none'
        });

        layer.appendChild(element);
        this.projectileElements.set(
          shot.id,
          element
        );
      }

      element.style.width = `${shot.size}px`;
      element.style.height = `${shot.size}px`;
      element.style.backgroundColor = shot.color;

      element.style.transform =
        `translate(${shot.x}px,${shot.y}px)`;
    }

    for (const [id, element] of this.projectileElements) {
      if (active.has(id)) continue;

      element.remove();
      this.projectileElements.delete(id);
    }
  }

  // ========================================
  // MINIMAPA — CINCO INIMIGOS VIVOS
  // ========================================

  private updateMiniMap(
    now: number,
    force = false
  ): void {
    if (
      !force &&
      now - this.lastMapSync < 150
    ) {
      return;
    }

    this.lastMapSync = now;

    if (this.player) {
      const p = this.player.getPosition();

      this.gameStateService.setPlayerPosition({
        x: p.x + this.player.getSize() / 2,
        y: p.y + this.player.getSize() / 2
      });
    }

    // Posições reais dos componentes renderizados.
    const positions = this.enemies
      .filter(enemy => !enemy.isDead)
      .map(enemy => ({
        x: enemy.x + enemy.size / 2,
        y: enemy.y + enemy.size / 2
      }));

    this.gameStateService.setEnemyPositions(
      positions
    );
  }

  // ========================================
  // CÂMERA
  // ========================================

  private updateCamera(): void {
    const camera =
      document.getElementById('camera');

    if (!camera || !this.player) return;

    const p = this.player.getPosition();
    const size = this.player.getSize();

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const camX = Math.max(
      Math.min(
        screenWidth - this.MAP_SIZE,
        0
      ),
      Math.min(
        0,
        screenWidth / 2 -
        (p.x + size / 2)
      )
    );

    const camY = Math.max(
      Math.min(
        screenHeight - this.MAP_SIZE,
        0
      ),
      Math.min(
        0,
        screenHeight / 2 -
        (p.y + size / 2)
      )
    );

    this.cameraX = camX;
    this.cameraY = camY;

    camera.style.transform =
      `translate(${camX}px,${camY}px)`;
  }

  // ========================================
  // LIMITE DO TUTORIAL
  // ========================================

  private checkTutorialBoundary(): void {
    if (!this.player) return;

    const p = this.player.getPosition();

    const atBoundary =
      p.x >= 2500 ||
      p.y >= 2500 ||
      p.x <= 0 ||
      p.y <= 0;

    if (
      atBoundary &&
      !this.playerWasAtBoundary
    ) {
      this.tutorialBoundary.emit();
    }

    this.playerWasAtBoundary = atBoundary;
  }

  // ========================================
  // LIMPEZA SEGURA — ANGULAR SSR
  // ========================================

  ngOnDestroy(): void {
    this.destroyed = true;

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(
        this.animationFrameId
      );

      this.animationFrameId = 0;
    }

    for (const element of this.projectileElements.values()) {
      element.remove();
    }

    this.projectileElements.clear();

    for (const shot of this.enemyShots) {
      shot.element.remove();
    }

    this.enemyShots = [];
    this.hitVolleyIds.clear();
  }
}
