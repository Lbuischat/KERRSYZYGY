import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-enemy',
  standalone: true,
  imports: [],
  templateUrl: './enemy.html',
  styleUrl: './enemy.css'
})
export class Enemy implements OnInit, AfterViewInit, OnDestroy {

  // =====================================
  // DEBUG ID
  // =====================================

  private static nextId = 1;
  private readonly id = Enemy.nextId++;

  // =====================================
  // ELEMENT REFERENCE
  // =====================================

  @ViewChild('enemyRef')
  enemyRef?: ElementRef<HTMLElement>;

  // =====================================
  // POSITION / TYPE
  // =====================================

  @Input() x = 600;
  @Input() y = 400;

  @Input() elite = false;
  @Input() training = false;

  readonly spritePath =
    '/assets/sprites/enemies/alien-slime.png';

  // =====================================
  // HITBOX / SIZE / SPEED
  // =====================================

  readonly size = 40;
  readonly speed = 65;

  // =====================================
  // HEALTH
  // =====================================

  maxHealth = 100;
  health = 100;

  isDead = false;
  isPlayerInView = false;

  // =====================================
  // TIMERS
  // =====================================

  touchTimer = 0;
  spitTimer = 1.4;

  // Special elite attack
  burstTimer = 3.8;
  burstWindup = 0;
  burstCharging = false;

  // =====================================
  // INITIALIZATION
  // =====================================

  ngOnInit(): void {

    this.maxHealth = this.elite
      ? 350
      : 100;

    this.health = this.maxHealth;

    console.log(
      `🟢 CREATED ENEMY #${this.id}`,
      this.elite ? '(ELITE)' : '(NORMAL)'
    );
  }

  ngAfterViewInit(): void {
    this.updateVisualPosition();
    this.updateHealthBar();
  }

  ngOnDestroy(): void {
    // Angular automatically removes this enemy's elements.
  }

  // =====================================
  // TYPE-BASED STATISTICS
  // =====================================

  get viewRange(): number {
    return this.elite ? 390 : 260;
  }

  get attackRange(): number {
    return this.elite ? 310 : 165;
  }

  get movementSpeed(): number {
    return this.elite ? 85 : this.speed;
  }

  get touchDamage(): number {
    return this.elite ? 80 : 10;
  }

  get projectileDamage(): number {
    return this.elite ? 30 : 8;
  }

  get projectileSpeed(): number {
    return this.elite ? 275 : 195;
  }

  get spitCooldown(): number {
    return this.elite ? 1.8 : 2.8;
  }

  // =====================================
  // UPDATE ATTACK TIMERS
  // =====================================

  updateTimers(deltaTime: number): void {

    this.touchTimer = Math.max(
      0,
      this.touchTimer - deltaTime
    );

    this.spitTimer = Math.max(
      0,
      this.spitTimer - deltaTime
    );

    this.burstTimer = Math.max(
      0,
      this.burstTimer - deltaTime
    );
  }

  // =====================================
  // UPDATE POSITION
  // =====================================

  public updateVisualPosition(): void {

    const root = this.enemyRef?.nativeElement;

    if (!root) {
      return;
    }

    root.style.left = `${this.x}px`;
    root.style.top = `${this.y}px`;
  }

  // =====================================
  // CHECK PLAYER DETECTION
  // =====================================

  public checkPlayerInView(
    playerX: number,
    playerY: number,
    playerSize: number
  ): boolean {

    const playerCenterX =
      playerX + playerSize / 2;

    const playerCenterY =
      playerY + playerSize / 2;

    const enemyCenterX =
      this.x + this.size / 2;

    const enemyCenterY =
      this.y + this.size / 2;

    const dx = playerCenterX - enemyCenterX;
    const dy = playerCenterY - enemyCenterY;

    const distance = Math.hypot(dx, dy);

    this.isPlayerInView =
      !this.isDead &&
      distance <= this.viewRange;

    return this.isPlayerInView;
  }

  // =====================================
  // HEALTH PERCENTAGE
  // =====================================

  getHealthPercentage(): number {

    if (this.maxHealth <= 0) {
      return 0;
    }

    return Math.max(
      0,
      100 * this.health / this.maxHealth
    );
  }

  // =====================================
  // UPDATE HEALTH BAR
  // =====================================

  private updateHealthBar(): void {

    const bar = this.enemyRef?.nativeElement
      .querySelector<HTMLElement>('.health-bar');

    if (bar) {
      bar.style.width =
        `${this.getHealthPercentage()}%`;
    }
  }

  // =====================================
  // RECEIVE DAMAGE
  // =====================================

  takeDamage(amount: number): void {

    if (
      this.isDead ||
      amount <= 0
    ) {
      return;
    }

    this.health = Math.max(
      0,
      this.health - amount
    );

    console.log(
      `Enemy #${this.id} HP:`,
      this.health
    );

    this.updateHealthBar();
    this.triggerHitEffect(amount);

    if (this.health <= 0) {
      this.die();
    }
  }

  // =====================================
  // DAMAGE VISUAL EFFECT
  // =====================================

  public triggerHitEffect(damage: number): void {

    const root = this.enemyRef?.nativeElement;

    if (!root) {
      return;
    }

    const sprite = root.querySelector<HTMLElement>(
      '.enemy-sprite'
    );

    // Flash and shake the sprite.
    sprite?.animate(
      [
        {
          filter: 'brightness(2)',
          transform: 'translateX(-3px)'
        },
        {
          filter: 'brightness(1)',
          transform: 'translateX(3px)'
        },
        {
          filter: 'brightness(1)',
          transform: 'translateX(0)'
        }
      ],
      {
        duration: 180
      }
    );

    // Create floating damage number.
    const label = document.createElement('span');

    label.className = 'enemy-damage-label';
    label.textContent = `-${damage}`;

    root.appendChild(label);

    const animation = label.animate(
      [
        {
          transform: 'translate(-50%, 0)',
          opacity: 1
        },
        {
          transform: 'translate(-50%, -28px)',
          opacity: 0
        }
      ],
      {
        duration: 650,
        fill: 'forwards'
      }
    );

    animation.onfinish = () => {
      label.remove();
    };
  }

  // =====================================
  // ENEMY DEATH
  // =====================================

  private die(): void {

    if (this.isDead) {
      return;
    }

    this.isDead = true;
    this.isPlayerInView = false;
    this.burstCharging = false;

    const root = this.enemyRef?.nativeElement;

    if (!root) {
      return;
    }

    const animation = root.animate(
      [
        {
          opacity: 1,
          transform: 'scale(1)'
        },
        {
          opacity: 0,
          transform: 'scale(1.25, .55)'
        }
      ],
      {
        duration: 300,
        fill: 'forwards'
      }
    );

    animation.onfinish = () => {
      root.style.display = 'none';
    };
  }
}